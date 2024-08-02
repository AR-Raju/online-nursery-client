import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICategory } from "@/types";
import { Link } from "react-router-dom";

export function CategoryCard({ category }: { category: ICategory }) {
  return (
    <Card className="bg-nursery-secondary text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/categories/${category.name}`}>
        <CardHeader className="p-2">
          <img
            src={category.cover_img}
            className="h-[200px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt={category.name}
          />
        </CardHeader>
        <CardContent className="grid p-4">
          <CardTitle className="mt-2 text-3xl font-extrabold">
            {category.name}
          </CardTitle>
        </CardContent>
      </Link>
    </Card>
  );
}
