import { strings } from "../constants";
import httpClient from "./httpClient";

export const onApiCall = async ({
  method,
  url,
  data,
  isFileUpload = false,
}) => {
  const constructHeaders = () => {
    if (isFileUpload) {
      return {
        common: { "Content-Type": "multipart/form-data" },
      };
    } else {
      return {
        common: { "Content-Type": "application/json" },
      };
    }
  };
  console.log(`===> Request: ${method} ${url}, data: ${JSON.stringify(data)}`);
  try {
    const response = await httpClient.request({
      url,
      method,
      data,
      headers: constructHeaders(),
    });

    console.log(
      `<=== Response: status: ${response?.status}, data: ${JSON.stringify(
        response?.data
      )}`
    );
    return {
      data: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.log(
      `ERROR: ${method} ${url}, status: ${
        response?.status
      } data: ${JSON.stringify(error)}`
    );
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        data: error.response.data.error,
        status: error.response.status,
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the
      // browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
      return {
        data: strings.apierror,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        data: strings.apierror,
      };
    }
  }
};
