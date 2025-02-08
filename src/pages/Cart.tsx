import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, totalItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Cart ({totalItems} items)
      </h2>

      {items.length === 0 ? (
        <div className="text-center text-gray-500 text-xl py-10">
          <p className="mb-4">No products available in your cart.</p>
          <Link
            to="/allProduct"
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white shadow-md p-4 rounded-lg gap-4"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price.toFixed(2)} Tk</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Math.max(1, item.quantity - 1),
                      })
                    )
                  }
                  className="bg-gray-200 px-3 py-1 rounded-md text-lg"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                  className="bg-gray-200 px-3 py-1 rounded-md text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="text-right mt-6">
          <p className="text-xl font-bold">
            Total: {calculateTotal().toFixed(2)} Tk
          </p>
          <Link
            to="/checkout"
            className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
