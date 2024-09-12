import React from "react";

const InputReadOnly = ({ label, value }) => {
  return (
    <div className="flex flex-col fap-2">
      <label className="font-medium" htmlFor="exactly-address">
        {label}
      </label>
      <input
        value={value || ""}
        id="exactly-address"
        type="text"
        readOnly
        className=" outline-none border border-gray-200 rounded-md bg-gray-100 p-2 w-full"
      />
    </div>
  );
};

export default InputReadOnly;
