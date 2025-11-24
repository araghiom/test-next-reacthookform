export type SearchParamsObject = RequestInit & {
  page?: number;
  limit?: number;
  searchParams?: Record<string, string | number | boolean>;
};
