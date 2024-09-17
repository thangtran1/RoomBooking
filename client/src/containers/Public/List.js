import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Item } from "../../components";
import { getPostsLimit } from "../../store/actions/post";

const List = ({ posts, categoryCode }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(0);

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
  }, [searchParams, categoryCode, sort]);

  return (
    <div className="w-full  p-2 bg-white shadow-md rounded-md px-5">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span>Cập nhật 12:04 25/08/2025</span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp: </span>
        <span
          onClick={() => setSort(0)}
          className={`bg-gray-200 cursor-pointer  p-2 rounded-md hover:underline ${
            sort === 0 && "text-red-500"
          } `}
        >
          Mặc định
        </span>
        <span
          onClick={() => setSort(1)}
          className={`bg-gray-200 cursor-pointer  p-2 rounded-md hover:underline ${
            sort === 1 && "text-red-500"
          } `}
        >
          Mới nhất
        </span>
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.image)}
                star={+item?.star} // từ string conver thành interger
                title={item?.title}
                user={item?.user}
                id={item?.id}
              />
            );
          })}
      </div>
    </div>
  );
};
export default List;
