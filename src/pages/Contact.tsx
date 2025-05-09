import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
  PaperAirplaneIcon,
  ClockIcon,
  UserIcon,
  ChatAlt2Icon,
  CheckCircleIcon,
} from "@heroicons/react/solid";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// FAQ data
const faqs = [
  {
    question: "What are your business hours?",
    answer:
      "We're open Monday to Friday from 9am to 6pm, and Saturday from 10am to 4pm. We're closed on Sundays and public holidays.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping times and costs vary by location.",
  },
];

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("sending");
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(data);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team is
            here to help with any inquiries you might have.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Call Us</h3>
            <p className="text-gray-600 mb-4">(555) 123-4567</p>
            <p className="text-sm text-gray-500">
              Mon-Fri: 9am-6pm, Sat: 10am-4pm
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MailIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Email Us</h3>
            <p className="text-gray-600 mb-1">support@bikeshop.com</p>
            <p className="text-gray-600 mb-4">sales@bikeshop.com</p>
            <p className="text-sm text-gray-500">We respond within 24 hours</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <LocationMarkerIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Visit Us</h3>
            <p className="text-gray-600 mb-4">
              123 Bike Street, Cycling City, BC 12345
            </p>
            <p className="text-sm text-gray-500">Free parking available</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information & Map */}
          <div className="flex flex-col h-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-grow">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-6">
                <h2 className="text-2xl font-bold text-white">Our Location</h2>
                <p className="text-blue-100 mt-2">
                  Visit our showroom to see our full range of products
                </p>
              </div>

              {/* Map */}
              <div className="h-64 sm:h-80 w-full border-b border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345756!2d144.96305707533993!3d-37.81627997975167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b8432e1d03%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1696784321234"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our location"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Contact Details */}
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <LocationMarkerIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Our Address
                      </h3>
                      <p className="text-gray-600">
                        123 Bike Street, Cycling City, BC 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <PhoneIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone</h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <ClockIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Business Hours
                      </h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9am - 6pm
                      </p>
                      <p className="text-gray-600">Saturday: 10am - 4pm</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-4">
                      <MailIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">support@bikeshop.com</p>
                      <p className="text-gray-600">sales@bikeshop.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-lg mt-8 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-6 px-6">
                <h2 className="text-2xl font-bold text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-purple-100 mt-2">
                  Quick answers to common questions
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                    >
                      <button
                        className="flex justify-between items-center w-full text-left font-medium text-gray-800 hover:text-blue-600 transition-colors"
                        onClick={() => toggleFaq(index)}
                      >
                        <span>{faq.question}</span>
                        <span className="ml-2">
                          {activeFaq === index ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                      </button>
                      {activeFaq === index && (
                        <div className="mt-2 text-gray-600 pl-1">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-6">
              <h2 className="text-2xl font-bold text-white">
                Send Us a Message
              </h2>
              <p className="text-blue-100 mt-2">
                We'll get back to you as soon as possible
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Full Name
                  </div>
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Your Full Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <div className="flex items-center">
                    <MailIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Email Address
                  </div>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Phone Number (Optional)
                    </div>
                  </label>
                  <input
                    {...register("phone", {
                      pattern: {
                        value:
                          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <div className="flex items-center">
                      <ChatAlt2Icon className="h-5 w-5 mr-2 text-blue-600" />
                      Subject (Optional)
                    </div>
                  </label>
                  <input
                    {...register("subject")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <div className="flex items-center">
                    <ChatAlt2Icon className="h-5 w-5 mr-2 text-blue-600" />
                    Your Message
                  </div>
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all ${
                  submitStatus === "sending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                }`}
              >
                {submitStatus === "sending" ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <>
                    <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Your message has been sent successfully!
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-blue-100 mb-4">
                Stay updated with our latest products, special offers, and
                cycling tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
