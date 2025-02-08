import { StarIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    quote:
      "Best bike shopping experience ever! Great selection and amazing customer service.",
    rating: 5,
  },
  {
    name: "Mike Rodriguez",
    quote:
      "Found my perfect mountain bike. The staff was incredibly helpful and knowledgeable.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    quote: "Love my new electric bike. Smooth ride and excellent quality.",
    rating: 4,
  },
];

export default function Testimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev: any) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, []);
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-neutral">
          What Our Riders Say
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-base p-8 rounded-lg shadow-md">
            <blockquote className="text-xl italic mb-4 text-neutral">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>
            <div className="flex justify-center items-center">
              <div>
                <p className="font-semibold text-primary">
                  {testimonials[currentTestimonial].name}
                </p>
                <div className="flex text-yellow-500 mt-2">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <StarIcon key={i} className="h-5 w-5" />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
