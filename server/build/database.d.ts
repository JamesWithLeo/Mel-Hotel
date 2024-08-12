import { Collection, MongoClient } from "mongodb";
export default function CreateMongoCLient(uri: string): MongoClient;
export declare function fetchDocuments(collection: Collection, id?: string): Promise<import("mongodb").WithId<import("bson").Document>[] | undefined>;
export declare function insertDocument(collection: Collection, doc: any): Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
export declare function fetchDocumentById(collection: Collection, id: string): Promise<import("mongodb").WithId<import("bson").Document> | null>;
export declare function fetchDocumentByGmail(collection: Collection, credentials: {
    Gmail: string;
    Password: string;
}): Promise<import("mongodb").WithId<import("bson").Document> | null>;
export declare function deleteDocument(collection: Collection, id: string): Promise<import("mongodb").DeleteResult>;
export declare function updateDocument(collection: Collection, id: string, doc: Document): Promise<import("mongodb").WithId<import("bson").Document> | null>;
