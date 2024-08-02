import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-nursery-secondary flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Custom 404 SVG Illustration */}
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
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>

        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-nursery-brown">
            Oops! Page Not Found
          </h2>
          <p className="mt-2 text-sm text-nursery-sage">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mt-8">
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
