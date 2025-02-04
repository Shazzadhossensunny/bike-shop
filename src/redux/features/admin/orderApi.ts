import { baseApi } from "@/redux/api/baseApi";
import { TOrder, TQueryParam, TResponseRedux } from "@/type";

const orderAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/orders`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Orders"],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleOrderByOrderId: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
      }),
      providesTags: ["Orders"],
      transformResponse: (response: TResponseRedux<TOrder>) => response.data,
    }),
  }),
});
export const { useGetSingleOrderByOrderIdQuery, useGetAllOrdersQuery } =
  orderAPi;
