/* eslint-disable react-native/no-inline-styles */
import React, { createRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  BackHandler,
} from "react-native";
import PagerView from "react-native-pager-view";
import { COLORS, SIZES, FONTS, images, strings } from "../../constants";
import ActionSheet from "react-native-actions-sheet";
import {
  Container,
  Header,
  Button,
  Footer,
  Progress,
  ButtonText,
  Error,
  OtpComponent,
} from "../../components";
import json from "../../onBoardingStructure/onboard.json";
import CompanyAddress from "./CompanyAddress";
import TradeLicence from "./TradeLicence";
import OwnerDetails from "./OwnerDetails";
import Emirates from "./Emirates";
import AdminSetup from "./AdminSetup";
import ShareHolders from "./ShareHolders";
import {
  onboardingTradeLicense,
  onboardingAddressDetails,
  onboardingOwnerDetails,
  onboardingEmiratesIdentity,
  onboardingAdmin,
  onboardingShareHolder,
  updateOrganization,
  authOtp,
  authMobileOtpValidation,
  onBoardingOwnerUserAddress,
  markOwnerAsAdmin,
} from "../../Utilities/apiCalls";
import {
  tradeLicenseNumber,
  organizationName,
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
  userEmail,
  IdNumber,
  emiratesIssueDate,
  emiratesExpiryDate,
  frontOfDocument,
  backOfDocument,
  adminFullName,
  adminMobileNumber,
  adminEmail,
  upDatePageNumber,
  tradeLicenseeditUpdateData,
  companyaddresseditUpdateData,
  ownereditUpdateData,
  identityeditUpdateData,
  shareholdereditUpdateData,
  shareHolderListUpdate,
  ownerAddress1,
  ownerAddress2,
  ownerCityData,
  ownerEmiratedId,
  ownerPoBox,
} from "../../Redux/Action/OnboardingAction";
import {
  specialCharaterValidation,
  stringValdation,
  numaricValdation,
  isResponseisValid,
} from "../../Utilities/utils";
import {
  HeaderText,
  HeaderTitleText,
  OnboardingNumberText,
} from "../../components/SemoboldText";
import { connect } from "react-redux";
import { getDateToString, Loader } from "../../Utilities";

const actionSheetRef = createRef();
const actionSheetRef1 = createRef();

class ZyypOnBoarding extends React.PureComponent {
  state = {
    pageNo: 0,
    openDatePicker: false,
    isCheckin: true,
    isAdminCheckin: true,
    shareHolderStage: 1,
    addSharePage: false,
    shareHolderList: [],
    tradeLicenceEditable: false,
    companyAddressEditable: false,
    emiratesEditable: false,
    shareHolderCheckIn: true,
    error: false,
    snacktitle: "",
    loading: false,
    myPercentage: 1,
    totalPercentage: 100,
    addedPercentage: 1,
    percentageForStage3: 0,
    shareholderFullname: "",
    shareholderMobile: "",
    shareholderEmail: "",
    token: "",
    org: "",
    org_name: "",
    user_id: "",
    user_email: "",
    user_mobile_number: "",
    orgNameIsEdit: false,
    ownerNameisEdit: false,
    array: [
      "Abu Dhabi",
      "Ajman",
      "Dubai",
      "Fujairah",
      "Ras Al Khaimah",
      "Sharjah",
      "Umm Al Quwain",
      "Close",
    ],

    //OTP Modal Handling
    arr: [".", ".", ".", "."],
    otpModal: false,
    seconds: 30,
    colorChange: false,
    passVisble: true,
    otpCode: "",
  };
  updatePlusPageInfo() {
    this.props.upDatePageNumber(pageNo + 1);
  }
  updateMinusPageInfo(number) {
    this.props.upDatePageNumber(number);
    this.myRef.current.setPage(number);
  }

  updatedPageInfo(number) {
    this.props.upDatePageNumber(number);
    this.myRef.current.setPage(number);
  }

  // Show Api Error handling
  apiErrorHandlingInfo(response) {
    console.error("apiErrorHandlingInfo, response = ", response);
    if (response?.data) {
      this.setState({
        error: true,
        loading: false,
        snacktitle: response?.data || "Unknown API Error",
      });
    } else {
      this.setState({
        error: true,
        loading: false,
        snacktitle: strings.apierror,
      });
    }
  }
  // Show Api Catch case Error handling
  apiCatchCaseHandlingInfo(error) {
    console.error("apiCatchCaseHandlingInfo, error = ", error);
    this.setState({
      error: true,
      loading: false,
      snacktitle: strings.apierror,
    });
  }

  componentDidUpdate() {
    this.setState({ otpCode: this.state.arr.join("").toString() });
    if (this.state.otpModal == true) {
      if (this.state.seconds > 0) {
        setTimeout(
          () => this.setState({ seconds: this.state.seconds - 1 }),
          1000
        );
      } else {
        this.setState({ seconds: 0 });
      }
    } else {
      this.setState({ seconds: 30 });
    }
  }
  sumNumber = (v) => {
    var num = [...this.state.arr];
    for (let i = 0; i <= 3; i++) {
      if (num[i] == ".") {
        num[i] = v;
        break;
      } else if (i >= 2) {
        this.setState({ colorChange: true });
      } else {
        this.setState({ colorChange: false });
      }
    }
    this.setState({ arr: num });
  };
  clearOtp = () => {
    this.setState({ colorChange: false });
    var num = [...this.state.arr];
    for (let i = 3; i >= 0; i--) {
      if (num[i] !== ".") {
        num[i] = ".";
        break;
      }
    }
    this.setState({ arr: num });
  };
  otpCloseevent = async (val) => {
    this.setState({ colorChange: false });
    const { OnboardingReducer } = this.props;
    const { mobile_number } = OnboardingReducer.owner;
    var dt = new Date();
    dt.toISOString();
    if (val == "close") {
      this.setState({ otpModal: false });
      this.setState({ passVisble: true });
      this.setState({ arr: [".", ".", ".", "."] });
    } else {
      const obj = {
        mobile_number: mobile_number,
        otp: this.state.otpCode,
      };
      try {
        const authValidateresponse = await authMobileOtpValidation(obj);
        if (isResponseisValid(authValidateresponse)) {
          this.setState({ otpModal: false });
          this.setState({ arr: [".", ".", ".", "."] });
          //this.ownerUpdateFullname();
          this.ownerDetailsApiCall();
          this.setState({
            loading: false,
          });
        } else {
          this.apiErrorHandlingInfo(authValidateresponse);
        }
      } catch (error) {
        this.apiCatchCaseHandlingInfo(error);
      }
    }
  };
  otpResend = async () => {
    this.setState({ arr: [".", ".", ".", "."] });
    this.setState({ colorChange: false });
    if (this.state.seconds === "0") {
      const ob = {
        email: this.state.user_email,
        type: "EMAIL",
      };
      try {
        const response = await authOtp(ob);
        if (isResponseisValid(response)) {
          this.setState({ otpModal: true });
          this.setState({ seconds: 30 });
        } else {
          this.apiErrorHandlingInfo(response);
        }
      } catch (error) {
        this.apiCatchCaseHandlingInfo(error);
      }

      // alert("otp resend sucessfully ")
    } else {
      alert(`Please Wait for ${this.state.seconds} s`);
    }
  };
  onClick = () => {
    this.setState({ passVisble: !this.state.passVisble });
  };

  showEmiratespopup = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      actionSheetRef.current?.show();
    }, 100);
  };
  actionClick = (data) => {
    if (data === "Close") {
      actionSheetRef.current?.hide();
    } else {
      this.onChangeEmirates(data);
      actionSheetRef.current?.hide();
    }
  };

  actionClick1 = (data) => {
    if (data === "Close") {
      actionSheetRef1.current?.hide();
    } else {
      this.ownerEmiratesIdText(data);
      actionSheetRef1.current?.hide();
    }
  };
  componentDidMount() {
    const { email, userId, SucessData } = this.props.LoginReducer;
    console.log("SucessData:", SucessData);
    let userID = userId;
    if (!userID) {
      userID = SucessData.result.user_id;
    }
    this.setState({
      user_id: userID,
      user_email: email,
    });
  }
  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    return true;
  }
  //------ShareHolders
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  // Shareholders Plus button

  plusPress = () => {
    if (this.state.myPercentage < 100) {
      this.setState({
        myPercentage: this.state.myPercentage + 1,
        addedPercentage: this.state.addedPercentage + 1,
      });
    } else {
    }
  };

  // Shareholders Minus button
  minusPress = () => {
    if (this.state.addedPercentage <= 1) {
    } else {
      this.setState({
        myPercentage: this.state.myPercentage - 1,
        addedPercentage: this.state.addedPercentage - 1,
      });
    }
  };

  // Shareholders Checkin Button
  isCheckinCalculationforShareHolder = () => {
    this.setState({ isCheckin: !this.state.isCheckin }, () => {
      this.setState({
        shareHolderStage: this.state.isCheckin ? 1 : 2,
        shareHolderCheckIn: !this.state.shareHolderCheckIn,
        myPercentage: 1,
        addedPercentage: 1,
        percentageForStage3: 0,
        shareholderFullname: "",
        shareholderMobile: "",
        shareholderEmail: "",
      });
    });
  };

  // Shareholders Save button click
  isShareHolderButtonClick = () => {
    const { SucessData } = this.props.LoginReducer;
    const { OnboardingReducer } = this.props;
    const { full_name, mobile_number } = OnboardingReducer.owner;
    const {
      addedPercentage,
      shareholderFullname,
      shareholderMobile,
      shareHolderStage,
      shareholderEmail,
    } = this.state;
    var myData = [];
    if (shareHolderStage === 1) {
      if (`${addedPercentage}`.length === 0) {
      } else if (`${addedPercentage}` === "0") {
      } else {
        console.log("false");
        const { email, userId } = this.props.LoginReducer;
        myData = [
          {
            email: email,
            share_holder_name: full_name,
            mobile_number: mobile_number,
            share_holder_percentage: `${addedPercentage}`,
          },
        ];
        this.setState(
          {
            percentageForStage3: addedPercentage,
          },
          () => {
            this.setState({
              shareHolderStage: 3,
              addedPercentage: 1,
              shareHolderCheckIn: false,
              shareHolderList: [...this.state.shareHolderList, ...myData],
              shareholderFullname: "",
              shareholderMobile: "",
              shareholderEmail: "",
              addSharePage: false,
            });
          }
        );
      }
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if (shareholderFullname === "") {
        this.setState({
          error: true,
          snacktitle: "Please enter full name",
        });
      } else if (shareholderMobile === "") {
        this.setState({
          error: true,
          snacktitle: "Please enter mobile number",
        });
      } else if (shareholderMobile.length < 9) {
        this.setState({
          error: true,
          snacktitle: "Please enter 9 number",
        });
      } else if (shareholderEmail === "") {
        this.setState({
          error: true,
          snacktitle: "Please enter email",
        });
      } else if (reg.test(shareholderEmail) === false) {
        this.setState({
          error: true,
          snacktitle: "Please enter  valid email",
        });
      } else if (addedPercentage === 0) {
        this.setState({
          error: true,
          snacktitle: "Please enter atleast one percentage",
        });
      } else {
        if (`${addedPercentage}`.length === 0) {
        } else if (`${addedPercentage}` === "0") {
        } else {
          this.setState({
            percentageForStage3:
              this.state.percentageForStage3 + addedPercentage,
          });

          myData = [
            {
              share_holder_name: shareholderFullname,
              email: shareholderEmail,
              mobile_number: shareholderMobile,
              share_holder_percentage: `${addedPercentage}`,
            },
          ];
          this.setState({
            shareHolderStage: 3,
            addedPercentage: 1,
            shareHolderCheckIn: false,
            shareHolderList: [...this.state.shareHolderList, ...myData],
            shareholderFullname: "",
            shareholderMobile: "",
            shareholderEmail: "",
            addSharePage: false,
          });
        }
      }
    }
  };

  updateData = ({ item, percentage, index, deleteShareholder }) => {
    if (deleteShareholder) {
      var st = this.state.shareHolderList;
      var share_holder_percentage =
        this.state.shareHolderList[index].share_holder_percentage;
      st.splice(index, 1);
      this.setState({
        shareHolderList: [...st],
        myPercentage:
          this.state.percentageForStage3 - parseInt(share_holder_percentage),
        percentageForStage3:
          this.state.percentageForStage3 - parseInt(share_holder_percentage),
      });
    } else {
      console.log(item);
      console.log(index);
      var st = this.state.shareHolderList;
      st[index] = item;
      this.setState({
        shareHolderList: [...st],
        myPercentage: percentage,
        percentageForStage3: percentage,
      });
    }
  };

  pressEditNavigation = (index) => {
    console.log("Index", index);
    console.log("Share", this.state.shareHolderList);
    this.props.navigation.navigate("EditShareHolder", {
      item: this.state.shareHolderList[index],
      index,
      settingsPage: false,
      totalPercentage: this.state.myPercentage,
      updateData: this.updateData,
    });
  };

  addAnotherSharePress = () => {
    console.log("Perc", this.state.addedPercentage);
    this.setState({
      addSharePage: true,
      myPercentage: this.state.percentageForStage3 + 1,
      addedPercentage: 1,
    });
  };

  // Shareholders Delete button click

  shareHolderListDelete = () => {
    const { shareHolderStage } = this.state;
    if (shareHolderStage === 2) {
      this.setState({
        shareHolderStage: 1,
        isCheckin: !this.state.isCheckin,
        shareholderFullname: "",
        shareholderMobile: "",
        shareholderEmail: "",
        addedPercentage: 1,
        percentageForStage3: 0,
      });
    } else {
      this.setState({
        addSharePage: !this.state.addSharePage,
        shareholderFullname: "",
        shareholderMobile: "",
        shareholderEmail: "",
        addedPercentage: 0,
        myPercentage: this.state.percentageForStage3,
      });
    }
  };
  // Shareholders full name

  onChangeShareholderFullname = (text) => {
    this.setState({
      shareholderFullname: text.trimLeft(),
    });
  };

  // Shareholders mobile number

  onChangeShareholderMobile = (text) => {
    this.setState({
      shareholderMobile: numaricValdation(text),
    });
  };
  // Shareholders email

  onChangeShareholderEmail = (text) => {
    this.setState({
      shareholderEmail: text.trimLeft(),
    });
  };

  // Shareholder update percentage

  onChangeTextInputPercentage = (text) => {
    console.log("Text value", text);

    if (text.length === 0) {
      this.setState({
        addedPercentage: "",
        myPercentage: "",
      });
    } else {
      var nm = parseInt(text.replace(/[^0-9]/g, ""));
      if (nm <= 100) {
        this.setState({
          addedPercentage: nm,
          myPercentage: nm,
        });
      }
    }
  };
  onChangeTextInputPercentageUpdate = (text) => {
    console.log("Text value", text);

    var tp = this.state.percentageForStage3;
    if (text.length === 0) {
      this.setState({
        addedPercentage: "",
        myPercentage: this.state.percentageForStage3,
      });
    } else {
      var nm = parseInt(text.replace(/[^0-9]/g, ""));
      if (nm <= 100 - tp) {
        console.log("Text value1", nm);
        console.log("Text value3", this.state.percentageForStage3);
        this.setState(
          {
            addedPercentage: nm,
          },
          () => {
            this.setState({
              myPercentage: tp + this.state.addedPercentage,
            });
          }
        );
      } else {
        console.log("Text value2", text);
      }
    }
  };

  //------TradeLicense

  // Tradelicense organization text change

  onChangeOrganizationText = (text) => {
    this.props.organizationName(text.trimLeft());
    this.setState({
      orgNameIsEdit: true,
    });
  };

  //  Trade license text change

  onChangeTradeLicenseText = (text) => {
    this.props.tradeLicenseNumber(text.trimLeft());
    this.props.tradeLicenseeditUpdateData(true);
  };

  // Trade license issue text change

  onChangeIssueText = (text) => {
    let date = getDateToString(text);
    this.props.tradeIssueDate(date);
    this.props.tradeLicenseeditUpdateData(true);
  };

  // Trade license expiry text change

  onChangeExpiryText = (text) => {
    let date = getDateToString(text);

    this.props.tradeExpiryDate(date);
    this.props.tradeLicenseeditUpdateData(true);
  };

  // Trade license document

  onTradeLicenceDocument = (file) => {
    this.props.tradeDocument(file);
    this.props.tradeLicenseeditUpdateData(true);
  };

  //------Company Address

  //   company address 1 text change

  onChangeAddress1 = (text) => {
    // this.props.addressLineOne(text);
    this.props.addressLineOne(specialCharaterValidation(text));
    this.props.companyaddresseditUpdateData(true);
  };
  //   company address 2 text change

  onChangeAddress2 = (text) => {
    // this.props.addressLineTwo(text);
    this.props.addressLineTwo(specialCharaterValidation(text));
    this.props.companyaddresseditUpdateData(true);
  };

  //   company city text change

  onChangeCity = (text) => {
    // this.props.cityName(text);
    this.props.cityName(stringValdation(text));
    this.props.companyaddresseditUpdateData(true);
  };

  //   company emirates text change

  onChangeEmirates = (text) => {
    this.props.emiratesId(text);
    this.props.companyaddresseditUpdateData(true);
  };

  //   company country text change

  onChangeCountry = (text) => {
    this.props.countryName(text);
    this.props.companyaddresseditUpdateData(true);
  };

  //   company po text change

  onChangePo = (text) => {
    this.props.poBox(numaricValdation(text));
    this.props.companyaddresseditUpdateData(true);
  };

  //------OWNER details

  //   fullname text change

  onChangeFullnameText = (text) => {
    this.props.fullName(text.trimLeft());
    this.setState({
      ownerNameisEdit: true,
    });
  };
  onChangeFullnameText1 = (text) => {
    this.props.fullName(text.trimLeft());
    this.props.ownereditUpdateData(true);
  };

  //   email text change

  onChangeMobileText = (text) => {
    // this.props.mobileNumber(text);
    this.props.mobileNumber(numaricValdation(text));
    this.props.ownereditUpdateData(true);
  };

  ownerAddressText = (text) => {
    this.props.ownerAddress1(specialCharaterValidation(text));
    this.props.ownereditUpdateData(true);
  };

  ownerAddress2Text = (text) => {
    this.props.ownerAddress2(specialCharaterValidation(text));
    this.props.ownereditUpdateData(true);
  };

  ownerCityText = (text) => {
    this.props.ownerCityData(stringValdation(text));
    this.props.ownereditUpdateData(true);
  };
  ownerEmiratesIdText = (text) => {
    this.props.ownerEmiratedId(text);
    this.props.ownereditUpdateData(true);
  };

  ownerEmirateClick = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      actionSheetRef1.current?.show();
    }, 100);
  };

  ownerPoText = (text) => {
    this.props.ownerPoBox(numaricValdation(text));
    this.props.ownereditUpdateData(true);
  };

  //------Emirates

  //   issuedate text change

  onChangeEmiratesIssueDate = (text) => {
    let date = getDateToString(text);
    this.props.emiratesIssueDate(date);
    this.props.identityeditUpdateData(true);
  };

  //   expiry text change

  onChangeEmiratesExpiryDate = (text) => {
    let date = getDateToString(text);
    this.props.emiratesExpiryDate(date);
    this.props.identityeditUpdateData(true);
  };
  //   id number text change

  onChangeIdNumber = (text) => {
    this.props.IdNumber(numaricValdation(text));
    this.props.identityeditUpdateData(true);
  };

  //   front document

  onChangeFrontDocument = (file) => {
    this.props.frontOfDocument(file);
    this.props.identityeditUpdateData(true);
  };

  //   back document

  onChangeBackDocument = (file) => {
    this.props.backOfDocument(file);
    this.props.identityeditUpdateData(true);
  };

  //------Admin

  //   full name

  onChangeAdminFullName = (text) => {
    this.props.adminFullName(text);
  };

  //   mobile number

  onChangeMobileNumber = (text) => {
    this.props.adminMobileNumber(numaricValdation(text));
  };

  //   email id

  onChangeEmailId = (text) => {
    this.props.adminEmail(text);
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  updateNextPage = () => {
    const { pageNo } = this.props;
    if (pageNo + 1 === json.list.length) {
      this.checkFieldValidation(pageNo);
    } else {
      this.checkFieldValidation(pageNo);
    }
  };

  // Validation of fields

  checkFieldValidation(page) {
    const { OnboardingReducer } = this.props;
    const {
      license_number,
      issue_date,
      expiry_date,
      document,
      tradeLicenseEditUpdate,
    } = OnboardingReducer.tradeLicenseData;

    if (page === 0) {
      if (tradeLicenseEditUpdate) {
        if (license_number === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter trade license",
          });
        } else if (issue_date === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter Issue date",
          });
        } else if (expiry_date === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter Expiry date",
          });
        } else if (document === null) {
          this.setState({
            error: true,
            snacktitle: "Please fill the document",
          });
        } else {
          this.tradeLicenseApiCall();
        }
      } else {
        this.props.tradeLicenseeditUpdateData(false);
        this.updatedPageInfo(this.props.pageNo + 1);
      }
    } else if (page === 1) {
      const {
        address_line_1,
        address_line_2,
        city,
        country,
        state,
        companyAddressEditUpdate,
      } = OnboardingReducer.address;
      if (companyAddressEditUpdate) {
        if (address_line_1 === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter Company Address 1",
          });
        } else if (address_line_2 === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter Company Address 2",
          });
        } else if (city === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter City ",
          });
        } else if (state === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter the emirates id",
          });
        } else if (country === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter the country name",
          });
        } else {
          this.companyAddressApiCall();
        }
      } else {
        this.updatedPageInfo(this.props.pageNo + 1);
        this.props.companyaddresseditUpdateData(false);
      }
    } else if (page === 2) {
      const {
        full_name,
        mobile_number,
        address_line_1,
        address_line_2,
        city,
        country,
        state,
        ownereditUpdate,
      } = OnboardingReducer.owner;
      if (ownereditUpdate) {
        if (full_name === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter full name",
          });
        } else if (mobile_number === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter mobile number",
          });
        } else if (mobile_number.length < 9) {
          this.setState({
            error: true,
            snacktitle: "Please enter 9 character",
          });
        } else if (address_line_1 === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter Company Address 1",
          });
        } else if (address_line_2 === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter Company Address 2",
          });
        } else if (city === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter City ",
          });
        } else if (state === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter the emirates id",
          });
        } else if (country === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter the country name",
          });
        } else {
          this.showMobileOtpValidation(mobile_number);

          // this.updatedPageInfo(this.props.pageNo + 1);
          // this.props.ownereditUpdateData(false);
        }
      } else {
        this.updatedPageInfo(this.props.pageNo + 1);
        this.props.ownereditUpdateData(false);
      }
    } else if (page === 3) {
      const {
        issue_date,
        expiry_date,
        document_id,
        front_document,
        back_document,
        identityEditUpdate,
      } = OnboardingReducer.identity_card;

      if (identityEditUpdate) {
        if (document_id === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter id number",
          });
        } else if (issue_date === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter issue date",
          });
        } else if (expiry_date === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter expiry date",
          });
        } else if (front_document === null) {
          this.setState({
            error: true,
            snacktitle: "Please fill the front document",
          });
        } else if (back_document === null) {
          this.setState({
            error: true,
            snacktitle: "Please fill the back document",
          });
        } else {
          this.emiratesApiCall();
        }
      } else {
        this.updatedPageInfo(this.props.pageNo + 1);
        this.props.identityeditUpdateData(false);
      }
    } else if (page === 4) {
      const {
        shareHolderStage,
        addSharePage,
        addedPercentage,
        shareholderFullname,
        shareholderMobile,
        shareholderEmail,
      } = this.state;
      if (shareHolderStage === 1) {
        this.setState({
          error: true,
          snacktitle: "Please save the sharaholders",
        });
      } else if (shareHolderStage === 2) {
        if (shareholderFullname === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter full name",
          });
        } else if (shareholderMobile === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter mobile number",
          });
        } else if (shareholderEmail === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter email",
          });
        } else if (addedPercentage === 0) {
          this.setState({
            error: true,
            snacktitle: "Please enter atleast one percentage",
          });
        }
      } else if (shareHolderStage === 3) {
        if (!addSharePage) {
          this.shareHoldersApiCall();
        } else {
          if (shareholderFullname === "") {
            this.setState({
              error: true,
              snacktitle: "Please enter full name",
            });
          } else if (shareholderMobile === "") {
            this.setState({
              error: true,
              snacktitle: "Please enter mobile number",
            });
          } else if (shareholderEmail === "") {
            this.setState({
              error: true,
              snacktitle: "Please enter email",
            });
          } else if (addedPercentage === 0) {
            this.setState({
              error: true,
              snacktitle: "Please enter atleast one percentage",
            });
          } else {
            this.setState({
              error: true,
              snacktitle: "Please save the shareholders",
            });
          }
        }
      }
    } else if (page === 5) {
      const { isAdminCheckin } = this.state;
      if (isAdminCheckin) {
        //FIXME
        // this.setState({ loading: false }, () => {
        //   this.props.navigation.navigate("Sucess");
        // });
        this.adminApiCall();
      } else {
        const { email_id, mobile_number, full_name } = OnboardingReducer.admin;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (full_name === "") {
          this.setState({
            error: true,
            snacktitle: "Please fill the document",
          });
        } else if (mobile_number === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter the mobile number",
          });
        } else if (mobile_number.length < 9) {
          this.setState({
            error: true,
            snacktitle: "Please enter 9 number",
          });
        } else if (email_id === "") {
          this.setState({
            error: true,
            snacktitle: "Please enter the email id",
          });
        } else if (reg.test(email_id) === false) {
          this.setState({
            error: true,
            snacktitle: "Please enter the valid email id",
          });
        } else {
          //FIXME
          // this.setState({ loading: false }, () => {
          //   navigation.navigate("Sucess");
          // });
          this.adminApiCall();
        }
      }
    } else {
    }
  }

  async showMobileOtpValidation(mobile_number) {
    this.setState({ otpModal: true });
    this.setState(
      {
        loading: false,
      },
      async () => {
        const authobj = {
          mobile_number: mobile_number,
          type: "MOBILE",
        };
        try {
          const authresponse = await authOtp(authobj);
          if (isResponseisValid(authresponse)) {
            this.setState({ otpModal: true });
          } else {
            this.apiErrorHandlingInfo(authresponse);
          }
        } catch (error) {
          this.apiCatchCaseHandlingInfo(error);
        }
      }
    );
  }

  // Shareholder api call
  async shareHoldersApiCall() {
    const { shareHolderList } = this.state;
    if (shareHolderList.length !== 0) {
      var body = shareHolderList;
      this.setState({
        loading: true,
      });
      try {
        var response = await onboardingShareHolder(body);
        if (isResponseisValid(response)) {
          this.setState(
            {
              loading: false,
            },
            () => {
              this.updatedPageInfo(this.props.pageNo + 1);
            }
          );
        } else {
          this.apiErrorHandlingInfo(response);
        }
      } catch (error) {
        this.apiCatchCaseHandlingInfo(error);
      }
    }
  }

  // Admin api call
  async adminApiCall() {
    const { isAdminCheckin } = this.state;
    this.setState({
      loading: true,
    });
    console.log("adminApiCall, isAdminCheckin=", isAdminCheckin);
    if (isAdminCheckin) {
      try {
        var response = await markOwnerAsAdmin();
        if (isResponseisValid(response)) {
          this.setState({ loading: false }, () => {
            this.props.navigation.navigate("Sucess");
          });
        } else {
          this.apiErrorHandlingInfo(response);
        }
      } catch (error) {
        this.apiCatchCaseHandlingInfo(error);
      }
    } else {
      const { OnboardingReducer } = this.props;
      const { email_id, mobile_number, full_name } = OnboardingReducer.admin;
      var body = {
        email: email_id,
        full_name: full_name,
        mobile_number: mobile_number,
        role: "ADMIN",
      };

      try {
        var response = await onboardingAdmin(body);
        if (isResponseisValid(response)) {
          this.setState({ loading: false }, () => {
            this.props.navigation.navigate("Sucess");
          });
        } else {
          this.apiErrorHandlingInfo(response);
        }
      } catch (error) {
        this.apiCatchCaseHandlingInfo(error);
      }
    }
  }
  // Emirates api call
  async emiratesApiCall() {
    this.setState({
      loading: true,
    });
    const { OnboardingReducer } = this.props;
    const {
      issue_date,
      expiry_date,
      document_id,
      front_document,
      back_document,
    } = OnboardingReducer.identity_card;
    var obj = {
      document_id: document_id,
      document_type: strings.Emirates,
      issue_date: issue_date,
      expiry_date: expiry_date,
    };
    var bodyFormData = new FormData();
    bodyFormData.append("documentDetails", JSON.stringify(obj));
    bodyFormData.append("file1", {
      uri: front_document.uri, //Your Image File Path
      type: front_document.mime,
      name: front_document.name,
    });
    bodyFormData.append("file2", {
      uri: back_document.uri, //Your Image File Path
      type: back_document.mime,
      name: back_document.name,
    });

    try {
      var response = await onboardingEmiratesIdentity(
        bodyFormData,
        this.state.user_id
      );
      if (isResponseisValid(response)) {
        this.setState({
          loading: false,
        });
        this.updatedPageInfo(this.props.pageNo + 1);
      } else {
        this.apiErrorHandlingInfo(response);
      }
    } catch (error) {
      this.apiCatchCaseHandlingInfo(error);
    }
  }

  // Owner fullname api call
  async ownerUpdateFullname() {
    const { OnboardingReducer } = this.props;
    const { full_name, mobile_number } = OnboardingReducer.owner;
    const { user_id } = this.state;

    var body = {
      email: this.state.user_email,
      full_name: full_name,
      mobile_number: mobile_number,
      user_id: user_id,
      role: "OWNER",
    };
    try {
      var response = await onboardingOwnerDetails(body);
      if (isResponseisValid(response)) {
        ownerDetailsApiCall();
      } else {
        this.apiErrorHandlingInfo(response);
      }
    } catch (error) {
      this.apiCatchCaseHandlingInfo(error);
    }
  }

  // Owner Details api call
  async ownerDetailsApiCall() {
    const { OnboardingReducer } = this.props;
    const {
      full_name,
      mobile_number,
      address_line_1,
      address_line_2,
      city,
      country,
      postal_code,
      state,
    } = OnboardingReducer.owner;
    const { user_id } = this.state;

    var body = {
      email: this.state.user_email,
      full_name: full_name,
      mobile_number: mobile_number,
      user_id: user_id,
      role: "OWNER",
    };

    this.setState({
      loading: false,
    });
    try {
      var response = await onboardingOwnerDetails(body);
      console.log("response 1338", response);
      if (isResponseisValid(response)) {
        var ownerAddressbody = {};
        if (postal_code === "") {
          ownerAddressbody = {
            address_line_1: address_line_1,
            address_line_2: address_line_2,
            city: city,
            country: strings.countryDefault,
            state: state,
          };
        } else {
          ownerAddressbody = {
            address_line_1: address_line_1,
            address_line_2: address_line_2,
            city: city,
            country: strings.countryDefault,
            state: state,
            postal_code: postal_code,
          };
        }
        this.onBoardingOwnerUserAddressApi(ownerAddressbody, user_id);
        this.setState({
          loading: false,
        });
      } else {
        this.apiErrorHandlingInfo(response);
      }
    } catch (error) {
      this.apiCatchCaseHandlingInfo(error);
    }
  }

  async onBoardingOwnerUserAddressApi(ownerAddressbody, userId) {
    const { OnboardingReducer } = this.props;
    const { mobile_number } = OnboardingReducer.owner;
    try {
      var ownerAddress = await onBoardingOwnerUserAddress(
        ownerAddressbody,
        userId
      );
      console.log("onBoardingOwnerUserAddressApi", ownerAddress);
      if (isResponseisValid(ownerAddress)) {
        this.props.ownereditUpdateData(false);
        this.setState({
          loading: false,
        });
        this.updatedPageInfo(this.props.pageNo + 1);
      } else {
        this.apiErrorHandlingInfo(ownerAddress);
      }
    } catch (error) {
      this.apiCatchCaseHandlingInfo(error);
    }
  }

  // Company Details api call
  async companyAddressApiCall() {
    this.setState({
      loading: true,
    });

    const { OnboardingReducer } = this.props;
    const {
      address_line_1,
      address_line_2,
      city,
      country,
      postal_code,
      state,
    } = OnboardingReducer.address;

    var body = {};
    if (postal_code === "") {
      body = {
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        city: city,
        country: strings.countryDefault,
        state: state,
      };
    } else {
      body = {
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        city: city,
        country: strings.countryDefault,
        postal_code: postal_code,
        state: state,
      };
    }
    try {
      console.log("body: ", body);
      var response = await onboardingAddressDetails(body);
      if (isResponseisValid(response)) {
        this.setState(
          {
            loading: false,
          },
          () => {
            this.updatedPageInfo(this.props.pageNo + 1);
            this.props.companyaddresseditUpdateData(false);
          }
        );
      } else {
        this.apiErrorHandlingInfo(response);
      }
    } catch (error) {
      this.apiCatchCaseHandlingInfo(error);
    }
  }

  // Trade Details api call
  async tradeLicenseApiCall() {
    this.setState({
      loading: true,
    });
    var bodyFormData = new FormData();
    const { OnboardingReducer } = this.props;
    const { license_number, issue_date, expiry_date, document } =
      OnboardingReducer.tradeLicenseData;

    var obj = {
      document_id: license_number,
      document_type: strings.issuePlace,
      issue_date: issue_date,
      expiry_date: expiry_date,
    };
    bodyFormData.append("documentDetails", JSON.stringify(obj));
    bodyFormData.append("file1", {
      uri: document.uri, //Your Image File Path
      type: document.type,
      name: document.filename,
    });
    try {
      var response = await onboardingTradeLicense(bodyFormData);
      if (isResponseisValid(response)) {
        if (this.state.orgNameIsEdit) {
          this.updateOrganizationCall();
        } else {
          this.setState(
            {
              loading: false,
            },
            () => {
              this.props.tradeLicenseeditUpdateData(false);
              this.updatedPageInfo(this.props.pageNo + 1);
            }
          );
        }
      } else {
        this.apiErrorHandlingInfo(response);
      }
    } catch (error) {
      this.apiCatchCaseHandlingInfo(error);
    }
  }

  async updateOrganizationCall() {
    const { OnboardingReducer } = this.props;
    const { orgName } = OnboardingReducer.tradeLicenseData;
    var body = {
      organization_name: orgName,
    };
    try {
      var response = await updateOrganization(body);
      if (isResponseisValid(response)) {
        this.setState(
          {
            loading: false,
          },
          () => {
            this.props.tradeLicenseeditUpdateData(false);
            this.updatedPageInfo(this.props.pageNo + 1);
          }
        );
      } else {
        this.apiErrorHandlingInfo(response);
      }
    } catch (error) {
      this.apiCatchCaseHandlingInfo(error);
    }
  }

  updatePreviousPage = () => {
    this.updatedPageInfo(this.props.pageNo - 1);
  };

  onDismiss = () => {
    this.setState({
      error: false,
    });
  };

  render() {
    const {
      shareHolderCheckIn,
      error,
      emiratesFrontDocument,
      emiratesBackDocument,
      snacktitle,
      tradeLicenceEditable,
      companyAddressEditable,
      emiratesEditable,
      isAdminCheckin,
      addSharePage,
      myPercentage,
      shareHolderStage,
      shareHolderList,
      isCheckin,
      user_email,
      arr,
      otpModal,
      colorChange,
      passVisble,
      seconds,
    } = this.state;
    const { OnboardingReducer, pageNo } = this.props;
    const { license_number, issue_date, expiry_date, orgName } =
      OnboardingReducer.tradeLicenseData;
    const {
      address_line_1,
      address_line_2,
      city,
      country,
      postal_code,
      state,
    } = OnboardingReducer.address;
    const { full_name, mobile_number } = OnboardingReducer.owner;
    const { document_id, front_document, back_document } =
      OnboardingReducer.identity_card;
    const { email_id } = OnboardingReducer.admin;
    const {
      loading,
      shareholderFullname,
      shareholderMobile,
      shareholderEmail,
      addedPercentage,
      array,
    } = this.state;
    return (
      <Container>
        <ActionSheet ref={actionSheetRef}>
          {array.map((data, index) => {
            return (
              <TouchableOpacity
                key={`${index}`}
                onPress={() => this.actionClick(data)}
                style={{
                  marginHorizontal: SIZES.padding2 * 3,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.pl,
                }}>
                <Text
                  style={
                    data === "Close" ? styles.actionSheet : styles.actionSheet1
                  }>
                  {data}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ActionSheet>
        <ActionSheet ref={actionSheetRef1}>
          {array.map((data, index) => {
            return (
              <TouchableOpacity
                key={`${index}`}
                onPress={() => this.actionClick1(data)}
                style={{
                  marginHorizontal: SIZES.padding2 * 3,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.pl,
                }}>
                <Text
                  style={
                    data === "Close" ? styles.actionSheet : styles.actionSheet1
                  }>
                  {data}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ActionSheet>
        <ActionSheet ref={actionSheetRef1}>
          {array.map((data, index) => {
            return (
              <TouchableOpacity
                key={`${index}`}
                onPress={() => this.actionClick1(data)}
                style={{
                  marginHorizontal: SIZES.padding2 * 3,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.pl,
                }}
              >
                <Text
                  style={
                    data === "Close" ? styles.actionSheet : styles.actionSheet1
                  }
                >
                  {data}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ActionSheet>
        <Error
          visible={error}
          tittle={snacktitle}
          dissMiss={this.onDismiss}
          type={2}
        />
        <Loader loading={loading} />
        <OtpComponent
          arr={arr}
          visiblity={otpModal}
          sumNumber={this.sumNumber}
          popItem={this.clearOtp}
          icon={passVisble}
          time={seconds}
          show={this.onClick}
          color={colorChange}
          title={"Input Security Code"}
          des={`Enter the 4-digit code Zyyp just sent to ${this.state.user_mobile_number}`}
          closeModal={this.otpCloseevent}
          resendClick={this.otpResend}
        />
        <Header>
          <View style={{ width: 120, height: 70, paddingBottom: 5 }}>
            <Progress percentage={((pageNo + 1) / 6) * 100}>
              <OnboardingNumberText
                text={`${pageNo + 1} of ${json.list.length}`}
              />
            </Progress>
          </View>
          <View
            style={{
              height: 70,
              justifyContent: "center",
              alignItems: "flex-end",
            }}>
            <HeaderTitleText text={json.list[this.props.pageNo].title} />
            <HeaderText text={json.list[this.props.pageNo].next} />
          </View>
        </Header>
        <View style={{ flex: 1, paddingTop: 16 }}>
          <PagerView
            ref={this.myRef}
            style={{ flex: 1 }}
            initialPage={pageNo}
            scrollEnabled={false}>
            <View key={1}>
              <TradeLicence
                orgName={orgName}
                tradeLicense={license_number}
                tradeLicenseIssueDate={issue_date}
                tradeLicenseExpiryDate={expiry_date}
                onChangeOrganizationText={this.onChangeOrganizationText}
                onChangeTradeLicenseText={this.onChangeTradeLicenseText}
                onChangeIssueText={this.onChangeIssueText}
                onChangeExpiryText={this.onChangeExpiryText}
                onTradeLicenceDocument={this.onTradeLicenceDocument}
                pressEditNavigation={this.pressEditNavigation}
                onSuccesPress={() =>
                  this.setState({
                    tradeLicenceEditable: !this.state.tradeLicenceEditable,
                  })
                }
                onCancelPress={() =>
                  this.setState({
                    tradeLicenceEditable: !this.state.tradeLicenceEditable,
                  })
                }
                editPress={() =>
                  this.setState({
                    tradeLicenceEditable: !this.state.tradeLicenceEditable,
                  })
                }
                editable={tradeLicenceEditable}
                item={json.list[0]}
              />
            </View>
            <View key={2}>
              <CompanyAddress
                orgName={orgName}
                address_line_1={address_line_1}
                address_line_2={address_line_2}
                city={city}
                country={country}
                postal_code={postal_code}
                state={state}
                emiratesClick={this.showEmiratespopup}
                onSuccesPress={() =>
                  this.setState({
                    companyAddressEditable: !this.state.companyAddressEditable,
                  })
                }
                onCancelPress={() =>
                  this.setState({
                    companyAddressEditable: !this.state.companyAddressEditable,
                  })
                }
                editPress={() =>
                  this.setState({
                    companyAddressEditable: !this.state.companyAddressEditable,
                  })
                }
                editable={companyAddressEditable}
                onChangeAddress1={this.onChangeAddress1}
                onChangeAddress2={this.onChangeAddress2}
                onChangeCity={this.onChangeCity}
                onChangeEmirates={this.onChangeEmirates}
                onChangeCountry={this.onChangeCountry}
                onChangePo={this.onChangePo}
                item={json.list[1]}
              />
            </View>
            <View key={3}>
              <OwnerDetails
                email={user_email}
                full_name={OnboardingReducer.owner.full_name}
                mobile_number={OnboardingReducer.owner.mobile_number}
                address_line_1={OnboardingReducer.owner.address_line_1}
                address_line_2={OnboardingReducer.owner.address_line_2}
                city={OnboardingReducer.owner.city}
                country={OnboardingReducer.owner.country}
                postal_code={OnboardingReducer.owner.postal_code}
                state={OnboardingReducer.owner.state}
                orgName={"Owner / Authorised Personal"}
                onChangeFullnameText={this.onChangeFullnameText1}
                onChangeMobileText={this.onChangeMobileText}
                onChangeAddress1={this.ownerAddressText}
                onChangeAddress2={this.ownerAddress2Text}
                onChangeCity={this.ownerCityText}
                emiratesClick={this.ownerEmirateClick}
                onChangePo={this.ownerPoText}
                item={json.list[2]}
              />
            </View>
            <View key={4}>
              <Emirates
                document_id={document_id}
                front_document={front_document}
                back_document={back_document}
                emiratesIssueDate={OnboardingReducer.identity_card.issue_date}
                emiratesExpiryDate={OnboardingReducer.identity_card.expiry_date}
                emiratesFrontDocument={emiratesFrontDocument}
                emiratesBackDocument={emiratesBackDocument}
                orgName={full_name}
                onChangeFullname={this.onChangeFullnameText}
                onChangeIdNumber={this.onChangeIdNumber}
                onChangeEmiratesIssueDate={this.onChangeEmiratesIssueDate}
                onChangeEmiratesExpiryDate={this.onChangeEmiratesExpiryDate}
                onChangeFrontDocument={this.onChangeFrontDocument}
                onChangeBackDocument={this.onChangeBackDocument}
                onSuccesPress={() =>
                  this.setState({
                    emiratesEditable: !this.state.emiratesEditable,
                  })
                }
                onCancelPress={() =>
                  this.setState({
                    emiratesEditable: !this.state.emiratesEditable,
                  })
                }
                editPress={() =>
                  this.setState({
                    emiratesEditable: !this.state.emiratesEditable,
                  })
                }
                editable={emiratesEditable}
                item={json.list[3]}
              />
            </View>
            <View key={5}>
              <ShareHolders
                shareholderFullname={shareholderFullname}
                shareholderMobile={shareholderMobile}
                shareholderEmail={shareholderEmail}
                shareHolderCheckIn={shareHolderCheckIn}
                pressEditNavigation={this.pressEditNavigation}
                addAnotherSharePress={this.addAnotherSharePress}
                addSharePage={addSharePage}
                plusPress={this.plusPress}
                minusPress={this.minusPress}
                myPercentage={myPercentage}
                addedPercentage={addedPercentage}
                onChangeTextInputPercentage={this.onChangeTextInputPercentage}
                onChangeTextInputPercentageUpdate={
                  this.onChangeTextInputPercentageUpdate
                }
                shareHolderPress={this.isShareHolderButtonClick}
                shareHolderList={shareHolderList}
                stage={shareHolderStage}
                onChangeShareholderFullname={this.onChangeShareholderFullname}
                onChangeShareholderMobile={this.onChangeShareholderMobile}
                onChangeShareholderEmail={this.onChangeShareholderEmail}
                onPress={this.isCheckinCalculationforShareHolder}
                deletePress={this.shareHolderListDelete}
                isCheckin={isCheckin}
                item={json.list[4]}
              />
            </View>
            <View key={6}>
              <AdminSetup
                email_id={email_id}
                full_name={OnboardingReducer.admin.full_name}
                mobile_number={OnboardingReducer.admin.mobile_number}
                shareHolderCheckIn={true}
                onChangeAdminFullName={this.onChangeAdminFullName}
                onChangeMobileNumber={this.onChangeMobileNumber}
                onChangeEmailId={this.onChangeEmailId}
                onPress={() =>
                  this.setState({ isAdminCheckin: !this.state.isAdminCheckin })
                }
                isCheckin={isAdminCheckin}
                item={json.list[5]}
              />
            </View>
          </PagerView>
        </View>
        <View
          style={{
            height: 70,
            width: SIZES.width,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {pageNo === 0 ? (
            <Button
              onPress={this.updateNextPage}
              type={1}
              color={COLORS.primary}
              icon={images.Next}>
              <ButtonText color={COLORS.white} text={"PROCEED"} />
            </Button>
          ) : pageNo === 5 ? (
            <Button
              onPress={this.updateNextPage}
              type={1}
              color={COLORS.primary}
              icon={images.Next}>
              <ButtonText color={COLORS.white} text={"Submit"} />
            </Button>
          ) : (
            <Footer>
              <Button
                onPress={this.updatePreviousPage}
                type={3}
                color={COLORS.white}>
                <ButtonText text={"BACK"} color={COLORS.primary} />
              </Button>
              <Button
                onPress={this.updateNextPage}
                type={2}
                icon={images.Next}
                color={COLORS.primary}>
                {pageNo + 1 === json.list.length ? (
                  <ButtonText color={COLORS.white} text={"SUBMIT"} />
                ) : (
                  <ButtonText color={COLORS.white} text={"NEXT"} />
                )}
              </Button>
            </Footer>
          )}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    OnboardingReducer: state.OnboardingReducer,
    LoginReducer: state.LoginReducer,
    pageNo: state.OnboardingReducer.pageNo,
  };
};
const styles = StyleSheet.create({
  actionSheet: {
    ...FONTS.h4,
    textAlign: "center",
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding2 * 1.5,
    color: COLORS.error,
  },
  actionSheet1: {
    ...FONTS.body3,
    textAlign: "center",
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding2 * 1.5,
    color: COLORS.blue,
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    tradeLicenseNumber: (data) => {
      dispatch(tradeLicenseNumber(data));
    },
    organizationName: (data) => {
      dispatch(organizationName(data));
    },
    tradeIssueDate: (data) => {
      dispatch(tradeIssueDate(data));
    },
    tradeExpiryDate: (data) => {
      dispatch(tradeExpiryDate(data));
    },
    tradeDocument: (data) => {
      dispatch(tradeDocument(data));
    },
    addressLineOne: (data) => {
      dispatch(addressLineOne(data));
    },
    addressLineTwo: (data) => {
      dispatch(addressLineTwo(data));
    },
    cityName: (data) => {
      dispatch(cityName(data));
    },
    emiratesId: (data) => {
      dispatch(emiratesId(data));
    },
    countryName: (data) => {
      dispatch(countryName(data));
    },
    poBox: (data) => {
      dispatch(poBox(data));
    },
    fullName: (data) => {
      dispatch(fullName(data));
    },
    mobileNumber: (data) => {
      dispatch(mobileNumber(data));
    },
    userEmail: (data) => {
      dispatch(userEmail(data));
    },
    IdNumber: (data) => {
      dispatch(IdNumber(data));
    },
    emiratesIssueDate: (data) => {
      dispatch(emiratesIssueDate(data));
    },
    emiratesExpiryDate: (data) => {
      dispatch(emiratesExpiryDate(data));
    },
    frontOfDocument: (data) => {
      dispatch(frontOfDocument(data));
    },
    backOfDocument: (data) => {
      dispatch(backOfDocument(data));
    },
    adminFullName: (data) => {
      dispatch(adminFullName(data));
    },
    adminMobileNumber: (data) => {
      dispatch(adminMobileNumber(data));
    },
    adminEmail: (data) => {
      dispatch(adminEmail(data));
    },
    upDatePageNumber: (data) => {
      dispatch(upDatePageNumber(data));
    },
    tradeLicenseeditUpdateData: (data) => {
      dispatch(tradeLicenseeditUpdateData(data));
    },
    companyaddresseditUpdateData: (data) => {
      dispatch(companyaddresseditUpdateData(data));
    },
    ownereditUpdateData: (data) => {
      dispatch(ownereditUpdateData(data));
    },
    identityeditUpdateData: (data) => {
      dispatch(identityeditUpdateData(data));
    },
    shareholdereditUpdateData: (data) => {
      dispatch(shareholdereditUpdateData(data));
    },
    shareHolderListUpdate: (data) => {
      dispatch(shareHolderListUpdate(data));
    },
    ownerAddress1: (data) => {
      dispatch(ownerAddress1(data));
    },
    ownerAddress2: (data) => {
      dispatch(ownerAddress2(data));
    },
    ownerCityData: (data) => {
      dispatch(ownerCityData(data));
    },
    ownerEmiratedId: (data) => {
      dispatch(ownerEmiratedId(data));
    },
    ownerPoBox: (data) => {
      dispatch(ownerPoBox(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ZyypOnBoarding);
