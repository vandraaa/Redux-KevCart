import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../services/productService";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../redux/wishlistSlice";
import Swal from "sweetalert2";
import emptyWishlistImage from "../../public/empty-wishlist.svg";
import { addToCart } from "../redux/cartSlice";

const Wishlist = ({ closeWishlist }) => {
  const wishlist = useSelector((state) => state.wishlist.data);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch products:", error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  });

  const handleRemoveFromWishlist = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You will delete this product from the wishlist?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromWishlist({ id }));
        Swal.fire({
          icon: "success",
          title: "Remove from wishlist successfully!",
          text: "Thank you for shopping with us!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleWishlistToCart = (id) => {
    dispatch(addToCart({ id: id, qty: 1 }));
    dispatch(removeFromWishlist({ id }));
    Swal.fire({
      icon: "success",
      title: "Add to cart successfully!",
      text: "Thank you for shopping with us!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-75 transition-opacity duration-300"
        onClick={closeWishlist}
      />
      <div className="max-h-[70vh] h-full w-full max-w-3xl overflow-y-scroll bg-white rounded-lg shadow-lg m-4 relative">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800">
              My Wishlist
            </h2>
          </div>

          {isLoading ? (
            <div className="h-[40vh] flex items-center justify-center">
              <Loading />
            </div>
          ) : wishlist.length > 0 && products.length > 0 ? (
            wishlist.map((item) => {
              const product = products.find((p) => p.id === item.id);
              return (
                <div
                  className="flex items-center justify-between mb-6"
                  key={item.id}
                >
                  <div className="flex items-center">
                    <div className="h-24">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-16 md:w-24 object-contain rounded-md"
                      />
                    </div>
                    <div className="ml-4 w-3/5">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={closeWishlist}
                        className="text-[10px] sm:text-base font-semibold text-slate-600 mb-2"
                      >
                        <p className="leading-3 md:leading-[1.2rem]">
                          {product.title}
                        </p>
                      </Link>
                      <div className="flex gap-x-2 mt-1 md:mt-2">
                        <p className="text-md font-bold">
                          ${product.price.toFixed(2)}
                        </p>
                        <button onClick={() => handleWishlistToCart(item.id)} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-2 text-[9px] rounded">
                          <FontAwesomeIcon icon={faCartPlus} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="text-lg font-semibold text-red-600 px-3 py-2 rounded-xl"
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col justify-center items-center space-y-2 mt-8">
              <img src={emptyWishlistImage} className="h-32" />
              <p className="text-center text-gray-500 font-medium">
                Your wishlist is empty.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
