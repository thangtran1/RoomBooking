import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import instance from "../../axiosConfig";
import { Item, CountLikePost, RelatedPost } from "../../components";
const Like = () => {
  const [favouriteList, setFavouriteList] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const getPostsLiked = async () => {
    const res = await instance.get("/api/v1/favorite/get-all");
    setFavouriteList(res.data.response);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getPostsLiked();
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full flex gap-4">
      <div className="w-[70%] ">
        <div className="w-full p-4 bg-white shadow-md rounded-md">
          <h4 className="text-xl font-semibold mb-4">
            Danh sách bài viết yêu thích
          </h4>
          <div className="items">
            {favouriteList.length > 0 ? (
              favouriteList.map((item) => (
                <Item
                  key={item.id}
                  address={item.post?.address}
                  attributes={item.post?.attributes}
                  description={JSON.parse(item.post?.description)}
                  images={JSON.parse(item.post?.images?.image)}
                  star={+item.post?.star}
                  title={item.post?.title}
                  user={item?.user}
                  id={item.post?.id}
                  isLiked={true}
                  getPostsLiked={getPostsLiked}
                />
              ))
            ) : (
              <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="flex gap-2 items-center justify-center flex-col">
                  <FaHeart size={60} className="text-red-500 " />
                  <p className="text-red-500 text-xl font-medium">
                    Danh sách rỗng
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[30%] flex flex-col">
        <CountLikePost />
        <RelatedPost />
      </div>
    </div>
  );
};

export default Like;
