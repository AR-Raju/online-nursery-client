import AdvancedProductSearch from "@/components/AdvancedSearch/AdvancedSearch";
import MainLayout from "@/components/Layouts/MainLayouts";
import OrderSuccessScreen from "@/components/orders/orderSuccessScreen";
import LandingPage from "@/pages/Home/LandingPage";
import ProductDetails from "@/pages/Products/ProductDetails";
import Products from "@/pages/Products/Products";
import CartPage from "@/pages/cart/CartPage";
import CheckoutPage from "@/pages/cart/Checkout";
import CategoryManagement from "@/pages/product_and_category_management/CategoryManagement";
import NotFound from "@/pages/shared/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProductManagement from "../pages/product_and_category_management/ProductManagement";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/advanced-search",
        element: <AdvancedProductSearch />,
      },
      {
        path: "/orderSuccess",
        element: <OrderSuccessScreen />,
      },
      {
        path: "/product-management",
        element: <ProductManagement />,
      },
      {
        path: "/category-management",
        element: <CategoryManagement />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
