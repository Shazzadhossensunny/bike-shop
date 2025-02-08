import { ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import bannerImg from "../../../src/assets/banner.png";

export default function Banner() {
  return (
    <div className="relative bg-primary text-white py-16 md:py-20 px-4 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Ride Your Dream Bike
          </h1>
          <p className="text-base md:text-xl mb-6 opacity-90">
            Discover premium bikes for every adventure. Quality, performance,
            and style.
          </p>
          <Link
            to="/allProduct"
            className="bg-accent text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 inline-flex items-center group"
          >
            Shop Now
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative group flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg z-0"></div>
          <img
            src={bannerImg}
            alt="Hero Bike"
            className="w-full h-auto rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-300 z-10 relative"
          />
        </div>
      </div>
    </div>
  );
}
