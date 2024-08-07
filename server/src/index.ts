import * as dotenv from "dotenv";
dotenv.configDotenv({ debug: true });
dotenv.config();

if (!process.env.PORT || !process.env.DB_CLUSTER) {
  process.exit(1);
}

//
import CreateMongoCLient, {
  deleteDocument,
  fetchDocumentByGmail,
  fetchDocumentById,
  fetchDocuments as fetchDocuments,
  insertDocument,
  updateDocument,
} from "./database";
import { MongoClient } from "mongodb";
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const DB_URI = `mongodb+srv://${user}:${password}@${cluster}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const DATABASE_CLIENT: MongoClient = CreateMongoCLient(DB_URI);
const DATABASE = DATABASE_CLIENT.db("MelHotel");
const ACCOUNT_COLL = DATABASE.collection("ACCOUNT");
const RESERVATION_COLL = DATABASE.collection("RESERVATION");
//
const PORT: number = parseInt(process.env.PORT as string, 10);

import express, { json, response } from "express";
import cors from "cors";

const SERVER = express();
SERVER.use(json());
SERVER.use(cors());

//
SERVER.get("/hotel", async (req, res) => {
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
SERVER.get("/admin/database/collections", async (req, res) => {
  await fetchDocuments(ACCOUNT_COLL)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((rejected) => {
      res.status(200).json({ rejected });
    });
});

SERVER.post("/login/", async (req, res) => {
  await fetchDocumentByGmail(ACCOUNT_COLL, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((rejectResult) => {
      res.status(200).json(rejectResult);
    });
});

//account request
SERVER.post("/admin/database/account/insert", async (req, res) => {
  await insertDocument(ACCOUNT_COLL, req.body).then((result) => {
    res.status(200).json(result);
  });
});
SERVER.get("/admin/database/account/:id", async (req, res) => {
  await fetchDocumentById(ACCOUNT_COLL, req.params.id).then((result) => {
    res.status(200).json(result);
  });
});
SERVER.delete("/admin/database/account/delete/:id", async (req, res) => {
  await deleteDocument(ACCOUNT_COLL, req.params.id).then((result) => {
    res.status(200).json(result);
  });
});
SERVER.post("/admin/database/account/update/:id", async (req, res) => {
  await updateDocument(ACCOUNT_COLL, req.params.id, req.body).then((result) => {
    res.status(200).json(result);
  });
});

// Reservation request
SERVER.get("/admin/database/reservation", async (req, res) => {
  await fetchDocuments(RESERVATION_COLL).then((result) => {
    res.status(200).json(result);
  });
});
SERVER.delete("/admin/database/reservation/delete/:id", async (req, res) => {
  await deleteDocument(RESERVATION_COLL, req.params.id).then((result) => {
    res.status(200).json(result);
  });
});
SERVER.post("/admin/database/reservation/update/:id", async (req, res) => {
  await updateDocument(RESERVATION_COLL, req.params.id, req.body).then(
    (result) => {
      res.status(200).json(result);
    },
  );
});
SERVER.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
