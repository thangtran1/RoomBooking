import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Like = () => {
  const [posts, setPosts] = useState([]);
  const { currentData } = useSelector((state) => state.user);
  console.log("🚀 ~ Like ~ currentData:", currentData);

  useEffect(() => {
    const tokenString = localStorage.getItem("persist:auth");
    let token;

    if (tokenString) {
      try {
        const parsedAuth = JSON.parse(tokenString);
        token = parsedAuth?.token?.replace(/\"/g, "");
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }

    console.log("🚀 ~ handleHeartClick ~ token:", token);
    console.log("🚀 ~ useEffect ~ token:", token);

    axios
      .get("http://localhost:5000/api/v1/favorite/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPosts(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              Post ID: {post.postId} - User ID: {post.userId}
            </li>
          ))}
        </ul>
      ) : (
        <p>Danh sách ko có.</p>
      )}
    </div>
  );
};

export default Like;
