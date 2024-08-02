import { Collection, MongoClient } from "mongodb";
export default function CreateMongoCLient(uri: string): MongoClient;
export declare function fetchDocuments(collection: Collection, id?: string): Promise<import("mongodb").WithId<import("bson").Document>[] | undefined>;
