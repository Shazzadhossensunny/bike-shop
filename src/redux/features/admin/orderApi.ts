import { baseApi } from "@/redux/api/baseApi";

const orderAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleOrderByOrderId: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
      }),
    }),
  }),
});
export const { useGetSingleOrderByOrderIdQuery } = orderAPi;
