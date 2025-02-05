import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  ChevronRightIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/features/auth/authSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const totalItems = useAppSelector((state) => state.cart.totalItems);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/");
  };

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

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-neutral hover:text-primary"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white
          rounded-full h-5 w-5 flex items-center justify-center text-xs"
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center text-neutral hover:text-primary focus:outline-none"
                >
                  <UserIcon className="h-6 w-6" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50">
                    <div className="p-4 border-b">
                      <p className="text-sm text-neutral">Logged in:</p>
                      <p className="text-lg font-semibold">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-neutral hover:bg-primary/10 hover:text-primary"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ChevronRightIcon className="h-5 w-5 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-neutral hover:bg-red-500 hover:text-white"
                      >
                        <LogoutIcon className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-neutral hover:text-primary px-3 py-2"
              >
                Login
              </Link>
            )}
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
                to="/allProduct"
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

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left text-neutral hover:bg-base block px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="text-neutral hover:bg-base block px-3 py-2 rounded-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
