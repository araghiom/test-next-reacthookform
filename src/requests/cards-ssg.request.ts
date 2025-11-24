import { postCardType } from "@/types/card.type";
import fetcher from "@/util/fetcher";
import { SearchParamsObject } from "@/types/common.type";
import { appConfig } from "@/configs/app.config";

export const cardsSSGRequest = async (searchParams: SearchParamsObject = { searchParams: {} }) => {
  const response = await fetcher<postCardType[]>(
    `${appConfig.apiUrl}/posts`,
    {
      cache: "force-cache",
      searchParams: searchParams.searchParams,
    }
  );
  return response;
};