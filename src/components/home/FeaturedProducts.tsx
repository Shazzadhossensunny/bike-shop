import { useGetFeaturedProductsQuery } from "@/redux/features/admin/productApi";
import { Link } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner";

export default function FeaturedProducts() {
  const { data: featuredProducts, isLoading } =
    useGetFeaturedProductsQuery(undefined);

  console.log(featuredProducts);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-neutral">
          Featured Bikes
        </h2>
        {isLoading ? (
          <div className="text-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-xl transition duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-4 rounded"
                  />
                  <h3 className="font-semibold text-neutral">{product.name}</h3>
                  <p className="text-secondary">
                    {product.price.toFixed(2)} Tk
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="mt-2 inline-block bg-primary text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/allProduct"
                className="bg-accent text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300"
              >
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
