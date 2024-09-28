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
      return { success: true };
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: respone.data.msg,
      });
      return { success: false, msg: respone.data.msg };
    }
  } catch (e) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
    return { success: false, msg: "Đăng ký thất bại" };
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
      return { success: true };
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: respone.data.msg,
      });
      return { success: false, msg: respone.data.msg };
    }
  } catch (e) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
    return { success: false, msg: "Đăng nhập thất bại" };
  }
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
