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
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/api";
import { ICategory } from "@/types";
import { fileToBase64 } from "@/utils/fileToBase64";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "../ui/label";

interface CategoryModalProps {
  category?: ICategory;
  isEdit?: boolean;
}

export function CategoryModal({ category, isEdit }: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (isEdit && category) {
      setValue("title", category.name);
    }
  }, [isEdit, category, setValue]);

  const onSubmit = async (values: FieldValues) => {
    const file = values.picture[0]; // Ensure you're getting the first file
    let image_base64;
    if (file) {
      try {
        image_base64 = await fileToBase64(file);
        // Remove the data:image/xxx;base64, prefix
        image_base64 = image_base64.split(",")[1];
      } catch (error) {
        console.error("Error converting file to base64:", error);
        toast.error("Error processing image");
        return;
      }
    }

    const data = {
      name: values.title,
      image_base64: image_base64,
    };

    try {
      const res = isEdit
        ? await updateCategory({ id: category?._id, data }).unwrap()
        : await addCategory({ data }).unwrap();
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
          {isEdit ? "Update" : "Add Category"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold text-nursery-secondary">
            Add Category
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 text-gray-900 justify-items-center">
            <div className="grid w-full  items-center gap-1.5">
              <Label className="text-white" htmlFor="title">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter your title"
                className="col-span-3"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500">
                  {errors.title.message as string}
                </span>
              )}
            </div>
            <div className="grid w-full  items-center gap-1.5">
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
