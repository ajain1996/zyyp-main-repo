import { strings } from "../../constants";
import {
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
  useremail,
  adminfullname,
  adminmobilenumber,
  adminemail,
  updateTradeLicenseFile,
  updateCompanyAdrressFile,
  pageNumber,
  updateIdentityFile,
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
  updateowneraddress,
} from "../constant";

const InitialState = {
  email: "",
  pageNo: 0,
  tradeLicenseData: {
    license_number: "",
    document: null,
    document_url: "",
    document_type: "",
    document_id: "",
    orgName: "",
    issue_date: "",
    expiry_date: "",
    issue_place: "",
    tradeLicenseEditUpdate: false,
  },
  address: {
    address_line_1: "",
    address_line_2: "",
    city: "",
    country: strings.countryDefault,
    postal_code: "",
    state: "",
    companyAddressEditUpdate: false,
  },
  owner: {
    full_name: "",
    mobile_number: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    country: strings.countryDefault,
    postal_code: "",
    state: "",
    ownereditUpdate: false,
  },
  ownerAddress: {
    ownerAddressEditUpdate: false,
  },
  identity_card: {
    issue_date: "",
    expiry_date: "",
    document_id: "",
    front_document: null,
    back_document: null,
    identityEditUpdate: false,
  },
  share_holders: {
    shareHolderEditUpdate: false,
    shareHolderList: [],
  },
  admin: {
    full_name: "",
    mobile_number: "",
    email_id: "",
  },
};

export default function OnboardingReducer(state = InitialState, action) {
  if (action.type == "fullname" || action.type == "mobilenumber") {
    console.log("*** state", state, "action", action);
  }

  switch (action.type) {
    case owneraddresslineone: {
      return {
        ...state,
        owner: {
          ...state.owner,
          address_line_1: action.payload,
        },
      };
    }
    case owneraddresslinetwo: {
      return {
        ...state,
        owner: {
          ...state.owner,
          address_line_2: action.payload,
        },
      };
    }
    case ownercity: {
      return {
        ...state,
        owner: {
          ...state.owner,
          city: action.payload,
        },
      };
    }
    case ownerpobox: {
      return {
        ...state,
        owner: {
          ...state.owner,
          postal_code: action.payload,
        },
      };
    }
    case owneremirateid: {
      return {
        ...state,
        owner: {
          ...state.owner,
          state: action.payload,
        },
      };
    }
    case useremail: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case tradeLicenseeditUpdate: {
      return {
        ...state,
        tradeLicenseData: {
          ...state.tradeLicenseData,
          tradeLicenseEditUpdate: action.payload,
        },
      };
    }
    case companyaddresseditUpdate: {
      return {
        ...state,
        address: {
          ...state.address,
          companyAddressEditUpdate: action.payload,
        },
      };
    }
    case ownereditUpdate: {
      return {
        ...state,
        owner: {
          ...state.owner,
          ownereditUpdate: action.payload,
        },
      };
    }
    case identityeditUpdate: {
      return {
        ...state,
        identity_card: {
          ...state.identity_card,
          identityEditUpdate: action.payload,
        },
      };
    }
    case shareholdereditUpdate: {
      return {
        ...state,
        share_holders: {
          ...state.share_holders,
          shareHolderEditUpdate: action.payload,
        },
      };
    }
    case pageNumber: {
      return {
        ...state,
        pageNo: action.payload,
      };
    }

    case updateTradeLicenseFile: {
      return {
        ...state,
        tradeLicenseData: {
          ...state.tradeLicenseData,
          license_number: action.payload.document_id,
          document_type: action.payload.document_type,
          issue_date: action.payload.issue_date,
          expiry_date: action.payload.expiry_date,
          tradeLicenseEditUpdate: false,
        },
      };
    }
    case updateCompanyAdrressFile: {
      return {
        ...state,
        address: {
          ...state.address,
          address_line_1: action.payload.address_line_1,
          address_line_2: action.payload.address_line_2,
          state: action.payload.state,
          city: action.payload.city,
          postal_code: action.payload.postal_code,
          country: action.payload.country,
          companyAddressEditUpdate: false,
        },
      };
    }
    case updateIdentityFile: {
      return {
        ...state,
        identity_card: {
          ...state.identity_card,
          issue_date: action.payload.issue_date,
          expiry_date: action.payload.expiry_date,
          document_id: action.payload.document_id,
          document_type: action.payload.document_type,
          identityEditUpdate: false,
        },
      };
    }
    case updateowneraddress: {
      return {
        ...state,
        owner: {
          ...state.owner,
          address_line_1: action.payload.address_line_1,
          address_line_2: action.payload.address_line_2,
          city: action.payload.city,
          state: action.payload.state,
          country: action.payload.country,
          postal_code: action?.payload?.postal_code,
        },
      };
    }
    case tradelicensenumber: {
      return {
        ...state,
        tradeLicenseData: {
          ...state.tradeLicenseData,
          license_number: action.payload,
        },
      };
    }
    case organizationname: {
      return {
        ...state,
        tradeLicenseData: {
          ...state.tradeLicenseData,
          orgName: action.payload,
        },
      };
    }
    case tradeissuedate: {
      return {
        ...state,
        tradeLicenseData: {
          ...state.tradeLicenseData,
          issue_date: action.payload,
        },
      };
    }
    case tradeexpirydate: {
      return {
        ...state,
        tradeLicenseData: {
          ...state.tradeLicenseData,
          expiry_date: action.payload,
        },
      };
    }
    case tradedocument: {
      return {
        ...state,
        tradeLicenseData: {
          ...state.tradeLicenseData,
          document: action.payload,
        },
      };
    }
    case addresslineone: {
      return {
        ...state,
        address: {
          ...state.address,
          address_line_1: action.payload,
        },
      };
    }
    case addresslinetwo: {
      return {
        ...state,
        address: {
          ...state.address,
          address_line_2: action.payload,
        },
      };
    }
    case city: {
      return {
        ...state,
        address: {
          ...state.address,
          city: action.payload,
        },
      };
    }
    case country: {
      return {
        ...state,
        address: {
          ...state.address,
          country: action.payload,
        },
      };
    }
    case pobox: {
      return {
        ...state,
        address: {
          ...state.address,
          postal_code: action.payload,
        },
      };
    }
    case emirateid: {
      return {
        ...state,
        address: {
          ...state.address,
          state: action.payload,
        },
      };
    }
    case fullname: {
      return {
        ...state,
        owner: {
          ...state.owner,
          full_name: action.payload,
        },
      };
    }
    case mobilenumber: {
      return {
        ...state,
        owner: {
          ...state.owner,
          mobile_number: action.payload,
        },
      };
    }
    case idno: {
      return {
        ...state,
        identity_card: {
          ...state.identity_card,
          document_id: action.payload,
        },
      };
    }
    case emiratesissuedate: {
      return {
        ...state,
        identity_card: {
          ...state.identity_card,
          issue_date: action.payload,
        },
      };
    }
    case emiratesexpirydate: {
      return {
        ...state,
        identity_card: {
          ...state.identity_card,
          expiry_date: action.payload,
        },
      };
    }
    case frontofdocument: {
      return {
        ...state,
        identity_card: {
          ...state.identity_card,
          front_document: action.payload,
        },
      };
    }
    case backofdocument: {
      return {
        ...state,
        identity_card: {
          ...state.identity_card,
          back_document: action.payload,
        },
      };
    }
    case shareholderlist: {
      return {
        ...state,
        share_holders: {
          ...state.share_holders,
          shareHolderList: action.payload,
        },
      };
    }
    case adminfullname: {
      return {
        ...state,
        admin: {
          ...state.admin,
          full_name: action.payload,
        },
      };
    }
    case adminmobilenumber: {
      return {
        ...state,
        admin: {
          ...state.admin,
          mobile_number: action.payload,
        },
      };
    }
    case adminemail: {
      return {
        ...state,
        admin: {
          ...state.admin,
          email_id: action.payload,
        },
      };
    }
    default:
      return state;
  }
}

//API CALL
