import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../services/productService";
import Loading from "../components/Loading";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import emptyCartImage from "../../public/empty-cart.png";
import { Link } from "react-router-dom";

const Cart = ({ closeCart }) => {
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);
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
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((total, item) => {
        const product = products.find((product) => product.id === item.id);
        return total + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const handleRemoveFromCart = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You will delete this product from the cart",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart({ id }));
        Swal.fire({
          icon: "success",
          title: "Remove from cart successfully!",
          text: "Thank you for shopping with us!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You will clear all products from the cart",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(clearCart());
        Swal.fire({
          icon: "success",
          title: "Clear cart successfully!",
          text: "Thank you for shopping with us!",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-75 transition-opacity duration-300"
        onClick={closeCart}
      />
      <div className="max-h-[70vh] h-full w-full max-w-3xl overflow-y-scroll bg-white rounded-lg shadow-lg m-4 relative">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800">Shopping Cart</h2>
            {cart.length > 0 && (
              <button
                onClick={() => handleClearCart()}
                className="text-red-500 cursor-pointer md:text-base text-xs font-medium hover:text-red-700 duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                Clear Cart
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="h-[40vh] flex items-center justify-center">
              <Loading />
            </div>
          ) : cart.length > 0 && products.length > 0 ? (
            cart.map((item) => {
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
                      <Link to={`/product/${product.id}`} onClick={closeCart} className="text-[10px] sm:text-base font-semibold text-slate-600 mb-2">
                        <p className="leading-3 md:leading-[1.2rem]">{product.title}</p>
                      </Link>
                      <p className="text-md font-bold mt-2">
                        ${product.price.toFixed(2)} ({item.qty}x)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-lg font-semibold text-red-600 hover:text-white border-[2.5px] border-red-600 px-3 py-2 rounded-xl hover:bg-red-600 duration-300 ease-in"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col justify-center items-center space-y-2 mt-8">
              <img
                src={emptyCartImage}
                className="size-32"
              />
              <p className="text-center text-gray-500 font-medium">
                Your cart is empty.
              </p>
            </div>
          )}

          {cart.length > 0 && products.length > 0 && (
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center text-lg font-semibold text-gray-700">
                <p>
                  Subtotal :{" "}
                  <span className="text-xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </p>
                <button className="bg-green-700 font-semibold text-sm text-white py-2 px-4 rounded-lg hover:bg-green-800 duration-300 ease-linear">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
