import { useGetSingleOrderByOrderIdQuery } from "@/redux/features/admin/orderApi";
import { useParams } from "react-router-dom";
import {
  Package,
  MapPin,
  CreditCard,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import React from "react";

// Status configurations
const STATUS_CONFIG: Record<
  "pending" | "processing" | "confirmed" | "cancelled" | "delivered",
  { icon: React.FC<any>; color: string; bgColor: string }
> = {
  pending: {
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  processing: {
    icon: Truck,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  confirmed: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
};

export default function SingleOrderDetails() {
  const { id } = useParams();
  const { data: orderData, isLoading } = useGetSingleOrderByOrderIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const {
    paymentOrderId,
    products,
    totalAmount,
    status,
    paymentStatus,
    shippingAddress,
    paymentInfo,
    createdAt,
    user,
  } = orderData;

  const statusKey = status as keyof typeof STATUS_CONFIG;
  const StatusIcon = STATUS_CONFIG[statusKey]?.icon || Clock;
  const statusColor = STATUS_CONFIG[statusKey]?.color || "text-gray-500";
  const statusBgColor = STATUS_CONFIG[statusKey]?.bgColor || "bg-gray-100";

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to All Order
      </button>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Order Header */}
        <div className="bg-primary text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-sm">Order ID: {paymentOrderId}</p>
          </div>
          <div
            className={`flex items-center ${statusColor} ${statusBgColor} px-4 py-2 rounded-full`}
          >
            <StatusIcon className="mr-2" />
            <span className="font-semibold capitalize">{status}</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Customer Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Customer Information
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              <MapPin className="inline-block mr-2" /> Shipping Address
            </h2>
            <div className="space-y-2">
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.city}</p>
              <p>Postal Code: {shippingAddress.postalCode}</p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            <Package className="inline-block mr-2" /> Order Items
          </h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-center">Quantity</th>
                <th className="p-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product._id} className="border-b">
                  <td className="p-2">
                    <div className="flex items-center">
                      {/* <div className="mr-4">
                        <img
                          src={
                            product.productId.image ||
                            "/placeholder-product.png"
                          }
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div> */}
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.productId.brand}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-center">{product.quantity}</td>
                  <td className="p-2 text-right">
                    {product.price * product.quantity} Tk
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Information */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              <CreditCard className="inline-block mr-2" /> Payment Details
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Method:</strong> {paymentInfo.paymentMethod}
              </p>
              <p>
                <strong>Transaction ID:</strong> {paymentInfo.transactionId}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    paymentStatus === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {paymentStatus}
                </span>
              </p>
            </div>
          </div>

          {/* Order Totals */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <strong>{totalAmount} Tk</strong>
              </div>
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{format(new Date(createdAt), "PPP")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
