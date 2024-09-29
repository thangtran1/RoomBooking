import React, { useEffect, useState } from "react";
import { text } from "../../ultils/constant";
import {
  Province,
  ItemSidebar,
  RelatedPost,
  CountLikePost,
} from "../../components";
import { List, Pagination } from "./index";
import { useSearchParams } from "react-router-dom";
import { getPosts } from "../../services/post";
import { useSelector } from "react-redux";
const limit = 5;
const Homepage = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);
  const [postsData, setPostsData] = useState({ count: 0, rows: [] });
  const [page, setPage] = useState(1);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  const areaMin = searchParams.get("areaMin");
  const areaMax = searchParams.get("areaMax");

  const categoryCode = searchParams.get("categoryCode");
  const provinceCode = searchParams.get("provinceCode");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts({
        limit,
        page,
        priceMax,
        priceMin,
        areaMax,
        areaMin,
        categoryCode,
        provinceCode,
        status: "approved",
      });
      setPostsData(data.data.response);
    };
    fetchData();
  }, [page, priceMax, priceMin, areaMax, areaMin, categoryCode, provinceCode]); //limit

  const totalPages = Math.ceil(postsData.count / limit);

  return (
    <div className=" w-full flex flex-col gap-2">
      <div>
        <h1 className="text-center text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-600">{text.HOME_DESCRIPTION}</p>
        <p className=" font-bold text-lg text-gray-600  text-center">
          {text.HOME_SUB_TITLE}
        </p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List posts={postsData.rows} page={page} />
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalItems={postsData.count}
              setPage={setPage}
              limit={limit}
            />
          )}
          <div className=""></div>
        </div>
        <div className="flex gap-4 justify-start items-center flex-col w-[30%] ">
          <ItemSidebar
            content={categories}
            title="Danh sách cho thuê"
            searchParamKey="categoryCode"
          />
          <ItemSidebar
            isDouble={true}
            content={prices}
            title="Xem theo giá"
            searchParamKey="priceCode"
          />
          <ItemSidebar
            isDouble={true}
            content={areas}
            title="Xem theo diện tích"
            searchParamKey="areaCode"
          />
          <RelatedPost />
          {isLoggedIn ? (
            <CountLikePost />
          ) : (
            <p className="w-full bg-white rounded-md p-4">
              Đăng nhập hoặc đăng ký để xem các bài được yêu thích nhiều nhất.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
