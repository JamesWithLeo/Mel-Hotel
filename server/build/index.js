"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.configDotenv({ debug: true });
dotenv.config();
if (!process.env.PORT || !process.env.DB_CLUSTER) {
    process.exit(1);
}
//
const database_1 = __importStar(require("./database"));
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const DB_URI = `mongodb+srv://${user}:${password}@${cluster}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const DATABASE_CLIENT = (0, database_1.default)(DB_URI);
const DATABASE = DATABASE_CLIENT.db("MelHotel");
const ACCOUNT_COLL = DATABASE.collection("ACCOUNT");
const RESERVATION_COLL = DATABASE.collection("RESERVATION");
//
const PORT = parseInt(process.env.PORT, 10);
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const SERVER = (0, express_1.default)();
SERVER.use((0, express_1.json)());
SERVER.use((0, cors_1.default)());
//
SERVER.get("/hotel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield DATABASE.admin()
        .ping()
        .then((success) => {
        res.status(200).json(Object.assign({ response: "success" }, success));
    })
        .catch((reject) => {
        res.status(200).json(Object.assign({ response: "success" }, reject));
    });
}));
//
SERVER.get("/admin/database/collections", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.fetchDocuments)(ACCOUNT_COLL)
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((rejected) => {
        res.status(200).json({ rejected });
    });
}));
SERVER.post("/login/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.fetchDocumentByGmail)(ACCOUNT_COLL, req.body)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((rejectResult) => {
        res.status(200).json(rejectResult);
    });
}));
//account request
SERVER.post("/admin/database/account/insert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.insertDocument)(ACCOUNT_COLL, req.body).then((result) => {
        res.status(200).json(result);
    });
}));
SERVER.get("/account/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.fetchDocumentById)(ACCOUNT_COLL, req.params.id).then((result) => {
        res.status(200).json(result);
    });
}));
SERVER.delete("/admin/database/account/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.deleteDocument)(ACCOUNT_COLL, req.params.id).then((result) => {
        res.status(200).json(result);
    });
}));
SERVER.post("/account/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.updateDocument)(ACCOUNT_COLL, req.params.id, req.body).then((result) => {
        res.status(200).json(result);
    });
}));
// SERVER.post("/account/insert/:id", async (req, res) => {
//   await updateDocument(ACCOUNT_COLL, req.params.id, req.body).then((result) => {
//     res.status(200).json(result);
//   });
// });
// Reservation request
SERVER.get("/admin/database/reservation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.fetchDocuments)(RESERVATION_COLL).then((result) => {
        res.status(200).json(result);
    });
}));
SERVER.delete("/admin/database/reservation/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.deleteDocument)(RESERVATION_COLL, req.params.id).then((result) => {
        res.status(200).json(result);
    });
}));
SERVER.post("/admin/database/reservation/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.updateDocument)(RESERVATION_COLL, req.params.id, req.body).then((result) => {
        res.status(200).json(result);
    });
}));
SERVER.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
