import { baseApi } from "./baseApi";

export interface HeroImageItem {
  _id?: string;
  title?: string;
  price?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}

interface UpdateHeroImageArgs {
  id: string;
  formData: FormData;
}

export const heroApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeroImages: builder.query<HeroImageItem[], void>({
      query: () => "/hero",
      providesTags: ["Hero"],
    }),
    addHeroImage: builder.mutation<HeroImageItem, FormData>({
      query: (formData) => ({
        url: "/hero",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Hero"],
    }),
    updateHeroImage: builder.mutation<HeroImageItem, UpdateHeroImageArgs>({
      query: ({ id, formData }) => ({
        url: `/hero/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Hero"],
    }),
    deleteHeroImage: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/hero/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHeroImagesQuery,
  useAddHeroImageMutation,
  useUpdateHeroImageMutation,
  useDeleteHeroImageMutation,
} = heroApi;