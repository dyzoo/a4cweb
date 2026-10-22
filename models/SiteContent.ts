import mongoose, { Schema, Model } from "mongoose";

export interface ISiteContent {
  key: string;
  data: Record<string, unknown>;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    data: { type: Schema.Types.Mixed, default: {} },
    updatedAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>("SiteContent", SiteContentSchema, "site_content");

export default SiteContent;
