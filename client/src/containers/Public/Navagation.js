import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, NavLink, useSearchParams } from "react-router-dom";
import * as actions from "../../store/actions";
const notActive =
  "hover:bg-secondary2 h-full py-2 px-4 bg-secondary1 flex justify-center items-center";
const active = "hover:bg-secondary2 visit   h-full py-2 px-4 ";

const Navigation = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  const categoryCode = queryParams.categoryCode;

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  return (
    <div className="w-full flex justify-around items-center h-[40px]  bg-secondary1 text-white">
      <div className="w-3/5 h-full flex items-center  text-sm font-medium ">
        <NavLink
          to={`/`}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div
                key={item.code}
                className={`h-full flex justify-center items-center ${
                  categoryCode === item.code ? "bg-red-500" : ""
                }`}
              >
                <NavLink
                  to={{
                    pathname: "/",
                    search: createSearchParams({
                      ...queryParams,
                      categoryCode: item.code,
                    }).toString(),
                  }}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
