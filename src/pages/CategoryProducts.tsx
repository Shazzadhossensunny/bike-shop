import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";
import { TProduct } from "@/type";

export default function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetAllProductQuery([]);

  useEffect(() => {
    if (!isLoading && productsResponse?.data) {
      const decodedCategory = decodeURIComponent(
        categoryName || ""
      ).toLowerCase();
      const categoryProducts = productsResponse.data.filter(
        (product: TProduct) =>
          product.category.toLowerCase() === decodedCategory
      );
      setFilteredProducts(categoryProducts);
      setLoading(false);
    }
  }, [categoryName, productsResponse, isLoading]);

  if (isLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
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
            There was an error loading the products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {decodeURIComponent(categoryName || "")}
        </h1>
        <p className="text-gray-600">
          Showing {filteredProducts.length} products in this category
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h2>
          <p className="text-gray-600 mb-6">
            There are currently no products available in this category.
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
          {filteredProducts.map((product: TProduct) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg"
            >
              <Link to={`/product/${product._id}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `/api/placeholder/300/200?text=${encodeURIComponent(
                        product.name
                      )}`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.category}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.stock > 0 ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
