import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const CountCart = (props) => {
  const { itemCount, minus, plus } = props;
  return (
    <div className="flex font-semibold text-xs">
      <button
      onClick={minus}
        className="p-2 border-y-2 border-s-2">
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <p className="py-2 px-3 border-2">{itemCount}</p>
      <button 
      onClick={plus}
      className="p-2 border-y-2 border-e-2">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default CountCart;
