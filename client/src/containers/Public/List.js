import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import instance from "../../axiosConfig";
import { Item } from "../../components";
import { getPostsLimit } from "../../store/actions/post";

const List = ({ categoryCode, posts }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [favouriteList, setFavouriteList] = useState([]);
  const favouritePostIds = favouriteList.map((item) => item.postId);

  const getPostsLiked = async () => {
    const res = await instance.get("/api/v1/favorite/get-all");
    setFavouriteList(res.data.response);
  };

  useEffect(() => {
    isLoggedIn && getPostsLiked();
  }, [isLoggedIn]);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });

    if (categoryCode) searchParamsObject.categoryCode = categoryCode;

    if (sort === 1) searchParamsObject.order = ["createdAt", "DESC"];
    dispatch(getPostsLimit(searchParamsObject));
  }, [searchParams, categoryCode, sort, dispatch]);

  const sortedPosts =
    posts
      ?.filter((item) => item?.status === "approved")
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sort === 1 ? dateB - dateA : dateA - dateB;
      }) || [];
  // const array = [
  //   { date: "2018-05-11" },
  //   { date: "2018-05-12" },
  //   { date: "2018-05-10" },
  // ];
  // const sortedArray = array.sort(
  //   (a, b) =>
  //     new moment(a.date).format("YYYYMMDD") -
  //     new moment(b.date).format("YYYYMMDD")
  // );
  // console.log(sortedArray);
  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-5">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span>Cập nhật 12:04 25/08/2025</span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp: </span>
        <span
          onClick={() => setSort(0)}
          className={`bg-gray-200 cursor-pointer p-2 rounded-md hover:underline ${
            sort === 0 && "text-red-500"
          } `}
        >
          Mặc định
        </span>
        <span
          onClick={() => setSort(1)}
          className={`bg-gray-200 cursor-pointer p-2 rounded-md hover:underline ${
            sort === 1 && "text-red-500"
          } `}
        >
          Mới nhất
        </span>
      </div>
      <div className="items">
        {sortedPosts.length > 0 &&
          sortedPosts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.image)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                id={item?.id}
                isLiked={favouritePostIds.includes(item.id)}
                getPostsLiked={getPostsLiked}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
