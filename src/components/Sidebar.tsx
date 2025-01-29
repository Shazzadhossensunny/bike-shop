import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  PlusCircle,
  ClipboardList,
  FileCheck,
  Users,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [isActive, setActive] = useState(true); // Changed initial state to true
  const role = useAppSelector((state) => state.auth.name?.role);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-base flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <span className="text-base text-xl font-bold">BikeShop</span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none hover:bg-primary/80 text-base transition-colors duration-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-primary to-primary/90 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        {/* Mobile Logo - Only visible on small screens */}
        <div className="md:hidden">
          <div className="flex px-4 py-3 shadow-lg rounded-lg justify-center items-center bg-base/10 mx-auto backdrop-blur-sm">
            <Link
              to="/"
              className="text-2xl font-bold text-base flex items-center gap-2"
            >
              <Home className="w-6 h-6" />
              BikeShop
            </Link>
          </div>
        </div>

        <div>
          {/* Desktop Logo - Hidden on small screens */}
          <div>
            <div className="w-full hidden md:flex px-4 py-3 shadow-lg rounded-lg justify-center items-center bg-base/10 mx-auto backdrop-blur-sm">
              <Link
                to="/"
                className="text-2xl lg:text-3xl font-bold text-base flex items-center gap-2"
              >
                <Home className="w-6 h-6" />
                BikeShop
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-8">
            <nav>
              {/* customer */}
              {role === "customer" && (
                <>
                  <NavLink
                    to="/dashboard/addContest"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-lg hover:bg-base/20 group ${
                        isActive
                          ? "bg-base/20 text-base scale-105"
                          : "text-base/80"
                      }`
                    }
                  >
                    <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="mx-4 font-medium">Add Contest</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/myCreatedContest"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-lg hover:bg-base/20 group ${
                        isActive
                          ? "bg-base/20 text-base scale-105"
                          : "text-base/80"
                      }`
                    }
                  >
                    <ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="mx-4 font-medium">My Created Contest</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/contestSubmitted"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-lg hover:bg-base/20 group ${
                        isActive
                          ? "bg-base/20 text-base scale-105"
                          : "text-base/80"
                      }`
                    }
                  >
                    <FileCheck className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="mx-4 font-medium">Contest Submitted</span>
                  </NavLink>
                </>
              )}

              {/* Admin */}
              {role === "admin" && (
                <>
                  <NavLink
                    to="/dashboard/add-product"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-lg hover:bg-base/20 group ${
                        isActive
                          ? "bg-base/20 text-base scale-105"
                          : "text-base/80"
                      }`
                    }
                  >
                    <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="mx-4 font-medium">Add Product</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/products"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-lg hover:bg-base/20 group ${
                        isActive
                          ? "bg-base/20 text-base scale-105"
                          : "text-base/80"
                      }`
                    }
                  >
                    <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="mx-4 font-medium">All Product</span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-base/10 rounded-lg backdrop-blur-sm">
          <p className="text-base/80 text-sm text-center">
            © 2025 BikeShop. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
