import type { Metadata } from "next";
import { PageSchema } from "@/components/shared/PageSchema";
import { appConfig } from "@/configs/app.config";

export const metadata: Metadata = {
  title: "Home | Next.js App",
  description: "Welcome to our Next.js application",
  openGraph: {
    title: "Home | Next.js App",
    description: "Welcome to our Next.js application",
    url: appConfig.url,
    siteName: appConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Next.js App",
    description: "Welcome to our Next.js application",
  },
};

export default function Home() {
  return (
    <>
      <PageSchema
        title="Home Page"
        description="Welcome to our Next.js application"
        url={`${appConfig.url}/`}
        type="WebPage"
      />

      <h1 className="text-3xl font-bold mb-6">Home Page</h1>
    </>
  );
}
