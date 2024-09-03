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
if (!process.env.PORT ||
    !process.env.DB_CLUSTER ||
    !process.env.API_KEY ||
    !process.env.CLOUDNAME ||
    !process.env.API_SECRET) {
    process.exit(1);
}
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files to the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ dest: "uploads/", storage: storage });
const database_1 = __importStar(require("./database"));
const mongodb_1 = require("mongodb");
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const DB_URI = `mongodb+srv://${user}:${password}@${cluster}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const DATABASE_CLIENT = (0, database_1.default)(DB_URI);
const DATABASE = DATABASE_CLIENT.db("MelHotel");
const ACCOUNT = DATABASE.collection("ACCOUNT");
const BOOK = DATABASE.collection("BOOK");
const ACTIVE = DATABASE.collection("ACTIVE");
const EXPIRE = DATABASE.collection("EXPIRE");
const PORT = parseInt(process.env.PORT, 10);
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
//
app.get("/hotel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield DATABASE.admin()
        .ping()
        .then((success) => {
        res.status(200).json(Object.assign({ response: "success" }, success));
    })
        .catch((reject) => {
        res.status(200).json(Object.assign({ response: "success" }, reject));
    });
}));
app.route("/melhotel/collection/").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = req.query.collection;
    switch (collection) {
        case "account":
            yield (0, database_1.fetchDocuments)(ACCOUNT)
                .then((response) => {
                res.status(200).json(response);
            })
                .catch((rejected) => {
                res.status(500).json({ errorMessage: "Can't fetch collection", rejected });
            });
            break;
        case "active":
            yield (0, database_1.fetchDocuments)(ACTIVE)
                .then((response) => {
                res.status(200).json(response);
            })
                .catch((rejected) => {
                res.status(500).json({ errorMessage: "Can't fetch collection", rejected });
            });
            break;
        case "pending":
            yield (0, database_1.fetchDocuments)(BOOK)
                .then((response) => {
                res.status(200).json(response);
            })
                .catch((rejected) => {
                res.status(500).json({ errorMessage: "Can't fetch collection", rejected });
            });
            break;
        case "expire":
            yield (0, database_1.fetchDocuments)(EXPIRE)
                .then((response) => {
                res.status(200).json(response);
            })
                .catch((rejected) => {
                res.status(500).json({ errorMessage: "Can't fetch collection", rejected });
            });
            break;
        default:
            res.sendStatus(500);
            break;
    }
})).put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
})).delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = req.query.collection;
    const id = req.query.id;
    if (!collection || !id)
        res.sendStatus(500);
    switch (collection) {
        case "pending":
            yield (0, database_1.deleteDocument)(BOOK, id).then((response) => {
                res.status(200).json(response);
            }).catch((rejected) => {
                res.status(500).json({ errorMessage: "Can't delete document in Pending booking collection", rejected });
            });
            break;
        case "active":
            yield (0, database_1.deleteDocument)(ACTIVE, id).then((response) => {
                res.status(200).json(response);
            }).catch((rejected) => {
                res.status(500).json({ errorMessage: "Can't delete document in Pending booking collection", rejected });
            });
            break;
        case "expire":
            yield (0, database_1.deleteDocument)(EXPIRE, id).then((response) => {
                res.status(200).json(response);
            }).catch((rejected) => {
                res.status(500).json({ errorMessage: "Can't delete document in Expire booking collection", rejected });
            });
            break;
        default:
            res.sendStatus(500);
            break;
    }
}));
app.post("/login/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.fetchDocumentByEmail)(ACCOUNT, req.body)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((rejectResult) => {
        res.status(200).json(rejectResult);
    });
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.insertDocument)(ACCOUNT, req.body).then((result) => {
        res.status(200).json(result);
    });
}));
//account request
app
    .route("/melhotel/account/:id?")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.insertDocument)(ACCOUNT, req.body).then((result) => {
        res.status(200).json(result);
    });
}))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id)
        yield (0, database_1.fetchDocumentById)(ACCOUNT, req.params.id).then((result) => {
            res.status(200).json(result);
        });
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id)
        yield (0, database_1.deleteDocument)(ACCOUNT, req.params.id).then((result) => {
            res.status(200).json(result);
        });
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id)
        yield (0, database_1.updateDocument)(ACCOUNT, req.params.id, req.body).then((result) => {
            res.status(200).json(result);
        });
}));
app
    .route("/melhotel/book/:uid")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function checkExistenceAndInsert(coll, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const existDocument = yield coll.findOne(doc);
            if (!existDocument) {
                const insertResult = yield coll.insertOne(doc);
                if (insertResult.insertedId)
                    return true;
                return false;
            }
            return false;
        });
    }
    try {
        const dateTodayInEpoch = new Date().getTime();
        const newActiveBookings = yield BOOK.find({ startingDate: { $lte: dateTodayInEpoch } }).toArray();
        const newExpireBookings = yield ACTIVE.find({ endingDate: { $lt: dateTodayInEpoch } }).toArray();
        const newExpire = newExpireBookings.filter((expireBooking) => checkExistenceAndInsert(EXPIRE, expireBooking));
        const newActive = newActiveBookings.filter((activeBooking) => checkExistenceAndInsert(ACTIVE, activeBooking));
        if (newExpire.length !== 0) {
            const deletedActive = yield ACTIVE.deleteMany(...newExpire);
            console.log(deletedActive);
        }
        if (newActive.length !== 0) {
            const deletedPending = yield BOOK.deleteMany(...newActive);
            console.log(deletedPending);
        }
        const pendingBookings = yield (0, database_1.fetchBYUid)(BOOK, req.params.uid);
        const activeBookings = yield (0, database_1.fetchBYUid)(ACTIVE, req.params.uid);
        const expireBookings = yield (0, database_1.fetchBYUid)(EXPIRE, req.params.uid);
        res.status(200).json({ pending: pendingBookings, active: activeBookings, expire: expireBookings });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.uid = new mongodb_1.ObjectId(req.body.uid);
    yield (0, database_1.insertDocument)(BOOK, req.body)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch(() => {
        res.sendStatus(400).json({ errorMessage: "Can't insert bookings" });
    });
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.deleteDocument)(BOOK, req.params.uid)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch(() => {
        res.sendStatus(500);
    });
}));
app.post("/melhotel/upload/", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("clodinary is uploading:");
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)
        cloudinary_1.default.v2.uploader.upload(req.file.path).then((value) => {
            console.log(value);
            res.status(200).json(value);
        });
    else {
        res.sendStatus(500);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
