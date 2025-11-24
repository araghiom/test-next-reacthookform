import type { Metadata } from "next";
import { cardsSSGRequest } from "@/requests/cards-ssg.request";
import { Card } from "@/components/shared/Card";
import { postCardType } from "@/types/card.type";
import { PageSchema } from "@/components/shared/PageSchema";
import { appConfig } from "@/configs/app.config";

export const metadata: Metadata = {
  title: "Cards SSG | Next.js App",
  description:
    "View cards using Static Site Generation (SSG) - generated at build time",
  openGraph: {
    title: "Cards SSG | Next.js App",
    description:
      "View cards using Static Site Generation (SSG) - generated at build time",
    url: `${appConfig.url}/cards-ssg`,
    siteName: appConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cards SSG | Next.js App",
    description:
      "View cards using Static Site Generation (SSG) - generated at build time",
  },
};

export async function generateStaticParams() {
  return [{ page: "1" }];
}

const limit = 10;
const page = 1;

export default async function CardsSSGPage() {
  const cards: postCardType[] = await cardsSSGRequest({
    limit,
    page,
  });

  return (
    <>
      <PageSchema
        title="Cards SSG Page"
        description="This page uses Static Site Generation (SSG) and is generated at build time"
        url={`${appConfig.url}/cards-ssg`}
        type="CollectionPage"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cards SSG Page</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This page uses Static Site Generation (SSG) and is generated at build
          time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}

