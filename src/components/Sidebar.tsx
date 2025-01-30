import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  FileCheck,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
  Package,
} from "lucide-react";

export default function Sidebar() {
  const [isActive, setActive] = useState(true);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
  const role = useAppSelector((state) => state.auth.name?.role);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <span className="text-white text-xl font-bold">BikeShop</span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none hover:bg-primary/80 text-white transition-colors duration-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-primary to-primary/90 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        {/* Logo */}
        <div className="w-full hidden md:flex px-4 py-3 shadow-lg rounded-lg justify-center items-center bg-white/10 mx-auto backdrop-blur-sm">
          <Link
            to="/"
            className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-2"
          >
            <Home className="w-6 h-6" />
            BikeShop
          </Link>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col justify-between flex-1 mt-8">
          <nav>
            {/* Customer Navigation */}
            {role === "customer" && (
              <>
                <NavLink
                  to="/dashboard/my-orders"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-lg hover:bg-white/20 group ${
                      isActive
                        ? "bg-white/20 text-white scale-105"
                        : "text-white/80"
                    }`
                  }
                >
                  <FileCheck className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="mx-4 font-medium">My Orders</span>
                </NavLink>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-lg hover:bg-white/20 group ${
                      isActive
                        ? "bg-white/20 text-white scale-105"
                        : "text-white/80"
                    }`
                  }
                >
                  <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="mx-4 font-medium">Profile</span>
                </NavLink>
              </>
            )}
            {/* Admin Section */}
            {role === "admin" && (
              <>
                {/* User Management Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center px-4 py-3 my-2 w-full text-left transition-all duration-300 transform rounded-lg hover:bg-white/20 group text-white/80 hover:text-white"
                  >
                    <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="mx-4 font-medium">User Management</span>
                    {isUserDropdownOpen ? (
                      <ChevronUp className="ml-auto w-5 h-5" />
                    ) : (
                      <ChevronDown className="ml-auto w-5 h-5" />
                    )}
                  </button>
                  {isUserDropdownOpen && (
                    <div className="ml-8 space-y-2">
                      <NavLink
                        to="/dashboard/all-users"
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 ${
                            isActive
                              ? "bg-white/20 text-white scale-105"
                              : "text-white/80"
                          }`
                        }
                      >
                        All Users
                      </NavLink>
                      <NavLink
                        to="/dashboard/delete-user"
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 ${
                            isActive
                              ? "bg-white/20 text-white scale-105"
                              : "text-white/80"
                          }`
                        }
                      >
                        Delete User
                      </NavLink>
                    </div>
                  )}
                </div>

                {/* Product Management Dropdown */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setProductDropdownOpen(!isProductDropdownOpen)
                    }
                    className="flex items-center px-4 py-3 my-2 w-full text-left transition-all duration-300 transform rounded-lg hover:bg-white/20 group text-white/80 hover:text-white"
                  >
                    <Package className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="mx-4 font-medium">Product Management</span>
                    {isProductDropdownOpen ? (
                      <ChevronUp className="ml-auto w-5 h-5" />
                    ) : (
                      <ChevronDown className="ml-auto w-5 h-5" />
                    )}
                  </button>
                  {isProductDropdownOpen && (
                    <div className="ml-8 space-y-2">
                      <NavLink
                        to="/dashboard/add-product"
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 ${
                            isActive
                              ? "bg-white/20 text-white scale-105"
                              : "text-white/80"
                          }`
                        }
                      >
                        Add Product
                      </NavLink>
                      <NavLink
                        to="/dashboard/products"
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 ${
                            isActive
                              ? "bg-white/20 text-white scale-105"
                              : "text-white/80"
                          }`
                        }
                      >
                        All Products
                      </NavLink>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-white/80 text-sm text-center">
            © 2025 BikeShop. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
