import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        event.preventDefault();
        event.returnValue =
          "Data will be lost if you leave the page, are you sure?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);
  return (
    <div className="">
      <Navbar />
      <Outlet></Outlet>
      <Footer></Footer>
      {/* <ReloadWarningModal /> */}
    </div>
  );
};
export default MainLayout;
