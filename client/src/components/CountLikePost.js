import React, { useEffect, useState } from "react";
import { Sitem } from "./index";
import instance from "../axiosConfig";

const CountLikePost = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await instance.get("/api/v1/favorite/getLikeMany");
        if (response.data && response.data.response) {
          setLikedPosts(response.data.response.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg">Bài viết được like nhiều nhất</h3>
      <div className="w-full">
        {likedPosts?.map((item) => {
          return (
            <Sitem
              key={item.post.id}
              title={item.post?.title}
              price={item.post?.attributes?.price}
              createdAt={item.post?.createdAt}
              image={JSON.parse(item.post?.images?.image)}
              star={item.star}
              likeCount={item.likeCount}
              isCountLikePost={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CountLikePost;
