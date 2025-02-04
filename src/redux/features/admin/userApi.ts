import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TUser } from "@/type";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/users`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Users"],
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: TResponseRedux<TUser>) => response.data,
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUserQuery, useDeleteUserByIdMutation } = userApi;
