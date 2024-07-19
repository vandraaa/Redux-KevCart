import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ type, name, id, placeholder, value, oc, customStyles, icon }) => {
  return (
    <div className="relative flex items-center">
      <FontAwesomeIcon
        icon={icon}
        className="absolute left-3"
      />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={oc}
        className={`py-2 pl-10 pr-4 ${customStyles} w-full block outline-none rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none`}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
    </div>
  );
};

export default Input;
