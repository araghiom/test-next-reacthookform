import { postCardType } from "@/types/card.type";

type Author = {
  name: string;
  url?: string;
};

type Publisher = {
  name: string;
  logo?: string;
};

type PostSchemaProps = {
  post: postCardType;
  url: string;
  description?: string;
  imageSrc?: string;
  author?: Author;
  publisher?: Publisher;
  datePublished?: string;
  dateModified?: string;
  type?: "BlogPosting" | "NewsArticle";
};

export const PostSchema = ({
  post,
  url,
  description,
  imageSrc,
  author,
  publisher,
  datePublished,
  dateModified,
  type = "BlogPosting",
}: PostSchemaProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: post.title,
    description: description || post.body.substring(0, 160),
    ...(author && {
      author: {
        "@type": "Person",
        name: author.name,
        ...(author.url && { url: author.url }),
      },
    }),
    ...(publisher && {
      publisher: {
        "@type": "Organization",
        name: publisher.name,
        ...(publisher.logo && {
          logo: {
            "@type": "ImageObject",
            url: publisher.logo,
          },
        }),
      },
    }),
    ...(imageSrc && { image: [imageSrc] }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default PostSchema;
