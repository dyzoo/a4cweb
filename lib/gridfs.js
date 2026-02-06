import { MongoClient, GridFSBucket } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) throw new Error("Missing MONGO_URI in .env.local");

let cached = global._mongo || { conn: null, bucket: null };

export async function connectToDatabase() {
  if (cached.conn) return cached;

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("A4C_DATABASE");   // your database name
  const bucket = new GridFSBucket(db, {
    bucketName: "uploads"
  });

  cached = global._mongo = {
    conn: db,
    bucket
  };

  return cached;
}
