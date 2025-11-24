import fetcher from "@/util/fetcher";
import { postCardType } from "@/types/card.type";
import { SearchParamsObject } from "@/types/common.type";
import { appConfig } from "@/configs/app.config";

export const cardsSSRRequest = async (searchParams: SearchParamsObject = { searchParams: {} }) => { 
  const response = await fetcher<postCardType[]>(
    `${appConfig.apiUrl}/posts`,
    {
      searchParams: searchParams.searchParams,
    }
  );

  return response;
};
