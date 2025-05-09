import { useAppSelector } from "@/redux/hook";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function Dashboard() {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const isRootDashboard = location.pathname === "/dashboard";

  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          {isRootDashboard ? <DashboardHome /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}
