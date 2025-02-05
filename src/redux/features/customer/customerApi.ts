import { baseApi } from "@/redux/api/baseApi";
// import { TQueryParam, TResponseRedux } from "@/type";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
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
        url: `/orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    initiatePayment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/${id}/payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),
    changedPassword: builder.mutation({
      query: (data) => ({
        url: `/users/change-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useRegisterUserMutation,
  useCreateOrderMutation,
  useInitiatePaymentMutation,
  useChangedPasswordMutation,
} = customerApi;
