import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShieldCheckIcon, TruckIcon } from "@heroicons/react/solid";
import { ChevronDownIcon, ChevronUpIcon, Rocket, StarIcon } from "lucide-react";
import AddToCartButton from "@/components/shared/AddToCartbutton";
import { useGetProductDetailsQuery } from "@/redux/features/admin/productApi";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product } = useGetProductDetailsQuery(id);
  const [quantity, setQuantity] = useState(1);

  if (!product)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  // Dynamic specifications generator
  const generateSpecifications = () => {
    const specs = [
      { label: "Brand", value: product.brand },
      { label: "Model", value: product.model },
      { label: "Category", value: product.category },
    ];
    return specs;
  };

  const faqs = [
    {
      question: "What is the warranty period?",
      answer:
        "All our bikes come with a 2-year comprehensive warranty covering manufacturing defects.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we provide worldwide shipping with tracking and insurance.",
    },
    {
      question: "Can I return or exchange the bike?",
      answer:
        "We offer a 30-day return policy for unused bikes in original condition.",
    },
  ];

  // Static Reviews
  const staticReviews = [
    {
      name: "John Doe",
      rating: 5,
      date: "2 weeks ago",
      comment: "Amazing bike! Smooth ride and excellent build quality.",
    },
    {
      name: "Sarah Smith",
      rating: 4,
      date: "1 month ago",
      comment: "Great value for money. Highly recommend for urban commuting.",
    },
  ];

  // FAQ Accordion Component
  const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b py-2">
            <div
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h3 className="font-semibold">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUpIcon className="h-5 w-5 text-primary" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-primary" />
              )}
            </div>
            {openIndex === index && (
              <p className="text-neutral mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Review Section Component
  const ReviewSection = () => {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {staticReviews.map((review, index) => (
          <div key={index} className="bg-base p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="font-semibold mr-2">{review.name}</span>
                <div className="flex text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
              </div>
              <span className="text-sm text-neutral">{review.date}</span>
            </div>
            <p className="text-neutral">{review.comment}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-image.svg";
            }}
          />
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
            {product.stock} In Stock
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-neutral mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-secondary mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-neutral mb-6">{product.description}</p>

          {/* Specifications */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Specifications:</h3>
            <table className="w-full">
              <tbody>
                {generateSpecifications().map(({ label, value }) => (
                  <tr key={label} className="border-b">
                    <td className="py-2 text-neutral capitalize">{label}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quantity and Cart */}
          <div className="flex items-center space-x-4 mb-6">
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
            <AddToCartButton product={product} />
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
              <Rocket className="h-8 w-8 text-secondary mb-2" />
              <span className="text-sm">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
      <FAQSection />
      <ReviewSection />
    </div>
  );
}
