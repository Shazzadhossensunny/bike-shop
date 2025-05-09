import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";

interface CategoryWithImage {
  name: string;
  image: string;
}
export default function Category() {
  const [categories, setCategories] = useState<CategoryWithImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Use the existing query to get all products
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetAllProductQuery([]);

  // Extract unique categories from products data
  useEffect(() => {
    if (!isLoading && productsResponse?.data) {
      const categoryMap = new Map<string, string>();

      productsResponse.data.forEach((product: any) => {
        if (!categoryMap.has(product.category)) {
          categoryMap.set(product.category, product.image);
        }
      });

      const sortedCategories = Array.from(categoryMap)
        .map(([name, image]) => ({ name, image }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCategories(sortedCategories);
      setLoading(false);
    }
  }, [productsResponse, isLoading]);

  // Updated category image function to match the one used in CategoryProducts
  //   const getCategoryImage = (category: string) => {
  //     // Using the same placeholder approach as in your CategoryProducts component
  //     return `/src/components/home/Category.tsx?text=${encodeURIComponent(
  //       category
  //     )}`;
  //   };

  if (isLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 p-4 rounded-md">
          <h2 className="text-red-700 text-lg font-semibold">Error</h2>
          <p className="text-red-600">
            There was an error loading the categories. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Browse Categories
      </h1>

      {categories.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No categories found
          </h2>
          <p className="text-gray-600 mb-6">
            There are currently no product categories available.
          </p>
          <Link
            to="/allProduct"
            className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
          >
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                        category.name
                      )}`;
                    }}
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <div className="inline-block bg-primary text-white px-4 py-2 rounded-md mt-2 group-hover:bg-primary-dark transition">
                    Browse Products
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
