import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";

export default function AddToCartButton({ product }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image,
      })
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.stock === 0}
      className={`flex-1 text-white py-2 rounded ${
        product.stock > 0
          ? "bg-accent hover:bg-green-700"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}

{
  /* <button
                      disabled={product.stock === 0}
                      className={`flex-1 text-white py-2 rounded ${
                        product.stock > 0
                          ? "bg-accent hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </button> */
}
