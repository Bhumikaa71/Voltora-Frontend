import { baseApi } from "./baseApi";

export interface CatalogProduct {
  _id: string;
  title?: string;
  name?: string;
  image: string;
  price?: string;
  category?: string;
  slug?: string;
}

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatalogProducts: builder.query<CatalogProduct[], void>({
      query: () => "/products",
      // If backend returns { data: [...] } uncomment next line:
      // transformResponse: (res: any) => res.data ?? res,
    }),
  }),
});

export const { useGetCatalogProductsQuery } = catalogApi;