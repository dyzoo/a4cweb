import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBrochure extends Document {
  name: string;
  mimeType: string;
  size: number;
  data: Buffer;
  uploadedAt: Date;
}

const BrochureSchema = new Schema<IBrochure>({
  name: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: Buffer, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Brochure: Model<IBrochure> =
  mongoose.models.Brochure ||
  mongoose.model<IBrochure>("Brochure", BrochureSchema);

export default Brochure;