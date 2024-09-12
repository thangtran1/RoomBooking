import actionTypes from "./actionType";
import * as apis from "../../services";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCurrent();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT,
        currentData: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT,
        currentData: response.data?.msg || null,
        msg: response.data.msg,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.GET_CURRENT,
      currentData: null,
      msg: e,
    });
  }
};
