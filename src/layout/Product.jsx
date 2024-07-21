import { useEffect, useState } from "react";
import CardProduct from "../fragments/CardProduct";
import { getProducts } from "../services/productService";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Swal from "sweetalert2";
import Input from "../components/Input";
import notFoundImage from "../../public/no-product-found.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

const Product = ({ setIsLoaded }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.data);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setIsLoading(false);
        setIsLoaded(true);
      } catch (error) {
        console.log("Failed to fetch products:", error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [setIsLoaded]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ id: product.id, qty: 1 }));
    Swal.fire({
      icon: "success",
      title: "Add to cart successfully!",
      text: "Thank you for shopping with us!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleAddToWishlist = (product) => {
    if (isWishlisted(product.id)) {
      dispatch(removeFromWishlist({ id: product.id }));
    } else {
      dispatch(addToWishlist({ id: product.id }));
    }
  };

  useEffect(() => {
    const unique = ["All", ...new Set(products.map((item) => item.category))];
    setCategory(unique);
  }, [products]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full mx-[5%] mt-14">
        <div className="flex flex-col mx-auto m-6">
          {isLoading ? (
            <div className="flex justify-center w-full min-h-[85vh]">
              <Loading />
            </div>
          ) : (
            <>
              <div className="mx-auto lg:w-2/5 w-full md:w-3/5">
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search Product by Title...."
                  icon={faSearch}
                  oc={handleSearch}
                  customStyles={"border-[2.5px] border-[#4B5563]"}
                />
              </div>
              <div className="flex flex-wrap gap-y-2 gap-x-2 md:gap-x-3 my-8">
                {category.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleCategory(item)}
                    className={`${
                      selectedCategory === item ? "bg-[#4B5563] text-white" : ""
                    } border-[#4B5563] font-semibold text-xs px-2 py-2 md:text-md md:px-3 md:py-2 lg:text-sm lg:px-4 border-[2.5px] hover:bg-[#4B5563] hover:text-white duration-300 ease-in-out rounded-xl`}
                  >
                    {capitalizeFirstLetter(item)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredProducts.length > 0 &&
                  filteredProducts.map((product) => (
                    <CardProduct
                      key={product.id}
                      to={`/product/${product.id}`}
                      title={product.title}
                      img={product.image}
                      category={product.category}
                      price={product.price}
                      rate={product.rating.rate}
                      countRate={product.rating.count}
                      loading={false}
                      handleAddToCart={() => handleAddToCart(product)}
                      handleAddToWishlist={() => handleAddToWishlist(product)}
                      isWishlisted={isWishlisted(product.id)}
                    />
                  ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="flex justify-center w-full min-h-[65vh] sm:min-h-[75vh]">
                  <img
                    src={notFoundImage}
                    alt="No product found"
                    className="mx-auto h-[300px] "
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
