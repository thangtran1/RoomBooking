import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  NavLink,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import * as actions from "../../store/actions";

const Navigation = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  const categoryCode = queryParams.categoryCode;

  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);

  return (
    <div
      className={`w-full flex ${
        isAdmin ? "justify-start" : "justify-center"
      } items-center h-[40px] bg-secondary1 text-white`}
    >
      <div className="w-3/5 h-full flex items-center text-sm font-medium">
        <NavLink
          to="/"
          className={`hover:bg-secondary2 h-full py-2 px-4 ${
            !categoryCode ? "bg-secondary2" : "bg-secondary1"
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
      </div>
    </div>
  );
};

export default Navigation;
