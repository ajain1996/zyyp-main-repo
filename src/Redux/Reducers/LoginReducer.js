import { sampleArray } from "../../constants";

const InitialState = {
  email: "",
  RegistrationData: {},
  SucessData: {},
  UserData: {},
  OrgData: {},
  UserData: {},
  orgid: "",
  userId: "",
  pwdToken: "",
  orgId: "",
  OrgData: {},
  UserData: {},
  token: "",
  orgid: "",
  CurrentAdminData: {},
  projectRecent: [],
  expenseIdRecent: [],
  employeesRecent: [],
};

export default function LoginReducer(state = InitialState, action) {
  //console.log("*** state", state, "action", action);
  switch (action.type) {
  
    case "projectRecent": {
      return {
        ...state,
        projectRecent: action.payload,
      };
    }
    case "expenseIdRecent": {
      return {
        ...state,
        expenseIdRecent: action.payload,
      };
    }
    case "employeesRecent": {
      return {
        ...state,
        employeesRecent: action.payload,
      };
    }
    case "EmailState": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "PasswordHeader": {
      return {
        ...state,
        pwdToken: action.payload.pwdToken,
      };
    }
    case "OrgIdHeader": {
      return {
        ...state,
        orgId: action.payload.orgId,
      };
    }
    case "TokenHeader": {
      return {
        ...state,
        token: action.payload.token,
        orgid: action.payload.orgid,
        userId: action.payload.userId,
        email: action.payload.email,
      };
    }
    case "UserHeader": {
      return {
        ...state,
        token: action.payload.token,
        orgid: action.payload.orgid,
        userId: action.payload.userId,
        email: action.payload.email,
      };
    }

    case "UserHeader": {
      return {
        ...state,
        token: action?.payload?.token,
        orgid: action?.payload?.orgid,
        userId: action?.payload?.userId,
        email: action?.payload?.email,
        adminId: action?.payload?.adminId,
      };
    }
    case "UserData": {
      return {
        ...state,
        UserData: action.payload,
      };
    }
    case "UserInfo": {
      return {
        ...state,
        UserInfo: action.payload,
      };
    }
    case "RegistrationData": {
      return {
        ...state,
        RegistrationData: action.payload,
      };
    }
    case "SucessData": {
      return {
        ...state,
        SucessData: action.payload,
        email: action.email,
        userId: action.payload.user_id,
      };
    }
    case "orgData": {
      return {
        ...state,
        OrgData: action.payload,
      };
    }
    case "CurrentAdminData": {
      return {
        ...state,
        CurrentAdminData: action.payload,
      };
    }
    default:
      return state;
  }
}

//API CALL
