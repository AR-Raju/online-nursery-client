import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccessScreen = () => {
  return (
    <div className="flex flex-col items-center min-h-[86vh] justify-center bg-gray-50 p-4">
      <CheckCircleIcon className="w-24 h-24 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link to="/">
        <Button className="px-6 py-2 text-lg bg-nursery-primary text-white rounded-lg shadow-md hover:bg-nursery-primary-dark transition duration-300">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default OrderSuccessScreen;
