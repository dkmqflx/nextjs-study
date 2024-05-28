import NewPost from "@/components/NewPost";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
};

export default async function NewPostPage() {
  // 로그인한 사용자인지 아닌지 확인하기 위해
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }
  return <NewPost user={session.user} />;
}
