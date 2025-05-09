import { useState } from "react";
import { MailIcon, CheckCircleIcon } from "@heroicons/react/solid";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      // In production, you would make an actual API call here
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <MailIcon className="h-12 w-12 text-accent" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with BikeShop
          </h2>

          <p className="text-lg opacity-90 mb-8">
            Subscribe to our newsletter for exclusive deals, new arrivals,
            cycling tips, and more!
          </p>

          {subscribed ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center">
              <CheckCircleIcon className="h-16 w-16 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Successfully Subscribed!
              </h3>
              <p>
                Thank you for subscribing. We've sent a confirmation email to{" "}
                <span className="font-medium">{email}</span>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row gap-3 justify-center"
            >
              <div className="flex-1 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-5 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-neutral"
                />
                {error && (
                  <p className="text-left text-red-300 text-sm mt-1">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`bg-accent hover:bg-green-600 text-white font-medium px-8 py-4 rounded-lg transition-colors duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          <p className="text-sm mt-4 opacity-80">
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
