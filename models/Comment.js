import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    author: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [60, "Name cannot exceed 60 characters"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      maxLength: [1500, "Comment cannot exceed 1500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
