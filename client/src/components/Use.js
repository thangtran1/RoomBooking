import React from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/anon.avatar.png";

const Use = () => {
  const { currentData } = useSelector((state) => state.user);
  return (
    <>
      {currentData && Object.keys(currentData).length > 0 && (
        <div className="flex items-center gap-2 md:flex">
          <img
            src={currentData?.avatar || anonAvatar}
            alt="anonAvatar"
            className="w-12 h-10 object-cover rounded-full border-2 border-white shadow-md"
          />
          <div className="flex flex-col">
            <span>
              Xin chào,
              <span className="font-semibold">
                {currentData?.name
                  ? currentData.name.length > 5
                    ? `${currentData.name.slice(0, 5)}...`
                    : currentData.name
                  : ""}
              </span>
            </span>
            <span>
              Mã tài khoản:{" "}
              <span className="font-medium">
                {currentData?.id
                  ? currentData.id.toString().length > 5
                    ? `${currentData.id
                        .toString()
                        .match(/\d/g)
                        .join("")
                        .slice(0, 5)}...`
                    : currentData.id
                  : ""}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Use;
