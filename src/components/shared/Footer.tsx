import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral text-white py-12 px-4">
      <div className="container px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
              <Link to="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allProduct"
                className="hover:text-accent transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <FaPhone className="text-accent" />
              <span className="text-base-200 hover:text-accent transition-colors">
                +1 (234) 567-8900
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-accent" />
              <a
                href="mailto:info@bikeshop.com"
                className="text-base-200 hover:text-accent transition-colors"
              >
                info@bikeshop.com
              </a>
            </li>
            <li className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-accent mt-1" />
              <span className="text-base-200">
                123 Bike Street,
                <br />
                Cycling City, CC 12345
              </span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-2xl hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Additional Contact Info */}
          <div className="mt-4">
            <h5 className="font-semibold mb-2">Business Hours</h5>
            <p className="text-base-200">
              Mon - Fri: 9:00 AM - 6:00 PM
              <br />
              Sat: 10:00 AM - 4:00 PM
              <br />
              Sun: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-base-200 pt-4">
        <p>&copy; 2025 BikeShop. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
