import React from "react";
import { NUMBER_REGEX } from "../ultils/constant";

const InputFormV2 = ({
  label,
  unit,
  value,
  onChange,
  name,
  type,
  small,
  invalidFields,
  setInvalidFields,
  direction = "flex-col",
}) => {
  const handleChange = (e) => {
    if (type === "number") {
      NUMBER_REGEX.test(e.target.value) && onChange(e);
    } else {
      onChange(e);
    }
  };

  return (
    <div className={`flex ${direction}`}>
      <label className="w-48 flex-none" htmlFor={name}>
        {" "}
        {label}
      </label>

      <div className="flex flex-auto flex-col items-center">
        <div className="flex w-full items-center">
          <input
            type="text"
            id={name}
            name={name}
            className={`${
              unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
            } outline-none border flex-auto border-gray-300 p-2`}
            value={value}
            onChange={handleChange}
            onFocus={() => setInvalidFields && setInvalidFields([])}
          />
          {unit && (
            <span className="rounded-tr-md rounded-br-md p-2 border flex-none w-16 flex items-center justify-center bg-gray-200">
              {unit}
            </span>
          )}
        </div>
        {invalidFields?.some((item) => item.name === name) && (
          <small className="text-red-500 block w-full">
            {invalidFields?.find((item) => item.name === name)?.message}
          </small>
        )}
      </div>
      {small && <small className="opacity-70 whitespace-nowrap">{small}</small>}
    </div>
  );
};

export default InputFormV2;
