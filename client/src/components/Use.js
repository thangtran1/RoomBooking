import React from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/anon.avatar.png";
import { blobToBase64 } from "../ultils/Common/toBase64";

const Use = () => {
  const { currentData } = useSelector((state) => state.user);
  return (
    <>
      {currentData && Object.keys(currentData).length > 0 && (
        <div className="flex items-center gap-2">
          <img
            src={blobToBase64(currentData?.avatar) || anonAvatar}
            alt="anonAvatar"
            className="w-12 h-10 object-cover rounded-full border-2 border-white shadow-md"
          />
          <div className="flex flex-col ">
            <span>
              Xin chào,
              <span className="font-semibold">{currentData?.name}</span>
            </span>
            <span>
              Mã tài khoản:{" "}
              <span className="font-medium">{`${
                currentData?.id
                  ?.toString()
                  .match(/\d/g)
                  .join("")
                  ?.slice(0, 6) || ""
              }...`}</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Use;
