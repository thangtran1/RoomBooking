import React, { useState } from "react";
import anonAvatar from "../../assets/anon.avatar.png";
import { useSelector, useDispatch } from "react-redux";
import menuSidebar from "../../ultils/menuSidebar";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { blobToBase64 } from "../../ultils/Common/toBase64";
import icons from "../../ultils/icons";

const { MdManageAccounts, AiOutlineLogout, BiUserPin, TbCategory, TbArticle } =
  icons;
const activeStyle =
  "flex items-center hover:bg-gray-200 gap-2 py-2 font-bold bg-gray-200 rounded-md";
const notActiveStyle =
  "cursor-pointer flex items-center gap-2 hover:bg-gray-200 py-2 rounded-md";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const isAdmin = currentData?.role === "admin";

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const filteredMenuSidebar = menuSidebar.filter((item) => {
    if (isAdmin) {
      return !["Quản lý tin đăng", "Liên hệ"].includes(item.text);
    }
    return true;
  });

  return (
    <div className="w-[256px] flex-none p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={blobToBase64(currentData?.avatar) || anonAvatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span>
          Mã thành viên:{" "}
          <small className="font-medium">
            {currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}
          </small>
        </span>
      </div>
      <div>
        {filteredMenuSidebar.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
            key={item.id}
            to={item?.path}
          >
            {item?.icon}
            {item.text}
          </NavLink>
        ))}
        {isAdmin && (
          <>
            <div className={notActiveStyle} onClick={toggleSubmenu}>
              <MdManageAccounts />
              Quản lý tài khoản người dùng
            </div>
            {isSubmenuOpen && (
              <div className="ml-6 flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                  to="/he-thong/quan-ly-user"
                >
                  <BiUserPin />
                  Danh sách người dùng
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                  to="/he-thong/quan-ly-danh-muc"
                >
                  <TbCategory />
                  Quản lý danh mục
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                  to="/he-thong/quan-ly-bai-dang-user"
                >
                  <TbArticle />
                  Quản lý bài đăng user
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                  to="/he-thong/quan-ly-phan-hoi"
                >
                  <TbArticle />
                  Quản lý phản hồi
                </NavLink>
              </div>
            )}
          </>
        )}
        <span
          onClick={() => dispatch(actions.logout())}
          className={notActiveStyle}
        >
          <AiOutlineLogout />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
