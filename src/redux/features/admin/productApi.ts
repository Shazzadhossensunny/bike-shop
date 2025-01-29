import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getMyOfferedCourse: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: `/offered-courses/my-offered-courses`,
    //       method: "GET",
    //       params: params,
    //     };
    //   },

    //   transformResponse: (response: TResponseRedux<any>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useAddProductMutation } = productApi;
