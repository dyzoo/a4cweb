import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedia extends Document {
  name: string;
  mimeType: string;
  size: number;
  data: Buffer;
  uploadedAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  name: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: Buffer, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Media: Model<IMedia> =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema, "media");

export default Media;
