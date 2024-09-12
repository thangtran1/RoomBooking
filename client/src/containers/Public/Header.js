import React, { useCallback, useRef, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import removeBgLogo from "../../assets/logo-removebg-preview.png";
import { Button, Use } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/menuManage";

const { AiOutlinePlusCircle, AiOutlineLogout, BsChevronDown } = icons;

const Header = ({ page }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [isShowMenu, setIsShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  const [searchParams] = useSearchParams();

  // const divRef = useRef();
  // useEffect(() => {
  //     divRef.current.scrollIntoView({ behavior: "smooth", block: 'start' })
  // }, [searchParams.get('page')])
  // ref={divRef}
  return (
    <div className="w-3/5">
      <div className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={removeBgLogo}
            alt="logo"
            className="w-[240PX] H-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              <small>PhongtroLaLaHome.com xin chào !</small>
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />

              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}

          {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <Use />
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-blue-700"
                px="px-4"
                IcAfter={BsChevronDown}
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className="absolute min-w-200  top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col ">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="flex items-center gap-2 hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2"
                        key={item.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                  <span
                    className="cursor-pointer flex items-center gap-2 hover:text-orange-500 text-blue-600 py-2"
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
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={AiOutlinePlusCircle}
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
