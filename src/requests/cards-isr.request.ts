import fetcher from "@/util/fetcher";
import { postCardType } from "@/types/card.type";
import { SearchParamsObject } from "@/types/common.type";
import { appConfig } from "@/configs/app.config";

export const cardsISRRequest = async (searchParams: SearchParamsObject) => {
  const response = await fetcher<postCardType[]>(
    `${appConfig.apiUrl}/posts`,
    {
      next: {
        tags: ["cards-isr"],
      },
      cache: "no-store",
      searchParams: searchParams.searchParams,
    }
  );
  return response;
};

