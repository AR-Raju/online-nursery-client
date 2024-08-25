import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    <div className="container min-h-[85vh] mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => {
          const totalPrice = item.price * item.quantity;
          return (
            <Card key={item._id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
                    <img
                      src={item.image_url}
                      className="h-[200px] w-full object-cover rounded-lg"
                      alt={item.name}
                    />
                  </div>
                  <div className="w-full sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold mb-2">
                        {item.name}
                      </CardTitle>
                      <p className="text-lg text-gray-400 mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-lg text-gray-400 mb-4">
                        Price: ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="flex gap-2 mb-4 sm:mb-0">
                        <Button
                          onClick={() => handleDecreaseQuantity(item._id)}
                        >
                          -
                        </Button>
                        <Button
                          onClick={() => handleIncreaseQuantity(item._id)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="w-full sm:w-auto"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
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
