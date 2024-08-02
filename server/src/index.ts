import * as dotenv from "dotenv";
dotenv.configDotenv({ debug: true });
dotenv.config();

if (!process.env.PORT || !process.env.DB_CLUSTER) {
  process.exit(1);
}

//
import CreateMongoCLient, {
  fetchDocuments as fetchDocuments,
} from "./database";
import { MongoClient } from "mongodb";
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const DB_URI = `mongodb+srv://${user}:${password}@${cluster}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const DATABASE_CLIENT: MongoClient = CreateMongoCLient(DB_URI);
const DATABASE = DATABASE_CLIENT.db("MelHotel");
const ACCOUNT_COLL = DATABASE.collection("ACCOUNT");
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

SERVER.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
