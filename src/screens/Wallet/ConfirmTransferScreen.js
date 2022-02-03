import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useDispatch } from "react-redux";
import { OtpComponent } from "../../components";
import CustomTextComponent from "../../components/CustomTextComponent";
import { strings } from "../../constants";
import { COLORS } from "../../utils/colors";
import { windowHeight, windowWidth } from "../../utils/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swipeable } from "react-native-gesture-handler";
import { CompanyWalletTransactionHeader } from "./CompanyWalletTransactionScreen";

export default function ConfirmTransferScreen({ navigation }) {
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
        text="Confirm Transfer"
      />
      <ScrollView
        contentContainerStyle={{
          height: windowHeight,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <View style={styles.transferMainContainer}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.transferImage}>
                <Image
                  source={require("../../../assets/svg/transfer.png")}
                  style={{ width: 26, height: 36, tintColor: "#fff" }}
                />
              </View>
              <View style={{ height: 30 }} />

              <CustomTextComponent
                text="37,000.00"
                fs={23}
                color={COLORS.BLACK}
                ff="Montserrat-Regular"
              />
              <CustomTextComponent
                text="Company Wallet"
                fs={18}
                color={COLORS.BLACK40}
              />
            </View>
          </View>
          <View
            style={[
              styles.transferMainContainer,
              { marginTop: -2, alignItems: "stretch" },
            ]}
          >
            <View
              style={{
                marginTop: -20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CustomTextComponent
                text="....."
                fs={28}
                color={COLORS.BLACK20}
                fw="700"
                mt={-14}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomTextComponent
                  text="1500.00"
                  fs={28}
                  color={COLORS.BLACK}
                  ff="Montserrat-Regular"
                />
                <Image
                  source={require("../../../assets/icons/downarrow.png")}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: "#00C2CB",
                    marginLeft: 12,
                  }}
                />
              </View>
              <CustomTextComponent
                text="....."
                fs={28}
                color={COLORS.BLACK20}
                fw="700"
                mt={-14}
              />
            </View>
            <View style={{ height: 60 }} />

            <View style={{ alignItems: "center" }}>
              <CustomTextComponent
                text="321.00"
                fs={23}
                color={COLORS.BLACK}
                ff="Montserrat-Regular"
              />
              <CustomTextComponent
                text="Personal Wallet"
                fs={18}
                color={COLORS.BLACK40}
              />
            </View>
          </View>
        </View>
        <View style={{ height: windowHeight / 5.5 }} />

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

        <SwipeToAddBtn
          text="SWIPE TO ADD"
          onPress={() => setIsShowOtpPopup(true)}
          // onPress={() => navigation.navigate('InputSecurityCodeScreen')}
        />
      </ScrollView>
    </View>
  );
}

export const SwipeToAddBtn = ({ text, onPress }) => {
  const LeftSwipeActions = ({text}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          width: windowWidth - 40,
          paddingVertical: 10,
          justifyContent: "center",
          paddingHorizontal: 10,
          backgroundColor: "#7B35E7",
          marginHorizontal: 20,
          borderRadius: 10,
        }}
        // onPress={onPress}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomTextComponent text={'SWIPE TO ADD'} fs={18} color={"#fff"} fw="700" />
        </View>
      </TouchableOpacity>
    );
  };

  const swipeFromLeftOpen = () => {
    onPress();
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={LeftSwipeActions}
        onSwipeableLeftOpen={swipeFromLeftOpen}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            width: windowWidth - 40,
            paddingVertical: 10,
            justifyContent: "center",
            paddingHorizontal: 10,
            backgroundColor: "#7B35E7",
            marginHorizontal: 20,
            borderRadius: 10,
          }}
          // onPress={onPress}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <Image
                source={require("../../../assets/icons/right-arrow.png")}
                style={{ width: 18, height: 18, tintColor: "#7B35E7" }}
              />
            </View>
            <CustomTextComponent text={text} fs={18} color={"#fff"} fw="700" />
            <CustomTextComponent
              text={"t"}
              fs={17}
              color={"#7B35E7"}
              fw="700"
            />
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  transferMainContainer: {
    width: windowWidth - 60,
    paddingHorizontal: 30,
    elevation: 10,
    shadowColor: "#999",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingBottom: 80,
    alignItems: "center",
  },
  transferImage: {
    width: 70,
    height: 70,
    backgroundColor: "#7B35E7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: -30,
  },
});
