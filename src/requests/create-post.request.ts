import { postCardType } from "@/types/card.type";

type CreatePostData = {
  userId: number;
  title: string;
  body: string;
};

export const createPostRequest = async (
  data: CreatePostData
): Promise<postCardType> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create post");
  }

  const result = await response.json();
  return result;
};

