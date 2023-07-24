import mongoose, { Schema, model } from "mongoose";

let tagSchema = new Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
});

tagSchema.virtual("id").get(function () {
  return this._id;
});

tagSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models?.Tag || mongoose.model("Tag", tagSchema);
