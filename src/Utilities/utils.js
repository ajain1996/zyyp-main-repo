// Common Functions

import { Alert, Platform, Dimensions } from "react-native";

const show_alert = (title, description, proceed, cancel) => {
  // Common Alert
  Alert.alert(
    title,
    description,
    [
      {
        text: "proceed anyway",
        onPress: () => {},
      },
    ],
    { cancelable: false }
  );
};
function getBottomSpace(data) {
  //To find Bottom space of all devices
  return isIphoneX() ? data : 0;
}
function isIphoneX() {
  // To find Footer of the devices
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

function getDateToString(date) {
  let dateStr =
    ("0" + date.getDate()).slice(-2) +
    "-" +
    parseInt(date.getMonth() + 1) +
    "-" +
    date.getFullYear();
  return dateStr;
}

function removeDupicate(data) {
  // Avoid Duplicate function
  return data.filter((value, index) => data.indexOf(value) === index);
}
function isEmpty(obj) {
  // To check empty data
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
//Expense (Currency & spaceCamel )
function currencyFormat(num) {
  const int =parseInt(num)
  var val = int.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") ;
  return val
}
function digitFormat(num) {
  const int =parseInt(num)
  var val = int.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") ;
  return val
}
function spaceCamel(str){
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, ' ');
}

function fileName(file) {
  var fl = /[^-_]+$/.exec(file);
  return fl[0];
}
function specialCharaterValidation(text) {
  // for address lines
  const res = text
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    .trimLeft();
  return res;
}

function numaricValdation(text) {
  // for pox box
  const res = text.replace(/[^0-9]/g, "").trimLeft();
  return res;
}
function stringValdation(text) {
  // for city
  const res = text
    .replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    .trimLeft();
  return res;
}

function isResponseisValid(response) {
  if (response.status === 200 || response.status === 201) {
    return true;
  } else {
    return false;
  }
}
const passWordValidation = (pass) => {
  var regularExpression =
    /^(?=.||[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return regularExpression.test(pass);
};

const urlPath = {
  // onBoarding:'onboarding',
  onBoarding: "onboardingnew",
  expense: "expmanagernew",

};

function isValidEmail(emailStr) {
  const emailPattern =
    /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  let isValid = false;
  if (!isData(emailStr) && emailPattern.test(emailStr)) {
    isValid = true;
  }
  return isValid;
}
export function isData(value) {
  return value === undefined || value === null || value.trim() === "";
}
function isPlatformFileValidation(file) {
  if (Platform.OS === "android") {
    return file;
  } else if (Platform.OS === "ios") {
    return `file://${file}`;
  } else {
    return file;
  }
}
function checkUndefined(value) {
  if (value) {
    return `${value}`;
  } else {
    return "";
  }
}
export {
  show_alert,
  isIphoneX,
  getBottomSpace,
  removeDupicate,
  isEmpty,
  getDateToString,
  fileName,
  specialCharaterValidation,
  numaricValdation,
  stringValdation,
  isResponseisValid,
  urlPath,
  passWordValidation,
  isValidEmail,
  isPlatformFileValidation,
  checkUndefined,
  currencyFormat,
  spaceCamel,
  digitFormat
};
