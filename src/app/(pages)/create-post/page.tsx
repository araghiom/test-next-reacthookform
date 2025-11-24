import type { Metadata } from "next";
import { PageSchema } from "@/components/shared/PageSchema";
import { appConfig } from "@/configs/app.config";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Create Post | Next.js App",
  description: "Create a new post with title and content",
  openGraph: {
    title: "Create Post | Next.js App",
    description: "Create a new post with title and content",
    url: `${appConfig.url}/create-post`,
    siteName: appConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Post | Next.js App",
    description: "Create a new post with title and content",
  },
};

export default function CreatePostPage() {
  return (
    <>
      <PageSchema
        title="Create Post"
        description="Create a new post with title and content"
        url={`${appConfig.url}/create-post`}
        type="WebPage"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
        <ClientPage />
      </div>
    </>
  );
}

