import axios from "../axiosConfig";
export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await axios({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });

export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await axios({
        method: "put",
        url: "/api/v1/user/",
        data: payload,
      });
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });
