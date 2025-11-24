type PageSchemaProps = {
  title: string;
  description: string;
  url: string;
  type?: "WebPage" | "CollectionPage" | "ItemPage";
};

export const PageSchema = ({
  title,
  description,
  url,
  type = "WebPage",
}: PageSchemaProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description: description,
    url: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
