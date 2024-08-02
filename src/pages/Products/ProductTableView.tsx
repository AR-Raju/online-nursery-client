import { DeleteModal } from "@/components/DeleteModal/DeleteModal";
import { ProductModal } from "@/components/ProductModal/ProductModal";
import { useDeleteProductMutation, useGetProductsQuery } from "@/redux/api/api";
import { IProduct } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function ProductTableView() {
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({
    searchQuery: "",
    filters: {},
    sortTerm: "",
    sortOrder: "",
  });

  const deleteProductMutation = useDeleteProductMutation;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableCaption>A list of products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Image</TableHead>
            <TableHead className="w-1/5">Name</TableHead>
            <TableHead className="w-1/5">Price</TableHead>
            <TableHead className="w-1/5">Category</TableHead>
            <TableHead className="w-1/5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.data?.map((item: IProduct) => (
            <TableRow key={item._id}>
              <TableCell className="p-2 sm:p-4">
                <img
                  src={item.image_url}
                  className="h-[50px] w-[50px] sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px] object-cover rounded"
                  alt={item.name}
                />
              </TableCell>
              <TableCell className="p-2 sm:p-4">
                <span className="font-medium">{item.name}</span>
              </TableCell>
              <TableCell className="p-2 sm:p-4">
                <span className="font-medium">{item.price}</span>
              </TableCell>
              <TableCell className="p-2 sm:p-4">
                <span className="font-medium">{item.category}</span>
              </TableCell>
              <TableCell className="p-2 sm:p-4 text-right">
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <ProductModal isEdit={true} product={item} />
                  <DeleteModal
                    id={item._id}
                    deleteMutation={deleteProductMutation}
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
