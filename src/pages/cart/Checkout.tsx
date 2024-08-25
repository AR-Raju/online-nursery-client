import { FieldValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePlaceOrderMutation } from "@/redux/api/api";
import { clearCart } from "@/redux/feature/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const [placeOrder] = usePlaceOrderMutation();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // Check stock availability
    const isStockAvailable = cartItems.every(
      (item) => item.quantity <= item.stock
    );
    if (!isStockAvailable) {
      toast.error(
        "Some products are out of stock. Please remove or update quantities."
      );
      return;
    }

    // Create order with customer details
    const order = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };

    // Dispatch action to place order
    try {
      console.log({ order });
      const res = await placeOrder({ order }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        reset();
        dispatch(clearCart());
        navigate("/orderSuccess");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
    // Handle payment (Stripe or COD) based on user selection
    // Redirect to payment gateway or confirmation page
  };

  return (
    <div className="min-h-[85vh] bg-nursery-secondary flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Checkout Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-white" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="col-span-3"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500">
              {errors.name.message as string}
            </span>
          )}
        </div>

        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-white" htmlFor="name">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="text"
            placeholder="Enter your phone number"
            className="col-span-3"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
          />
          {errors.phoneNumber && (
            <span className="text-red-500">
              {errors.phoneNumber.message as string}
            </span>
          )}
        </div>

        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-white" htmlFor="name">
            Address
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Enter your address"
            className="col-span-3"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <span className="text-red-500">
              {errors.address.message as string}
            </span>
          )}
        </div>

        {/* Add payment option components here */}

        <Button type="submit" className="mt-4">
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
