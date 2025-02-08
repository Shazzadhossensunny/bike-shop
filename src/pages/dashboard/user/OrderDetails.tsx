import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useGetSingleOrderByOrderIdQuery } from "@/redux/features/admin/orderApi";
import { ArrowLeft, Calendar, CreditCard, Package } from "lucide-react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();

  const { data: order, isLoading } = useGetSingleOrderByOrderIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base p-4 md:p-8">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Orders
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Order Header */}
        <div className="p-6 bg-primary text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Order Details</h1>
            <span
              className={`
          px-4 py-2 rounded-full text-sm font-medium
          ${order?.status === "pending" ? "bg-yellow-500" : "bg-green-500"}
        `}
            >
              {order?.status}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(order?.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>{order?.paymentStatus}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Order #{order?._id.slice(-8)}</span>
            </div>
          </div>
        </div>

        {/* Order Content */}
        <div className="p-6 space-y-6">
          {/* Products */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral">Products</h2>
            <div className="divide-y">
              {order?.products.map((product: any) => (
                <div
                  key={product._id}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium text-neutral">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-primary">
                    {product.price.toLocaleString()} Tk
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-600">Address</p>
                <p className="font-medium">{order?.shippingAddress.address}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">City</p>
                <p className="font-medium">{order?.shippingAddress.city}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Postal Code</p>
                <p className="font-medium">
                  {order?.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral">
              Payment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-600">Payment Method</p>
                <p className="font-medium capitalize">
                  {order?.paymentInfo.paymentMethod}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Transaction ID</p>
                <p className="font-medium">
                  {order?.paymentInfo.transactionId}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Currency</p>
                <p className="font-medium">{order?.paymentInfo.currency}</p>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="pt-6 border-t">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-neutral">Total Amount:</span>
              <span className="font-bold text-primary">
                {order?.totalAmount.toLocaleString()} Tk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
