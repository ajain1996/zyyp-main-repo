import axios from "axios";
import { store } from "../Setup";
const httpClient = axios.create({
  baseURL: "http://13.92.23.100:3000",
  timeout: 36000,
});

// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const {
      token,
      pwdToken,
      PasswordHeader,
      UserHeader,
      orgId,
      orgid,
      SucessData,
    } = store.getState().LoginReducer;

    if (pwdToken) {
      config.headers.Authorization = pwdToken;
    } else {
      let tokenHeader = token;
      if (!tokenHeader) {
        tokenHeader = SucessData?.result?.token;
      }
      config.headers.Authorization = tokenHeader;
    }

    let orgHeader = orgid;
    if (!orgHeader) {
      orgHeader = orgId;
    }
    if (orgHeader) {
      config.headers["OrganizationId"] = orgHeader;
    }
    // console.log(
    //   "Header: config = ",
    //   config,
    //   "PasswordHeader: ",
    //   PasswordHeader,
    //   "UserHeader: ",
    //   UserHeader
    // );
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    //console.error(`ERROR: ${JSON.stringify(error)}`);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      if (error.response.status === 401) {
        store.dispatch({ type: "LOGIN", payload: "5" });
      }
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the
      // browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    // console.log(error.config);

    return Promise.reject(error);
  }
);

export default httpClient;
