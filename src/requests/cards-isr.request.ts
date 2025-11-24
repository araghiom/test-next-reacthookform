import fetcher from "@/util/fetcher";
import { postCardType } from "@/types/card.type";
import { SearchParamsObject } from "@/types/common.type";

export const cardsISRRequest = async (searchParams: SearchParamsObject) => {
  const response = await fetcher<postCardType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/posts`,{
      next: {
      tags: ["cards-isr"],
      },
      cache: "no-store",
    }
  );
  return response;
};

