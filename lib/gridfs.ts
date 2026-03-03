import mongoose from "mongoose";
import Grid from "gridfs-stream";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env.local");
}

let gfs: Grid.Grid;

const conn = mongoose.createConnection(MONGO_URI);

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("brochures"); // bucket name
});

export { gfs, conn };