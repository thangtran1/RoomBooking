import axios from "../axiosConfig";
import axiosDefault from "axios";
export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/price/all",
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiGetAreas = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/area/all",
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/province/all",
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: "https://provinces.open-api.vn/api/?depth=1",
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiGetPublicDistrict = async (provinceCode) => {
  try {
    const response = await axiosDefault.get(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
