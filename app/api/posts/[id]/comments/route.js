import connectToDatabase from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const comments = await Comment.find({ postId: id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      comments.map((c) => ({
        ...c,
        _id: c._id.toString(),
        postId: c.postId.toString(),
        createdAt: c.createdAt.toISOString(),
      })),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    // Verify post exists
    const postExists = await Post.exists({ _id: id });
    if (!postExists) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const author = (body.author || "").trim();
    const content = (body.content || "").trim();

    if (!author) {
      return NextResponse.json(
        { error: "Please enter your name" },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: "Please enter a comment" },
        { status: 400 }
      );
    }

    if (author.length > 60) {
      return NextResponse.json(
        { error: "Name must be 60 characters or less" },
        { status: 400 }
      );
    }

    if (content.length > 1500) {
      return NextResponse.json(
        { error: "Comment must be 1500 characters or less" },
        { status: 400 }
      );
    }

    const newComment = await Comment.create({
      postId: id,
      author,
      content,
    });

    return NextResponse.json(
      {
        _id: newComment._id.toString(),
        postId: newComment.postId.toString(),
        author: newComment.author,
        content: newComment.content,
        createdAt: newComment.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to post comment. Please try again." },
      { status: 500 }
    );
  }
}
