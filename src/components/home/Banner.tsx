import { ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="relative bg-primary text-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ride Your Dream Bike
          </h1>
          <p className="text-xl mb-6">
            Discover premium bikes for every adventure. Quality, performance,
            and style.
          </p>
          <Link
            to="/products"
            className="bg-accent text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 inline-flex items-center"
          >
            Shop Now <ChevronRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <img
              src="https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Hero Bike"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
