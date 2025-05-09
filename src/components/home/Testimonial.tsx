import { useState, useEffect, useRef } from "react";
import {
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Portland, OR",
    quote:
      "Best bike shopping experience ever! Great selection and amazing customer service. The team helped me find the perfect road bike for my needs and budget.",
    rating: 5,
    image: "/src/assets/emily.jpg",
    bikePurchased: "Carbon Elite Road Bike",
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    location: "Denver, CO",
    quote:
      "Found my perfect mountain bike. The staff was incredibly helpful and knowledgeable. They even followed up a month later to see how I was enjoying my new ride!",
    rating: 5,
    image: "/src/assets/michel.jpg",
    bikePurchased: "Trail Master Pro",
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "Seattle, WA",
    quote:
      "Love my new electric bike. Smooth ride and excellent quality. The free tune-up service after the first month was a nice bonus. Highly recommend BikeShop!",
    rating: 4,
    image: "/src/assets/sarah.jpg",
    bikePurchased: "E-Commuter Plus",
  },
  {
    id: 4,
    name: "Jason Lee",
    location: "Austin, TX",
    quote:
      "As a cycling enthusiast, I'm very particular about my gear. BikeShop exceeded my expectations with their expert guidance and premium selection. My new gravel bike is perfect!",
    rating: 5,
    image: "/src/assets/emily.jpg",
    bikePurchased: "GravelX Pro",
  },
  {
    id: 5,
    name: "Priya Patel",
    location: "Chicago, IL",
    quote:
      "After researching many bike shops, I chose BikeShop for my first serious mountain bike purchase. The staff was patient, informative, and not pushy. Great experience!",
    rating: 5,
    image: "/src/assets/michel.jpg",
    bikePurchased: "Alpine Explorer",
  },
];

export default function EnhancedTestimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 400);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Pause auto-rotation when user interacts with the carousel
  const handleManualNavigation = (callback: any) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    callback();
    resetInterval();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral">
          What Our Riders Say
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Don't just take our word for it. Here's what our customers think about
          their BikeShop experience.
        </p>

        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => handleManualNavigation(prevTestimonial)}
            className="absolute left-0 lg:-left-12 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md z-10"
            aria-label="Previous testimonial"
          >
            <ArrowLeftIcon className="h-5 w-5 text-neutral" />
          </button>

          <button
            onClick={() => handleManualNavigation(nextTestimonial)}
            className="absolute right-0 lg:-right-12 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md z-10"
            aria-label="Next testimonial"
          >
            <ArrowRightIcon className="h-5 w-5 text-neutral" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden relative h-[340px] md:h-[280px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out bg-white rounded-2xl shadow-lg p-6 md:p-8 ${
                  index === currentTestimonial
                    ? "opacity-100 translate-x-0"
                    : index < currentTestimonial
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Profile Image and Info */}
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-neutral">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <div className="flex text-yellow-500 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm uppercase tracking-wider text-gray-500">
                        Purchased: {testimonial.bikePurchased}
                      </p>
                    </div>

                    <blockquote className="text-neutral text-lg italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  handleManualNavigation(() => setCurrentTestimonial(index))
                }
                className={`h-2 rounded-full transition-all ${
                  index === currentTestimonial
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
