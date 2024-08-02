import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Menu, TreesIcon, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { to: "/products", label: "Products" },
    {
      to: "/cart",
      label: (
        <div className="relative">
          Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs font-bold px-2">
              {cartItemCount}
            </span>
          )}
        </div>
      ),
    },
    { to: "/product-management", label: "Product Management" },
    { to: "/category-management", label: "Category Management" },
  ];

  return (
    <div className="mx-auto container">
      <div className="flex items-center justify-between border-b-2 py-3">
        <Link to="/" className="flex items-center">
          <h3 className="font-extrabold bg-nursery-primary text-white p-1 rounded-md">
            SR Nursery
          </h3>
          <TreesIcon className="mx-3" />
        </Link>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <div className="flex justify-end">
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link to={item.to}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="w-full text-center py-2 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
