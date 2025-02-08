import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="bg-secondary text-white py-16 px-4">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Find Your Perfect Ride?
        </h2>
        <p className="text-xl mb-8">
          Explore our wide range of bikes and start your cycling adventure
          today!
        </p>
        <Link
          to="/allProduct"
          className="bg-primary text-white px-8 py-4 rounded-full text-lg hover:bg-blue-700 transition duration-300"
        >
          Browse Bikes
        </Link>
      </div>
    </section>
  );
}
