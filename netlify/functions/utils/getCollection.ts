import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(
  process.env.MONGO_URL || "mongodb://localhost:27017"
);
const connectPromise = mongoClient.connect();

async function getCollection(name: string) {
  return (await connectPromise)
    .db(process.env.MONGO_DB || "acra_dev")
    .collection(name);
}

export async function getCompanies() {
  return getCollection("companies");
}
export async function getMissions() {
  return getCollection("missions");
}
