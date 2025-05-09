import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/customer/customerApi";
import {
  Users,
  ShoppingBag,
  CreditCard,
  Package,
  Calendar,
  Settings,
} from "lucide-react";
import { useGetMyOrdersQuery } from "@/redux/features/admin/orderApi";
import { TOrder } from "@/type/order.type";

const CustomerDashboard = () => {
  // Get the current user from redux state
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId || user?.userId || "";

  // Fetch user data
  const { data: userData } = useGetSingleUserQuery(userId);

  // Use the new myOrders endpoint
  const {
    data: ordersData,
    isLoading,
    isError,
  } = useGetMyOrdersQuery(undefined);

  const orders = ordersData || [];
  const recentOrders = orders.slice(0, 3); // Get 3 most recent orders
  const totalSpent = orders.reduce(
    (sum: any, order: any) => sum + (order.totalAmount || 0),
    0
  );

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">
        Error loading orders. Please try again.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 uppercase">
        Welcome, {userData?.name || user?.email || "Customer"}
      </h1>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 md:p-8 rounded-xl text-white mb-8 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Your BikeShop Dashboard
        </h2>
        <p className="mb-4">
          Check your orders and manage your account from this dashboard.
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Your Orders</h3>
              <p className="text-2xl font-bold mt-2">{orders.length}</p>
            </div>
            <div className="rounded-full p-3 bg-white/60 backdrop-blur-sm">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Total Spent</h3>
              <p className="text-2xl font-bold mt-2">
                ${totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full p-3 bg-white/60 backdrop-blur-sm">
              <CreditCard className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Account Status
              </h3>
              <p className="text-2xl font-bold mt-2">Active</p>
            </div>
            <div className="rounded-full p-3 bg-white/60 backdrop-blur-sm">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5 text-blue-600" />
          Recent Orders
        </h2>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Order ID</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Amount</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: TOrder) => (
                  <tr key={order._id}>
                    <td className="py-2 px-4 border-b">
                      {order._id.slice(-6)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${
                          order.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }
                        ${
                          order.status === "processing"
                            ? "bg-indigo-100 text-indigo-800"
                            : ""
                        }
                        ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                      `}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${order.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={`/dashboard/my-orders/${order._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            You haven't placed any orders yet.
          </p>
        )}
        {orders.length > 3 && (
          <div className="mt-4 text-right">
            <a
              href="/dashboard/my-orders"
              className="text-blue-600 hover:underline"
            >
              View all orders →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
