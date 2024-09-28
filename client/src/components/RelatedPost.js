import React, { useEffect, useState } from "react";
import { Sitem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
const RelatedPost = ({ newPost }) => {
  const { newPosts, outStandingPost } = useSelector((state) => state.post);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    newPost
      ? dispatch(actions.getNewPosts())
      : dispatch(actions.getOutstandingPost());
  }, [dispatch, newPost]);
  useEffect(() => {
    newPost ? setPosts(newPosts) : setPosts(outStandingPost);
  }, [outStandingPost, newPosts, newPost]);

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg">
        {newPost ? "Tin mới đăng" : "Tin nổi bật"}
      </h3>
      <div className="w-full">
        {posts?.map((item) => {
          return (
            <Sitem
              key={item.id}
              title={item.title}
              price={item?.attributes?.price}
              createdAt={item.createdAt}
              image={JSON.parse(item.images.image)}
              star={item.star}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPost;
