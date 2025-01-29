import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useAddProductMutation } from "@/redux/features/admin/productApi";
import { TResponse } from "@/type";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const productData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };
    try {
      const res = (await addProduct(productData)) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Product Create Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Create Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Product name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral">
              Brand Name
            </label>
            <input
              type="text"
              {...register("brand", { required: "Brand name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral">
              Price
            </label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral">
              Model
            </label>
            <input
              type="text"
              {...register("model", { required: "Model is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">
                {errors.model.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral">
              Stock
            </label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral">
              Image URL
            </label>
            <input
              type="text"
              {...register("image", { required: "Image URL is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message as string}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isLoading ? <LoadingSpinner /> : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
