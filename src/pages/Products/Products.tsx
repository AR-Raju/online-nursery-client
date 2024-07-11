import { MovieCard } from "@/components/MovieCard/MovieCard";
import { useGetProductsQuery } from "@/redux/api/api";
import { TMovie } from "@/types";
import { ProductTableView } from "./ProductTableView";

export default function Products() {
  const { data: products, isLoading } = useGetProductsQuery({});
  // console.log(products);
  if (isLoading)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );
  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4 mx-auto my-5">
        {products?.data?.map((movie: TMovie) => (
          <MovieCard key={movie?._id} movie={movie} />
        ))}
      </div>
      <ProductTableView />
    </div>
  );
}
