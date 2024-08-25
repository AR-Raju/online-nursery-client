import { useGetProductsQuery } from "@/redux/api/api";
import { IProduct } from "@/types";
import { useEffect, useState } from "react";

const ImageGallery = () => {
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const { data: products, isLoading } = useGetProductsQuery({
    searchQuery: "",
    filters: {},
    sortTerm: "",
    sortOrder: "",
  });

  useEffect(() => {
    if (products?.data) {
      const heights = products.data.map(() =>
        Math.floor(Math.random() * (300 - 150 + 1) + 150)
      );
      setImageHeights(heights);
    }
  }, [products?.data]);

  if (isLoading)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );

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
            {products?.data
              ?.filter(
                (_: IProduct, index: number) => index % 3 === columnIndex
              )
              ?.map((image: IProduct, index: number) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg group"
                  style={{
                    height: imageHeights[columnIndex * 2 + index]
                      ? `${imageHeights[columnIndex * 2 + index]}px`
                      : "200px", // Default height
                  }}
                >
                  <img
                    src={image.image_url}
                    alt={image.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center font-bold text-lg px-2 py-1 bg-black bg-opacity-75 rounded">
                      {image.name}
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
