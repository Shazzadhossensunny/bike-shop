import { baseApi } from "@/redux/api/baseApi";
// import { TQueryParam, TResponseRedux } from "@/type";

const courseApi = baseApi.injectEndpoints({
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
  }),
});

export const { useRegisterUserMutation } = courseApi;
