import { ProductCard } from "@/components/ProductCard/ProductCard";
import { useGetProductsQuery } from "@/redux/api/api";
import { IProduct } from "@/types";

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
        {products?.data?.map((product: IProduct) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
}
