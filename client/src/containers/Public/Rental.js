import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ItemSidebar, Province, RelatedPost } from "../../components";
import { getPosts } from "../../services/post";
import * as actions from "../../store/actions";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { List, Pagination } from "./index";

const Rental = () => {
  const { prices, areas, categories } = useSelector((state) => state.app);
  const [postsData, setPostsData] = useState({ count: 0, rows: [] });
  const [page, setPage] = useState(1);
  const limit = 5;
  const location = useLocation();
  const dispatch = useDispatch();
  const [categoryCode, setCategoryCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts({ limit, page });
      setPostsData(data.data.response);
    };
    fetchData();
  }, [page, limit]);

  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);

  const [categoryCurrent, setCategoryCurrent] = useState("");

  useEffect(() => {
    if (categories?.length > 0) {
      const category = categories.find(
        (item) =>
          `/${formatVietnameseToString(item.value)}` === location.pathname
      );
      setCategoryCurrent(category);
      if (category) {
        setCategoryCode(category.code);
      } else {
        setCategoryCode("defaultCode");
      }
    }
  }, [location.pathname, categories]);

  const totalPages = Math.ceil(postsData.count / limit);

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-center text-[28px] font-bold">
          {categoryCurrent?.header}
        </h1>
        <p className="text-base text-gray-600">{categoryCurrent?.subheader}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List
            categoryCode={categoryCode}
            posts={postsData.rows}
            page={page}
            categories={categories}
          />
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalItems={postsData.count}
              setPage={setPage}
              limit={limit}
            />
          )}
        </div>
        <div className="flex gap-4 justify-start items-center flex-col w-[30%]">
          <ItemSidebar isDouble={true} content={prices} title="Xem theo giá" />
          <ItemSidebar
            isDouble={true}
            content={areas}
            title="Xem theo diện tích"
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Rental;
