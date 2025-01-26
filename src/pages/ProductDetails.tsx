import { useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/solid";

// Dummy product data (replace with actual API/Redux integration)
const PRODUCTS = [
  {
    id: "1",
    name: "Mountain Explorer Pro",
    brand: "RideMaster",
    category: "Mountain Bike",
    price: 1299.99,
    description: `
        The Mountain Explorer Pro is a high-performance mountain bike designed for serious trail riders.
        Featuring a lightweight aluminum frame, advanced suspension system, and 27.5" wheels,
        this bike delivers exceptional control and comfort on challenging terrains.
      `,
    features: [
      "Lightweight Aluminum Frame",
      "Advanced Suspension System",
      '27.5" Wheels',
      "Hydraulic Disc Brakes",
      "Shimano XT Components",
    ],
    specifications: {
      frameSize: 'Medium (17")',
      weight: "13.5 kg",
      wheelSize: '27.5"',
      frameMaterial: "Aluminum",
      gears: "1x12 Speed",
    },
    images: [
      "/placeholder-bike-1.jpg",
      "/placeholder-bike-1-side.jpg",
      "/placeholder-bike-1-detail.jpg",
    ],
    stock: 10,
    reviews: [
      {
        name: "John D.",
        rating: 5,
        comment: "Amazing bike! Perfect for mountain trails and rough terrain.",
      },
      {
        name: "Sarah M.",
        rating: 4,
        comment: "Great performance, comfortable ride. Highly recommended!",
      },
    ],
  },
];
export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const averageRating =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    product.reviews.length;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer ${
                  selectedImage === index ? "border-2 border-primary" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-neutral mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500 mr-2">
              {[...Array(Math.round(averageRating))].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5" />
              ))}
            </div>
            <span className="text-neutral">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold text-secondary mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-neutral mb-4">{product.description}</p>

          {/* Key Features */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside">
              {product.features.map((feature, index) => (
                <li key={index} className="text-neutral">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Specifications:</h3>
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-2 text-neutral capitalize">{key}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quantity and Cart */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-base p-2 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product.stock}
                className="w-16 text-center"
              />
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="bg-base p-2 rounded-r"
              >
                +
              </button>
            </div>
            <button
              disabled={product.stock === 0}
              className={`flex-1 py-2 rounded text-white ${
                product.stock > 0
                  ? "bg-primary hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

          {/* Product Guarantees */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheckIcon className="h-8 w-8 text-accent mb-2" />
              <span className="text-sm">Warranty</span>
            </div>
            <div className="flex flex-col items-center">
              <TruckIcon className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <StarIcon className="h-8 w-8 text-secondary mb-2" />
              <span className="text-sm">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="bg-base p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-500 mr-2">
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5" />
                ))}
              </div>
              <span className="font-semibold">{review.name}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
