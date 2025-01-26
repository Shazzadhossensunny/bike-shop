import Banner from "@/components/home/Banner";
import CallToAction from "@/components/home/CallToAction";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonial from "@/components/home/Testimonial";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="bg-base min-h-screen">
      <Banner />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonial />
      <CallToAction />
    </div>
  );
}
