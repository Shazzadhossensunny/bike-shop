import { Link } from "react-router-dom";

// Dummy product data (replace with actual API call)
const featuredProducts = [
  {
    id: "1",
    name: "Mountain Explorer Pro",
    brand: "RideMaster",
    price: 1299.99,
    image: "/placeholder-bike-1.jpg",
    category: "Mountain Bike",
  },
  {
    id: "2",
    name: "Urban Cruiser Elite",
    brand: "CityRide",
    price: 899.99,
    image: "/placeholder-bike-2.jpg",
    category: "Urban Bike",
  },
  {
    id: "3",
    name: "Speed Racer Carbon",
    brand: "VelocityX",
    price: 2499.99,
    image: "/placeholder-bike-3.jpg",
    category: "Road Bike",
  },
  {
    id: "4",
    name: "Electric Glide 500",
    brand: "PowerPedal",
    price: 1799.99,
    image: "/placeholder-bike-4.jpg",
    category: "Electric Bike",
  },
  {
    id: "5",
    name: "Trail Blazer Extreme",
    brand: "AdventureCycle",
    price: 1599.99,
    image: "/placeholder-bike-5.jpg",
    category: "Mountain Bike",
  },
  {
    id: "6",
    name: "Commuter Pro X",
    brand: "UrbanMobility",
    price: 1099.99,
    image: "/placeholder-bike-6.jpg",
    category: "Urban Bike",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-neutral">
          Featured Bikes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-xl transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="font-semibold text-neutral">{product.name}</h3>
              <p className="text-secondary">${product.price.toFixed(2)}</p>
              <Link
                to={`/product/${product.id}`}
                className="mt-2 inline-block bg-primary text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="bg-accent text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
