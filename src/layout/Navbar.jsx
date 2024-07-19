import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Wishlist from "./Wishlist";
import { getProducts } from "../services/productService";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [itemWishlistCount, setItemWishlistCount] = useState(0);
  const cartData = useSelector((state) => state.cart.data);
  const wishlistData = useSelector((state) => state.wishlist.data);

  useEffect(() => {
    if (cartData) {
      setItemCount(cartData.reduce((total, item) => (total += item.qty), 0));
    }
  }, [cartData]);

  useEffect(() => {
    if (wishlistData) {
      setItemWishlistCount(wishlistData.length);
    }
  })

  return (
    <>
      <header className="bg-gray-600 w-full fixed z-20">
        <nav className="flex justify-between items-center max-w-4xl w-11/12 mx-auto rounded-xl p-3">
          <Link
            to="/"
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-100 flex items-center"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
            KevCart
          </Link>
          <div className="flex gap-x-3">
            <div
              className="relative px-3 py-2 bg-[#657183] rounded-full cursor-pointer"
              onClick={() => setShowWishlist(true)}
            >
              {itemWishlistCount > 0 && (
                <p className="text-white text-[9px] font-bold absolute -top-1 -right-1 bg-red-500 w-4 h-4 flex items-center justify-center rounded-full">
                  {itemWishlistCount}
                </p>
              )}
              <FontAwesomeIcon
                icon={faHeart}
                className="text-white cursor-pointer size-4"
              />
            </div>
            <div
              className="relative px-3 py-2 bg-[#657183] rounded-full cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              {itemCount > 0 && (
                <p className="text-white text-[9px] font-bold absolute -top-1 -right-1 bg-red-500 w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </p>
              )}
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-white cursor-pointer size-4"
              />
            </div>
          </div>
        </nav>
      </header>
      {showCart && <Cart closeCart={() => setShowCart(false)} handleCheckout={() => handleCheckout()} />}
      {showWishlist && <Wishlist closeWishlist={() => setShowWishlist(false)} />}
    </>
  );
};

export default Navbar;
