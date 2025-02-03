import { baseApi } from "@/redux/api/baseApi";
import { TProduct, TQueryParam, TResponseRedux } from "@/type";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (args: TQueryParam[]) => {
        const params = new URLSearchParams();
        args.forEach((arg) => {
          if (Array.isArray(arg.value)) {
            arg.value.forEach((val) => params.append(arg.name, val.toString()));
          } else {
            params.append(arg.name, arg.value.toString());
          }
        });
        return {
          url: `/products`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
    }),
    updateProductById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
      invalidatesTags: ["Products"],
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response.data,
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductQuery,
  useGetProductDetailsQuery,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
} = productApi;
