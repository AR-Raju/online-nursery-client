/* eslint-disable @typescript-eslint/no-explicit-any */

import { RatingModal } from "@/components/RatingModal/RatingMdal";
import { TopProducts } from "@/components/TopProducts/TopProducts";
import { Button } from "@/components/ui/button";
import { useGetSingleProductQuery } from "@/redux/api/api";
import { addToCart } from "@/redux/feature/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types";
// import { useGetproductDetailsAndReviewsQuery } from "@/redux/api/api";

import { ShoppingCart, Star, StarIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ProductDetails() {
  const { id } = useParams();
  // console.log(slug);
  const { data, isLoading } = useGetSingleProductQuery(id as string);

  if (isLoading)
    return (
      <p className="text-3xl text-center text-nursery-primary my-2 font-bold">
        Loading....
      </p>
    );

  const { data: product }: { data: IProduct } = data;
  // const reviews = data.reviews.data;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(addToCart(product));
    } else {
      toast("This product is out of stock");
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        i <= rating ? (
          <Star key={i} className="text-nursery-primary" />
        ) : (
          <StarIcon key={i} className="text-gray-500" />
        )
      );
    }
    return stars;
  };

  // celculate average rating max 10
  // const totalRating = reviews.reduce((acc: number, review: any) => {
  //   return acc + review.rating;
  // }, 0);
  // const averageRating = totalRating / reviews.length;
  return (
    <div className="mx-auto container">
      <div className="flex flex-col items-center py-4  min-h-screen">
        <div className=" w-full  rounded-lg shadow-lg p-6 animate__animated animate__fadeIn">
          <h1 className="text-4xl font-extrabold mb-4">{product?.name}</h1>
          <div className="flex flex-col md:flex-row mb-6">
            <img
              src={product?.image_url}
              alt="product Poster"
              className="w-full md:w-1/3 h-auto mb-4 rounded-lg shadow-lg md:mr-6 transform hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col justify-between">
              <div className="text-gray-400 mb-4">
                <p className="mb-2">
                  <span className="font-semibold text-nursery-primary">
                    Price:
                  </span>{" "}
                  {product.price}
                </p>
                {product.rating && (
                  <div className="mb-2 flex items-center">
                    <span className="font-semibold text-nursery-primary">
                      Rating:
                    </span>
                    <div className="ml-2 flex">
                      {renderStars(product.rating)}
                    </div>
                  </div>
                )}
                <p className="mb-2">
                  <span className="font-semibold text-nursery-primary">
                    Stock:
                  </span>{" "}
                  {product?.stock}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-nursery-primary">
                    Category:
                  </span>{" "}
                  {product?.category}
                </p>
              </div>
              <p className="text-justify mb-4">{product?.description}</p>
              <div className="flex space-x-4 mb-4">
                <RatingModal key={product._id} product={product} />
                <Button onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <TopProducts />
      </div>
    </div>
  );
}
