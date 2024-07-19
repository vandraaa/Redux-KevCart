import { faCartPlus, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const CardProduct = ({ isWishlisted, img, title, category, to, rate, countRate, price, handleAddToCart, handleAddToWishlist }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className="flex flex-col bg-white border shadow-sm rounded-xl pt-2 pb-8 relative"
    >
      <button className="absolute top-3 right-4 z-10" onClick={handleAddToWishlist}>
        <FontAwesomeIcon icon={faHeartSolid} className={`${isWishlisted ? "text-red-500" : "text-slate-400"} hover:text-red-500 duration-300 ease-in-out`} />
      </button>
      <div className="w-full h-48 flex justify-center items-center overflow-hidden">
        <img className="object-contain h-full p-4 hover:scale-105 duration-300 ease-out" src={img} alt={title} />
      </div>
      <div className="bg-[#FCE7F3] text-center py-1">
        <p className="text-slate-700 text-[10px] font-semibold">
          {capitalizeFirstLetter(category)}
        </p>
      </div>
      <div className="px-6 pt-3 pb-7">
        <Link to={to} className="text-xs md:text-sm font-semibold text-slate-600">
          <p className="leading-[.90rem] md:leading-[1.05rem]">{capitalizeFirstLetter(title)}</p>
        </Link>
        <div className="flex flex-col md:flex-row items-start md:items-center mt-2 mb-4 md:mb-3 lg:mb-2 gap-x-2">
          <Rating defaultValue={rate} precision={0.5} size="small" readOnly />
          <p className="font-semibold text-[10px] opacity-70">
            {countRate} Reviews
          </p>
        </div>
      </div>
      <div className="bg-[#CCFBF1] rounded-xl mx-6 absolute bottom-3 w-[calc(100%-3rem)]">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-bold text-black ms-3">${price}</p>
          <button className="rounded-xl bg-[#115E59] h-10 w-10" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartPlus} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
