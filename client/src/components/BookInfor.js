import React, { memo } from "react";
import anonAvatar from "../assets/anon.avatar.png";
import icons from "../ultils/icons";
const { BsDot, FaPhoneAlt, SiZalo } = icons;
const BookInfor = ({ userData }) => {
  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center gap-4 p-4">
      <img
        src={anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium text-xl"> {userData?.name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={40} />
        <span>Đang hoạt động</span>
      </span>
      <a
        href={`tel:${userData?.phone}`}
        className="bg-[#13BB7B] py-2 text-white font-bold text-lg flex items-center justify-center gap-2 w-full rounded-md"
      >
        <FaPhoneAlt /> {userData?.phone}
      </a>

      <a
        href={`https://zalo.me/${userData?.zalo}`}
        className="bg-white py-2  font-bold text-lg flex items-center justify-center gap-2 w-full rounded-md"
      >
        <SiZalo color="blue" size={35} />
      </a>
    </div>
  );
};

export default memo(BookInfor);
