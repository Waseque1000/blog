import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ likes: post.likes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 });
  }
}
