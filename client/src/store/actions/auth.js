import actionTypes from "./actionType";
import { apiRegister, apiLogin } from "../../services/auth";

export const register = (payload) => async (dispatch) => {
  try {
    const respone = await apiRegister(payload);

    if (respone?.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: respone.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: respone.data.msg,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const respone = await apiLogin(payload);

    if (respone?.data.err === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: respone.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: respone.data.msg,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
