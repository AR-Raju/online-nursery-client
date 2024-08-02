/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteModalProps {
  id: string;
  deleteMutation: any; // This can be typed more specifically if needed
}

export function DeleteModal({ id, deleteMutation }: DeleteModalProps) {
  const [deleteItem, { isLoading }] = deleteMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteItem(id).unwrap();
      toast.success("Item deleted successfully");
      setIsOpen(false); // Close the modal on successful deletion
    } catch (error) {
      console.error("Failed to delete the item: ", error);
      toast.error("Failed to delete the item");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto bg-red-500 text-white text-xs sm:text-sm"
          onClick={() => setIsOpen(true)}
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold text-white mb-4">
            Are you sure you want to delete this?
          </DialogTitle>
          <DialogFooter>
            <Button className="w-full" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="w-full bg-red-500 hover:bg-red-500 text-white text-xs sm:text-sm"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
