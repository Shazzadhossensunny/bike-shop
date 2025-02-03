import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";

// Shared Components
import { Pagination } from "@/components/shared/Pagination";
import TableLoadingSppiner from "@/components/shared/TableLoadingSppiner";

// API Hook
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";
import AddToCartButton from "@/components/shared/AddToCartbutton";
import { TQueryParam } from "@/type";

export default function AdvancedProductList() {
  // State Management
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState<TQueryParam[]>([]);

  // Filter State
  const [filters, setFilters] = useState<{
    brand?: string[];
    category?: string[];
    minPrice?: number;
    maxPrice?: number;
  }>({});

  // Fetch Products with all filters
  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductQuery([
      { name: "page", value: currentPage.toString() },
      { name: "limit", value: pageSize.toString() },
      { name: "sort", value: "price" },
      { name: "searchTerm", value: searchTerm },
      ...params,
    ]);

  // Update query parameters when filters change
  useEffect(() => {
    const queryParams: TQueryParam[] = [];

    if (searchTerm) {
      queryParams.push({ name: "searchTerm", value: searchTerm });
    }

    // Brand filters
    filters.brand?.forEach((brand) =>
      queryParams.push({ name: "brand", value: brand })
    );

    // Category filters
    filters.category?.forEach((category) =>
      queryParams.push({ name: "category", value: category })
    );

    // Price range filters
    if (filters.minPrice !== undefined) {
      queryParams.push({ name: "minPrice", value: filters.minPrice });
    }
    if (filters.maxPrice !== undefined) {
      queryParams.push({ name: "maxPrice", value: filters.maxPrice });
    }

    // Reset to first page when filters change
    setCurrentPage(1);
    setParams(queryParams);
  }, [filters]);

  // Filter handlers
  const toggleFilter = (filterType: "brand" | "category", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType]?.includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...(prev[filterType] || []), value],
    }));
  };

  // Price range handler
  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numericValue = value ? Number(value) : undefined;
    setFilters((prev) => ({
      ...prev,
      [type === "min" ? "minPrice" : "maxPrice"]: numericValue,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Extract unique categories and brands
  const { availableCategories, availableBrands } = useMemo(() => {
    const categories = new Set<string>();
    const brands = new Set<string>();

    productsData?.data?.forEach((product) => {
      categories.add(product.category);
      brands.add(product.brand);
    });

    return {
      availableCategories: Array.from(categories),
      availableBrands: Array.from(brands),
    };
  }, [productsData?.data]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <FilterIcon className="h-6 w-6 mr-2 text-primary" />
              Filters
            </h2>
            <button
              onClick={resetFilters}
              className="text-sm text-primary hover:underline flex items-center"
            >
              <XIcon className="h-4 w-4 mr-1" /> Reset
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <label className="block text-neutral mb-2">Search Products</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, brand, or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md pl-10"
              />
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-neutral" />
            </div>
          </div>

          {/* Category Filter */}
          {availableCategories.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Categories</h3>
              {availableCategories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(filters.category || []).includes(category)}
                    onChange={() => toggleFilter("category", category)}
                    className="mr-2"
                  />
                  <label>{category}</label>
                </div>
              ))}
            </div>
          )}

          {/* Brands Filter */}
          {availableBrands.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Brands</h3>
              {availableBrands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(filters.brand || []).includes(brand)}
                    onChange={() => toggleFilter("brand", brand)}
                    className="mr-2"
                  />
                  <label>{brand}</label>
                </div>
              ))}
            </div>
          )}

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice ?? ""}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-1/2 p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice ?? ""}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-1/2 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {isProductLoading ? (
            <div className="flex justify-center items-center h-full">
              <TableLoadingSppiner />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsData?.data?.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-primary font-bold text-xl my-2">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="text-sm text-neutral">
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {product.brand}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link
                          to={`/product/${product?._id}`}
                          className="flex-1 text-center bg-primary text-white py-2 rounded hover:bg-blue-700"
                        >
                          Details
                        </Link>
                        <AddToCartButton product={product} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {productsData?.data?.length === 0 && (
                <div className="text-center py-8 text-neutral">
                  No products found matching your criteria
                </div>
              )}

              <Pagination
                current={currentPage}
                total={productsData?.meta?.total || 0}
                pageSize={pageSize}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
