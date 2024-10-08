import axiosConfig from "../axiosConfig";
import axios from "axios";
export const apiGetPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/post/all",
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiGetPostsLimit = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit`,
        params: query,
      });
      resolve(response);
    } catch (e) {
      console.error("🚀 ~ apiGetPostsLimit ~ Error:", e);
      reject(e);
    }
  });

export const getPosts = (params) => {
  return axiosConfig.get("/api/v1/post", { params });
};

export const apiGetNewPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/new-post`,
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiUploadImages = (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data: images,
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiCreatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/post/create-new",
        data: payload,
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiGetPostsLimitAdmin = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit-admin`,
        params: query,
      });
      resolve(response);
    } catch (e) {
      console.error("🚀 ~ apiGetPostsLimit ~ Error:", e);
      reject(e);
    }
  });

export const apiUpdatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/v1/post/update`,
        data: payload,
      });
      resolve(response);
    } catch (e) {
      console.error("🚀 ~ apiGetPostsLimit ~ Error:", e);
      reject(e);
    }
  });

export const apiDeletePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/post/delete`,
        params: { postId },
      });
      resolve(response);
    } catch (e) {
      console.error("🚀 ~ apiGetPostsLimit ~ Error:", e);
      reject(e);
    }
  });
