//GIT UI deliverables issue #4: Individual first time Login and on-boarding
import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ReactNativeBiometrics from "react-native-biometrics";
import Keychain from "react-native-keychain";
import { connect, useDispatch } from "react-redux";
import base64 from "react-native-base64";
import jwt_decode from "jwt-decode";
import {
  COLORS,
  strings,
  FONTS,
  SIZES,
  images,
  VECTOR,
  styles,
} from "../../constants"; // Themes
import {
  AuthHeader,
  Button,
  ModalComponent,
  SemiBoldText,
  SmallText,
  ButtonText,
  OtpComponent,
  Error,
} from "../../components"; //Reusable components
import {
  getBiometric,
  authEmail,
  authLogin,
  Loader,
  authOtp,
  authOtpValidation,
  getOrganization,
  setPagestatus,
  setUserInformation,
  isResponseisValid,
  isValidEmail,
  getUserDetails,
  getOwnerUserData,
  pageValidation,
  setbiometricPassword
} from "../../Utilities";
import {
  organizationName,
  updateTradeLicenseDataFile,
  updateCompanyAdrressDataFile,
  updateIdentityDataFile,
  upDatePageNumber,
  ownerAddressInfo,
  ownereditUpdateData,
  fullName,
  mobileNumber,
} from "../../Redux/Action/OnboardingAction";
import { Appcontext } from "../../Setup/Appcontext";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { homeClick, OwnerOnboarding } = useContext(Appcontext);

  //--- Values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State Handling
  const [isEmailentered, setIsEmailentered] = useState(false);
  const [passWordicon, setPassWordicon] = useState(true);

  const [isShowTermsPopup, setIsShowTermsPopup] = useState(false);
  const [termsTitle, setTermsTitle] = useState("");
  const [termsDesc, setTermsDesc] = useState("");

  // Toast handling state
  const [isShowToast, setShowToast] = useState(false);
  const [alertType, setAlertType] = useState(0);
  const [toastTitle, setSnacktitle] = useState("");

  const [bioIcon, setBioIcon] = useState("");
  const [page, setPage] = useState("pass");

  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + "text";

  //Otp Pin
  const [otpCode, setOtpCode] = useState("");
  const [passVisble, setPassVisble] = useState(true);
  const [colorChange, setcolorChange] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = React.useState(30);
  const [otpPlaceholdertext, setOtpPlaceholdertext] = useState([
    ".",
    ".",
    ".",
    ".",
  ]);
  useEffect(() => {
    checkBiometricisEnabled();
  }, []);

  useEffect(() => {
    setOtpCode(otpPlaceholdertext.join("").toString());
    if (otpModal == true) {
      otpDuration();
    } else {
      setSeconds(30);
    }
  }, [otpPlaceholdertext, seconds]);

  //Privacy Policy & Terms of use
  const terms = (title, description, show) => {
    setTermsTitle(title);
    setTermsDesc(description);
    setIsShowTermsPopup(show);
  };

  const checkBiometricisEnabled = () => {
    getBiometric("biometric").then((response) => {
      if (response === "enable") {
        getBiometricDetails();
      }
    });
  };

  const getBiometricDetails = () => {
    ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        setBioIcon("touch");
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        setBioIcon("face");
      } else if (
        available &&
        biometryType === ReactNativeBiometrics.Biometrics
      ) {
        setBioIcon("touch");
        bioMetricSucesscheck();
      }
    });
  };
  const bioMetricSucesscheck = () => {
    ReactNativeBiometrics.createSignature({
      promptMessage: "Confirm Using Your Fingerprint",
      payload: payload,
    }).then((resultObject) => {
      const { success } = resultObject;
      getGenericIfno(success);
    });
  };
  const getGenericIfno = (isSuccess) => {
    if (isSuccess) {
      // Retrieve the credentials
      Keychain.getGenericPassword()
        .then((credentials) => {
          if (!credentials) {
            // no credentials stored, continue with normal login
            return;
          }
          loginUsingBiometric(credentials);
        })
        .catch((e) => console.log("Error getting credentials: " + e));
    } else {
    }
  };
  const loginUsingBiometric = (credentials) => {
    // auto login with stored credentials
    if (credentials.username && credentials.password) {
      const emailid = credentials.username;
      const pass = credentials.password;
      loginAPICall(emailid, pass);
    }
  };

  //Button click Event
  const proceedButtonclick = (type) => {
    if (type == 1) {
      emailValidation(email);
    } else if (type == 2) {
      if (password.length == 0) {
        handleToast(0, "Please Enter Password");
      } else {
        loginAPICall(email, password);
      }
    }
  };
  // const loginAPICall = async (mail, pass) => {
    
  //   //API CALL
  //   setLoading(true);
  //   const body = {
  //     email: mail,
  //     password: pass,
  //   };
  //   try {
  //     const loginResponse = await authLogin(body);
  //     if (isResponseisValid(loginResponse)) {
  //       let value = loginResponse.data;
  //       setLoading(false);
  //       dispatch(RegistrationData(value));
  //       const orgID = value.result.user.organization_id;
  //       const role = value.result.user.role;
  //       setUserInformation("User_Data", JSON.stringify(value.result));

  //       if (role === "OWNER") {
  //         const token = value.result.token;
  //         const id = base64.encode(JSON.stringify(orgID));
  //         const orgData = await getOrganization(token, id);
  //         if (isResponseisValid(orgData)) {
  //           setPagestatus("isLogin", "1");
  //           if (value.result.user.password_set === false) {
  //             navigation.navigate("LoginPassword");
  //           } else {
  //             dispatch(SucessData(value));
  //             const resultData = orgData.data.result;
  //             if (resultData.organization_data_status.value === "PENDING") {
  //               const orgName = resultData.org_detail.organization_name;
  //               dispatch(OrgData(resultData));
  //               dispatch(organizationName(orgName));
  //               // navigation.navigate("Zyyp_Onboarding");
  //               navigation.navigate("EditProfile");
  //             } else {
  //             }
  //           }
  //         } else {
  //           handleToast(0, orgData.data);
  //         }
  //       } else if (role === "USER") {
  //         const token = value.result.token;
  //         const user_id = value.result.user.id;
  //         const userData = await getUserDetails(token, orgID, user_id);
  //         var userOnboardingpages = [];

  //         if (userData.status === 200) {
  //           dispatch(SucessData(value));
  //           const resultObj = userData.data.result;
  //           if (resultObj.user_data_status.value === "PENDING") {
  //             userOnboardingpages = [
  //               ...resultObj.user_data_status.pending_details,
  //             ];
  //             if (userOnboardingpages.includes("ADDRESS")) {
  //               navigation.navigate("UserOnboarding", { pageNo: 0 });
  //             } else if (userOnboardingpages.includes("IDENTITY")) {
  //               dispatch(addressData(resultObj.user.address));
  //               dispatch(userFullname(resultObj.user.full_name));
  //               dispatch(userMobilenumber(resultObj.user.mobile_number));

  //               navigation.navigate("UserOnboarding", { pageNo: 1 });
  //             } else {
  //               navigation.navigate("UserOnboarding");
  //             }
  //           } else {
  //             //Home page Navigation change page status
  //             homeClick();
  //           }
  //         }
  //       }
  //     } else {
  //       setLoading(false);
  //       handleToast(0, loginResponse.data);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     handleToast(0, strings.apierror);
  //   }
  // };
  const loginAPICall = async (mail, pass) => {
    setLoading(true);
    //API CALL
    const body = {
      email: mail,
      password: pass,
    };
    try {
      const loginResponse = await authLogin(body);
      if (isResponseisValid(loginResponse)) {
        // setLoading(false);
        dispatch(SucessData(loginResponse.data, mail));
        const token = loginResponse.data.result.token;
        const orgID = loginResponse.data.result.organization_id;
        const orgBase64id = base64.encode(JSON.stringify(orgID));
        const userId = loginResponse.data.result.user_id;
        var payloadData = {
          token: token,
          orgid: orgBase64id,
          userId: userId,
          email: mail,
          adminId: "",
        };
        console.log("*** payloadData", payloadData.userId);
        dispatch(UserHeader(payloadData));
        //dispatch(TokenHeader(payloadData));
        setbiometricPassword("password",pass)
        // userRoleCheck(loginResponse.data);
        homeClick();
        setLoading(false);
      } else {
        setLoading(false);
        handleToast(0, loginResponse.data);
      }
    } catch (error) {
      console.log("Login Response :", error);
      setLoading(false);
      handleToast(0, strings.apierror);
    }
  };

  // Check the login response user role
  const userRoleCheck = (response) => {
    const token = response.result.token;
    const decodedToken = jwt_decode(token);
    const roles = decodedToken?.Roles;
    if (roles.includes("OWNER")) {
      //ownerDataValidation(response);
      ownerDataStatus(response);
    } else {
      roleAdminandUser(response);
    }
  };

  const roleAdminandUser = async (value) => {
    const user_id = value.result.user_id;
    try {
      const userData = await getOwnerUserData(user_id);
      if (isResponseisValid(userData)) {
        dispatch(UserInfo(userData.data));
        var userOnboardingpages = [];
        const userResultData = userData.data.result;
        setLoading(false);
        if (userResultData?.pending_details?.length > 0) {
          userOnboardingpages = [...userResultData.pending_details];
          if (userOnboardingpages.includes("ADDRESS") || userOnboardingpages.includes("PERSONAL_INFO")) {
            navigation.navigate("UserOnboarding", { pageNo: 0 });
          } else if (userOnboardingpages.includes("ID_DETAILS")) {
            dispatch(addressData(userResultData.address));
            dispatch(
              userFullname(userResultData.user_personal_info?.full_name)
            );
            dispatch(
              userMobilenumber(userResultData.user_personal_info?.mobile_number)
            );
            navigation.navigate("UserOnboarding", { pageNo: 1 });
          } else {
            navigation.navigate("UserOnboarding");
          }
        } else {
          //Home page Navigation change page status
          homeClick();
          setLoading(false);
        }

        console.log("Response", userData);
      } else {
        setLoading(false);
        handleToast(0, userData.data);
      }
    } catch (error) {
      console.log("roleAdminandUser :", error);
      setLoading(false);
      handleToast(0, strings.apierror);
    }
  };

  // Check the owner password status
  const ownerDataValidation = (data) => {
    if (data.result.password_set === false) {
      navigation.navigate("LoginPassword");
    } else {
      ownerDataStatus(data);
    }
  };

  // Check the organization and user completed status
  const ownerDataStatus = async (data) => {
    const userId = data.result.user_id;
    try {
      const orgData = await getOrganization();
      const userData = await getOwnerUserData(userId);

      if (isResponseisValid(orgData) && isResponseisValid(userData)) {
        const orgResultData = orgData.data.result;
        const userResultData = userData.data.result;
        ownerPrefetchData(orgResultData, userResultData);
      } else {
        setLoading(false);
        handleToast(0, userData.data);
      }
    } catch (error) {
      setLoading(false);
      handleToast(0, strings.apierror);
    }
  };

  const ownerPrefetchData = (orgResultData, userResultData) => {
    try {
      const orgSuccess = orgResultData?.pending_details?.length == 0;
      const userSuccess = userResultData?.pending_details?.length == 0;
      if (orgSuccess && userSuccess) {
        setLoading(false);
        homeClick();
      } else {
        ownerStatusCompletedValidation(orgResultData, userResultData);
      }
    } catch (error) {
      console.log("ownerPrefetchData -  catch", error);
      setLoading(false);
      handleToast(0, strings.apierror);
    }
  };

  const ownerStatusCompletedValidation = (orgResultData, userResultData) => {
    console.log("One");
    try {
      let remainingOnboardingPages = [];
      if (
        orgResultData.pending_details &&
        orgResultData.pending_details.length > 0
      ) {
        remainingOnboardingPages = [...orgResultData.pending_details];
      }
      if (
        userResultData.pending_details &&
        userResultData.pending_details.length > 0
      ) {
        let userPendingDetails = userResultData.pending_details;
        if (userResultData.pending_details.includes("ADDRESS")) {
          userPendingDetails = userResultData.pending_details.map((item) =>
            item === "ADDRESS" ? "USER_ADDRESS" : item
          );
        }
        remainingOnboardingPages = [
          ...remainingOnboardingPages,
          ...userPendingDetails,
        ];
      }
      ownerPrefetchPageValidation(
        remainingOnboardingPages,
        orgResultData,
        userResultData
      );
    } catch (error) {
      console.log("ownerStatusCompletedValidation -  catch", error);
      setLoading(false);
      handleToast(0, strings.apierror);
    }
  };

  const ownerPrefetchPageValidation = (
    remainingOnboardingPages,
    orgResultData,
    userResultData
  ) => {
    console.log("two: remainingOnboardingPages = ", remainingOnboardingPages);

    try {
      if (remainingOnboardingPages.includes("TRADE_LICENSE")) {
        const nm = pageValidation("TRADE_LICENSE");
        dispatch(upDatePageNumber(nm));
      } else if (remainingOnboardingPages.includes("ADDRESS")) {
        const nm = pageValidation("ADDRESS");
        dispatch(upDatePageNumber(nm));
      } else if (remainingOnboardingPages.includes("PERSONAL_INFO")) {
        const nm = pageValidation("PERSONAL_INFO");
        dispatch(upDatePageNumber(nm));
      } else if (remainingOnboardingPages.includes("USER_ADDRESS")) {
        const nm = pageValidation("USER_ADDRESS");
        dispatch(upDatePageNumber(nm));
      } else if (remainingOnboardingPages.includes("ID_DETAILS")) {
        const nm = pageValidation("ID_DETAILS");
        dispatch(upDatePageNumber(nm));
      } else if (remainingOnboardingPages.includes("SHAREHOLDERS")) {
        const nm = pageValidation("SHAREHOLDERS");
        dispatch(upDatePageNumber(nm));
      } else if (remainingOnboardingPages.includes("ADMIN")) {
        const nm = pageValidation("ADMIN");
        dispatch(upDatePageNumber(nm));
      }
      storeOwnerPrefetchDatatoRedux(
        orgResultData,
        userResultData,
        remainingOnboardingPages
      );
    } catch (error) {
      console.log("ownerPrefetchPageValidation -  catch", error);
      setLoading(false);
      handleToast(0, strings.apierror);
    }
  };

  const storeOwnerPrefetchDatatoRedux = (
    orgResultData,
    userResultData,
    remainingOnboardingPages
  ) => {
    console.log("three");
    try {
      const orgName = orgResultData.org_info.organization_name;
      setPagestatus("isLogin", "1");
      dispatch(organizationName(orgName));
      if (
        remainingOnboardingPages.includes("PERSONAL_INFO") ||
        remainingOnboardingPages.includes("USER_ADDRESS")
      ) {
        dispatch(ownereditUpdateData(true));
      }

      if (orgResultData.trade_license) {
        const trade_license = orgResultData.trade_license;
        dispatch(updateTradeLicenseDataFile(trade_license));
      }
      if (orgResultData?.org_address) {
        const org_address = orgResultData.org_address;
        dispatch(updateCompanyAdrressDataFile(org_address));
      }
      if (userResultData?.id_document) {
        const id_document = userResultData.id_document;
        dispatch(updateIdentityDataFile(id_document));
      }
      console.log("updateIdentityDataFile: userResultData =", userResultData);
      if (userResultData?.address) {
        const address = userResultData?.address;
        dispatch(ownerAddressInfo(address));
      }
      if (userResultData?.user_personal_info?.full_name) {
        const full_name = userResultData.user_personal_info.full_name;
        dispatch(fullName(full_name));
      }
      if (userResultData.user_personal_info?.mobile_number) {
        const mobile_number = userResultData.user_personal_info.mobile_number;
        dispatch(mobileNumber(mobile_number));
      }

      setLoading(false);
      OwnerOnboarding();
    } catch (error) {
      console.log("storeOwnerPrefetchDatatoRedux -  catch", error);
      setLoading(false);
      handleToast(0, strings.apierror);
    }
  };

  //Password Show Hide on OTP modal
  const onClick = (val) => {
    setPassVisble(!val);
  };

  const clearOtpdata = () => {
    setOtpModal(false);
    clearOtp();
    setPassVisble(true);
    setOtpPlaceholdertext([".", ".", ".", "."]);
  };

  // OTP page Handling
  const otpCloseevent = (val) => {
    setOtpModal(false);
    setcolorChange(false);
    if (val == "close") {
      clearOtpdata();
    } else {
      otpValidationapicall();
    }
  };

  const otpValidationapicall = async () => {
    var dt = new Date();
    dt.toISOString();
    const body = {
      email: email,
      otp: otpCode,
    };
    try {
      const otpValidationresponse = await authOtpValidation(body);
      if (isResponseisValid(otpValidationresponse)) {
        clearOtpdata();
        setEmail("");
        setPassword("");
        setIsEmailentered(false);
        dispatch(
          PasswordHeader({
            pwdToken: otpValidationresponse.data.result,
          })
        );
        if (page === "pass") {
          navigation.navigate("LoginPassword", {
            emailid: email,
          });
        } else {
          navigation.navigate("LoginPassword", {
            emailid: email,
            page: "forgot",
          });
        }
      } else {
        handleToast(0, otpValidationresponse.data);
      }
    } catch (e) {
      handleToast(0, strings.apierror);
    }
  };
  const onChangeotptext = (v) => {
    var num = [...otpPlaceholdertext];
    for (let i = 0; i <= 3; i++) {
      if (num[i] == ".") {
        num[i] = v;
        break;
      } else if (i >= 2) {
        setcolorChange(true);
      } else {
        setcolorChange(false);
      }
    }
    setOtpPlaceholdertext(num);
  };
  const clearOtp = () => {
    setcolorChange(false);
    var num = [...otpPlaceholdertext];
    for (let i = 3; i >= 0; i--) {
      if (num[i] !== ".") {
        num[i] = ".";
        break;
      }
    }
    setOtpPlaceholdertext(num);
  };
  const emailValidation = (text) => {
    setEmail(text);
    if (text.length == 0) {
      handleToast(0, "Please Enter Email ID");
    } else if (isValidEmail(text) === false) {
      handleToast(0, "Invalid email ID, please verify");
    } else {
      onEmailCheckApicall(text);
      setIsEmailentered(true);
    }
  };
  const handleToast = (type, message) => {
    setShowToast(true);
    setAlertType(type);
    setSnacktitle(message);
  };
  const onEmailCheckApicall = async (text) => {
    try {
      const emailResponse = await authEmail(text);
      if (isResponseisValid(emailResponse)) {
        const obj = emailResponse.data;
        onEmailSucessresponse(obj);
      } else {
        handleToast(0, emailResponse.data);
      }
    } catch (e) {
      handleToast(0, strings.apierror);
    }
  };
  const onEmailSucessresponse = (obj) => {
    console.log(`onEmailSucessresponse: ${JSON.stringify(obj)}`);
    const orgID = obj.result.organization_id;
    const orgBase64id = base64.encode(JSON.stringify(orgID));
    console.log(`onEmailSucessresponse: orgBase64id = ${orgBase64id}`);
    dispatch(OrgIdHeader({ orgId: orgBase64id }));
    if (obj.result.password_set == true) {
      setIsEmailentered(true);
    } else {
      otpSendApicall();
      setOtpModal(true);
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  };
  const infoClick = () => {
    handleToast(1, "TBD");
  };
  const headerBackclick = () => {
    if (isEmailentered == true) {
      setIsEmailentered(!isEmailentered);
    } else {
      navigation.navigate("Welcome");
    }
  };

  const otpSendApicall = async () => {
    const body = {
      email: email,
      type: "EMAIL",
    };
    try {
      const otpResponse = await authOtp(body);
      if (isResponseisValid(otpResponse)) {
        setLoading(false);
        //setOtpModal(false);
        otpDuration();
      } else {
        //Fail Response for OTP
        setLoading(false);
        handleToast(0, otpResponse.data);
      }
    } catch (e) {
      setLoading(false);
      handleToast(0, strings.apierror);
    }
  };

  const otpDuration = () => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
    }
  };

  const forGotClick = () => {
    setPage("forgot");
    setOtpModal(true);
    setTimeout(() => setSeconds(seconds - 1), 1000);
    otpSendApicall();
  };
  const otpResendapicall = async () => {
    setOtpPlaceholdertext([".", ".", ".", "."]);
    if (seconds === "0") {
      const ob = {
        email: email,
        type: "EMAIL",
      };
      try {
        const otpResendResponse = await authOtp(ob);
        if (isResponseisValid(otpResendResponse)) {
          setOtpModal(true);
          setSeconds(30);
          alert("Otp resend Successfully");
        } else {
          //Fail Response for OTP
          handleToast(0, otpResendResponse.data);
        }
      } catch (e) {
        handleToast(0, strings.apierror);
      }
    } else {
      alert(`Please wait for ${seconds} s`);
    }
  };

  return (
    <SafeAreaView style={styles.l_container}>
      {/* <Shadow
      paintInside={true}
      containerViewStyle={{flex:1,backgroundColor:'pink',width:SIZES.width, marginVertical:100}}
      > */}
      <View style={styles.l_componentView}>
        <Error
          dissMiss={() => setShowToast(false)}
          visible={isShowToast}
          type={alertType}
          tittle={toastTitle}
        />
        {/* <OfflineNotice/> */}
        <OtpComponent
          arr={otpPlaceholdertext}
          visiblity={otpModal}
          sumNumber={onChangeotptext}
          popItem={clearOtp}
          icon={passVisble}
          time={seconds}
          show={onClick}
          color={colorChange}
          title={"Input Security Code"}
          des={`Enter the 4-digit code Zyyp just sent to ${email}`}
          closeModal={otpCloseevent}
          resendClick={otpResendapicall}
        />

        <ModalComponent
          visiblity={isShowTermsPopup}
          title={termsTitle}
          des={termsDesc}
          closeModal={(val) => setIsShowTermsPopup(false)}
        />

        <AuthHeader
          tittle={strings.loginh_Tittle}
          left_icon={images.back}
          right_icon={images.Info}
          title_color={COLORS.primary}
          backPress={headerBackclick}
          infotext={"TBD"}
          // headerClick={() => navigation.navigate("Sucess")}
          headerClick={infoClick}
        />
        <Loader loading={loading} />

        <KeyboardAwareScrollView
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            // flex: 1,
            width: SIZES.width,
            alignItems: "center",
            flexGrow: 1,
          }}
          enableOnAndroid={true}
          enableResetScrollToCoords={true}
          keyboardDismissMode="interactive">
          {isEmailentered != true ? (
            <View style={styles.l_loginform}>
              <View style={{ paddingVertical: SIZES.padding2 * 3 }}>
                <SemiBoldText text={strings.Ln_Tittle} />
              </View>
              <SmallText text={strings.emTittle} />
              <View
                style={[
                  styles.l_inputBox,
                  {
                    flexDirection: "row",
                    marginBottom: SIZES.base * 2,
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: COLORS.inputborder,
                  },
                ]}>
                <Image source={images.Mail} resizeMode="contain" />
                <TextInput
                  placeholder={strings.emPH}
                  style={{
                    marginLeft: SIZES.base * 2,
                    ...FONTS.body4,
                    width: "90%",
                  }}
                  keyboardType={
                    Platform.OS === "ios" ? "ascii-capable" : "visible-password"
                  }
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => setEmail(text.trim())}
                  placeholderTextColor={COLORS.pl}
                />
              </View>
              {bioIcon === "touch" ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}>
                  <Image source={images.bio} resizeMode="contain" />
                  <Text
                    style={{
                      ...FONTS.t1,
                      color: COLORS.secondary,
                      paddingVertical: SIZES.padding2 * 2,
                    }}>
                    {"Login With FIngerprint"}
                  </Text>
                </View>
              ) : bioIcon === "face" ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}>
                  <Image source={images.face} resizeMode="contain" />
                  <Text
                    style={{
                      ...FONTS.t1,
                      color: COLORS.secondary,
                      paddingVertical: SIZES.padding2 * 2,
                    }}>
                    {"Login With Face ID"}
                  </Text>
                </View>
              ) : null}

              <Text style={styles.l_descText}>
                By continuing you verify that you are of legal age lorem doler
                sit amet. ....agree to
                <Text
                  onPress={() =>
                    terms(strings.termsTitle, strings.termsContent, true)
                  }
                  style={styles.l_hightlightText}>
                  Terms of Use{" "}
                </Text>
                and{" "}
                <Text
                  onPress={() =>
                    terms(strings.privacyTitle, strings.privacyContent, true)
                  }
                  style={styles.l_hightlightText}>
                  {"  "}
                  Privacy Policy
                </Text>
              </Text>
            </View>
          ) : (
            <View style={styles.l_loginform}>
              <View style={{ paddingVertical: SIZES.padding2 * 3 }}>
                <SemiBoldText text={strings.Ln_psTittle} />
              </View>
              <SmallText text={strings.psTittle} />
              <View
                style={[
                  styles.l_inputBox,
                  {
                    flexDirection: "row",
                    marginBottom: SIZES.base * 2,
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: COLORS.inputborder,
                  },
                ]}>
                <TextInput
                  placeholder={strings.psPH}
                  secureTextEntry={passWordicon}
                  style={{
                    ...FONTS.body4,
                    width: "93%",
                  }}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(text) => setPassword(text.trimLeft())}
                  placeholderTextColor={COLORS.pl}
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setPassWordicon(!passWordicon)}>
                  {passWordicon == true ? VECTOR.Hide : VECTOR.Show}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => forGotClick()}>
                <Text style={styles.l_fgText}>{strings.forgotPS}</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAwareScrollView>

        <View
          style={{
            height: 70,
            width: SIZES.width,
            backgroundColor: COLORS.white,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 20,
          }}>
          {isEmailentered == false ? (
            <Button
              type={1}
              color={COLORS.primary}
              onPress={() => proceedButtonclick("1")}
              icon={images.Next}>
              <ButtonText color={COLORS.white} text={strings.bt_Proceed} />
            </Button>
          ) : (
            <Button
              type={1}
              color={COLORS.primary}
              onPress={() => proceedButtonclick("2")}
              icon={images.Next}>
              <ButtonText color={COLORS.white} text={strings.bt_Login} />
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  return {
    LoginReducer: state.LoginReducer,
  };
};
export default connect(mapStateToProps)(Login);
export function RegistrationData(data) {
  return {
    type: "RegistrationData",
    payload: data,
  };
}
export function SucessData(data, mail) {
  return {
    type: "SucessData",
    payload: data,
    email: mail,
  };
}
export function UserInfo(data) {
  return {
    type: "UserInfo",
    payload: data,
  };
}
export function addressData(data) {
  return {
    type: "addressData",
    payload: data,
  };
}
export function userMobilenumber(data) {
  return {
    type: "userMobilenumber",
    payload: data,
  };
}
export function userFullname(data) {
  return {
    type: "userFullname",
    payload: data,
  };
}

export function indentityData(data) {
  return {
    type: "indentityData",
    payload: data,
  };
}
export function UserHeader(data) {
  return {
    type: "UserHeader",
    payload: data,
  };
}

export function TokenHeader(data) {
  return {
    type: "TokenHeader",
    payload: data,
  };
}

export function PasswordHeader(data) {
  return {
    type: "PasswordHeader",
    payload: data,
  };
}

export function OrgIdHeader(data) {
  return {
    type: "OrgIdHeader",
    payload: data,
  };
}
// export function addressData(data) {
//   return {
//     type: "addressData",
//     payload: data,
//   };
// }
// export function userMobilenumber(data) {
//   return {
//     type: "userMobilenumber",
//     payload: data,
//   };
// }
// export function userFullname(data) {
//   return {
//     type: "userFullname",
//     payload: data,
//   };
// }

// export function indentityData(data) {
//   return {
//     type: "indentityData",
//     payload: data,
//   };
// }
// export function UserHeader(data) {
//   return {
//     type: "UserHeader",
//     payload: data,
//   };
// }
