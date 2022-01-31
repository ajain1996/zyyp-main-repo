import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import SvgUri from "react-native-svg-uri";
import { useDispatch } from "react-redux";
import { OtpComponent } from "../../../components";
import CustomTextComponent from "../../../components/CustomTextComponent";
import { strings } from "../../../constants";
import { COLORS } from "../../../utils/colors";
import { windowHeight, windowWidth } from "../../../utils/utils";
import { CompanyWalletTransactionHeader } from "../CompanyWalletTransactionScreen";

export default function PersonalCardSettingsScreen({ navigation }) {
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = async (val) => {
    setSwitchValue((previousState) => !previousState);
  };

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
    <View>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Card Settings"
      />

      <ScrollView style={{ backgroundColor: "#fff", height: windowHeight }}>
        <View style={{ paddingHorizontal: 26 }}>
          <View style={{ height: 30 }} />
          <CustomTextComponent
            text="Security"
            fs={20}
            color={COLORS.BLACK40}
            fw="700"
          />
          <View style={{ height: 35 }} />

          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomTextComponent
                text="Security Pin"
                fs={18}
                color={COLORS.BLACK}
                fw="500"
              />
              <TouchableOpacity onPress={() => setIsShowOtpPopup(true)}>
                <CustomTextComponent
                  text="Reset"
                  fs={16}
                  color={COLORS.PURPLE}
                  fw="500"
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 30 }} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: windowWidth / 1.7 }}>
                <CustomTextComponent
                  text="Lock Card"
                  fs={19}
                  color={COLORS.BLACK}
                  fw="500"
                />
                <CustomTextComponent
                  text="This will temporarily lock your card and put all transaction for this card on hold."
                  fs={12}
                  color={COLORS.BLACK40}
                  fw="500"
                />
              </View>

              <Switch
                trackColor={{ false: COLORS.ORANGE, true: "#00C2CB" }}
                thumbColor={"white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={switchValue}
                style={{ transform: [{ scaleX: 2.4 }, { scaleY: 2.4 }] }}
              />
              <View style={{ position: "absolute", right: 30 }}>
                <CustomTextComponent
                  text="ON"
                  fs={12}
                  color={COLORS.WHITE}
                  fw="500"
                />
              </View>
              <View style={{ position: "absolute", right: -3 }}>
                <CustomTextComponent
                  text="OFF"
                  fs={12}
                  color={COLORS.WHITE}
                  fw="500"
                />
              </View>
            </View>
            <View style={{ height: 30 }} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomTextComponent
                text="Block & Replace"
                fs={18}
                color={COLORS.BLACK}
                fw="500"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("CardBlockReplace")}
              >
                <SvgUri
                  source={require("../../../../assets/svg/arrow-front.svg")}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 30 }} />

            <View
              style={{ width: "100%", height: 1, backgroundColor: "#CBD2D9" }}
            />
          </View>

          <View style={{ height: 30 }} />
          <CustomTextComponent
            text="Information"
            fs={20}
            color={COLORS.BLACK40}
            fw="700"
          />
          <View style={{ height: 35 }} />

          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomTextComponent
                text="Samsung Card"
                fs={18}
                color={COLORS.BLACK}
                fw="500"
              />

              <CustomTextComponent
                text="View Instructions"
                fs={16}
                color={COLORS.PURPLE}
                fw="500"
              />
            </View>
            <View style={{ height: 30 }} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomTextComponent
                text="Apple Pay"
                fs={18}
                color={COLORS.BLACK}
                fw="500"
              />

              <CustomTextComponent
                text="View Instructions"
                fs={16}
                color={COLORS.PURPLE}
                fw="500"
              />
            </View>
            <View style={{ height: 30 }} />

            <View
              style={{ width: "100%", height: 1, backgroundColor: "#CBD2D9" }}
            />
          </View>
        </View>
      </ScrollView>
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
        double={true}
      />
    </View>
  );
}
