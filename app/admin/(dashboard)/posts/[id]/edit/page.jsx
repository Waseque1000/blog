import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import EditPostForm from "./EditPostForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Post - Admin",
};

export default async function EditPostPage({ params }) {
  await connectToDatabase();
  const { id } = await params;
  
  let post;
  try {
    post = await Post.findById(id).lean();
  } catch (error) {
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  const serializedPost = {
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };

  return <EditPostForm initialData={serializedPost} />;
}
