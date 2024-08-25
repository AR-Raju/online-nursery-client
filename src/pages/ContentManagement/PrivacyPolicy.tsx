import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[85vh] bg-nursery-secondary flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        {/* Custom Privacy Policy SVG Illustration */}
        <svg
          className="mx-auto h-40 w-auto text-nursery-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>

        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-nursery-brown">
            Privacy Policy
          </h2>
          <p className="mt-2 text-sm text-nursery-sage">
            Your privacy is important to us. This policy outlines how we
            collect, use, and protect your information.
          </p>
        </div>

        <div className="mt-8 text-left">
          <h3 className="text-xl font-bold text-nursery-brown mb-4">
            Information Collection and Use
          </h3>
          <p className="text-nursery-brown mb-4">
            We collect information to provide and improve our services. This may
            include:
          </p>
          <ul className="list-disc list-inside text-nursery-brown space-y-2 mb-4">
            <li>
              Personal information (e.g., name, email address, phone number)
            </li>
            <li>Child information (e.g., name, age, medical information)</li>
            <li>Usage data and cookies</li>
          </ul>
          <p className="text-nursery-brown mb-4">
            We use this information to provide our services, communicate with
            you, and ensure the safety and well-being of the children in our
            care.
          </p>
          <h3 className="text-xl font-bold text-nursery-brown mb-4">
            Data Protection
          </h3>
          <p className="text-nursery-brown mb-4">
            We implement appropriate security measures to protect your personal
            information. We do not share your information with third parties
            except as required by law or with your explicit consent.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-nursery-green hover:bg-nursery-sage focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nursery-green transition-colors duration-200"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
