import { useGetAllOrdersQuery } from "@/redux/features/admin/orderApi";
import { Link } from "react-router-dom";
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  ExternalLink,
  Trash2,
} from "lucide-react";

const MyOrders = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-neutral mb-6">
        My Orders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders?.data?.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Order Header */}
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span className="font-semibold">
                  Order #{order._id.slice(-8)}
                </span>
              </div>
              <span
                className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${order.status === "pending" ? "bg-yellow-500" : "bg-green-500"}
              `}
              >
                {order.status}
              </span>
            </div>

            {/* Order Content */}
            <div className="p-4 space-y-4">
              {/* Products */}
              <div className="space-y-2">
                {order.products.map((product: any) => (
                  <div
                    key={product._id}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium text-neutral">
                      {product.name}
                    </span>
                    <span className="text-sm">x{product.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{order.shippingAddress.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span
                    className={`
                    ${
                      order.paymentStatus === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                    font-medium
                  `}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold text-neutral">
                  Total Amount:
                </span>
                <span className="text-lg font-bold text-primary">
                  ৳{order.totalAmount.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4">
                <Link
                  to={`${order._id}`}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </Link>
                {order.status === "pending" && (
                  <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
