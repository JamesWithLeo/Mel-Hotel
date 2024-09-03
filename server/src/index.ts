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
const BOOK = DATABASE.collection("BOOK");
const ACTIVE = DATABASE.collection("ACTIVE")
const EXPIRE = DATABASE.collection("EXPIRE");

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
    .then( (success) => {
      res.status(200).json({ response: "success", ...success });
    })
    .catch((reject) => {
      res.status(200).json({ response: "success", ...reject });
    });
});

app.route("/melhotel/collection/").get(async (req, res) => {
  const collection = req.query.collection as string;
  switch (collection) {
    case "account":
      await fetchDocuments(ACCOUNT)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((rejected) => {
          res.status(500).json({errorMessage: "Can't fetch collection", rejected})
        });
      break;
    case "active":
      await fetchDocuments(ACTIVE)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((rejected) => {
          res.status(500).json({errorMessage: "Can't fetch collection", rejected})
        });
      break;
    case "pending":
      await fetchDocuments(BOOK)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((rejected) => {
          res.status(500).json({errorMessage: "Can't fetch collection", rejected})
        });
      break;
    case "expire":
      await fetchDocuments(EXPIRE)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((rejected) => {
          res.status(500).json({errorMessage: "Can't fetch collection", rejected})
        });
      break;
    default:
      res.sendStatus(500);
      break;
  }
}).put(async (req:Request, res:Response)=>{

}).delete(async (req:Request, res:Response)=>{
  const collection = req.query.collection as string;
  const id = req.query.id as string;
  if (!collection || !id) res.sendStatus(500)
  switch (collection) {
    case "pending":
      await deleteDocument(BOOK, id).then((response)=>{
        res.status(200).json(response)
      }).catch((rejected)=>{
        res.status(500).json({errorMessage: "Can't delete document in Pending booking collection", rejected})
      })
    break
    case "active":
      await deleteDocument(ACTIVE, id).then((response)=>{
        res.status(200).json(response)
      }).catch((rejected)=>{
        res.status(500).json({errorMessage: "Can't delete document in Pending booking collection", rejected})
      })
      break
    case "expire":
      await deleteDocument(EXPIRE, id).then((response)=>{
        res.status(200).json(response)
      }).catch((rejected)=>{
        res.status(500).json({errorMessage: "Can't delete document in Expire booking collection", rejected})
      })
      break
    default:
      res.sendStatus(500)
      break
  }
})


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

app
  .route("/melhotel/book/:uid")
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
      const dateTodayInEpoch = new Date().getTime()
      const newActiveBookings = await BOOK.find({ startingDate: { $lte: dateTodayInEpoch}}).toArray()
      const newExpireBookings = await ACTIVE.find({ endingDate: { $lt: dateTodayInEpoch}}).toArray()

      const newExpire = newExpireBookings.filter((expireBooking)=>
        checkExistenceAndInsert(EXPIRE, expireBooking));
      const newActive = newActiveBookings.filter((activeBooking)=>
        checkExistenceAndInsert(ACTIVE,activeBooking )
      )
      if (newExpire.length !== 0) {
        const deletedActive = await ACTIVE.deleteMany(...newExpire)
        console.log(deletedActive) 
      }
      if (newActive.length !== 0) {
        const deletedPending = await BOOK.deleteMany(...newActive)
        console.log(deletedPending)
      } 

      const pendingBookings = await fetchBYUid(BOOK, req.params.uid);
      const activeBookings = await fetchBYUid(ACTIVE,req.params.uid);
      const expireBookings =await fetchBYUid(EXPIRE, req.params.uid);
      res.status(200).json({pending:pendingBookings, active:activeBookings, expire:expireBookings});
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })
  .post(async (req: Request, res: Response) => {
    req.body.uid = new ObjectId(req.body.uid);

      await insertDocument(BOOK, req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.sendStatus(400).json({errorMessage:"Can't insert bookings"})
      });
    }
  )
  .delete(async (req: Request, res: Response) => {
    await deleteDocument(BOOK, req.params.uid)
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
