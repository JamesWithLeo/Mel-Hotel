import {
  Collection,
  Db,
  MongoClient,
  MongoClientOptions,
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
