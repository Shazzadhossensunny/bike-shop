import { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/admin/orderApi";
import { Pagination } from "@/components/shared/Pagination";
import TableLoadingSpinner from "@/components/shared/TableLoadingSppiner";
import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TResponse } from "@/type";

type TStatus = "pending" | "initiated" | "completed" | "failed";

// Status color mapping
const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  initiated: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

const ORDER_STATUS_OPTIONS = [
  { value: "pending", label: "🕒 Pending" },
  { value: "processing", label: "🚚 Processing" },
  { value: "confirmed", label: "✅ Confirmed" },
  { value: "cancelled", label: "❌ Cancelled" },
  { value: "delivered", label: "📦 Delivered" },
];

export default function AdminOrderManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Queries and Mutations
  const {
    data: ordersData,
    refetch,
    isLoading,
  } = useGetAllOrdersQuery([
    { name: "page", value: currentPage.toString() },
    { name: "limit", value: pageSize.toString() },
    { name: "sort", value: "-createdAt" },
  ]);

  const metaData = ordersData?.meta;

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  // Handler for updating order status
  const handleStatusChange = async (id: string, status: string) => {
    const statusData = {
      id,
      status,
    };
    try {
      const res = (await updateOrderStatus(statusData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message || "Failed to update order status");
      } else {
        toast.success(`Order status updated to ${status}`);
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  //   Handler for deleting an order
  const handleDeleteOrder = async (id: string) => {
    try {
      const res = await deleteOrder(id).unwrap();
      if (res.error) {
        toast.error(res.error.data.message || "Failed to delete");
      } else {
        toast.success("Order deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // Pagination handler
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  //   Render status badge
  const renderStatusBadge = (status: TStatus) => {
    const color = STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        Order Management
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Order Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <TableLoadingSpinner />
                </td>
              </tr>
            ) : (
              ordersData?.data?.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium">{order.paymentOrderId}</td>
                  <td className="p-3">{order.user.name}</td>
                  <td className="p-3">{order.totalAmount} BDT</td>
                  <td className="p-3">
                    {renderStatusBadge(order.paymentStatus as TStatus)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded"
                      >
                        {ORDER_STATUS_OPTIONS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="p-3 flex justify-center space-x-2">
                    <Link
                      to={`${order._id}`}
                      className="text-blue-500 hover:text-blue-700"
                      title="View Order Details"
                    >
                      <Eye size={20} />
                    </Link>
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Order"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && (
        <Pagination
          current={currentPage}
          total={metaData?.total || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}
