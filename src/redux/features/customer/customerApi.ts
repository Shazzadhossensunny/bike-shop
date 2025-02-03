import { baseApi } from "@/redux/api/baseApi";
// import { TQueryParam, TResponseRedux } from "@/type";

const customerApi = baseApi.injectEndpoints({
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
    registerUser: builder.mutation({
      query: (data) => ({
        url: `/users/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["Users"],
    }),
    initiatePayment: builder.mutation({
      query: (args) => ({
        url: `/orders/${args.id}/payment`,
        method: "POST",
        body: args.data,
      }),
      // invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useCreateOrderMutation,
  useInitiatePaymentMutation,
} = customerApi;
