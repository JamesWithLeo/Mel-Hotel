import * as dotenv from "dotenv";
dotenv.configDotenv({ debug: true });
dotenv.config();

if (
  !process.env.PORT ||
  !process.env.DB_CLUSTER ||
  !process.env.API_KEY ||
  !process.env.CLOUDNAME ||
  !process.env.API_SECRET
) {
  process.exit(1);
}
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
import path from "path";
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});
const upload = multer({ dest: "uploads/", storage: storage });
//
import CreateMongoCLient, {
  deleteDocument,
  fetchBYUid,
  fetchDocumentByEmail,
  fetchDocumentById,
  fetchDocuments as fetchDocuments,
  insertDocument,
  insertManyDocument,
  updateDocument,
} from "./database";
import { Collection, MongoClient, ObjectId } from "mongodb";
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const DB_URI = `mongodb+srv://${user}:${password}@${cluster}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const DATABASE_CLIENT: MongoClient = CreateMongoCLient(DB_URI);
const DATABASE = DATABASE_CLIENT.db("MelHotel");
const ACCOUNT = DATABASE.collection("ACCOUNT");
const ACTIVE = DATABASE.collection("ACTIVE");
const EXPIRE = DATABASE.collection("EXPIRE");
const PENDING = DATABASE.collection("PENDING");
//
const PORT: number = parseInt(process.env.PORT as string, 10);

import express, { json, Request, Response, response } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

//
app.get("/hotel", async (req, res) => {
  await DATABASE.admin()
    .ping()
    .then((success) => {
      res.status(200).json({ response: "success", ...success });
    })
    .catch((reject) => {
      res.status(200).json({ response: "success", ...reject });
    });
});

//
app.get("/melhotel/collection", async (req, res) => {
  const collection = req.query.collection as string;
  switch (collection) {
    case "account":
      await fetchDocuments(ACCOUNT)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((rejected) => {
          res.status(200).json({ rejected });
        });
      break;
    case "active":
      await fetchDocuments(ACTIVE)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((rejected) => {
          res.status(200).json({ rejected });
        });
      break;
    case "pending":
      await fetchDocuments(PENDING)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((rejected) => {
          res.status(200).json({ rejected });
        });
      break;
    case "expire":
      await fetchDocuments(EXPIRE)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((rejected) => {
          res.status(200).json({ rejected });
        });
      break;
    default:
      res.sendStatus(500);
      break;
  }
});

app.post("/login/", async (req, res) => {
  await fetchDocumentByEmail(ACCOUNT, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((rejectResult) => {
      res.status(200).json(rejectResult);
    });
});

app.post("/signin", async (req, res) => {
  await insertDocument(ACCOUNT, req.body).then((result) => {
    res.status(200).json(result);
  });
});

//account request
app
  .route("/melhotel/account/:id?")
  .post(async (req, res) => {
    await insertDocument(ACCOUNT, req.body).then((result) => {
      res.status(200).json(result);
    });
  })
  .get(async (req, res) => {
    if (req.params.id)
      await fetchDocumentById(ACCOUNT, req.params.id).then((result) => {
        res.status(200).json(result);
      });
  })
  .delete(async (req, res) => {
    if (req.params.id)
      await deleteDocument(ACCOUNT, req.params.id).then((result) => {
        res.status(200).json(result);
      });
  })
  .put(async (req, res) => {
    if (req.params.id)
      await updateDocument(ACCOUNT, req.params.id, req.body).then((result) => {
        res.status(200).json(result);
      });
  });

// book admin request
app
  .route("/admin/database/book/:id?")
  .get(async (req, res) => {
    await fetchDocuments(ACTIVE).then((result) => {
      res.status(200).json(result);
    });
  })
  .delete(async (req, res) => {
    if (req.params.id)
      await deleteDocument(ACTIVE, req.params.id).then((result) => {
        res.status(200).json(result);
      });
  })
  .put(async (req, res) => {
    if (req.params.id)
      await updateDocument(ACTIVE, req.params.id, req.body).then((result) => {
        res.status(200).json(result);
      });
  });

app
  .route("/melhotel/book/:uid?")
  .get(async (req: Request, res: Response) => {
    async function checkExistenceAndInsert(coll: Collection, doc: any) {
      const existDocument = await coll.findOne(doc);
      if (!existDocument) {
        const insertResult = await coll.insertOne(doc);
        if (insertResult.insertedId) return true;
        return false;
      }
      return false;
    }
    try {
      const userBookings = await fetchBYUid(ACTIVE, req.params.uid);
      const expireBookingsDocuments = await fetchBYUid(EXPIRE, req.params.uid);
      const pendingBookingsDocuments = await fetchBYUid(
        PENDING,
        req.params.uid,
      );
      // THE COLLECTION CYCLE ON ITS DOCUMENTS,  CHECK THE STATES OF DOCUMENT AND
      //  REMOVING THE DOCUMENT IF IT DOESNT BELONG TO THE COLLECTION.
      // separate each bookings depending whether if its active, pending or expired
      const newActiveBookings = pendingBookingsDocuments.filter(
        (value: any) =>
          new Date(value.bookedDate).toDateString() ===
          new Date().toDateString(),
      );

      const pendingBookings = userBookings.filter(
        (value: any) => value.bookedDate > new Date().getTime(),
      );

      const expireBookings = userBookings.filter((bookings: any) => {
        let diff = bookings.bookedDate - new Date().getTime();
        if (diff / (1000 * 60 * 60 * 24) <= -1) return true;
        return false;
      });

      const insertedNewActive = newActiveBookings.filter((value) => {
        checkExistenceAndInsert(ACTIVE, value);
      });
      const insertPendingBookings = pendingBookings.filter((value) =>
        checkExistenceAndInsert(PENDING, value),
      );

      const insertedExpireBookings = expireBookings.filter((value) =>
        checkExistenceAndInsert(EXPIRE, value),
      );

      if (insertedNewActive.length) {
        console.log("new active bookings");
        // empty array will delete all the documents
        const deletedExpire = await ACTIVE.deleteMany(...insertedNewActive);
        console.log(deletedExpire);
      }
      if (insertPendingBookings.length) {
        console.log("new pending bookings");
        // empty array will delete all the documents
        const deletedExpire = await ACTIVE.deleteMany(...insertPendingBookings);
        console.log(deletedExpire);
      }
      if (insertedExpireBookings.length) {
        console.log("a new booking expired ");
        // empty array will delete all the documents
        const deletedExpire = await ACTIVE.deleteMany(
          ...insertedExpireBookings,
        );
        console.log(deletedExpire);
      }

      res.status(200).json({
        expire: expireBookingsDocuments,
        pending: pendingBookingsDocuments,
        active: userBookings,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })

  .post(async (req: Request, res: Response) => {
    req.body.uid = new ObjectId(req.body.uid);
    await insertDocument(ACTIVE, req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  })
  .delete(async (req: Request, res: Response) => {
    await deleteDocument(ACTIVE, req.params.uid)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  });

app.post(
  "/melhotel/upload/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    console.log("clodinary is uploading:");
    if (req.file?.path)
      cloudinary.v2.uploader.upload(req.file.path).then((value) => {
        console.log(value);
        res.status(200).json(value);
      });
    else {
      res.sendStatus(500);
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
