import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useGetFeaturedProductsQuery } from "@/redux/features/admin/productApi";
import { TProduct } from "@/type";
import { formatUrl } from "@/utils/formatter";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch featured products from your backend
  const {
    data: featuredProducts,
    isLoading,
    isError,
  } = useGetFeaturedProductsQuery(undefined);

  // Create banner data from featured products
  const bannerData = useMemo(() => {
    if (!featuredProducts) return [];

    return featuredProducts.map((product: TProduct, index: number) => ({
      id: product._id,
      title: product.name,
      subtitle: product.description,
      buttonText: "View Details",
      buttonLink: `/product/${formatUrl(product._id)}`,
      image: product.image,
      bgColor:
        index % 3 === 0
          ? "from-blue-800 to-blue-600"
          : index % 3 === 1
          ? "from-purple-800 to-purple-600"
          : "from-emerald-800 to-emerald-600",
    }));
  }, [featuredProducts]);

  const nextSlide = () => {
    if (isAnimating || bannerData.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating || bannerData.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide(
      (prev) => (prev - 1 + bannerData.length) % bannerData.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (bannerData.length > 1) {
      const slideInterval = setInterval(nextSlide, 7000);
      return () => clearInterval(slideInterval);
    }
  }, [bannerData.length]);

  if (isLoading) {
    return (
      <div className="relative bg-gray-100 h-[500px] md:h-[600px] animate-pulse">
        <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between py-16 md:py-20">
          <div className="md:w-1/2 space-y-4">
            <div className="h-12 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-12 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="md:w-1/2 w-full h-64 md:h-96 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (isError || bannerData.length === 0) {
    return (
      <div className="relative bg-gray-100 h-[500px] md:h-[600px] flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-xl">Featured products coming soon!</p>
          <Link
            to="/products"
            className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white text-white overflow-hidden h-[500px] md:h-[600px]">
      {bannerData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full"
          }`}
        >
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90`}
          ></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between py-8 md:py-0">
            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left z-10 mb-8 md:mb-0 px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-lg">
                {slide.subtitle}
              </p>
              <Link
                to={slide.buttonLink}
                className="bg-white text-blue-700 font-medium px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-opacity-90 transition duration-300 inline-flex items-center group shadow-lg"
              >
                {slide.buttonText}
                <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Image Section - Improved */}
            <div className="md:w-1/2 h-64 md:h-full px-4 flex items-center justify-center">
              <div className="relative w-full h-64 md:h-96 lg:h-[450px] overflow-hidden rounded-xl">
                {/* Image container with proper sizing */}
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl z-10"></div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 z-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/api/placeholder/800/600?text=${encodeURIComponent(
                      slide.title
                    )}`;
                  }}
                />

                {/* Decorative elements around image */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full opacity-20 z-0"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-full opacity-20 z-0"></div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Improved */}
      {bannerData.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white z-20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white z-20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        </>
      )}

      {/* Dots Indicator - Improved */}
      {bannerData.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 w-3 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
