import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";
import { formatUrl } from "@/utils/formatter";

// Popular motorcycle brands
const popularBrands = [
  {
    name: "Honda",
    logo: "/api/placeholder/150/80?text=Honda",
    description:
      "Known for reliability and innovation in motorcycles for over 70 years.",
  },
  {
    name: "Yamaha",
    logo: "/api/placeholder/150/80?text=Yamaha",
    description: "Renowned for performance motorcycles and racing excellence.",
  },
  {
    name: "Kawasaki",
    logo: "/api/placeholder/150/80?text=Kawasaki",
    description:
      "Leaders in high-performance sports bikes and cutting-edge technology.",
  },
  {
    name: "Suzuki",
    logo: "/api/placeholder/150/80?text=Suzuki",
    description: "Creators of versatile motorcycles for every type of rider.",
  },
  {
    name: "Harley-Davidson",
    logo: "/api/placeholder/150/80?text=Harley-Davidson",
    description: "American icon representing freedom and the open road.",
  },
  {
    name: "Ducati",
    logo: "/api/placeholder/150/80?text=Ducati",
    description:
      "Italian craftsmanship and racing heritage in every motorcycle.",
  },
  {
    name: "BMW",
    logo: "/api/placeholder/150/80?text=BMW",
    description: "German engineering excellence for premium motorcycles.",
  },
  {
    name: "Triumph",
    logo: "/api/placeholder/150/80?text=Triumph",
    description: "British legacy of style and performance since 1902.",
  },
];

export default function BrandShowcase() {
  // Get all products to extract actual brands we have
  const { data: productsResponse } = useGetAllProductQuery([]);
  const products = productsResponse?.data || [];

  // Extract unique brands from our products
  const availableBrands =
    products.length > 0
      ? Array.from(new Set(products.map((p) => p.brand)))
      : [];

  // Filter popular brands to only show ones we have products for,
  // or show all popular brands if we don't have any products yet
  const brandsToShow =
    availableBrands.length > 0
      ? popularBrands.filter((brand) => availableBrands.includes(brand.name))
      : popularBrands;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral mb-4">
            Premium Motorcycle Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the world's finest motorcycle brands, each with their own
            unique heritage, innovation, and engineering excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {brandsToShow.map((brand) => (
            <Link
              key={brand.name}
              to={`/brands/${formatUrl(brand.name)}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
                <div className="w-full h-16 flex items-center justify-center mb-4">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-neutral mb-2">
                  {brand.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {brand.description}
                </p>
                <span className="text-primary font-medium text-sm">
                  View {brand.name} Models
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center">
            <div className="h-px bg-gray-300 w-16"></div>
            <p className="mx-4 text-gray-500 font-medium text-sm uppercase tracking-wider">
              Riding Excellence Since 2010
            </p>
            <div className="h-px bg-gray-300 w-16"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
