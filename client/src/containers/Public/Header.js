import React, { useCallback, useState } from "react";
import { Button, Use } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/menuManage";
import { path } from "../../ultils/constant";
import logoHead from "../../assets/logoHead.png";
import { Switch } from "antd";

const {
  AiOutlinePlusCircle,
  AiOutlineLogout,
  BsChevronDown,
  MdManageAccounts,
} = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const goLogin = useCallback(
    (flag) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  const isAdmin = currentData?.role === "admin";

  const filteredMenuManage = menuManage.filter((item) => {
    if (isAdmin) {
      return item.text !== "";
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Thêm logic để áp dụng theme cho toàn bộ ứng dụng ở đây
  };

  return (
    <div
      className={`w-full ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-4/5 mx-auto flex items-center justify-between flex-wrap">
        <Link to={"/"}>
          <img
            src={logoHead}
            alt="logo"
            className="w-[205px] h-[60px] text-red-900  object-contain hidden lg:block"
          />
        </Link>
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <div className="flex items-center gap-1">
              <small>TroMoi.com xin chào !</small>
              <Button
                text={"Đăng nhập"}
                textColor={isDarkMode ? "text-black" : "text-white"}
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                textColor={isDarkMode ? "text-black" : "text-white"}
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 relative">
              <Use />
              <Button
                text={"Quản lý tài khoản"}
                textColor={isDarkMode ? "text-black" : "text-white"}
                bgColor="bg-blue-700"
                px="px-4"
                IcAfter={BsChevronDown}
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div
                  className={`absolute min-w-200 top-full ${
                    isDarkMode ? "bg-gray-700" : "bg-white"
                  } shadow-md rounded-md p-4 right-0 flex flex-col`}
                >
                  {filteredMenuManage.map((item) => (
                    <Link
                      className={`flex items-center gap-2 hover:text-orange-500 ${
                        isDarkMode ? "text-white" : "text-blue-600"
                      } border-b border-gray-200 py-2`}
                      key={item.id}
                      to={item?.path}
                    >
                      {item?.icon}
                      {item.text}
                    </Link>
                  ))}
                  {isAdmin && (
                    <Link
                      className={`flex items-center gap-2 hover:text-orange-500 ${
                        isDarkMode ? "text-white" : "text-blue-600"
                      } border-b border-gray-200 py-2`}
                      to="/he-thong/quan-ly-admin"
                    >
                      <MdManageAccounts />
                      Quản lý Admin
                    </Link>
                  )}
                  <span
                    className={`cursor-pointer flex items-center gap-2 hover:text-orange-500 ${
                      isDarkMode ? "text-white" : "text-blue-600"
                    } py-2`}
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                  >
                    <AiOutlineLogout />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          <Button
            text={"Đăng tin mới"}
            textColor={isDarkMode ? "text-black" : "text-white"}
            bgColor="bg-secondary2"
            IcAfter={AiOutlinePlusCircle}
            onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
          />
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
