import { useEffect, useState } from "react";

const images = [
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
    alt: "Boat on Calm Water",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp",
    alt: "Wintry Mountain Landscape",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp",
    alt: "Mountains in the Clouds",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
    alt: "Boat on Calm Water",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp",
    alt: "Waves at Sea",
  },
  {
    src: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp",
    alt: "Yosemite National Park",
  },
];

const ImageGallery = () => {
  const [imageHeights, setImageHeights] = useState<number[]>([]);

  useEffect(() => {
    const heights = images.map(() =>
      Math.floor(Math.random() * (300 - 150 + 1) + 150)
    );
    setImageHeights(heights);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Product Image Gallery
      </h1>
      <div className="flex h-[800px] overflow-hidden">
        {[0, 1, 2].map((columnIndex) => (
          <div
            key={columnIndex}
            className="w-1/3 flex flex-col space-y-4 px-2 overflow-y-auto"
          >
            {images
              .filter((_, index) => index % 3 === columnIndex)
              .map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg group"
                  style={{
                    height: `${imageHeights[columnIndex * 2 + index]}px`,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center font-bold text-lg px-2 py-1 bg-black bg-opacity-75 rounded">
                      {image.alt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
