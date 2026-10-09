import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    // Verify it exists and is published
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ views: post.views });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json({ error: "Failed to update view count" }, { status: 500 });
  }
}
