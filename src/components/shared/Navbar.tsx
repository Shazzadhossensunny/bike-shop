import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";
import { TProduct } from "@/type";

type TCategory = {
  name: string;
  image: string;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token, email } = useAppSelector((state) => state.auth);
  const totalItems = useAppSelector((state) => state.cart.totalItems);

  // Fetch all products
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetAllProductQuery([]);
  const products = productsResponse?.data || [];

  // Process categories from products
  const categories = useMemo(() => {
    const categoryMap = new Map<string, string>();
    products.forEach((product: TProduct) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product.image);
      }
    });
    return Array.from(categoryMap, ([name, image]) => ({ name, image }));
  }, [products]);

  // Fallback categories if needed
  const fallbackCategories: TCategory[] = [
    { name: "Road Bikes", image: "/api/placeholder/200/150?text=Road%20Bikes" },
    {
      name: "Mountain Bikes",
      image: "/api/placeholder/200/150?text=Mountain%20Bikes",
    },
    {
      name: "Urban Bikes",
      image: "/api/placeholder/200/150?text=Urban%20Bikes",
    },
    { name: "E-Bikes", image: "/api/placeholder/200/150?text=E-Bikes" },
  ];

  const displayCategories =
    categories.length > 0 ? categories : fallbackCategories;

  // Menu handlers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMenus = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    setActiveMegaMenu(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenus();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleMegaMenuToggle = (index: number) => {
    setActiveMegaMenu(activeMegaMenu === index ? null : index);
  };

  // Reset user menu when route changes
  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global click handler to close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isUserMenuClick = target.closest(".user-menu-container");
      const isMegaMenuClick =
        target.closest(".mega-menu-container") ||
        target.closest(".mega-menu-trigger");

      if (!isUserMenuClick && isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }

      if (!isMegaMenuClick && activeMegaMenu !== null) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserMenuOpen, activeMegaMenu]);

  return (
    <nav
      className={`${
        isScrolled
          ? "bg-white shadow-lg fixed top-0 left-0 right-0 z-50"
          : "bg-white shadow-md relative"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-primary"
          >
            BikeShop
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              to="/cart"
              className="relative text-neutral hover:text-primary"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-neutral hover:text-primary"
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
            <Link
              to="/"
              className="px-3 py-2 text-neutral hover:text-primary transition-colors"
            >
              Home
            </Link>

            {/* Products Mega Menu */}
            <div className="relative mega-menu-container">
              <button
                onClick={() => handleMegaMenuToggle(0)}
                className="flex items-center px-3 py-2 text-neutral hover:text-primary mega-menu-trigger"
              >
                Products
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>

              {activeMegaMenu === 0 && (
                <div className="absolute left-0 mt-2 w-screen max-w-7xl bg-white border rounded-lg shadow-lg z-50 transform -translate-x-1/4">
                  {isLoading ? (
                    <div className="p-6 text-center">Loading categories...</div>
                  ) : isError ? (
                    <div className="p-6 text-center text-red-500">
                      Error loading categories
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                        {displayCategories.map((category, index) => (
                          <div key={index} className="space-y-4">
                            <Link
                              to={`/category/${encodeURIComponent(
                                category.name.toLowerCase()
                              )}`}
                              className="block group"
                              onClick={() => setActiveMegaMenu(null)}
                            >
                              <div className="relative overflow-hidden rounded-md h-40">
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `/api/placeholder/200/150?text=${encodeURIComponent(
                                      category.name
                                    )}`;
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                                  <h3 className="text-lg font-semibold text-white">
                                    {category.name}
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-4 text-center">
                        <Link
                          to="/allProduct"
                          className="text-primary hover:underline font-medium"
                          onClick={() => setActiveMegaMenu(null)}
                        >
                          View All Products
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Other Links */}
            <Link
              to="/about"
              className="px-3 py-2 text-neutral hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-neutral hover:text-primary"
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
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {token ? (
              <div className="relative user-menu-container">
                <button
                  onClick={toggleUserMenu}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <UserIcon className="h-6 w-6" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b bg-gray-50">
                      <p className="font-semibold truncate">{email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                        onClick={closeMenus}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-left hover:bg-red-100 text-red-600"
                      >
                        <LogoutIcon className="h-5 w-5 mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 text-neutral hover:text-primary"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {token && (
                <div className="px-3 py-2 border-b">
                  <p className="font-semibold truncate">{email}</p>
                </div>
              )}

              <Link
                to="/"
                onClick={closeMenus}
                className="block px-3 py-2 hover:bg-gray-100"
              >
                Home
              </Link>

              <div className="space-y-1">
                <div className="px-3 py-2 font-medium">Products</div>
                {displayCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${encodeURIComponent(
                      category.name.toLowerCase()
                    )}`}
                    onClick={closeMenus}
                    className="flex items-center px-3 py-2 pl-6 hover:bg-gray-100"
                  >
                    <img
                      src={category.image}
                      alt=""
                      className="w-8 h-8 object-cover rounded-md mr-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/api/placeholder/200/150?text=${encodeURIComponent(
                          category.name
                        )}`;
                      }}
                    />
                    {category.name}
                  </Link>
                ))}
                <Link
                  to="/allProduct"
                  onClick={closeMenus}
                  className="px-3 py-2 pl-6 text-primary font-medium"
                >
                  View All Products
                </Link>
              </div>

              <Link
                to="/about"
                onClick={closeMenus}
                className="block px-3 py-2 hover:bg-gray-100"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={closeMenus}
                className="block px-3 py-2 hover:bg-gray-100"
              >
                Contact
              </Link>

              {token ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenus}
                    className="block px-3 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left hover:bg-red-100 text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="block px-3 py-2 hover:bg-gray-100"
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
