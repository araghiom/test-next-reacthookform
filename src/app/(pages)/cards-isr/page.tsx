import type { Metadata } from "next";
import { cardsISRRequest } from "@/requests/cards-isr.request";
import { Card } from "@/components/shared/Card";
import { postCardType } from "@/types/card.type";
import { PageSchema } from "@/components/shared/PageSchema";
import { appConfig } from "@/configs/app.config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cards ISR | Next.js App",
  description:
    "View cards using Incremental Static Regeneration (ISR) with automatic revalidation",
  openGraph: {
    title: "Cards ISR | Next.js App",
    description:
      "View cards using Incremental Static Static Regeneration (ISR) with automatic revalidation",
    url: `${appConfig.url}/cards-isr`,
    siteName: appConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cards ISR | Next.js App",
    description:
      "View cards using Incremental Static Regeneration (ISR) with automatic revalidation",
  },
};

const limit = 10;
const page = 1;

export default async function CardsISRPage() {
  const cards: postCardType[] = await cardsISRRequest({
    limit,
    page,
  });

  return (
    <>
      <PageSchema
        title="Cards ISR Page"
        description="This page uses Incremental Static Regeneration (ISR) with a revalidation time of 60 seconds"
        url={`${appConfig.url}/cards-isr`}
        type="CollectionPage"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cards ISR Page</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This page uses Incremental Static Regeneration (ISR) with a
          revalidation time of 60 seconds.
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

