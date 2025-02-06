import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/type";
import { TOrder } from "@/type/order.type";

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
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});
export const {
  useGetSingleOrderByOrderIdQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} = orderAPi;
