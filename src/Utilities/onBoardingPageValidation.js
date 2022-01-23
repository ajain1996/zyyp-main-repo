export const pageValidation = (stage) => {
  if (stage === "TRADE_LICENSE") {
    return 0;
  } else if (stage === "ADDRESS") {
    return 1;
  } else if (stage === "PERSONAL_INFO" || stage === "USER_ADDRESS") {
    return 2;
  } else if (stage === "ID_DETAILS") {
    return 3;
  } else if (stage === "SHAREHOLDERS") {
    return 4;
  } else if (stage === "ADMIN") {
    return 5;
  } else {
    return 0;
  }
};
