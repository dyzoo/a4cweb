import { MongoClient, GridFSBucket } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Missing MONGODB_URI in environment variables");

let cached = global._mongo || { conn: null, bucket: null };

export async function connectToDatabase() {
  if (cached.conn) return cached;

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("A4C_DATABASE"); // your db name

  const bucket = new GridFSBucket(db, {
    bucketName: "uploads",
  });

  cached = global._mongo = {
    conn: db,
    bucket,
  };

  return cached;
}

export async function connectGridFS() {
  const { bucket } = await connectToDatabase();
  return bucket;
}
