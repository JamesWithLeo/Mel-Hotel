import {
  Collection,
  Db,
  MongoClient,
  MongoClientOptions,
  ObjectId,
  ServerApiVersion,
} from "mongodb";

export default function CreateMongoCLient(uri: string): MongoClient {
  const OPTIONS: MongoClientOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };
  try {
    const client = new MongoClient(uri, OPTIONS);
    return client;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchDocuments(collection: Collection, id?: string) {
  try {
    if (!id) {
      return await collection.find().toArray();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function insertDocument(collection: Collection, doc: Document) {
  try {
    return await collection.insertOne(doc);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchDocumentById(collection: Collection, id: string) {
  try {
    const filter = { _id: new ObjectId(id) };
    return await collection.findOne(filter);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteDocument(collection: Collection, id: string) {
  try {
    return await collection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateDocument(
  collection: Collection,
  id: string,
  doc: Document,
) {
  try {
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: doc, $currentDate: { lastModified: true } },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
