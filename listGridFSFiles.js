import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); 
import { connectGridFS } from "./lib/gridfs.js"; 

(async () => {
  try {
    const bucket = await connectGridFS();
    const files = await bucket.find().toArray();

    if (!files.length) {
      console.log("No files found in GridFS!");
      return;
    }

    console.log("Files in GridFS bucket 'uploads':");
    files.forEach(f => {
      console.log("ID:", f._id.toString(), "| Filename:", f.filename);
    });
  } catch (err) {
    console.error("Error fetching files:", err);
  }
})();
