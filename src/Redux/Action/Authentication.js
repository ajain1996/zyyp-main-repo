function RegistrationData(data) {
  return {
    type: "RegistrationData",
    payload: data,
  };
}
function SucessData(data) {
  return {
    type: "SucessData",
    payload: data,
  };
}
function Logout(){
  return {
    type:'USER_LOGOUT',
    payload:""
  }
}

export { RegistrationData, SucessData ,Logout};
