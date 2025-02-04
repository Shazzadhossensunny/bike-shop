import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toast } from "react-hot-toast";
import {
  useCreateOrderMutation,
  useInitiatePaymentMutation,
} from "@/redux/features/customer/customerApi";
import { clearCart } from "@/redux/features/cart/cartSlice";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalItems } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.name);
  const dispatch = useAppDispatch();

  // Check for admin access and redirect
  useEffect(() => {
    if (user?.role === "admin") {
      toast.error(
        "Administrators cannot place orders. Please use a customer account."
      );
      navigate("/");
      return;
    }
  }, [user?.role, navigate]);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to complete your purchase", {
        duration: 4000,
        icon: "🔒",
      });
      navigate("/login");
    }
  }, [user, navigate]);

  // Redirect if cart is empty with message
  useEffect(() => {
    if (items.length === 0) {
      toast.error("Your cart is empty. Add some items before checkout!", {
        duration: 3000,
        icon: "🛒",
      });
      navigate("/cart");
    }
  }, [items, navigate]);

  if (!user || items.length === 0 || user?.role === "admin") {
    return null;
  }
  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [initiatePayment, { isLoading: isProcessingPayment }] =
    useInitiatePaymentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Show processing toast
    const loadingToast = toast.loading("Processing your order...", {
      icon: "⏳",
    });
    try {
      // Create order
      const orderResponse = await createOrder({
        products: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          address: data.address,
          city: data.city,
          postalCode: data.zipCode,
          phone: data.phone,
        },
        totalAmount: calculateTotal(),
      }).unwrap();

      // Order created successfully
      toast.success("Order created successfully!", {
        duration: 3000,
        icon: "✅",
      });
      // Initiate payment

      // console.log("orderid", orderResponse.data._id);
      const paymentResponse = await initiatePayment({
        id: orderResponse.data._id,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.zipCode,
      }).unwrap();

      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      // console.log(paymentResponse);
      // console.log(paymentResponse.data.paymentUrl);
      if (paymentResponse.data.paymentUrl) {
        dispatch(clearCart());
        toast.success("Redirecting to payment...", { duration: 2000 });
        // Ensure cart is cleared before redirect
        setTimeout(() => {
          // Method 1: Direct window location
          window.location.href = paymentResponse.data.paymentUrl;
        }, 1500);
      }
    } catch (error: any) {
      // Dismiss the loading toast
      toast.dismiss(loadingToast);

      // Handle specific error cases
      if (error.status === 401) {
        toast.error("Your session has expired. Please log in again.", {
          duration: 4000,
          icon: "⚠️",
        });
        navigate("/login");
        return;
      }

      if (error.data?.message) {
        toast.error(error.data.message, {
          duration: 4000,
          icon: "❌",
        });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          duration: 4000,
          icon: "❌",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Last Name</label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block mb-2">Phone</label>
                  <input
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="+0880170000000"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>
              <div>
                <label className="block mb-2">Address</label>
                <input
                  {...register("address", { required: "Address is required" })}
                  className="w-full p-2 border rounded-md"
                  placeholder="123 Main St"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block mb-2">City</label>
                  <input
                    {...register("city", { required: "City is required" })}
                    className="w-full p-2 border rounded-md"
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Zip Code</label>
                  <input
                    {...register("zipCode", {
                      required: "Zip code is required",
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="12345"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreating || isProcessingPayment}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isCreating || isProcessingPayment
                ? "Processing..."
                : "Complete Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
