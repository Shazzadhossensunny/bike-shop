import Banner from "@/components/home/Banner";
// import BrandShowcase from "@/components/home/BikeAccessories";
// import AccessoriesSection from "@/components/home/BikeAccessories";
import CallToAction from "@/components/home/CallToAction";
import CategoryCarousel from "@/components/home/Category";

import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewsletterSection from "@/components/home/Newsletter";
import Testimonial from "@/components/home/Testimonial";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="bg-base min-h-screen">
      <Banner />
      <CategoryCarousel />
      <FeaturedProducts />
      {/* <AccessoriesSection /> */}
      {/* <BrandShowcase /> */}
      <WhyChooseUs />
      <Testimonial />
      <NewsletterSection />
      <CallToAction />
    </div>
  );
}
