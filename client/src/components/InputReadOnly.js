import React from "react";

const InputReadOnly = ({ label, value, direction, editPhone }) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col gap-2"} `}>
      <label className="font-medium w-48 flex-none " htmlFor="exactly-address">
        {label}
      </label>
      <div className="flex-auto">
        <input
          value={value || ""}
          id="exactly-address"
          type="text"
          readOnly
          className=" outline-none flex-auto border border-gray-200 rounded-md bg-gray-100 p-2 w-full"
        />
        {editPhone && (
          <small className="text-blue-500 py-4 cursor-pointer">
            Đổi số điện thoại
          </small>
        )}
      </div>
    </div>
  );
};

export default InputReadOnly;
