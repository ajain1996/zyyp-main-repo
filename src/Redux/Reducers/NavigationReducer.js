export const InitialState = {
  isLoading: true,
  userToken: "",
};
export const NavigationReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "RETRIVE_TOKEN":
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case "INTRO_SLIDER":
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case "WELCOME":
      return {
        ...state,
        userToken: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        userToken: action.payload,
      };
    case "OWNERONBOARDING":
      return {
        ...state,
        userToken: action.payload,
      };
    case "USERONBOARDING":
      return {
        ...state,
        userToken: action.payload,
      };
    case "HOMEPAGE":
      return {
        ...state,
        userToken: action.payload,
      };
    case "DASHBOARD":
      return {
        ...state,
        userToken: action.payload,
      };
    case "OWNERONBOARDING":
      return {
        ...state,
        userToken: action.payload,
      };
    case "SIGN_OUT":
      return {
        ...state,
        userToken: "",
      };
    case "LOGIN": {
      return {
        ...state,
        userToken: action.payload,
      };
    }
    default:
      return state;
  }
};
