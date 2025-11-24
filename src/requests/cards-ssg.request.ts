import { postCardType } from "@/types/card.type";
import fetcher from "@/util/fetcher";
import { SearchParamsObject } from "@/types/common.type";

export const cardsSSGRequest = async (searchParams: SearchParamsObject) => {  
  const response = await fetcher<postCardType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/posts`,{
      cache: "force-cache",
    }
  );
  return response;
}