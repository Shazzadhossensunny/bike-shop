import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">BikeShop</h3>
          <p className="text-base-200">
            Your one-stop destination for premium bicycles and cycling gear.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-accent">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/shipping" className="hover:text-accent">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-accent">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-accent">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-accent">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-accent">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-accent">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-accent">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-accent">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-base-200 pt-4">
        <p>&copy; 2024 BikeShop. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
