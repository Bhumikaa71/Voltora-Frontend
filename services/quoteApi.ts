import { baseApi } from "./baseApi";

export interface QuoteItem {
  _id: string;
  quoteId: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  qty: string;
  status: "pending" | "replied" | "rejected";
  notes?: string;
  time?: string;
  createdAt?: string;
}

export const quoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuotes: builder.query<QuoteItem[], void>({
      query: () => "/quotes",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Quote" as const, id: _id })),
              { type: "Quote", id: "LIST" },
            ]
          : [{ type: "Quote", id: "LIST" }],
    }),
    updateQuoteStatus: builder.mutation<
      QuoteItem,
      { id: string; status: "pending" | "replied" | "rejected" }
    >({
      query: ({ id, status }) => ({
        url: `/quotes/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [{ type: "Quote", id: "LIST" }],
    }),
    deleteQuote: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/quotes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Quote", id: "LIST" }],
    }),
  }),
});

export const {
  useGetQuotesQuery,
  useUpdateQuoteStatusMutation,
  useDeleteQuoteMutation,
} = quoteApi;
