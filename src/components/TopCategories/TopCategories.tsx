import { useGetCategoriesQuery } from "@/redux/api/api";
import { ICategory } from "@/types";
import { CategoryCard } from "../CategoryCard/CategoryCard";

const TopCategories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery({});
  // console.log(movies);
  if (isLoading)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );
  return (
    <div className="my-5">
      <h1 className="text-4xl font-bold text-nursery-primary">
        What to Collect
      </h1>
      <h2 className="text-2xl font-bold my-2  border-l-4 border-l-nursery-primary px-1">
        Top Categories
      </h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4 mx-auto my-5">
        {categories?.data?.map((category: ICategory) => (
          <CategoryCard key={category?._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
