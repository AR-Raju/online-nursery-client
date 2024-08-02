import sliderImage1 from "@/assets/nursery-1.jpg";
import sliderImage2 from "@/assets/nursery-2.jpg";
import sliderImage3 from "@/assets/nursery-3.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { setSearchQuery } from "@/redux/feature/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const sliderData = [
    { id: 1, image: sliderImage1 },
    { id: 2, image: sliderImage2 },
    { id: 3, image: sliderImage3 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [sliderData.length]);

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchTerm);

    dispatch(setSearchQuery(searchTerm));
    navigate("/advanced-search");
  };

  return (
    <div className="relative w-full h-[500px] mt-6 overflow-hidden rounded-lg shadow-lg">
      {sliderData.map((slider, index) => (
        <div
          key={slider.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Card className="bg-transparent h-full">
            <CardContent className="flex items-center justify-center h-full p-0 relative">
              <img
                src={slider.image}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* Blur overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-[2px]"></div>
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Search input overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 z-10">
        <p className="text-3xl text-white mb-4 text-center">
          What are you looking for?
        </p>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for trees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-4 pr-12 rounded-full bg-white bg-opacity-80 focus:bg-opacity-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-nursery-green transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-nursery-primary text-white p-2 rounded-full hover:bg-nursery-sage transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full border transition-all duration-300 ${
              index === currentSlide
                ? "bg-nursery-green w-6"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
