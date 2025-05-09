import {
  HeartIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/solid";
import {
  Rocket,
  Trophy,
  MapPin,
  Calendar,
  MessageCircle,
  Star,
  Clock,
  PenTool,
} from "lucide-react";
import workshopImg from "../../src/assets/workshop.jpg";
import emilyImg from "../../src/assets/emily.jpg";
import sarahImg from "../../src/assets/sarah.jpg";
import michelImg from "../../src/assets/michel.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [activeTab, setActiveTab] = useState("story");

  const teamMembers = [
    {
      name: "Emily Rodriguez",
      role: "Founder & CEO",
      image: emilyImg,
      bio: "Passionate motorcycle enthusiast with 15 years of experience in the powersports industry.",
      quote: "Motorcycles aren't just vehicles - they're freedom machines.",
      expertise: ["Business Strategy", "Customer Experience", "Market Trends"],
    },
    {
      name: "Michael Chen",
      role: "Head of Product Design",
      image: michelImg,
      bio: "Award-winning designer dedicated to creating cutting-edge motorcycle experiences.",
      quote: "Design is where performance meets emotion.",
      expertise: ["Industrial Design", "User Experience", "Ergonomics"],
    },
    {
      name: "Sarah Thompson",
      role: "Chief Technology Officer",
      image: sarahImg,
      bio: "Tech innovator driving digital transformation in motorcycle technology.",
      quote: "Technology should enhance the ride, not complicate it.",
      expertise: ["Digital Systems", "IoT Solutions", "Engineering"],
    },
  ];

  const milestones = [
    {
      year: "2015",
      title: "The Beginning",
      description:
        "Started in a small garage with just three motorcycles for sale.",
    },
    {
      year: "2017",
      title: "First Store Opening",
      description: "Opened our first physical retail location downtown.",
    },
    {
      year: "2019",
      title: "Online Expansion",
      description:
        "Launched our e-commerce platform to serve riders nationwide.",
    },
    {
      year: "2022",
      title: "International Growth",
      description:
        "Expanded to international markets with shipping to 15 countries.",
    },
    {
      year: "2024",
      title: "Technology Innovation",
      description:
        "Introduced our custom mobile app for personalized shopping experiences.",
    },
  ];

  const testimonials = [
    {
      name: "James Wilson",
      review:
        "The knowledge and passion at MotorBike Shop is unmatched. They helped me find the perfect bike for my cross-country journey.",
      rating: 5,
    },
    {
      name: "Leila Moreno",
      review:
        "From novice to confident rider, MotorBike Shop guided me every step of the way with patience and expertise.",
      rating: 5,
    },
    {
      name: "Robert Kang",
      review:
        "Their after-sales service is extraordinary. When I had an issue on the road, their team responded immediately with solutions.",
      rating: 4,
    },
  ];

  const locations = [
    {
      city: "New York",
      address: "123 Broadway, New York, NY 10001",
      phone: "(212) 555-6789",
    },
    {
      city: "Los Angeles",
      address: "456 Sunset Blvd, Los Angeles, CA 90028",
      phone: "(323) 555-1234",
    },
    {
      city: "Chicago",
      address: "789 Michigan Ave, Chicago, IL 60611",
      phone: "(312) 555-9876",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "story":
        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-6">
                Our Story
              </h2>
              <p className="text-neutral mb-4">
                Founded in 2015, MotorBike Shop started as a small passion
                project in a garage. Today, we've grown into a leading online
                motorcycle retailer, serving thousands of riders worldwide.
              </p>
              <p className="text-neutral mb-6">
                Our mission is simple: to make high-quality motorcycling
                accessible, enjoyable, and transformative for everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  10+ Years Experience
                </span>
                <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                  5000+ Happy Customers
                </span>
                <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                  3 Retail Locations
                </span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={workshopImg}
                alt="MotorBike Shop Workshop"
                className="w-full rounded-lg shadow-md object-cover h-64 md:h-80 hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        );
      case "milestones":
        return (
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-1 bg-primary/20 transform md:-translate-x-1/2"></div>
            <div className="space-y-12 relative">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    } relative`}
                  >
                    <div className="absolute top-0 left-0 md:left-auto md:right-0 md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white z-10 transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="pl-12 md:pl-0 md:pr-0">
                      <h3 className="text-xl font-bold text-primary">
                        {milestone.year}
                      </h3>
                      <h4 className="text-lg font-semibold">
                        {milestone.title}
                      </h4>
                      <p className="text-neutral">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        );
      case "testimonials":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i + testimonial.rating}
                      className="h-5 w-5 text-gray-300"
                    />
                  ))}
                </div>
                <p className="text-neutral italic mb-4">
                  "{testimonial.review}"
                </p>
                <p className="text-neutral font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        );
      case "locations":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div
                key={location.city}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary"
              >
                <h3 className="text-xl font-bold mb-3 text-neutral">
                  {location.city}
                </h3>
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-neutral">{location.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-neutral">{location.phone}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      {/* Hero Section with Parallax Effect */}
      <section className="relative mb-16 py-20 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to MotorBike Shop
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Pioneering Motorcycle Excellence Since 2015
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={"/allProduct"}>
              <button className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Explore Our Collection
              </button>
            </Link>
            <Link to={"/contact"}>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
                Contact For a Test Ride
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Values */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">Innovation</h3>
            <p className="text-neutral">
              Constantly pushing the boundaries of motorcycle design and
              technology.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <HeartIcon className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">Passion</h3>
            <p className="text-neutral">
              Driven by our love for motorcycles and commitment to rider
              experience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <Trophy className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold text-xl mb-3">Quality</h3>
            <p className="text-neutral">
              Curating only the highest quality motorcycles and components.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <UserGroupIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">Community</h3>
            <p className="text-neutral">
              Building connections and supporting riders of all levels.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10 px-6 rounded-xl mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold mb-2">10+</p>
            <p className="text-sm md:text-base">Years of Experience</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold mb-2">5K+</p>
            <p className="text-sm md:text-base">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold mb-2">150+</p>
            <p className="text-sm md:text-base">Bike Models</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold mb-2">25+</p>
            <p className="text-sm md:text-base">Expert Staff</p>
          </div>
        </div>
      </section>

      {/* About Tabs */}
      <section className="mb-20">
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <button
            onClick={() => setActiveTab("story")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "story"
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Our Story
          </button>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "milestones"
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Key Milestones
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "testimonials"
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Testimonials
          </button>
          <button
            onClick={() => setActiveTab("locations")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "locations"
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Our Locations
          </button>
        </div>
        <div className="bg-gray-50 p-6 md:p-10 rounded-xl">
          {renderTabContent()}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral text-center mb-4">
          Meet Our Team
        </h2>
        <p className="text-center text-neutral mb-10 max-w-2xl mx-auto">
          Our experts bring decades of combined experience and passion to
          deliver the best motorcycle solutions for riders of all levels.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="h-64 md:h-72 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white italic">{member.quote}</p>
                </div>
              </div>
              <div className="p-6 text-center flex-grow">
                <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-sm text-neutral mb-4">{member.bio}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-neutral">
                    Areas of Expertise:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-20">
        <div className="bg-gray-50 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral text-center mb-10">
            Services We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Motorcycle Maintenance
                </h3>
                <p className="text-neutral text-sm">
                  Professional service and repair by certified technicians using
                  genuine parts.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Custom Builds</h3>
                <p className="text-neutral text-sm">
                  Create your dream motorcycle with our expert customization
                  services.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Quality Assurance
                </h3>
                <p className="text-neutral text-sm">
                  Rigorous inspection and testing of every motorcycle before
                  delivery.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-neutral text-sm">
                  Round-the-clock assistance for all your motorcycle needs and
                  emergencies.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Riding Lessons</h3>
                <p className="text-neutral text-sm">
                  Professional instruction for beginners and advanced techniques
                  for experienced riders.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Group Rides</h3>
                <p className="text-neutral text-sm">
                  Join our community events and guided tours to exciting
                  destinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white p-8 md:p-12 rounded-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join Our Motorcycle Community
        </h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Whether you're a seasoned rider or just getting started, we welcome
          you to be part of our growing community of motorcycle enthusiasts.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
            Become a Member
          </button>
          <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
