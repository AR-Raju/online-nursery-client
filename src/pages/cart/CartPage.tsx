import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/feature/cartSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => {
          const totalPrice = item.price * item.quantity;
          return (
            <Card key={item._id} className="mb-4">
              <CardHeader className="p-2">
                <img
                  src={item.image_url}
                  className="h-[100px] w-full object-cover rounded-t-lg"
                  alt={item.name}
                />
              </CardHeader>
              <CardContent className="grid p-4">
                <CardTitle className="text-2xl font-bold">
                  {item.name}
                </CardTitle>
                <p className="text-lg text-gray-400">
                  Quantity: {item.quantity}
                </p>
                <p className="text-lg text-gray-400">Price: ${totalPrice}</p>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => handleDecreaseQuantity(item._id)}>
                    -
                  </Button>
                  <Button onClick={() => handleIncreaseQuantity(item._id)}>
                    +
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleRemoveFromCart(item._id)}>
                  Remove
                </Button>
              </CardFooter>
            </Card>
          );
        })
      )}
      {cartItems.length > 0 && (
        <>
          <Button onClick={handleClearCart} className="mt-4">
            Clear Cart
          </Button>
          <Link to="/checkout">
            <Button className="mt-4 ml-4">Proceed to Checkout</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
