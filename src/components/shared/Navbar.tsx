import { Link } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              BikeShop
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral hover:text-primary"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-neutral hover:text-primary px-3 py-2">
              Home
            </Link>
            <Link
              to="/allProduct"
              className="text-neutral hover:text-primary px-3 py-2"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-neutral hover:text-primary px-3 py-2"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-neutral hover:text-primary px-3 py-2"
            >
              Contact
            </Link>

            {/* Cart and User Icons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className="relative text-neutral hover:text-primary"
              >
                <ShoppingCartIcon className="h-6 w-6" />

                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs"></span>
              </Link>

              <div className="relative group">
                <UserIcon className="h-6 w-6 text-neutral hover:text-primary" />
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:block">
                  <Link to="#" className="block px-4 py-2 hover:bg-base"></Link>
                  {/* <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-base"
                    >
                      Logout
                    </button> */}
                </div>
              </div>

              <Link to="/login" className="text-neutral hover:text-primary">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                onClick={toggleMenu}
                className="text-neutral hover:bg-base block px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={toggleMenu}
                className="text-neutral hover:bg-base block px-3 py-2 rounded-md"
              >
                Products
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="text-neutral hover:bg-base block px-3 py-2 rounded-md"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="text-neutral hover:bg-base block px-3 py-2 rounded-md"
              >
                Contact
              </Link>

              {/* Mobile Authentication Links */}

              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="text-neutral hover:bg-base block px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="text-neutral hover:bg-base block px-3 py-2 rounded-md"
                >
                  Register
                </Link>
              </>

              <>
                <Link
                  to="#"
                  onClick={toggleMenu}
                  className="text-neutral hover:bg-base block px-3 py-2 rounded-md"
                >
                  {/* {user?.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'} */}
                </Link>
                <button
                  onClick={() => {
                    //   handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left text-neutral hover:bg-base block px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
