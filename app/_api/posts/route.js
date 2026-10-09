import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  return !!session;
}

export async function POST(request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const data = await request.json();
    
    // Check if slug exists
    const existingPost = await Post.findOne({ slug: data.slug });
    if (existingPost) {
      return NextResponse.json({ error: "Slug already exists. Please choose another title or manually edit the slug." }, { status: 400 });
    }

    const post = await Post.create(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create Post Error", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const query = { status: "published" };
    
    if (category && category !== "All") {
      query.category = category;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
