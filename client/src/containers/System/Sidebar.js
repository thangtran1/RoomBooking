import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Switch } from "antd";
import anonAvatar from "../../assets/anon.avatar.png";
import * as actions from "../../store/actions";
import icons from "../../ultils/icons";
import menuSidebar from "../../ultils/menuSidebar";

const { MdManageAccounts, AiOutlineLogout, BiUserPin, TbCategory, TbArticle } =
  icons;

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const isAdmin = currentData?.role === "admin";

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const activeStyle = isDarkMode
    ? "flex items-center hover:bg-gray-700 gap-2 py-2 font-bold bg-gray-700 rounded-md text-white"
    : "flex items-center hover:bg-gray-200 gap-2 py-2 font-bold bg-gray-200 rounded-md";

  const notActiveStyle = isDarkMode
    ? "cursor-pointer flex items-center gap-2 hover:bg-gray-700 py-2 rounded-md text-white"
    : "cursor-pointer flex items-center gap-2 hover:bg-gray-200 py-2 rounded-md";

  const filteredMenuSidebar = menuSidebar.filter((item) => {
    if (isAdmin) {
      return !["Liên hệ"].includes(item.text);
    }
    return true;
  });

  return (
    <header className={`${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div
        className={`w-[256px] flex-none p-4 flex flex-col gap-6 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentData?.avatar || anonAvatar}
              alt="avatar"
              className="w-12 h-12 object-cover rounded-full border-2 border-white"
            />
            <div className="flex flex-col justify-center">
              <span className="font-semibold">
                {currentData?.name
                  ? currentData.name.length > 5
                    ? `${currentData.name.slice(0, 8)}...`
                    : currentData.name
                  : ""}
              </span>
              <small className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                {currentData?.phone}
              </small>
            </div>
          </div>
          <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
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
              <div onClick={toggleSubmenu}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                  to="/he-thong/quan-ly-admin"
                >
                  <MdManageAccounts />
                  Quản lý Admin
                </NavLink>
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
        <div className="mt-auto">
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
          />
        </div>
      </div>
    </header>
  );
};

export default Sidebar;
