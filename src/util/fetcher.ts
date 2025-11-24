import { SearchParamsObject } from "@/types/common.type"


const fetcher = async <K>(
  endpoint: string,
  options?: SearchParamsObject
): Promise<K> => {
  const searchParams = new URLSearchParams(
    options?.searchParams as Record<string, string>
  )
  const res = await fetch(
    `${endpoint}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`,
    { ...options, credentials: "include" }
  )

  const resJson = await res.json()

  if (!res.ok) {
    if (resJson?.code === "rest_post_invalid_page_number") {
      return {
        data: [],
        totalResults: 0,
      } as K
    }
    // throw new Error(resJson.message);
  }



  return resJson
}

export default fetcher
