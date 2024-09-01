"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateMongoCLient;
exports.fetchDocuments = fetchDocuments;
exports.insertDocument = insertDocument;
exports.insertManyDocument = insertManyDocument;
exports.fetchDocumentById = fetchDocumentById;
exports.fetchBYUid = fetchBYUid;
exports.fetchDocumentByEmail = fetchDocumentByEmail;
exports.deleteDocument = deleteDocument;
exports.updateDocument = updateDocument;
const mongodb_1 = require("mongodb");
function CreateMongoCLient(uri) {
    const OPTIONS = {
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    };
    try {
        const client = new mongodb_1.MongoClient(uri, OPTIONS);
        return client;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
function fetchDocuments(collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!id) {
                return yield collection.find().toArray();
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function insertDocument(collection, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield collection.insertOne(doc);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function insertManyDocument(collection, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(doc);
            return yield collection.insertMany(doc, { ordered: false });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function fetchDocumentById(collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = { _id: new mongodb_1.ObjectId(id) };
            return yield collection.findOne(filter);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function fetchBYUid(collection, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield collection
                .find({
                uid: new mongodb_1.ObjectId(uid),
            })
                .toArray();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function fetchDocumentByEmail(collection, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { email, uid } = credentials;
        try {
            return yield collection.findOne(Object.assign({}, credentials));
        }
        catch (error) {
            console.error(error);
        }
    });
}
function deleteDocument(collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function updateDocument(collection, id, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: doc, $currentDate: { lastModified: true } }, { returnDocument: "after" });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
