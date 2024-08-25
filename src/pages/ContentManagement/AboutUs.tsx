import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="min-h-[85vh] bg-nursery-secondary flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        {/* Custom About Us SVG Illustration */}
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-nursery-brown">
            About Us
          </h2>
          <p className="mt-2 text-sm text-nursery-sage">
            Welcome to our nursery, where we nurture growth and cultivate
            wonder.
          </p>
        </div>

        <div className="mt-8 text-left">
          <p className="text-nursery-brown mb-4">
            Our nursery is dedicated to providing a safe, loving, and
            stimulating environment for children to learn, grow, and thrive.
            With a team of passionate educators and caregivers, we focus on:
          </p>
          <ul className="list-disc list-inside text-nursery-brown space-y-2">
            <li>Age-appropriate educational activities</li>
            <li>Fostering social and emotional development</li>
            <li>Encouraging creativity and curiosity</li>
            <li>Promoting physical health and well-being</li>
          </ul>
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
