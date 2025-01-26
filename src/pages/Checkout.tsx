import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  CreditCardIcon,
  LocationMarkerIcon,
  TruckIcon,
} from "@heroicons/react/solid";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "paypal">(
    "credit"
  );

  // Dummy cart items (replace with actual cart state/context)
  const cartItems = [
    {
      id: "1",
      name: "Mountain Explorer Pro",
      price: 1299.99,
      quantity: 1,
      image: "/placeholder-bike-1.jpg",
    },
  ];

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const onSubmit = (data: CheckoutFormData) => {
    // Handle checkout logic
    console.log(data);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-neutral mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <LocationMarkerIcon className="h-6 w-6 mr-2 text-primary" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral mb-2">First Name</label>
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
                  <label className="block text-neutral mb-2">Last Name</label>
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
              <div className="mt-4">
                <label className="block text-neutral mb-2">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full p-2 border rounded-md"
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <TruckIcon className="h-6 w-6 mr-2 text-primary" />
                Shipping Information
              </h2>
              <div>
                <label className="block text-neutral mb-2">Address</label>
                <input
                  {...register("address", { required: "Address is required" })}
                  className="w-full p-2 border rounded-md"
                  placeholder="123 Bike Street"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-neutral mb-2">City</label>
                  <input
                    {...register("city", { required: "City is required" })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Biketown"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-neutral mb-2">Zip Code</label>
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

            {/* Payment Method */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCardIcon className="h-6 w-6 mr-2 text-primary" />
                Payment Method
              </h2>
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("credit")}
                  className={`flex-1 py-2 rounded ${
                    paymentMethod === "credit"
                      ? "bg-primary text-white"
                      : "bg-base text-neutral"
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex-1 py-2 rounded ${
                    paymentMethod === "paypal"
                      ? "bg-primary text-white"
                      : "bg-base text-neutral"
                  }`}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === "credit" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral mb-2">
                      Card Number
                    </label>
                    <input
                      {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: {
                          value: /^[0-9]{16}$/,
                          message: "Invalid card number",
                        },
                      })}
                      className="w-full p-2 border rounded-md"
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral mb-2">
                        Expiry Date
                      </label>
                      <input
                        {...register("expiryDate", {
                          required: "Expiry date is required",
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                            message: "Invalid expiry (MM/YY)",
                          },
                        })}
                        className="w-full p-2 border rounded-md"
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm">
                          {errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-neutral mb-2">CVV</label>
                      <input
                        {...register("cvv", {
                          required: "CVV is required",
                          pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: "Invalid CVV",
                          },
                        })}
                        className="w-full p-2 border rounded-md"
                        placeholder="123"
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm">
                          {errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded hover:bg-blue-700"
            >
              Complete Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center mb-4 pb-4 border-b"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-neutral">Quantity: {item.quantity}</p>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-neutral">Subtotal</span>
                <span className="font-semibold">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral">Shipping</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
