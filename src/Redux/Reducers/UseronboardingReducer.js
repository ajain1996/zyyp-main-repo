const InitialState = {
  addressData: {},
  indentityData: {},
  userFullname:"",
  userMobilenumber:"",
  userEmirates:"",
  userEmiratevalue:"Select Emirate"
};

export default function UseronboardingReducer(state = InitialState, action) {
  switch (action.type) {
    case "addressData": {
      return {
        ...state,
        addressData: action.payload,
      };
    }
    case "indentityData": {
      return {
        ...state,
        indentityData: action.payload,
      };
    }
    case "userFullname": {
      return {
        ...state,
        userFullname: action.payload,
      };
    }
    case "userMobilenumber": {
      return {
        ...state,
        userMobilenumber: action.payload,
      };
    }
    case "userEmiratevalue": {
      return {
        ...state,
        userEmiratevalue: action.payload,
      };
    }
    default:
      return state;
  }
}