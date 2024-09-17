import React, { useEffect, useState } from "react";
import { text } from "../../ultils/constant";
import { Province, ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from "./index";
import { useSearchParams } from "react-router-dom";
import { getPosts } from "../../services/post";
import { useSelector } from "react-redux";

const limit = 5;
const Homepage = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);
  const [postsData, setPostsData] = useState({ count: 0, rows: [] });
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  // const priceCode = searchParams.get("priceCode");

  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  const areaCode = searchParams.get("areaCode");
  const categoryCode = searchParams.get("categoryCode");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts({
        limit,
        page,
        priceMax,
        priceMin,
        areaCode,
        categoryCode,
      });
      setPostsData(data.data.response);
    };
    fetchData();
  }, [page, priceMax, priceMin, areaCode, categoryCode]); //limit

  const totalPages = Math.ceil(postsData.count / limit);

  return (
    <div className=" w-full flex flex-col gap-3">
      <div>
        <h1 className="text-center text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-600">{text.HOME_DESCRIPTION}</p>
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
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
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
        </div>
      </div>
    </div>
  );
};

export default Homepage;
