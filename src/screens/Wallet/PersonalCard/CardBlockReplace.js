import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from "react-native";

import SelectDropdown from "react-native-select-dropdown";
import SvgUri from "react-native-svg-uri";
import { useDispatch } from "react-redux";
import { OtpComponent } from "../../../components";
import CustomTextComponent from "../../../components/CustomTextComponent";
import { Notes } from "../../../components/Notes";
import { strings } from "../../../constants";
import { COLORS } from "../../../utils/colors";
import { CompanyWalletTransactionHeader } from "../CompanyWalletTransactionScreen";
import { WithdrawFundsBtn } from "../WithDrawlFundsScreen";
export default CardBlockReplace = ({ navigation }) => {
  const cardData = ["Card 1", "card 2", "card 3", "card 4"];

  const dispatch = useDispatch();
  //--- Values
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const emailInputRef = React.createRef();

  // ---- Otp State Maintaing
  const [otpCode, setOtpCode] = useState("");
  const [otpPlaceHolderText, setOtpPlaceHolderText] = useState([
    ".",
    ".",
    ".",
    ".",
  ]);
  const [seconds, setSeconds] = useState(30);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [isShowOtpPopup, setIsShowOtpPopup] = useState(false);
  const [passVisble, setPassVisble] = useState(true);
  const [colorChange, setcolorChange] = useState(false);

  // Terms & conditions and privacy policy
  const [isShowTermsPopup, setIsShowTermsPopup] = useState(false);
  const [termsTitle, setTermsTitle] = useState("");
  const [termsDesc, setTermsDesc] = useState("");

  const [loading, setLoading] = useState(false);

  // Toast handling state
  const [isShowToast, setShowToast] = useState(false);
  const [alertType, setAlertType] = useState(0);
  const [toastTitle, setToasttitle] = useState("");

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setOtpCode(otpPlaceHolderText.join("").toString());
    if (isShowOtpPopup == true) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds("0");
      }
    } else {
      setSeconds(30);
    }
  }, [otpPlaceHolderText, seconds]);

  // Toast Content Handling
  const toastHandle = (type, message) => {
    setAlertType(type);
    setToasttitle(message);
    setShowToast(true);
  };

  //Password Show Hide on OTP modal
  const onChangePasswordVisibility = (val) => {
    setPassVisble(!val);
  };

  const infoClick = () => {
    toastHandle(1, "Info message.");
  };
  const headerBackclick = () => {
    navigation.navigate("Welcome");
  };
  //Privacy policy and Terms and Events
  const terms = (title, description, show) => {
    setTermsTitle(title);
    setTermsDesc(description);
    setIsShowTermsPopup(show);
  };
  const onDismiss = () => {
    setShowToast(false);
    setcolorChange(false);
  };

  const onChangeOtpText = (v) => {
    var num = [...otpPlaceHolderText];
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
    setOtpPlaceHolderText(num);
  };
  const clearOtp = () => {
    setcolorChange(false);
    var num = [...otpPlaceHolderText];
    for (let i = 3; i >= 0; i--) {
      if (num[i] !== ".") {
        num[i] = ".";
        break;
      }
    }
    setOtpPlaceHolderText(num);
  };

  // Sign up Validation
  const signupFormValidation = () => {
    if (orgName.length === 0) {
      toastHandle(0, "Please enter company name");
    } else if (email.length == 0) {
      toastHandle(0, "Please Enter Email ID");
    } else if (isValidEmail(email) === false) {
      toastHandle(0, "Invalid email ID, please verify");
    } else {
      setLoading(true);
      // signUpApiCall();

      sendOtpApi();
    }
  };

  // Signup Api Call
  const signUpApiCall = async () => {
    try {
      const body = {
        email: email,
        organization_name: orgName,
      };
      const response = await authSignup(body);
      if (isResponseisValid(response)) {
        const responseData = response.data;
        setLoading(false);
        dispatch(RegistrationData(responseData.result));
        setOwnerEmail(email);
        sendOtpApi();
      } else {
        //Fail Response for Signup
        setLoading(false);
        if (response.data) {
          toastHandle(0, response.data);
        }
      }
    } catch (error) {
      setLoading(false);
      toastHandle(0, strings.apierror);
    }
  };

  // Otp Api Call
  const sendOtpApi = async () => {
    const body = {
      email: email,
      type: "EMAIL",
    };
    try {
      const otpResponse = await authOtp(body);
      if (isResponseisValid(otpResponse)) {
        setLoading(false);
        setIsShowOtpPopup(true);
        otpTimeValidation();
      } else {
        setLoading(false);
        if (otpResponse.data) {
          toastHandle(0, otpResponse.data);
        }
      }
    } catch (error) {
      setLoading(false);
      toastHandle(0, strings.apierror);
    }
  };

  const otpTimeValidation = () => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("0");
    }
  };

  // Resend Otp Validation
  const otpResend = () => {
    setLoading(true);
    setOtpPlaceHolderText([".", ".", ".", "."]);
    if (seconds === "0") {
      otpResendApiCall();
    } else {
      toastHandle(0, strings.apierror);
      setLoading(false);
    }
  };
  // Resend Otp Api Call
  const otpResendApiCall = async () => {
    const ob = {
      email: email,
      type: "EMAIL",
    };
    try {
      const resendOtpResponse = await authOtp(ob);
      if (isResponseisValid(resendOtpResponse)) {
        setLoading(false);
        setSeconds(30);
      } else {
        setLoading(false);
        if (resendOtpResponse.data) {
          toastHandle(0, resendOtpResponse.data);
        }
      }
    } catch (e) {
      //Something Went Wrong in api
      setLoading(false);
      toastHandle(0, strings.apierror);
    }
  };

  // OTP Close and Submit Button Handling
  const otpButtonEvent = (val) => {
    setcolorChange(false);
    if (val == "close") {
      setIsShowOtpPopup(false);
      setPassVisble(true);
      setOtpPlaceHolderText([".", ".", ".", "."]);
    } else {
      setIsShowOtpPopup(false);
      otpValidationApiCall();
    }
  };

  const refreshData = ({ message }) => {
    toastHandle(0, message);
  };

  // Otp Validation Api call
  const otpValidationApiCall = () => {
    navigation.navigate("Password", {
      refreshData: refreshData,
      from: "signup",
      email: email,
      otpCode: otpCode,
      organization_name: orgName,
    });
  };

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#fff" }}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: 44,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icons/arrow-back.png')}
            style={[styles.ImageStyle, {tintColor:'#7B8794'}]}
          />
        </TouchableOpacity>
        <View
          style={{alignItems: 'center', justifyContent: 'center', height: 60}}>
          <Text
            style={{
              color: '#323F4B',
              fontSize: 21,
              marginRight:100,
              fontWeight: '400',
              fontFamily: 'Poppins-Regular',
            }}>
            Block & Replace
          </Text>
        </View>
      </View> */}
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Block & Replace"
      />

      <View style={{ marginTop: 20 }} />

      <Text
        style={{
          color: "#343C44",
          fontSize: 13,
          marginHorizontal: 24,
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
        }}
      >
        Reason for request
      </Text>

      <View
        style={{
          marginHorizontal: 24,
          marginTop: 10,
          // backgroundColor: "#E5E5E5",
        }}
      >
        <SelectDropdown
          data={cardData}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"Card lost"}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            console.log(isOpened);
            return (
              <SvgUri
                source={require("../../../../assets/svg/down-arrow-br.svg")}
                // style={[
                //   styles.ImageStyle,
                //   { tintColor: "#7B8794", width: 20, height: 20 },
                // ]}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={{marginHorizontal: 24, marginTop: 20}}>
        <Notes
          placeholderContent={"Notes"}
          placeholder={"Type any relevant comment to this request"}
          popup={true}
        />
      </View>
      {/* <Text
        style={{
          color: "#85949F",
          fontSize: 20,
          marginLeft: 30,

          marginRight: 30,
          fontWeight: "600",
          fontFamily: "Poppins-Regular",
        }}
      >
        You will be changed a fixed fee of aed 40 for each request for a
        physical card replacement.
      </Text> */}
      <View style={{ marginHorizontal: 30 }}>
        <CustomTextComponent
          text={"You will be charged a fixed fee of"}
          fs={18}
          color={COLORS.BLACK40}
          fw="bold"
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomTextComponent
            text={"aed 40"}
            fs={18}
            color={COLORS.ORANGE}
            fw="bold"
          />
          <CustomTextComponent
            text={" for each request for a"}
            fs={18}
            color={COLORS.BLACK40}
            fw="bold"
          />
        </View>
        <CustomTextComponent
          text={"physical card replacement."}
          fs={18}
          color={COLORS.BLACK40}
          fw="bold"
        />
      </View>
      {/* <View style={styles.ButtonStyle}>
        <Text
          style={{
            fontSize: 15,
            color: "#ffff",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          REQUEST CARD
        </Text>
        <Image
          source={require("../../../../assets/images/Tick.png")}
          style={styles.ImageStyle}
        />
      </View> */}
      <View
        style={{
          justifyContent: "flex-end",
          marginBottom: 20,
          marginTop: "auto",
        }}
      >
        <WithdrawFundsBtn
          text="REQUEST CARD"
          onPress={() => setIsShowOtpPopup(true)}
        />
      </View>
      <OtpComponent
        arr={otpPlaceHolderText}
        visiblity={isShowOtpPopup}
        sumNumber={onChangeOtpText}
        popItem={clearOtp}
        icon={passVisble}
        show={onChangePasswordVisibility}
        time={seconds}
        color={colorChange}
        title={strings.OtpTitle}
        des={`Enter the 4-digit code Zyyp just sent to\nprh***@**yp.io`}
        closeModal={otpButtonEvent}
        resendClick={otpResend}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD2D9",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",

    backgroundColor: "#F7F8FA",
    elevation: 1,
    height: 220,
    borderRadius: 8,
    margin: 30,
  },

  ButtonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#7B35E7",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 50,
    borderRadius: 10,
    margin: 30,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,

    resizeMode: "stretch",
    alignItems: "center",
  },

  dropdown1BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#F7F8FA",
    elevation: 1,
    borderRadius: 8,
  },
  dropdown1BtnTxtStyle: { color: "#AABBC6", textAlign: "left", fontSize: 16, fontFamily: 'Poppins-Regular' },
  dropdown1DropdownStyle: { backgroundColor: "#F7F8FA" },
  dropdown1RowStyle: {
    backgroundColor: "#F7F8FA",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#777", textAlign: "left", fontSize: 18 },
});
