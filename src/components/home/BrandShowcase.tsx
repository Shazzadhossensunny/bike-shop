import { Link } from "react-router-dom";
import { formatUrl } from "@/utils/formatter";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";

export default function BrandShowcase() {
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetAllProductQuery([]);
  const products = productsResponse?.data || [];

  console.log(products);

  const brandCounts = products.reduce(
    (acc: Record<string, number>, product) => {
      const brand = product.brand;
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    },
    {}
  );

  const brandData = Object.entries(brandCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral mb-4">
            Our Featured Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of premium motorcycle brands, each offering
            unique riding experiences
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 w-3/4 mb-2 mx-auto"></div>
                <div className="h-4 bg-gray-200 w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Failed to load brand data. Please try again later.
          </div>
        ) : brandData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Brand information is coming soon!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brandData.map((brand) => {
              const brandProduct = products.find((p) => p.brand === brand.name);
              const imageUrl = brandProduct?.image || "/placeholder-brand.jpg";

              return (
                <Link
                  key={brand.name}
                  to={`/brands/${formatUrl(brand.name)}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
                    <div className="w-full h-48 mb-4 relative overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={`${brand.name} motorcycle`}
                        className="w-full h-full object-cover opacity-80"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-brand.jpg";
                          target.classList.remove("opacity-80");
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg px-4 py-2 rounded">
                          {brand.name}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-600 text-sm mb-1">
                        {brand.count} {brand.count === 1 ? "model" : "models"}{" "}
                        available
                      </p>
                      <span className="text-primary font-medium">
                        Browse Collection
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/product"
            className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors duration-300"
          >
            View All Motorcycles
          </Link>
        </div>
      </div>
    </section>
  );
}
