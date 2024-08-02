import { DeleteModal } from "@/components/DeleteModal/DeleteModal";
import { Button } from "@/components/ui/button";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/api/api";
import { ICategory } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function CategoryTableView() {
  const { data: categories } = useGetCategoriesQuery(undefined);
  const deleteCategoryMutation = useDeleteCategoryMutation;

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableCaption>A list of categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Image</TableHead>
            <TableHead className="w-2/4">Name</TableHead>
            <TableHead className="w-1/4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.data?.map((item: ICategory) => (
            <TableRow key={item._id}>
              <TableCell className="p-2 sm:p-4">
                <img
                  src={item.cover_img}
                  className="h-[50px] w-[50px] sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px] object-cover rounded"
                  alt={item.name}
                />
              </TableCell>
              <TableCell className="p-2 sm:p-4">
                <span className="font-medium">{item.name}</span>
              </TableCell>
              <TableCell className="p-2 sm:p-4 text-right">
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button className="w-full sm:w-auto bg-gray-500 text-white text-xs sm:text-sm">
                    Update
                  </Button>
                  <DeleteModal
                    id={item._id}
                    deleteMutation={deleteCategoryMutation}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
