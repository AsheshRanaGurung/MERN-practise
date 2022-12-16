import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: [],
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

  status: {
    status: {
      type: Boolean,
      default: true,
    },
    performedBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
    },
  },
});
const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
