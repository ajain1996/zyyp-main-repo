// GIT UI deliverables issue #3: Business on-boarding
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  BackHandler,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Keyboard Handling Package
import { COLORS, images, styles, strings, SIZES } from "../../constants"; // Themes
import {
  AuthHeader,
  SemiBoldText,
  SmallText,
  ModalComponent,
  OtpComponent,
  Button,
  ButtonText,
  Error,
} from "../../components"; // Reusable Components
import {
  authSignup,
  authOtp,
  authOtpValidation,
  Loader,
  isResponseisValid,
  isValidEmail,
} from "../../Utilities";

import { connect, useDispatch } from "react-redux";
import { RegistrationData } from "../../Redux/Action/Authentication";

const SignUp = ({ navigation }) => {
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

    // var dt = new Date();
    // dt.toISOString();
    // const obj = {
    //   email: email,
    //   otp: otpCode,
    // };
    // console.log("Obj", obj);
    // try {
    //   const otpValidationresponse = await authOtpValidation(obj);
    //   if (isResponseisValid(otpValidationresponse)) {
    //     setIsShowOtpPopup(false);
    //     navigation.navigate("Password", {
    //       from: "signup",
    //       email: email,
    //     });
    //   } else {
    //     setLoading(false);
    //     if (otpValidationresponse.data) {
    //       toastHandle(0, otpValidationresponse.data);
    //     }
    //   }
    // } catch (e) {
    //   //Something Went Wrong in validation API Cache
    //   setLoading(false);
    //   toastHandle(0, strings.apierror);
    // }
  };
  return (
    <SafeAreaView style={styles.s_container}>
      <Error
        dissMiss={onDismiss}
        visible={isShowToast}
        tittle={toastTitle}
        type={alertType}
      />
      <ModalComponent
        visiblity={isShowTermsPopup}
        title={termsTitle}
        des={termsDesc}
        closeModal={(val) => setIsShowTermsPopup(false)}
      />
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
        des={`Enter the 4-digit code Zyyp just sent to ${ownerEmail}`}
        closeModal={otpButtonEvent}
        resendClick={otpResend}
      />
      <Loader loading={loading} />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        keyboardDismissMode="interactive">
        <AuthHeader
          tittle={strings.signh_Tittle}
          left_icon={images.back}
          right_icon={images.Info}
          title_color={COLORS.primary}
          backPress={headerBackclick}
          infotext={"TBD"}
          headerClick={infoClick}
        />
        <View style={styles.s_signupBody}>
          <View style={{ paddingVertical: SIZES.padding * 3 }}>
            <SemiBoldText text={strings.sp_Tittle} />
          </View>
          <View style={styles.s_headerbox}>
            <SmallText text={strings.sp_companyTittle} />
            <TextInput
              placeholder={strings.sp_companyPH}
              style={styles.s_inputBox}
              returnKeyType="next"
              value={orgName}
              onSubmitEditing={() => {
                emailInputRef.current.focus();
              }}
              onChangeText={(text) => setOrgName(text.trimStart())}
              placeholderTextColor={COLORS.pl}
            />
          </View>
          <View>
            <SmallText text={strings.emTittle} />
            <View style={[styles.s_inputBox, styles.s_emChildView]}>
              <Image source={images.Mail} resizeMode="contain" />
              <TextInput
                ref={emailInputRef}
                multiline={false}
                value={email}
                returnKeyType="done"
                keyboardType={
                  Platform.OS === "ios" ? "ascii-capable" : "visible-password"
                }
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text.trimStart())}
                placeholder={strings.emPH}
                style={styles.s_emBox}
                placeholderTextColor={COLORS.pl}
              />
            </View>
          </View>
          <Text style={styles.s_descText}>
            {strings.termsConditionInfo}
            <Text
              onPress={() =>
                terms(strings.termsTitle, strings.termsContent, true)
              }
              style={styles.s_hightlightText}>
              {" "}
              Terms of Use{" "}
            </Text>
            and{" \n"}
            <Text
              onPress={() =>
                terms(strings.privacyTitle, strings.privacyContent, true)
              }
              style={styles.s_hightlightText}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.s_footerView}>
        <Button
          icon={images.Next}
          type={1}
          color={COLORS.primary}
          onPress={() => signupFormValidation()}>
          <ButtonText color={COLORS.white} text={strings.bt_SignUp} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
