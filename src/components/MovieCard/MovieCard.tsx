import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TMovie } from "@/types";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { RatingModal } from "../RatingModal/RatingMdal";

export function MovieCard({ movie }: { movie: TMovie }) {
  return (
    <Card className="bg-nursery-secondary text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/movie/${movie?.slug}`}>
        <CardHeader className="p-2">
          <img
            src={movie?.image}
            className="h-[400px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt={movie?.title}
          />
        </CardHeader>
        <CardContent className="grid p-4">
          <div className="flex items-center gap-2">
            <Star color="orange" fill="orange" />
            <p className="text-2xl font-bold">{movie?.totalRating}</p>
          </div>
          <CardTitle className="mt-2 text-3xl font-extrabold">
            {movie?.title}
          </CardTitle>
          <p className="text-lg mt-4 text-gray-400">{movie?.genre}</p>
        </CardContent>
      </Link>
      <CardFooter>
        <RatingModal movie={movie} />
      </CardFooter>
    </Card>
  );
}
