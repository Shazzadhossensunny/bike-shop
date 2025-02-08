import { useLocation } from "react-router-dom";
import { useGetSingleOrderByOrderIdQuery } from "@/redux/features/admin/orderApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function PaymentSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  const {
    data: orders,
    isLoading,
    error,
  } = useGetSingleOrderByOrderIdQuery(orderId || "");

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success") {
      toast.success("Payment completed successfully!");
    }
  }, [searchParams]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-md mx-auto m-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center text-red-600 mb-2">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="font-semibold">Error</h3>
        </div>
        <p className="text-red-600">
          There was a problem loading your order details. Please contact support
          if this persists.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {orders?.map((order: any) => (
        <div key={order?._id} className="max-w-2xl mx-auto mb-5">
          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-green-50 p-6 text-center">
              <div className="mx-auto w-16 h-16 mb-4">
                <svg
                  className="w-full h-full text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-700">
                Payment Successful!
              </h2>
            </div>

            {/* Order Details */}
            <div className="p-6 mb-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-gray-600 font-medium">Order ID</span>
                  <span className="text-gray-800">{order?._id}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-gray-600 font-medium">
                    Transaction ID
                  </span>
                  <span className="text-gray-800">
                    {order?.paymentInfo?.transactionId}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-gray-600 font-medium">Amount Paid</span>
                  <span className="text-gray-800 font-semibold">
                    ৳{order?.totalAmount}
                  </span>
                </div>

                {/* Order Status */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    What's Next?
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Order confirmation email will be sent shortly
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Your order will be processed within 24 hours
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Tracking details will be provided once shipped
                    </li>
                  </ul>
                </div>

                {/* Back to Home Button */}
                <div className="mt-8 text-center">
                  <a
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Return to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
