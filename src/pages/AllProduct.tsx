import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FilterIcon, SearchIcon, XIcon, ImageOff } from "lucide-react";

import { Pagination } from "@/components/shared/Pagination";
import TableLoadingSppiner from "@/components/shared/TableLoadingSppiner";
import AddToCartButton from "@/components/shared/AddToCartbutton";
import { TProduct, TQueryParam } from "@/type";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";

export default function AdvancedProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState<TQueryParam[]>([]);

  // Updated filters state - removed inStock from API params
  const [filters, setFilters] = useState<{
    brand?: string[];
    category?: string[];
    model?: string[];
    minPrice?: number;
    maxPrice?: number;
    showInStockOnly?: boolean;
  }>({});

  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductQuery([
      { name: "page", value: currentPage.toString() },
      { name: "limit", value: pageSize.toString() },
      { name: "sort", value: "price" },
      { name: "searchTerm", value: searchTerm },
      ...params,
    ]);

  // Filter products on the frontend
  const filteredProducts = useMemo(() => {
    if (!productsData?.data) return [];

    let filtered = [...productsData.data];

    // Apply in-stock filter if enabled
    if (filters.showInStockOnly) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    return filtered;
  }, [productsData?.data, filters.showInStockOnly]);

  useEffect(() => {
    const queryParams: TQueryParam[] = [];

    if (searchTerm) {
      queryParams.push({ name: "searchTerm", value: searchTerm });
    }

    filters.brand?.forEach((brand) =>
      queryParams.push({ name: "brand", value: brand })
    );
    filters.category?.forEach((category) =>
      queryParams.push({ name: "category", value: category })
    );
    filters.model?.forEach((model) =>
      queryParams.push({ name: "model", value: model })
    );

    if (filters.minPrice !== undefined) {
      queryParams.push({ name: "minPrice", value: filters.minPrice });
    }
    if (filters.maxPrice !== undefined) {
      queryParams.push({ name: "maxPrice", value: filters.maxPrice });
    }

    setCurrentPage(1);
    setParams(queryParams);
  }, [filters]);

  const toggleFilter = (
    filterType: "brand" | "category" | "model",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType]?.includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...(prev[filterType] || []), value],
    }));
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numericValue = value ? Number(value) : undefined;
    setFilters((prev) => ({
      ...prev,
      [type === "min" ? "minPrice" : "maxPrice"]: numericValue,
    }));
  };

  const toggleStockFilter = () => {
    setFilters((prev) => ({
      ...prev,
      showInStockOnly: !prev.showInStockOnly,
    }));
  };

  const resetFilters = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
  };

  const { availableCategories, availableBrands, availableModels } =
    useMemo(() => {
      const categories = new Set<string>();
      const brands = new Set<string>();
      const models = new Set<string>();

      productsData?.data?.forEach((product: TProduct) => {
        categories.add(product.category);
        brands.add(product.brand);
        if (product.model) models.add(product.model);
      });

      return {
        availableCategories: Array.from(categories),
        availableBrands: Array.from(brands),
        availableModels: Array.from(models),
      };
    }, [productsData?.data]);

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <FilterIcon className="h-6 w-6 mr-2 text-blue-600" />
              Filters
            </h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              <XIcon className="h-4 w-4 mr-1" /> Reset
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Search Products</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, brand, or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Availability Filter */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={filters.showInStockOnly}
                onChange={toggleStockFilter}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <label className="text-gray-700">Show In Stock Only</label>
            </div>
          </div>

          {/* Rest of the filters remain the same */}
          {/* Model Filter */}
          {availableModels.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-700">Models</h3>
              <div className="max-h-40 overflow-y-auto">
                {availableModels.map((model) => (
                  <div key={model} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={(filters.model || []).includes(model)}
                      onChange={() => toggleFilter("model", model)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <label className="text-gray-600">{model}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          {availableCategories.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-700">Categories</h3>
              <div className="max-h-40 overflow-y-auto">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={(filters.category || []).includes(category)}
                      onChange={() => toggleFilter("category", category)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <label className="text-gray-600">{category}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Brands Filter */}
          {availableBrands.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-700">Brands</h3>
              <div className="max-h-40 overflow-y-auto">
                {availableBrands.map((brand) => (
                  <div key={brand} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={(filters.brand || []).includes(brand)}
                      onChange={() => toggleFilter("brand", brand)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <label className="text-gray-600">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Price Range</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice ?? ""}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice ?? ""}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-3/4">
          {isProductLoading ? (
            <div className="flex justify-center items-center h-96">
              <TableLoadingSppiner />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-bottom"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-image.svg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <ImageOff className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      {product.stock <= 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.model}
                      </p>
                      <p className="text-blue-600 font-bold text-xl mb-3">
                        {product.price.toFixed(2)} Tk
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-600">
                          {product.brand}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-600">
                          {product.category}
                        </span>
                        {product.stock > 0 && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            {product.stock} in stock
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${product._id}`}
                          className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                        {product.stock > 0 && (
                          <AddToCartButton product={product} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <ImageOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    No products found matching your criteria
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              <div className="mt-8">
                <Pagination
                  current={currentPage}
                  total={productsData?.meta?.total || 0}
                  pageSize={pageSize}
                  onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
