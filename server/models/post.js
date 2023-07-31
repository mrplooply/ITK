import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  u_id: {
    type: ObjectId,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
postSchema.set("timestamps", true);

export default mongoose.model("Post", postSchema);
