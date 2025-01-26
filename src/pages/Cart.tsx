// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, updateQuantity } from './cartSlice';
// import { Link } from 'react-router-dom';

// export default function CartPage() {
//   const { items, totalItems } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const calculateTotal = () =>
//     items.reduce((total, item) => total + (item.price * item.quantity), 0);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Cart ({totalItems} items)</h1>

//       {items.map(item => (
//         <div key={item.id} className="flex items-center mb-4">
//           <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
//           <div className="flex-1">
//             <h2>{item.name}</h2>
//             <p>${item.price.toFixed(2)}</p>
//             <div className="flex items-center">
//               <button
//                 onClick={() => dispatch(updateQuantity({
//                   id: item.id,
//                   quantity: Math.max(1, item.quantity - 1)
//                 }))}
//               >
//                 -
//               </button>
//               <span>{item.quantity}</span>
//               <button
//                 onClick={() => dispatch(updateQuantity({
//                   id: item.id,
//                   quantity: item.quantity + 1
//                 }))}
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => dispatch(removeFromCart(item.id))}
//                 className="ml-4 text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="mt-4">
//         <p>Total: ${calculateTotal().toFixed(2)}</p>
//         <Link
//           to="/checkout"
//           className="bg-primary text-white py-2 px-4 rounded"
//         >
//           Proceed to Checkout
//         </Link>
//       </div>
//     </div>
//   );
// }
