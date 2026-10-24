import mongoose from "mongoose";

/**
 * Returns a GridFS bucket backed by the shared Mongoose connection.
 * The connection is opened lazily so importing this module never throws
 * when environment variables are not available yet (e.g. during builds).
 */
export async function connectGridFS(): Promise<InstanceType<typeof mongoose.mongo.GridFSBucket>> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DATABASE_NAME;

  if (!uri) {
    throw new Error("MONGODB_URI is missing in .env.local");
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      ...(dbName ? { dbName } : {}),
    } as mongoose.ConnectOptions);
  }

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("MongoDB connection is not ready");
  }

  return new mongoose.mongo.GridFSBucket(db, { bucketName: "uploads" });
}
