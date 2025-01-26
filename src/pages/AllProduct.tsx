import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FilterIcon, SearchIcon } from "@heroicons/react/solid";

// Dummy product data (replace with actual API/Redux integration)
const PRODUCTS = [
  {
    id: "1",
    name: "Mountain Explorer Pro",
    brand: "RideMaster",
    category: "Mountain Bike",
    price: 1299.99,
    image: "/placeholder-bike-1.jpg",
    stock: 10,
  },
  {
    id: "2",
    name: "Urban Cruiser Elite",
    brand: "CityRide",
    category: "Urban Bike",
    price: 899.99,
    image: "/placeholder-bike-2.jpg",
    stock: 15,
  },
  // Add more products...
];

const CATEGORIES = [
  "Mountain Bike",
  "Urban Bike",
  "Road Bike",
  "Electric Bike",
];
const BRANDS = ["RideMaster", "CityRide", "VelocityX", "PowerPedal"];

export default function AllProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  const { register } = useForm();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesBrands =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return (
        matchesSearch && matchesCategories && matchesBrands && matchesPrice
      );
    });
  }, [searchTerm, selectedCategories, selectedBrands, priceRange]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FilterIcon className="h-6 w-6 mr-2 text-primary" />
            Filters
          </h2>

          {/* Search */}
          <div className="mb-4">
            <label className="block text-neutral mb-2">Search Bikes</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md pl-8"
              />
              <SearchIcon className="absolute left-2 top-3 h-5 w-5 text-neutral" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Categories</h3>
            {CATEGORIES.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="mr-2"
                />
                <span>{category}</span>
              </div>
            ))}
          </div>

          {/* Brand Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Brands</h3>
            {BRANDS.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="mr-2"
                />
                <span>{brand}</span>
              </div>
            ))}
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: Number(e.target.value),
                  }))
                }
                className="w-1/2 p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: Number(e.target.value),
                  }))
                }
                className="w-1/2 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-neutral">{product.name}</h3>
                  <p className="text-secondary font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-neutral">
                    {product.brand} | {product.category}
                  </p>

                  <div className="mt-4 flex space-x-2">
                    <Link
                      to={`/allProduct/${product.id}`}
                      className="flex-1 text-center bg-primary text-white py-2 rounded hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                    <button
                      disabled={product.stock === 0}
                      className={`flex-1 text-white py-2 rounded ${
                        product.stock > 0
                          ? "bg-accent hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-neutral py-8">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
