import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProduct } from "@/types";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card className="bg-nursery-secondary text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/product/${product?._id}`}>
        <CardHeader className="p-2">
          <img
            src={product?.image_url}
            className="h-[200px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt={product?.name}
          />
        </CardHeader>
        <CardContent className="grid p-4">
          <div className="flex items-center gap-2">
            <Star color="green" fill="green" />
            <p className="text-2xl font-bold">{product?.rating}</p>
          </div>
          <CardTitle className="mt-2 text-3xl font-extrabold">
            {product?.name}
          </CardTitle>
          <p className="text-lg mt-4 text-gray-400">{product?.category}</p>
          <p className="text-lg mt-4 text-gray-400">
            Available Stock {product?.stock}
          </p>
        </CardContent>
      </Link>
      <CardFooter>{/* <RatingModal product={product} /> */}</CardFooter>
    </Card>
  );
}
