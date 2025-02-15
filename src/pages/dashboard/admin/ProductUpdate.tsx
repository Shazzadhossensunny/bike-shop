import LoadingSpinner from "@/components/shared/LoadingSpinner";
import {
  useGetProductDetailsQuery,
  useUpdateProductByIdMutation,
} from "@/redux/features/admin/productApi";

import { TResponse } from "@/type";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ProductUpdate() {
  const { id } = useParams();
  const { data: products } = useGetProductDetailsQuery(id);

  console.log(products);
  const [updateProductById, { isLoading }] = useUpdateProductByIdMutation();
  const { register, handleSubmit } = useForm();
  // const findProductById = products?.data?.find((product) => product._id === id);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const productData = {
      id,
      price: Number(data.price),
      stock: Number(data.stock),
      data: { ...data },
    };
    try {
      const res = (await updateProductById(
        productData
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Product Update Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Update Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Product Name
            </label>
            <input
              defaultValue={products?.name}
              type="text"
              {...register("name")}
              className="
                pl-2
                pr-2
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Brand Name
            </label>
            <input
              defaultValue={products?.brand}
              type="text"
              {...register("brand")}
              className="
                pl-2
                pr-2
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Price
            </label>
            <input
              defaultValue={products?.price}
              type="number"
              {...register("price")}
              className="
                pl-2
                pr-2
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Model
            </label>
            <input
              defaultValue={products?.model}
              type="text"
              {...register("model")}
              className="
                pl-2
                pr-2
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Stock
            </label>
            <input
              defaultValue={products?.stock}
              type="number"
              {...register("stock")}
              className="
                pl-2
                pr-2
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Category
            </label>
            <input
              defaultValue={products?.category}
              type="text"
              {...register("category")}
              className="
                pl-2
                pr-2
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Description
            </label>
            <textarea
              defaultValue={products?.description}
              {...register("description")}
              className="
                pl-2
                pr-2
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">
              Image URL
            </label>
            <input
              defaultValue={products?.image}
              type="text"
              {...register("image")}
              className="
                pl-2
                pr-2
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isLoading ? <LoadingSpinner /> : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
