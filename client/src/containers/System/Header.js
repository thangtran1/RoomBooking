import React from "react";
import { Navigation } from "../Public";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="w-full flex flex-none h-[40px] ">
      <div className="flex justify-center   items-center font-bold bg-secondary1 text-white w-[256px] flex-none">
        <Link to="/" className="text-2xl">
          {/* <img
            src={logoHead}
            alt="logo"
            className="w-[105px] h-[60px] text-red-900  object-contain hidden lg:block"
          /> */}
          Trọ Mới
        </Link>
      </div>
      <div className="flex-auto">
        <Navigation isAdmin={true} />
      </div>
    </div>
  );
};

export default Header;
