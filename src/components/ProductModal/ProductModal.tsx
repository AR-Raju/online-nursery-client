import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} from "@/redux/api/api";
import { ICategory, IProduct } from "@/types";
import { fileToBase64 } from "@/utils/fileToBase64";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface ProductModalProps {
  product?: IProduct;
  isEdit?: boolean;
}

export function ProductModal({ product, isEdit }: ProductModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: categories } = useGetCategoriesQuery(undefined);

  useEffect(() => {
    if (isEdit && product) {
      setValue("name", product.name);
      setValue("category", product.category);
      setValue("price", product.price);
      setValue("quantity", product.stock);
      setValue("description", product.description);
    }
  }, [isEdit, product, setValue]);

  const onSubmit = async (values: FieldValues) => {
    console.log(values);
    const file = values.picture?.[0];
    let image_base64;
    if (file) {
      try {
        image_base64 = await fileToBase64(file);
        image_base64 = image_base64.split(",")[1];
      } catch (error) {
        console.error("Error converting file to base64:", error);
        toast.error("Error processing image");
        return;
      }
    }

    const data: {
      name: string;
      description: string;
      category: string;
      price: number;
      stock: number;
      image_base64?: string;
    } = {
      name: values.name,
      description: values.description,
      category: values.category,
      price: values.price,
      stock: values.quantity,
    };

    if (image_base64) {
      data.image_base64 = image_base64;
    }

    try {
      const res = isEdit
        ? await updateProduct({ id: product?._id, data }).unwrap()
        : await addProduct({ data }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        setIsOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset(); // Reset the form when the modal is closed
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="">
          {!isEdit && <Plus className="mr-2 h-4 w-4" />}
          {isEdit ? "Update" : "Add Product"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-0 max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold text-nursery-secondary">
            {isEdit ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-grow overflow-hidden"
        >
          <div className="grid gap-4 py-4 text-gray-900 overflow-y-auto pr-4">
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-white" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter product name"
                className="col-span-3"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500">
                  {errors.name.message as string}
                </span>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-white" htmlFor="category">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories?.data?.map((category: ICategory) => (
                          <SelectItem key={category._id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <span className="text-red-500">
                  {errors.category.message as string}
                </span>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-white" htmlFor="price">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter product price"
                className="col-span-3"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <span className="text-red-500">
                  {errors.price.message as string}
                </span>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-white" htmlFor="quantity">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter product quantity"
                className="col-span-3"
                {...register("quantity", { required: "Quantity is required" })}
              />
              {errors.quantity && (
                <span className="text-red-500">
                  {errors.quantity.message as string}
                </span>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-white" htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                className="col-span-3"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message as string}
                </span>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-white" htmlFor="picture">
                Image
              </Label>
              <Input
                id="picture"
                type="file"
                {...register(
                  "picture",
                  isEdit ? {} : { required: "Image is required" }
                )}
              />
              {errors.picture && (
                <span className="text-red-500">
                  {errors.picture.message as string}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              {isAdding || isUpdating ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
