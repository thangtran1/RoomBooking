import actionTypes from "./actionType";
import {
  apiGetPosts,
  apiGetPostsLimit,
  apiGetNewPosts,
  apiGetPostsLimitAdmin,
} from "../../services/post";

export const getPosts = () => async (dispatch) => {
  try {
    const respone = await apiGetPosts();
    if (respone?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: respone.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        data: respone.data.msg,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.GET_POSTS,
      post: null,
    });
  }
};

export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.msg,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      posts: null,
    });
  }
};

export const getNewPosts = () => async (dispatch) => {
  try {
    const response = await apiGetNewPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POST,
        payload: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POST,
        data: response.data.msg,
        payload: null,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.GET_NEW_POST,
      payload: null,
    });
  }
};

// tin nổi bật
export const getOutstandingPost = () => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit({
      limitPost: 5,
      order: ["star", "DESC"],
    });
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_OUTSTANDING,
        outStandingPost: response.data.response.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_OUTSTANDING,
        data: response.data.msg,
        outStandingPost: null,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.GET_OUTSTANDING,
      outStandingPost: null,
    });
  }
};

export const getPostsLimitAdmin = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimitAdmin(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_ADMIN,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_ADMIN,
        posts: response.data.msg,
        posts: null,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      posts: null,
    });
  }
};

export const editData = (dataEdit) => ({
  type: actionTypes.EDIT_DATA,
  dataEdit,
});

export const resetDataEdit = () => ({
  type: actionTypes.RESET_DATAEDIT,
});
