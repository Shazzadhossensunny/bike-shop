import { useAppSelector } from "@/redux/hook";
import { USER_ROLE } from "@/constants/user";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import AdminDashboard from "./admin/AdminDashboard";
import CustomerDashboard from "./user/CustomerDashboard";

const DashboardHome = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {user.role === USER_ROLE.admin ? (
        <AdminDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </div>
  );
};

export default DashboardHome;
