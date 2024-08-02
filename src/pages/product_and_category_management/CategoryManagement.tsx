import { AddCategoryModal } from "@/components/CategoryModal/AddCategoryModal";
import { useGetCategoriesQuery } from "@/redux/api/api";
import { CategoryTableView } from "../Category/CategoryTableView";

const CategoryManagement = () => {
  const { isLoading } = useGetCategoriesQuery({});

  if (isLoading)
    return (
      <p className="text-xl sm:text-2xl md:text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 min-h-screen bg-nursery-secondary">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-4 md:py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-0">
          Category Management
        </h2>
        <AddCategoryModal />
      </div>
      <div className="mt-4 sm:mt-6 md:mt-8">
        <CategoryTableView />
      </div>
    </div>
  );
};

export default CategoryManagement;
