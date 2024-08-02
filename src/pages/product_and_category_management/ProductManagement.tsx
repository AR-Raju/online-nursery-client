import { ProductModal } from "@/components/ProductModal/ProductModal";
import { useGetProductsQuery } from "@/redux/api/api";
import { ProductTableView } from "../Products/ProductTableView";

const ProductManagement = () => {
  const { data: products, isLoading } = useGetProductsQuery({});

  console.log("Fetching products...");
  console.log(products);
  if (isLoading)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );
  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 min-h-screen bg-nursery-secondary">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-4 md:py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-0">
          Product Management
        </h2>
        <ProductModal />
      </div>
      <div className="mt-4 sm:mt-6 md:mt-8">
        <ProductTableView />
      </div>
    </div>
  );
};

export default ProductManagement;
