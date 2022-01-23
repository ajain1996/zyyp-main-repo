import axios from "axios";
import base64 from "react-native-base64";
import { onApiCall } from "./CommonApi";
import { urlPath } from "./utils";
import EventSource from "react-native-sse";

const BASE_URL = "http://13.92.23.100:3000/onboardingnew";

export const SSE_URL = (sseBase64Id) => {
  return `${BASE_URL}/event?stream=${sseBase64Id}`;
};
const constructHeaders = () => ({
  "Content-Type": "application/json",
});

export const authSignup = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org`,
    method: "POST",
    data: formdata,
  });
};

export const authOtp = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/GenerateOtp`,
    method: "POST",
    data: formdata,
  });
};

export const authOtpValidation = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/ValidateEmailOtp`,
    method: "POST",
    data: formdata,
  });
};

export const authMobileOtpValidation = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/ValidateMobileOtp`,
    method: "POST",
    data: formdata,
  });
};

export const authPassword = (formdata) => {
  return axios.post(`${BASE_URL}/user/SetPassword`, formdata, {
    headers: constructHeaders(),
  });
};

export const authLogin = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/login`,
    method: "POST",
    data: formdata,
  });
};

export const authChangePassword = (formdata, token, id) => {
  const encText = base64.encode(id);

  const constructHeaders = () => ({
    Authorization: `Bearer ${token}`,
    OrganizationId: `OrganizationId base64 encoded ${encText}`,
    "Content-Type": "application/json",
  });
  return axios.put(`${BASE_URL}/user/password`, formdata, {
    headers: constructHeaders(),
  });
};

export const authPersonalDetails = (userid, token, id, formdata) => {
  var encText = base64.encode(JSON.stringify(id));

  const constructHeaders = () => ({
    Authorization: `${token}`,
    OrganizationId: `${encText}`,
    "Content-Type": "application/json",
  });
  return axios.post(`${BASE_URL}user/${userid}/address`, formdata, {
    headers: constructHeaders(),
  });
};

export const authEmirates = (userid, token, id, formdata) => {
  const encText = base64.encode(JSON.stringify(id));

  const constructHeaders = () => ({
    Authorization: `${token}`,
    OrganizationId: `${encText}`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  });
  return axios.put(`${BASE_URL}user/${userid}/identitycard`, formdata, {
    headers: constructHeaders(),
  });
};

export const authUsernameedit = (token, id, formdata) => {
  const encText = base64.encode(JSON.stringify(id));

  const constructHeaders = () => ({
    Authorization: `${token}`,
    OrganizationId: `${encText}`,
    Accept: "application/json",
  });
  return axios.put(`${BASE_URL}user`, formdata, {
    headers: constructHeaders(),
  });
};

export const onboardingTradeLicense = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/document`,
    method: "PUT",
    data: formdata,
    isFileUpload: true,
  });
};

export const onboardingAddressDetails = (body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/address`,
    method: "PUT",
    data: body,
  });
};

export const onboardingOwnerDetails = (body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user`,
    method: "PUT",
    data: body,
  });
};

export const onboardingEmiratesIdentity = (formdata, userId) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${userId}/document`,
    method: "PUT",
    data: formdata,
    isFileUpload: true,
  });
};

export const onboardingReplaceAdmin = (body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user`,
    method: "POST",
    data: body,
  });
};

export const onboardingAdmin = (body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/admin`,
    method: "PUT",
    data: body,
  });
};

export const onboardingShareHolder = (body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/shareholders`,
    method: "PUT",
    data: body,
  });
};

export const updateOrganization = (body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org`,
    method: "PUT",
    data: body,
  });
};

export const getOrganization = () => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org`,
    method: "GET",
    data: null,
  });
};

export const getOwnerUserData = (userId) => {
  return onApiCall({
    method: "GET",
    url: `/${urlPath.onBoarding}/api/v1/user/${userId}`,
    data: null,
  });
};

export const authEmail = (email) => {
  const encText = base64.encode(email);
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user?email=${encText}`,
    method: "GET",
    data: null,
  });
};

export const onBoardingOwnerUserAddress = (body, userId) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${userId}/address`,
    method: "PUT",
    data: body,
  });
};

export const getCard = (userId) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${userId}/cards`,
    method: "GET",
  });
};

export const setCardPin = (userId, body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${userId}/card/ChangePin`,
    method: "PUT",
    data: body,
  });
};

// export const getUserDetails = (userid) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user/${userid}`,
//     method: "GET",
//     data: null,
//   });
// };
// //Update Profile Details
// export const updateUserdetails = (formdata) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user`,
//     method: "PUT",
//     data: formdata,
//   });
// }; // ---- update mobile number--------
// export const otpGenrate = (formdata) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user/GenerateOtp`,
//     method: "POST",
//     data: formdata,
//   });
// };
// export const otpValifdation = (formdata) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user/ValidateMobileOtp`,
//     method: "POST",
//     data: formdata,
//   });
// };
// //---------Edit Emirates ID (update on my profile)
// export const updateEmirates = (formdata, user_id) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user/${user_id}/document`,
//     method: "PUT",
//     data: formdata,
//     isFileUpload: true,
//   });
// };
// //---------Edit Address  (update on my profile)
// export const updateAddress = (formdata, user_id) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user/${user_id}/address`,
//     method: "PUT",
//     data: formdata,
//   });
// };

// export const newPasswordSet = (formdata) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user/SetPassword`,
//     method: "POST",
//     data: formdata,
//   });
// };

// export const settingsTradeLicense = (formdata) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/org/document`,
//     method: "PUT",
//     data: formdata,
//     isFileUpload: true,
//   });
// };

// // Update admin api calls
// export const emailUpdate = (user_id, formdata) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user/${user_id}/email`,
//     method: "PUT",
//     data: formdata,
//   });
// };
// //Replace Admin API call
// export const markOwnerAsAdmin = (formdata) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/org/MarkOwnerAsAdmin`,
//     method: "PUT",
//     data: formdata,
//   });
// };

// export const adminDelete = (user_id) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user/${user_id}`,
//     method: "DELETE",
//     data: null,
//   });
// };

// export const userCreation = (formData) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/user`,
//     method: "POST",
//     data: formData,
//   });
// };
// //Get User list
// export const getUserlist = () => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/org/users`,
//     method: "GET",
//     data: null,
//   });
// };

// //Get Shareholder  list
// export const getShareholderList = () => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/org`,
//     method: "GET",
//     data: null,
//   });
// };
// //Delete Shareholder
// export const shareHolderDelete = (shareHolderId) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/org/shareholder/${shareHolderId}`,
//     method: "DELETE",
//     data: null,
//   });
// };

// //  Update Shareholder list
// export const updateShareHolders = (body) => {
//   return onApiCall({
//     url: `/${urlPath.onBoarding}/api/v1/org/shareholders`,
//     method: "PUT",
//     data: body,
//   });
// };

//  SSE - Register
export const registerSSEUserOnBoard = (sseBase64Id) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/registerStream?stream=${sseBase64Id}`,
    method: "GET",
  });
};

//  SSE - Setup pipeline for events
export const setupSSEUserOnBoard = (sseBase64Id) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/events?stream=${sseBase64Id}`,
    method: "GET",
  });
};

//  SSE - Start Events
export const createAccount = (sseBase64Id, userId) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${userId}/account?stream=${sseBase64Id}`,
    method: "GET",
  });
};

//Create Account SSE Api call function
export const triggerSSEForCreateAccount = (
  userId,
  updateUICallBack,
  sseCompleteCallback
) => {
  const streamId = base64.encode(JSON.stringify(userId));
  const str = SSE_URL(streamId);
  const url = new URL(str);

  console.log("SSE URL: ", str);
  registerSSEUserOnBoard(streamId);
  const es = new EventSource(str, {
    debug: false,
    timeout: 10000,
  });

  createAccount(streamId, userId);

  const listener = (event) => {
    console.log("event", event);
    if (event?.data == "close") {
      closeSSEPipeLine(es);
      sseCompleteCallback();
    } else {
      updateUICallBack(event);
    }
  };

  es.addEventListener("open", listener);
  es.addEventListener("message", listener);
  es.addEventListener("error", listener);
};

const closeSSEPipeLine = (eventSource) => {
  eventSource.removeAllEventListeners();
  eventSource.close();
};

export const getUserDetails = (userid) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${userid}`,
    method: "GET",
    data: null,
  });
};
//Update Profile Details
export const updateUserdetails = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user`,
    method: "PUT",
    data: formdata,
  });
}; // ---- update mobile number--------
export const otpGenrate = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/GenerateOtp`,
    method: "POST",
    data: formdata,
  });
};
export const otpValidation = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/ValidateMobileOtp`,
    method: "POST",
    data: formdata,
  });
};
//---------Edit Emirates ID (update on my profile)
export const updateEmirates = (formdata, user_id) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${user_id}/document`,
    method: "PUT",
    data: formdata,
    isFileUpload: true,
  });
};
//---------Edit Address  (update on my profile)
export const updateAddress = (formdata, user_id) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${user_id}/address`,
    method: "PUT",
    data: formdata,
  });
};

export const newPasswordSet = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/SetPassword`,
    method: "POST",
    data: formdata,
  });
};

export const settingsTradeLicense = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/document`,
    method: "PUT",
    data: formdata,
    isFileUpload: true,
  });
};

// Update admin api calls
export const emailUpdate = (user_id, formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${user_id}/email`,
    method: "PUT",
    data: formdata,
  });
};
//Replace Admin API call
export const adminReplace = (formdata) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/ReplaceAdmin`,
    method: "POST",
    data: formdata,
  });
};

export const adminDelete = (user_id) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user/${user_id}`,
    method: "DELETE",
    data: null,
  });
};

export const userCreation = (formData) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/user`,
    method: "POST",
    data: formData,
  });
};
//Get User list
export const getUserlist = () => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/users`,
    method: "GET",
    data: null,
  });
};

//Get Shareholder  list
export const getShareholderList = () => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org`,
    method: "GET",
    data: null,
  });
};
//Delete Shareholder
export const shareHolderDelete = (shareHolderId) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/shareholder/${shareHolderId}`,
    method: "DELETE",
    data: null,
  });
};

//  Update Shareholder list
export const updateShareHolders = (body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/shareholders`,
    method: "PUT",
    data: body,
  });
};

//  Add admin  api call
export const addnewAdmin = (body) => {
  return onApiCall({
    url: `/${urlPath.onBoarding}/api/v1/org/admin`,
    method: "PUT",
    data: body,
  });
};



export const getRequestList = (userId) => {
  //Actual Api call Method
  return onApiCall({
    url: `/${urlPath.expense}/api/v1/expense/requesterview/${userId}`,
    method: "GET",
    data: null,
  });
};
export const getApproverList = (userId) => {
  //Actual Api call Method
  return onApiCall({
    url: `/${urlPath.expense}/api/v1/expense/approverview/${userId}`,
    method: "GET",
    data: null,
  });
};

export const updateExpenseStatus = (formData) => {
  //Actual Api call Method
  return onApiCall({
    url: `/${urlPath.expense}/api/v1/expense`,
    method: "PUT",
    data: formData,
  });

};
