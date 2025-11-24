import type { BlogPosting, NewsArticle, WithContext } from "schema-dts"
import { WordpressResponse } from "@/(core)/_types/wordpressTypes"
import linkGenerator from "@/(core)/_utils/linkGenerator"

type PostSchemaProps = {
  post: WordpressResponse
  postAuthorDetail: any
  imageSrc: string
  isArticle: boolean
}

const PostSchema = ({
  post,
  postAuthorDetail,
  imageSrc,
  isArticle,
}: PostSchemaProps) => {
  const {
    title: { rendered: postTitle },
    date,
    modified,
    link,
  } = post

  const jsonLd: WithContext<BlogPosting | NewsArticle> = {
    "@context": "https://schema.org",
    "@type": isArticle ? "BlogPosting" : "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkGenerator(link)}`,
    },
    headline: postTitle,
    description: `${post.post_meta?.rank_math_description}`,
    author: {
      "@type": "Person",
      name: postAuthorDetail?.name,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}author/${postAuthorDetail?.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "پارسیان کریپتو",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/parsiancrypto-logo.png`,
      },
    },
    image: [imageSrc],
    datePublished: date,
    dateModified: modified,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default PostSchema
