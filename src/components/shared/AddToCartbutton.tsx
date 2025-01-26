// import { useDispatch } from 'react-redux';
// import { addToCart } from './cartSlice';

// function AddToCartButton({ product }) {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image
//     }));
//   };

//   return (
//     <button
//       onClick={handleAddToCart}
//       disabled={product.stock === 0}
//       className="bg-primary text-white py-2 px-4 rounded"
//     >
//       {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
//     </button>
//   );
// }
