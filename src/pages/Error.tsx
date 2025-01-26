import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export default function ErrorPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <ExclamationCircleIcon className="h-24 w-24 text-secondary mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-neutral mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-neutral mb-6">
          Oops! The page you're looking for seems to have taken an unexpected
          detour.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Return to Home
          </Link>
          <Link
            to="/allProduct"
            className="bg-accent text-white px-6 py-3 rounded hover:bg-green-700"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
