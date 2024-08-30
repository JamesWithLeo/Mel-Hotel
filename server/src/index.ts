import * as dotenv from "dotenv";
dotenv.configDotenv({ debug: true });
dotenv.config();

if (!process.env.PORT || !process.env.DB_CLUSTER) {
  process.exit(1);
}

//
import CreateMongoCLient, {
  deleteDocument,
  fetchByIdAndUid,
  fetchDocumentByEmail,
  fetchDocumentById,
  fetchDocuments as fetchDocuments,
  insertDocument,
  updateDocument,
} from "./database";
import { MongoClient, ObjectId } from "mongodb";
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const DB_URI = `mongodb+srv://${user}:${password}@${cluster}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const DATABASE_CLIENT: MongoClient = CreateMongoCLient(DB_URI);
const DATABASE = DATABASE_CLIENT.db("MelHotel");
const ACCOUNT_COLL = DATABASE.collection("ACCOUNT");
const BOOK_COLL = DATABASE.collection("BOOK");
const RESERVATION_COLL = DATABASE.collection("RESERVATION");
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
app.get("/admin/database/collections", async (req, res) => {
  await fetchDocuments(ACCOUNT_COLL)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((rejected) => {
      res.status(200).json({ rejected });
    });
});

app.post("/login/", async (req, res) => {
  await fetchDocumentByEmail(ACCOUNT_COLL, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((rejectResult) => {
      res.status(200).json(rejectResult);
    });
});

app.post("/signin", async (req, res) => {
  await insertDocument(ACCOUNT_COLL, req.body).then((result) => {
    res.status(200).json(result);
  });
});

//account request
app.post("/admin/database/account/insert", async (req, res) => {
  await insertDocument(ACCOUNT_COLL, req.body).then((result) => {
    res.status(200).json(result);
  });
});
app.get("/account/:id", async (req, res) => {
  await fetchDocumentById(ACCOUNT_COLL, req.params.id).then((result) => {
    res.status(200).json(result);
  });
});
app.delete("/admin/database/account/delete/:id", async (req, res) => {
  await deleteDocument(ACCOUNT_COLL, req.params.id).then((result) => {
    res.status(200).json(result);
  });
});

app.post("/account/update/:id", async (req, res) => {
  await updateDocument(ACCOUNT_COLL, req.params.id, req.body).then((result) => {
    res.status(200).json(result);
  });
});

// book admin request
app
  .route("/admin/database/book/:id?")
  .get(async (req, res) => {
    await fetchDocuments(BOOK_COLL).then((result) => {
      res.status(200).json(result);
    });
  })
  .delete(async (req, res) => {
    if (req.params.id)
      await deleteDocument(BOOK_COLL, req.params.id).then((result) => {
        res.status(200).json(result);
      });
  })
  .put(async (req, res) => {
    if (req.params.id)
      await updateDocument(BOOK_COLL, req.params.id, req.body).then(
        (result) => {
          res.status(200).json(result);
        },
      );
  });

app
  .route("/melhotel/book/:uid?")
  .get(async (req: Request, res: Response) => {
    await fetchByIdAndUid(BOOK_COLL, req.params.uid)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  })
  .post(async (req: Request, res: Response) => {
    req.body.uid = new ObjectId(req.body.uid);
    await insertDocument(BOOK_COLL, req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  })
  .delete(async (req: Request, res: Response) => {
    await deleteDocument(BOOK_COLL, req.params.uid)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
