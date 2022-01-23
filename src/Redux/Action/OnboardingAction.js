import {
  useremail,
  organizationname,
  tradelicensenumber,
  tradeissuedate,
  tradeexpirydate,
  tradedocument,
  addresslineone,
  addresslinetwo,
  city,
  emirateid,
  country,
  pobox,
  fullname,
  mobilenumber,
  emailid,
  idno,
  emiratesissuedate,
  emiratesexpirydate,
  shareholderlist,
  frontofdocument,
  backofdocument,
  adminfullname,
  adminmobilenumber,
  adminemail,
  updateTradeLicenseFile,
  updateCompanyAdrressFile,
  updateIdentityFile,
  updateownerprofileInfo,
  updateowneraddress,
  pageNumber,
  tradeLicenseeditUpdate,
  companyaddresseditUpdate,
  ownereditUpdate,
  identityeditUpdate,
  shareholdereditUpdate,
  owneraddresslineone,
  owneraddresslinetwo,
  ownercity,
  owneremirateid,
  ownerpobox,
  ownercountry,
} from "../constant";

function userEmail(data) {
  return {
    type: useremail,
    payload: data,
  };
}

function tradeLicenseData(data) {
  return {
    type: "TradeLicense",
    payload: data,
  };
}

function organizationName(name) {
  return {
    type: organizationname,
    payload: name,
  };
}

function tradeLicenseNumber(number) {
  return {
    type: tradelicensenumber,
    payload: number,
  };
}

function tradeIssueDate(date) {
  return {
    type: tradeissuedate,
    payload: date,
  };
}

function tradeExpiryDate(date) {
  return {
    type: tradeexpirydate,
    payload: date,
  };
}

function tradeDocument(data) {
  return {
    type: tradedocument,
    payload: data,
  };
}

function addressLineOne(address) {
  return {
    type: addresslineone,
    payload: address,
  };
}

function addressLineTwo(address) {
  return {
    type: addresslinetwo,
    payload: address,
  };
}

function cityName(name) {
  return {
    type: city,
    payload: name,
  };
}

function emiratesId(id) {
  return {
    type: emirateid,
    payload: id,
  };
}

function countryName(name) {
  return {
    type: country,
    payload: name,
  };
}

function poBox(box) {
  return {
    type: pobox,
    payload: box,
  };
}

function fullName(name) {
  return {
    type: fullname,
    payload: name,
  };
}

function mobileNumber(number) {
  return {
    type: mobilenumber,
    payload: number,
  };
}

function Email(email) {
  return {
    type: emailid,
    payload: email,
  };
}

function IdNumber(number) {
  return {
    type: idno,
    payload: number,
  };
}

function emiratesIssueDate(date) {
  return {
    type: emiratesissuedate,
    payload: date,
  };
}

function emiratesExpiryDate(date) {
  return {
    type: emiratesexpirydate,
    payload: date,
  };
}

function frontOfDocument(data) {
  return {
    type: frontofdocument,
    payload: data,
  };
}

function backOfDocument(data) {
  return {
    type: backofdocument,
    payload: data,
  };
}

function shareHolders(list) {
  return {
    type: shareholderlist,
    payload: list,
  };
}

function adminFullName(data) {
  return {
    type: adminfullname,
    payload: data,
  };
}

function adminMobileNumber(data) {
  return {
    type: adminmobilenumber,
    payload: data,
  };
}

function adminEmail(data) {
  return {
    type: adminemail,
    payload: data,
  };
}

function updateTradeLicenseDataFile(data) {
  return {
    type: updateTradeLicenseFile,
    payload: data,
  };
}

function updateCompanyAdrressDataFile(data) {
  return {
    type: updateCompanyAdrressFile,
    payload: data,
  };
}

function updateIdentityDataFile(data) {
  return {
    type: updateIdentityFile,
    payload: data,
  };
}

function upDatePageNumber(number) {
  return {
    type: pageNumber,
    payload: number,
  };
}

function tradeLicenseeditUpdateData(data) {
  return {
    type: tradeLicenseeditUpdate,
    payload: data,
  };
}

function companyaddresseditUpdateData(data) {
  return {
    type: companyaddresseditUpdate,
    payload: data,
  };
}

function ownereditUpdateData(data) {
  return {
    type: ownereditUpdate,
    payload: data,
  };
}

function identityeditUpdateData(data) {
  return {
    type: identityeditUpdate,
    payload: data,
  };
}

function shareholdereditUpdateData(data) {
  return {
    type: shareholdereditUpdate,
    payload: data,
  };
}

function shareHolderListUpdate(data) {
  return {
    type: shareholderlist,
    payload: data,
  };
}
function ownerAddress1(data) {
  return {
    type: owneraddresslineone,
    payload: data,
  };
}
function ownerAddress2(data) {
  return {
    type: owneraddresslinetwo,
    payload: data,
  };
}
function ownerCityData(data) {
  return {
    type: ownercity,
    payload: data,
  };
}
function ownerEmiratedId(data) {
  return {
    type: owneremirateid,
    payload: data,
  };
}
function ownerPoBox(data) {
  return {
    type: ownerpobox,
    payload: data,
  };
}

function ownerProfileInfo(data) {
  return {
    type: updateownerprofileInfo,
    payload: data,
  };
}

function ownerAddressInfo(data) {
  return {
    type: updateowneraddress,
    payload: data,
  };
}
export {
  ownerAddress1,
  ownerAddress2,
  ownerCityData,
  ownerEmiratedId,
  ownerPoBox,
  userEmail,
  tradeLicenseData,
  organizationName,
  tradeLicenseNumber,
  tradeIssueDate,
  tradeExpiryDate,
  tradeDocument,
  addressLineOne,
  addressLineTwo,
  cityName,
  emiratesId,
  countryName,
  poBox,
  fullName,
  mobileNumber,
  Email,
  IdNumber,
  emiratesIssueDate,
  emiratesExpiryDate,
  frontOfDocument,
  backOfDocument,
  shareHolders,
  adminFullName,
  adminMobileNumber,
  adminEmail,
  updateTradeLicenseDataFile,
  updateCompanyAdrressDataFile,
  updateIdentityDataFile,
  upDatePageNumber,
  tradeLicenseeditUpdateData,
  companyaddresseditUpdateData,
  ownereditUpdateData,
  identityeditUpdateData,
  shareholdereditUpdateData,
  shareHolderListUpdate,
  ownerProfileInfo,
  ownerAddressInfo,
};
