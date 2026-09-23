import { baseApi } from "./baseApi";
import { CottonProduct } from "@/types";

export interface UpdateProductArgs {
  id: string;
  formData: FormData;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<CottonProduct[], string | void>({
      query: (category) => {
        if (category && category !== "all") {
          return `/products?category=${encodeURIComponent(category)}`;
        }
        return "/products";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id, _id }: any) => ({
                type: "Product" as const,
                id: id || _id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProductBySlug: builder.query<CottonProduct, string>({
      query: (slug) => `/products/${encodeURIComponent(slug)}`,
      providesTags: (result, error, slug) => [{ type: "Product", id: slug }],
    }),

    addProduct: builder.mutation<CottonProduct, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: builder.mutation<CottonProduct, UpdateProductArgs>({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id },
      ],
    }),

    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
