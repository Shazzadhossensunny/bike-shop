import { HeartIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Rocket, TrophyIcon } from "lucide-react";
import workshopImg from "../../src/assets/workshop.jpg";
import emilyImg from "../../src/assets/emily.jpg";
import sarahImg from "../../src/assets/sarah.jpg";
import michelImg from "../../src/assets/michel.jpg";

export default function About() {
  const teamMembers = [
    {
      name: "Emily Rodriguez",
      role: "Founder & CEO",
      image: emilyImg,
      bio: "Passionate motorcycle enthusiast with 15 years of experience in the powersports industry.",
    },
    {
      name: "Michael Chen",
      role: "Head of Product Design",
      image: michelImg,
      bio: "Award-winning designer dedicated to creating cutting-edge motorcycle experiences.",
    },
    {
      name: "Sarah Thompson",
      role: "Chief Technology Officer",
      image: sarahImg,
      bio: "Tech innovator driving digital transformation in motorcycle technology.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral mb-4">
          Welcome to MotorBike Shop: Pioneering Motorcycle Excellence
        </h1>
        <p className="text-xl text-neutral max-w-3xl mx-auto">
          We're more than just a motorcycle shop. We're a community of
          motorcycle enthusiasts dedicated to providing top-quality bikes and
          exceptional riding experiences.
        </p>
      </section>

      {/* Mission Values */}
      <section className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Rocket className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="font-semibold text-xl mb-2">Innovation</h3>
          <p className="text-neutral">
            Constantly pushing the boundaries of motorcycle design and
            technology.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <HeartIcon className="h-12 w-12 mx-auto text-secondary mb-4" />
          <h3 className="font-semibold text-xl mb-2">Passion</h3>
          <p className="text-neutral">
            Driven by our love for motorcycles and commitment to rider
            experience.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <TrophyIcon className="h-12 w-12 mx-auto text-accent mb-4" />
          <h3 className="font-semibold text-xl mb-2">Quality</h3>
          <p className="text-neutral">
            Curating only the highest quality motorcycles and components.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <UserGroupIcon className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="font-semibold text-xl mb-2">Community</h3>
          <p className="text-neutral">
            Building connections and supporting riders of all levels.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-neutral mb-4">Our Story</h2>
          <p className="text-neutral mb-4">
            Founded in 2015, MotorBike Shop started as a small passion project
            in a garage. Today, we've grown into a leading online motorcycle
            retailer, serving thousands of riders worldwide.
          </p>
          <p className="text-neutral">
            Our mission is simple: to make high-quality motorcycling accessible,
            enjoyable, and transformative for everyone.
          </p>
        </div>
        <img
          src={workshopImg}
          alt="MotorBike Shop Workshop"
          className="w-full rounded-lg shadow-md object-cover h-80"
        />
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-neutral text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-cover object-top"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-xl">{member.name}</h3>
                <p className="text-neutral mb-2">{member.role}</p>
                <p className="text-sm text-neutral">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
