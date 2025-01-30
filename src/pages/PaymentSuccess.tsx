import { useLocation } from "react-router-dom";
import { useGetSingleOrderByOrderIdQuery } from "@/redux/features/admin/orderApi";

export default function PaymentSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  const {
    data: orders,
    isLoading,
    error,
  } = useGetSingleOrderByOrderIdQuery(orderId || "");

  console.log(orders);

  if (isLoading) return <div>Loading order details...</div>;
  if (error) return <div>Error loading order details</div>;

  return (
    <>
      {orders?.data?.map((order: any) => (
        <div key={order?._id} className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="mb-2">Order ID: {order?._id}</p>
            <p>Transaction ID: {order?.paymentInfo?.transactionId}</p>
            <p>Amount: ${order?.totalAmount}</p>
            <p className="mt-4">
              Your items will be processed and shipped soon.
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
