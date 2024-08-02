import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetProductsQuery } from "@/redux/api/api";
import { IProduct } from "@/types";
import { ProductCard } from "../ProductCard/ProductCard";

export function TopProducts() {
  const { data: products, isLoading } = useGetProductsQuery({});
  if (isLoading)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );
  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold my-2  border-l-4 border-l-nursery-primary px-1">
        Top Products
      </h2>
      <Carousel className="w-full max-w-[100vh-200px]">
        <CarouselContent className="-ml-1">
          {products?.data.map((product: IProduct, index: number) => (
            <CarouselItem
              key={`key${index}`}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <ProductCard key={product._id} product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
