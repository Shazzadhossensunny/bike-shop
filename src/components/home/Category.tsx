import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";
import { TProduct } from "@/type";
import { formatUrl } from "@/utils/formatter";

export default function CategoryCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Fetch all products
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetAllProductQuery([]);
  const products = productsResponse?.data || [];

  // Process categories from products
  const categories = useMemo(() => {
    const categoryMap = new Map<string, TProduct>();

    products.forEach((product: TProduct) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product);
      }
    });

    return Array.from(categoryMap, ([name, product]) => ({
      id: product._id,
      name,
      image: product.image,
      description: `Explore our ${name} collection`,
      link: `/category/${formatUrl(name)}`,
    }));
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;

      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkArrows = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkArrows);
      checkArrows();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkArrows);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 w-1/3 mb-10"></div>
            <div className="flex space-x-6 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[250px] bg-white rounded-xl p-4">
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 w-3/4"></div>
                    <div className="h-4 bg-gray-200 w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-red-500">
          Failed to load categories. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-neutral">Shop By Category</h2>
          <Link
            to="/allCategory"
            className="text-primary hover:underline font-medium flex items-center"
          >
            View All
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md z-10"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="h-6 w-6 text-neutral" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md z-10"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="h-6 w-6 text-neutral" />
            </button>
          )}

          <div
            ref={carouselRef}
            className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.length === 0 ? (
              <div className="text-center w-full py-8 text-gray-500">
                No categories found
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[250px] md:min-w-[280px] flex-shrink-0 snap-start"
                >
                  <Link
                    to={category.link}
                    className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `/public//placeholder-image.svg?text=${encodeURIComponent(
                            category.name
                          )}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <h3 className="text-white text-xl font-bold p-4 w-full">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                      <div className="mt-3 flex items-center text-primary font-medium">
                        <span>Explore</span>
                        <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
