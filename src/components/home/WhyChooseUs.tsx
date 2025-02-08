import {
  ShieldCheckIcon,
  TruckIcon,
  SupportIcon,
} from "@heroicons/react/solid";
export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
          Why Choose Our Bike Shop
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-base rounded-lg shadow-md">
            <ShieldCheckIcon className="h-16 w-16 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quality Guaranteed</h3>
            <p className="text-neutral">
              We offer top-quality bikes from trusted manufacturers with
              comprehensive warranties.
            </p>
          </div>
          <div className="text-center p-6 bg-base rounded-lg shadow-md">
            <TruckIcon className="h-16 w-16 mx-auto text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-3">Free Shipping</h3>
            <p className="text-neutral">
              Free shipping on orders over $1000. Fast and reliable delivery
              nationwide.
            </p>
          </div>
          <div className="text-center p-6 bg-base rounded-lg shadow-md">
            <SupportIcon className="h-16 w-16 mx-auto text-secondary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
            <p className="text-neutral">
              Our cycling experts are always ready to help you find the perfect
              bike.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
