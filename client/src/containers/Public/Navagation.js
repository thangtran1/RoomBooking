import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  NavLink,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import * as actions from "../../store/actions";
import { path } from "../../ultils/constant";

const Navigation = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  const categoryCode = queryParams.categoryCode;

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div
      className={`w-full flex ${
        isAdmin ? "justify-start" : "justify-center"
      } items-center h-[40px] bg-secondary1 text-white`}
    >
      <div className="w-4/5 h-full flex items-center text-sm font-medium">
        <NavLink
          to="/"
          className={`hover:bg-secondary2 h-full py-2 px-4 ${
            pathname === "/" && !categoryCode
              ? "bg-secondary2"
              : "bg-secondary1"
          }`}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => (
            <NavLink
              key={item.code}
              to={{
                pathname: "/",
                search: createSearchParams({
                  ...queryParams,
                  categoryCode: item.code,
                }).toString(),
              }}
              className={`hover:bg-secondary2 h-full py-2 px-4 ${
                categoryCode === item.code ? "bg-secondary2" : "bg-secondary1"
              }`}
            >
              {item.value}
            </NavLink>
          ))}
        <NavLink
          to={`/${path.CONTACT}`}
          className={`hover:bg-secondary2 h-full py-2 px-4 ${
            pathname === `/${path.CONTACT}` ? "bg-secondary2" : "bg-secondary1"
          }`}
        >
          Liên hệ
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
