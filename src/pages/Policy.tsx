import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  RefreshIcon,
  QuestionMarkCircleIcon,
  ClipboardCheckIcon,
  MailIcon,
  PhoneIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  LightningBoltIcon,
  GlobeIcon,
  UserIcon,
  LockClosedIcon,
  CashIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";

type PolicyTab =
  | "privacy"
  | "terms"
  | "shipping"
  | "returns"
  | "warranty"
  | "faq";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState<PolicyTab>("privacy");
  const [openSection, setOpenSection] = useState<PolicyTab | null>("privacy");

  const toggleSection = (section: PolicyTab) => {
    setOpenSection(openSection === section ? null : section);
  };

  const getIcon = (policyType: PolicyTab) => {
    const iconClass = "h-6 w-6";
    switch (policyType) {
      case "privacy":
        return <ShieldCheckIcon className={iconClass} />;
      case "terms":
        return <DocumentTextIcon className={iconClass} />;
      case "shipping":
        return <TruckIcon className={iconClass} />;
      case "returns":
        return <RefreshIcon className={iconClass} />;
      case "warranty":
        return <ClipboardCheckIcon className={iconClass} />;
      case "faq":
        return <QuestionMarkCircleIcon className={iconClass} />;
      default:
        return <DocumentTextIcon className={iconClass} />;
    }
  };

  const policyTabs = [
    { id: "privacy", name: "Privacy Policy" },
    { id: "terms", name: "Terms of Service" },
    { id: "shipping", name: "Shipping Policy" },
    { id: "returns", name: "Return Policy" },
    { id: "warranty", name: "Warranty" },
    { id: "faq", name: "FAQ" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Policies
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transparent information about our services, products, and data
            handling. We believe in creating clear expectations and building
            trust.
          </p>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:block mb-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-wrap">
              {policyTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as PolicyTab)}
                  className={`flex-1 py-4 px-4 font-medium flex items-center justify-center gap-2 transition-colors
                    ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {getIcon(tab.id as PolicyTab)}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden mb-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {policyTabs.map((tab) => (
              <div
                key={tab.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleSection(tab.id as PolicyTab)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600">
                      {getIcon(tab.id as PolicyTab)}
                    </span>
                    <span className="font-medium text-gray-800">
                      {tab.name}
                    </span>
                  </div>
                  {openSection === tab.id ? (
                    <ChevronDownIcon className="h-5 w-5 text-blue-600" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openSection === tab.id && (
                  <div className="p-4 pt-0 bg-gray-50">
                    {renderPolicyContent(tab.id as PolicyTab)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden md:block bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderPolicyContent(activeTab)}
        </div>

        {/* Support Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
            <p className="text-blue-100 mb-6">
              Our support team is available 24/7 to assist you with any
              questions about our policies or services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <MailIcon className="h-5 w-5" />
                Contact Support
              </a>
              {/* <a
                href="/faq"
                className="bg-blue-700 hover:bg-blue-800 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <QuestionMarkCircleIcon className="h-5 w-5" />
                Visit FAQ
              </a> */}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <PhoneIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-gray-600 mb-3">We're available 24/7</p>
            <p className="text-blue-600 font-medium">+1 (800) 123-4567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <MailIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-gray-600 mb-3">We'll respond within 24 hours</p>
            <p className="text-blue-600 font-medium">support@motorbike.com</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
            <p className="text-gray-600 mb-3">Our policy support hours</p>
            <p className="text-blue-600 font-medium">Mon-Fri: 9am - 6pm EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Policy Content Renderer
function renderPolicyContent(policyType: PolicyTab) {
  switch (policyType) {
    case "privacy":
      return <PrivacyPolicy />;
    case "terms":
      return <TermsOfService />;
    case "shipping":
      return <ShippingPolicy />;
    case "returns":
      return <ReturnPolicy />;
    case "warranty":
      return <WarrantyPolicy />;
    case "faq":
      return <FAQSection />;
    default:
      return <PrivacyPolicy />;
  }
}

// Policy Components
function PolicySection({
  title,
  icon,
  children,
  lastUpdated,
}: {
  title: string;
  icon: JSX.Element;
  children: React.ReactNode;
  lastUpdated?: string;
}) {
  return (
    <div className="space-y-6 text-gray-700">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="bg-blue-100 p-2 rounded-full">{icon}</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function PolicyArticle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-4 text-gray-600">{children}</div>
    </article>
  );
}

function PrivacyPolicy() {
  return (
    <PolicySection
      title="Privacy Policy"
      icon={<ShieldCheckIcon className="h-6 w-6 text-blue-600" />}
      lastUpdated="May 1, 2025"
    >
      <div className="space-y-6">
        <p className="text-gray-600 mb-8">
          At MotorBike Shop, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website or make a purchase.
        </p>

        <PolicyArticle title="Information We Collect">
          <p>
            We collect personal information that you voluntarily provide to us
            when you register on our website, express interest in obtaining
            information about us or our products, or otherwise contact us. The
            personal information we collect may include:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Name, email address, postal address, phone number, and other
              contact information
            </li>
            <li>
              Billing information, such as credit card numbers and billing
              addresses
            </li>
            <li>Account preferences and purchase history</li>
            <li>
              Information you provide in customer surveys or feedback forms
            </li>
          </ul>
        </PolicyArticle>

        <PolicyArticle title="How We Use Your Information">
          <p>
            We may use the information we collect from you for various purposes,
            including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Processing and fulfilling your orders</li>
            <li>Sending you order confirmations and updates</li>
            <li>Responding to your questions and concerns</li>
            <li>Improving our website and customer service experience</li>
            <li>Marketing and promotional efforts, when permitted</li>
            <li>Analyzing website usage and trends</li>
          </ul>
        </PolicyArticle>

        <PolicyArticle title="Cookies and Tracking Technologies">
          <p>
            We use cookies and similar tracking technologies to track activity
            on our website and store certain information. Cookies are files with
            a small amount of data that may include an anonymous unique
            identifier.
          </p>
          <p className="mt-2">
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our website.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Third-Party Disclosure">
          <p>
            We do not sell, trade, or otherwise transfer your personally
            identifiable information to outside parties except as described
            below:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Service providers who assist us in operating our website,
              conducting our business, or servicing you
            </li>
            <li>
              Business partners with your consent or when necessary to complete
              a transaction
            </li>
            <li>When required by law or to protect our rights</li>
          </ul>
        </PolicyArticle>

        <PolicyArticle title="Data Security">
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information when you place an order or enter,
            submit, or access your personal information.
          </p>
          <p className="mt-2">
            Your personal information is contained behind secured networks and
            is only accessible by a limited number of persons who have special
            access rights to such systems, and are required to keep the
            information confidential.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Your Rights">
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>The right to access personal information we hold about you</li>
            <li>
              The right to request correction of your personal information
            </li>
            <li>The right to request deletion of your personal information</li>
            <li>
              The right to object to processing of your personal information
            </li>
            <li>The right to data portability</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, please contact us using the information
            provided at the end of this policy.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Contact Information">
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at:
          </p>
          <div className="mt-2">
            <p className="font-medium">MotorBike Shop</p>
            <p>123 Main Street</p>
            <p>Anytown, USA 12345</p>
            <p>Email: privacy@motorbike.com</p>
            <p>Phone: (800) 123-4567</p>
          </div>
        </PolicyArticle>
      </div>
    </PolicySection>
  );
}

function TermsOfService() {
  return (
    <PolicySection
      title="Terms of Service"
      icon={<DocumentTextIcon className="h-6 w-6 text-blue-600" />}
      lastUpdated="April 15, 2025"
    >
      <div className="space-y-6">
        <p className="text-gray-600 mb-8">
          These Terms of Service ("Terms") govern your use of the MotorBike Shop
          website and services. By accessing or using our website, you agree to
          be bound by these Terms.
        </p>

        <PolicyArticle title="Account Registration">
          <p>
            When you create an account with us, you must provide accurate,
            complete, and up-to-date information. You are responsible for
            safeguarding your account password and for any activities or actions
            under your account.
          </p>
          <p className="mt-2">
            We reserve the right to disable any user account if we believe you
            have violated any provisions of these Terms.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Ordering and Payment">
          <p>
            By placing an order, you represent that you are authorized to use
            the payment method provided and that there are sufficient funds to
            cover the cost of the transaction.
          </p>
          <p className="mt-2">
            We reserve the right to refuse any order you place with us. We may,
            in our sole discretion, limit or cancel quantities purchased per
            person, per household, or per order.
          </p>
          <p className="mt-2">
            Prices for products are subject to change without notice. We reserve
            the right to modify or discontinue the service without notice at any
            time.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Product Information">
          <p>
            We strive to provide accurate product descriptions, specifications,
            and images. However, we do not warrant that product descriptions or
            other content on this site are accurate, complete, reliable,
            current, or error-free.
          </p>
          <p className="mt-2">
            Colors and appearances of products may vary from those shown on the
            website due to display settings and other factors.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Intellectual Property">
          <p>
            All content included on this website, such as text, graphics, logos,
            images, videos, and software, is the property of MotorBike Shop or
            its content suppliers and is protected by international copyright,
            trademark, and other intellectual property laws.
          </p>
          <p className="mt-2">
            You may not use, reproduce, distribute, modify, or create derivative
            works from any content without our prior written consent.
          </p>
        </PolicyArticle>

        <PolicyArticle title="User Conduct">
          <p>You agree not to use the website to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe the intellectual property rights of others</li>
            <li>Transmit viruses or malicious code</li>
            <li>Interfere with the proper working of the website</li>
            <li>Collect user information without consent</li>
            <li>
              Engage in any activity that, in our sole judgment, restricts or
              inhibits anyone's use or enjoyment of the website
            </li>
          </ul>
        </PolicyArticle>

        <PolicyArticle title="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, in no event shall MotorBike
            Shop, its affiliates, officers, directors, employees, or agents be
            liable for any indirect, punitive, incidental, special, or
            consequential damages that result from:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>The use of, or inability to use, this website</li>
            <li>
              Unauthorized access to or alteration of your transmissions or data
            </li>
            <li>Statements or conduct of any third party on the website</li>
            <li>Any other matter relating to the website or our services</li>
          </ul>
        </PolicyArticle>

        <PolicyArticle title="Changes to Terms">
          <p>
            We may update these Terms from time to time. When we do, we will
            revise the "last updated" date at the top of this page. We encourage
            you to periodically review these Terms to stay informed about our
            practices.
          </p>
          <p className="mt-2">
            Your continued use of the website after any changes indicates your
            acceptance of the new Terms.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Contact Information">
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="mt-2">
            <p className="font-medium">MotorBike Shop</p>
            <p>123 Main Street</p>
            <p>Anytown, USA 12345</p>
            <p>Email: legal@motorbike.com</p>
            <p>Phone: (800) 123-4567</p>
          </div>
        </PolicyArticle>
      </div>
    </PolicySection>
  );
}

function ShippingPolicy() {
  return (
    <PolicySection
      title="Shipping Policy"
      icon={<TruckIcon className="h-6 w-6 text-blue-600" />}
      lastUpdated="March 30, 2025"
    >
      <div className="space-y-6">
        <p className="text-gray-600 mb-8">
          At MotorBike Shop, we're committed to delivering your motorcycle and
          accessories quickly and safely. This policy outlines our shipping
          procedures and what you can expect when ordering from us.
        </p>

        <PolicyArticle title="Processing Time">
          <p>
            After receiving your order, we typically process it within the
            following timeframes:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Accessories and parts: 1-2 business days</li>
            <li>Complete motorcycles: 3-5 business days</li>
            <li>Custom orders: 7-14 business days</li>
          </ul>
          <p className="mt-2">
            During peak seasons or sales events, processing times may be
            slightly longer. If there's a significant delay with your order,
            we'll notify you via email.
          </p>
        </PolicyArticle>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Shipping Methods and Estimated Delivery
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="py-3 px-4 text-left">Shipping Method</th>
                  <th className="py-3 px-4 text-left">Estimated Delivery</th>
                  <th className="py-3 px-4 text-left">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 font-medium">Standard Shipping</td>
                  <td className="py-3 px-4">5-7 business days</td>
                  <td className="py-3 px-4">
                    $10.99 (Free on orders over $100)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Express Shipping</td>
                  <td className="py-3 px-4">2-3 business days</td>
                  <td className="py-3 px-4">$19.99</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Next Day Delivery</td>
                  <td className="py-3 px-4">1 business day</td>
                  <td className="py-3 px-4">$29.99</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Motorcycle Delivery</td>
                  <td className="py-3 px-4">7-14 business days</td>
                  <td className="py-3 px-4">Calculated at checkout</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Note: All delivery times are estimates and begin after processing is
            complete. Delivery to remote areas may take additional time.
          </p>
        </div>

        <PolicyArticle title="International Shipping">
          <p>
            We ship to most countries worldwide. International orders typically
            take 7-21 business days for delivery, depending on the destination
            and customs processing.
          </p>
          <p className="mt-2">
            Please note that customers are responsible for all duties, taxes,
            and customs fees for international shipments. These charges are not
            included in the shipping cost and will be collected by the delivery
            carrier or customs office.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Tracking Information">
          <p>
            Once your order ships, we'll send you a confirmation email with
            tracking information. You can also view tracking details by logging
            into your account on our website.
          </p>
          <p className="mt-2">
            If you have not received tracking information within the expected
            processing time, please contact our customer service team.
          </p>
        </PolicyArticle>

        <PolicyArticle title="Shipping Restrictions">
          <p>
            For safety and regulatory reasons, we cannot ship certain items to
            specific locations:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Certain motorcycle models may not be available for international
              shipping due to import regulations
            </li>
            <li>
              Hazardous materials and certain chemicals used in maintenance
              products have shipping restrictions
            </li>
            <li>
              We do not ship to P.O. boxes for large items or complete
              motorcycles
            </li>
          </ul>
        </PolicyArticle>

        <PolicyArticle title="Delivery Confirmation and Issues">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">
                  Delivery Confirmation
                </h4>
                <p className="text-gray-600">
                  All deliveries require a signature confirmation. For
                  motorcycle deliveries, we'll schedule a delivery appointment
                  in advance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">
                  Missing or Damaged Items
                </h4>
                <p className="text-gray-600">
                  If your package arrives damaged or with items missing, please
                  contact us within 48 hours of delivery with photos of the
                  damage.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ExclamationCircleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Shipping Delays</h4>
                <p className="text-gray-600">
                  Sometimes delays occur due to weather, carrier issues, or
                  other circumstances beyond our control. We'll keep you updated
                  if significant delays are expected.
                </p>
              </div>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Contact Our Shipping Department">
          <p>
            If you have questions about shipping or need to update a delivery
            address, please contact our shipping department:
          </p>
          <div className="mt-2">
            <p>Email: shipping@motorbike.com</p>
            <p>Phone: (800) 123-4567 ext. 2</p>
            <p>Hours: Monday-Friday, 9am-5pm EST</p>
          </div>
        </PolicyArticle>
      </div>
    </PolicySection>
  );
}
function ReturnPolicy() {
  return (
    <PolicySection
      title="Return Policy"
      icon={<RefreshIcon className="h-6 w-6 text-blue-600" />}
      lastUpdated="April 10, 2025"
    >
      <div className="space-y-6">
        <p className="text-gray-600 mb-8">
          We want you to be completely satisfied with your MotorBike purchase.
          Our 30-day return policy gives you time to ensure your gear and
          accessories meet your expectations.
        </p>

        <PolicyArticle title="Return Eligibility">
          <p>To be eligible for a return, items must be:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>In original, unused condition with tags attached</li>
            <li>In original packaging with all accessories</li>
            <li>Returned within 30 days of delivery</li>
            <li>Accompanied by proof of purchase</li>
          </ul>
          <p className="mt-3 text-red-600">
            <strong>Non-Returnable Items:</strong>
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Custom-built or personalized motorcycles</li>
            <li>Opened lubricants, chemicals, or maintenance products</li>
            <li>Used riding gear for hygiene reasons</li>
            <li>Clearance or final sale items marked "non-returnable"</li>
            <li>Gift cards and downloadable software</li>
          </ul>
        </PolicyArticle>

        <PolicyArticle title="How to Return">
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Initiate Your Return:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Online through your account dashboard</li>
                <li>By phone at (800) 123-4567</li>
                <li>Via email at returns@motorbike.com</li>
              </ul>
            </li>
            <li>
              <strong>Package Your Items:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Use original packaging when possible</li>
                <li>Include all accessories and documentation</li>
                <li>Attach the provided return label</li>
              </ul>
            </li>
            <li>
              <strong>Ship Your Return:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Drop off at any authorized carrier location</li>
                <li>Obtain and keep your tracking number</li>
              </ul>
            </li>
          </ol>
        </PolicyArticle>

        <PolicyArticle title="Refund Process">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-800">Standard Refunds</h4>
              </div>
              <p className="text-sm text-green-700">
                Processed within 3-5 business days of receiving your return.
                Allow 7-10 business days for the refund to appear in your
                account.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <LightningBoltIcon className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">Expedited Options</h4>
              </div>
              <p className="text-sm text-blue-700">
                Need faster processing? Contact us for priority handling (+$15
                fee). Available for returns valued over $500.
              </p>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="International Returns">
          <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg">
            <GlobeIcon className="h-5 w-5 text-yellow-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">
                Important Notes
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-yellow-700">
                <li>Return shipping costs are the customer's responsibility</li>
                <li>Include all customs documentation with your return</li>
                <li>Declare package as "Returned Goods" to avoid duties</li>
              </ul>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Exchanges">
          <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg">
            <UserIcon className="h-5 w-5 text-purple-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-800 mb-2">
                Exchange Process
              </h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact our customer service team</li>
                <li>Provide your order number and desired replacement</li>
                <li>We'll ship the new item once return is processed</li>
              </ol>
              <p className="mt-3 text-sm text-purple-700">
                Note: Price differences will be calculated and charged/refunded
                accordingly.
              </p>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Damaged or Defective Items">
          <div className="flex items-start gap-4 bg-red-50 p-4 rounded-lg">
            <XCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-800 mb-2">
                Immediate Assistance
              </h4>
              <p className="text-red-700">
                If you receive a damaged or defective item:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Contact us within 48 hours of delivery</li>
                <li>Provide photos of the damage/defect</li>
                <li>We'll arrange free return shipping</li>
                <li>Receive priority replacement or refund</li>
              </ul>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Return Exceptions">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <LockClosedIcon className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">Security Seals</h4>
                <p className="text-gray-600">
                  Items with broken security seals cannot be returned due to
                  safety regulations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AnnotationIcon className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">Special Orders</h4>
                <p className="text-gray-600">
                  Custom paint jobs or modified components require special
                  approval for returns.
                </p>
              </div>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Contact Returns Department">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Email</h4>
                <p className="text-blue-600">returns@motorbike.com</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Phone</h4>
                <p className="text-blue-600">(800) 123-4567 ext. 3</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Hours</h4>
                <p>Mon-Fri: 8am - 8pm EST</p>
                <p>Sat-Sun: 9am - 5pm EST</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Mailing Address
                </h4>
                <p>MotorBike Returns Center</p>
                <p>456 Commerce Street</p>
                <p>Anytown, USA 67890</p>
              </div>
            </div>
          </div>
        </PolicyArticle>
      </div>
    </PolicySection>
  );
}
function WarrantyPolicy() {
  return (
    <PolicySection
      title="Warranty Policy"
      icon={<ClipboardCheckIcon className="h-6 w-6 text-blue-600" />}
      lastUpdated="June 1, 2025"
    >
      <div className="space-y-6">
        <p className="text-gray-600 mb-8">
          Our comprehensive warranty ensures your motorcycle and accessories are
          protected against manufacturing defects. Below you'll find details
          about coverage periods, claims process, and warranty limitations.
        </p>

        <PolicyArticle title="Warranty Coverage">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-blue-50">
                  <th className="py-3 px-4 text-left border-b">
                    Product Category
                  </th>
                  <th className="py-3 px-4 text-left border-b">
                    Warranty Period
                  </th>
                  <th className="py-3 px-4 text-left border-b">
                    Coverage Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">Complete Motorcycles</td>
                  <td className="py-3 px-4">5 years</td>
                  <td className="py-3 px-4">Frame, engine, transmission</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Electric Components</td>
                  <td className="py-3 px-4">3 years</td>
                  <td className="py-3 px-4">Wiring, sensors, ECU</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Accessories</td>
                  <td className="py-3 px-4">1 year</td>
                  <td className="py-3 px-4">Seats, mirrors, luggage systems</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Batteries</td>
                  <td className="py-3 px-4">2 years</td>
                  <td className="py-3 px-4">
                    Pro-rated coverage after first year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Making a Warranty Claim">
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Document the Issue:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Take clear photos/video of the defect</li>
                <li>Note purchase date and location</li>
              </ul>
            </li>
            <li>
              <strong>Contact Support:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Online warranty claim form</li>
                <li>Email: warranty@motorbike.com</li>
                <li>Phone: (800) 123-4567 ext. 4</li>
              </ul>
            </li>
            <li>
              <strong>Assessment:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Our technicians will review your claim</li>
                <li>May request additional documentation</li>
              </ul>
            </li>
            <li>
              <strong>Resolution:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Repair at authorized service center</li>
                <li>Replacement of defective parts</li>
                <li>Full unit replacement if necessary</li>
              </ul>
            </li>
          </ol>
        </PolicyArticle>

        <PolicyArticle title="What's Not Covered">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <ul className="list-disc pl-6 space-y-2 text-red-700">
              <li>Normal wear and tear</li>
              <li>Damage from accidents or misuse</li>
              <li>Unauthorized modifications</li>
              <li>Environmental damage (rust, corrosion)</li>
              <li>Non-MotorBike branded accessories</li>
              <li>Routine maintenance items</li>
            </ul>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Extended Warranties">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                Platinum Coverage
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-blue-700">
                <li>Extends motorcycle warranty to 7 years</li>
                <li>24/7 Roadside Assistance</li>
                <li>Includes wear items like brakes and tires</li>
                <li>$1,500 or 15% of MSRP</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">
                Gold Coverage
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-green-700">
                <li>Extends motorcycle warranty to 5 years</li>
                <li>Business hours support</li>
                <li>Covers major components only</li>
                <li>$999 or 10% of MSRP</li>
              </ul>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="International Warranty">
          <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg">
            <GlobeIcon className="h-5 w-5 text-purple-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-800 mb-2">
                Global Protection
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-purple-700">
                <li>Valid at any authorized dealer worldwide</li>
                <li>Must present original purchase documents</li>
                <li>Coverage may vary by region</li>
                <li>Some countries require local registration</li>
              </ul>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Transferring Warranty">
          <div className="space-y-4">
            <p>
              MotorBike warranties are transferable to subsequent owners with
              proper documentation:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Complete warranty transfer form</li>
              <li>Provide bill of sale from original owner</li>
              <li>Submit vehicle service history</li>
              <li>$150 transfer fee applies</li>
            </ul>
          </div>
        </PolicyArticle>
      </div>
    </PolicySection>
  );
}
function FAQSection() {
  return (
    <PolicySection
      title="Frequently Asked Questions"
      icon={<QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" />}
      lastUpdated="July 1, 2025"
    >
      <div className="space-y-6">
        <PolicyArticle title="Ordering & Payments">
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American
                Express), PayPal, MotorBike Financing, and wire transfers for
                orders over $5,000.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: Can I modify my order after placing it?
              </h4>
              <p className="text-gray-600">
                Order modifications are possible within 2 hours of placement.
                Contact our support team immediately at orders@motorbike.com or
                call (800) 123-4567 ext. 1.
              </p>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Shipping & Delivery">
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: How do I track my order?
              </h4>
              <p className="text-gray-600">
                Tracking information is automatically emailed when your order
                ships. You can also view real-time updates in your account
                dashboard.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: Do you offer motorcycle assembly?
              </h4>
              <p className="text-gray-600">
                Yes! Our White Glove Delivery service includes professional
                assembly and safety check for $299. Available within 200 miles
                of our dealerships.
              </p>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Returns & Warranty">
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: Can I return a motorcycle I've ridden?
              </h4>
              <p className="text-gray-600">
                Motorcycles can be returned within 30 days with less than 100
                miles, provided they show no signs of wear. A $500 restocking
                fee applies.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: How long does warranty repair take?
              </h4>
              <p className="text-gray-600">
                Most repairs are completed within 5-7 business days. Loaner
                bikes are available for warranty repairs lasting longer than 3
                days.
              </p>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Technical Support">
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: Where can I find maintenance manuals?
              </h4>
              <p className="text-gray-600">
                Digital manuals are available in your account dashboard under
                "Purchases". Printed copies can be requested for $25.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: How do I update my motorcycle's software?
              </h4>
              <p className="text-gray-600">
                Connect to our Mobile App via Bluetooth and follow the on-screen
                instructions. Major updates require dealer installation.
              </p>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Account & Security">
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: How do I reset my password?
              </h4>
              <p className="text-gray-600">
                Visit our password reset page and enter your registered email.
                You'll receive a secure link to create a new password.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Q: Can multiple users access one account?
              </h4>
              <p className="text-gray-600">
                For security reasons, we recommend individual accounts. Business
                accounts with multiple users are available for commercial
                customers.
              </p>
            </div>
          </div>
        </PolicyArticle>

        <PolicyArticle title="Additional Support">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              Still Have Questions?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <MailIcon className="h-5 w-5" />
                Email Support
              </a>
              <a
                href="tel:18001234567"
                className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 border border-blue-200"
              >
                <PhoneIcon className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </PolicyArticle>
      </div>
    </PolicySection>
  );
}
