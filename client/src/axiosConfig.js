import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // găn token vào header
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = {
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    //refresh token
    return response;
  },
  function (error) {
    console.log("🚀 ~ error:", error);
    return Promise.reject(error);
  }
);

export default instance;
