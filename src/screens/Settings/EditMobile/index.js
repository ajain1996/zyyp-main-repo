import React, { useState, useEffect } from "react";
import {
  MobileTextField,
  Button,
  ButtonText,
  AuthHeader,
  OtpComponent,
  Error,
} from "../../../components"; //Reusable Components
import {
  isResponseisValid,
  numaricValdation,
  otpGenrate,
  otpValidation,
  updateUserdetails,
  checkUndefined,
  Loader,
} from "../../../Utilities"; //API calls
import { useSelector } from "react-redux";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  COLORS,
  SIZES,
  strings,
  images,
  formValidations,
  roles,
} from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditMobile = ({ navigation, route }) => {
  //Reducer Values
  const userDetails = useSelector((state) => state?.LoginReducer?.UserData);
  const user_mobilenumber = route?.params?.mobile;
  const user_email = userDetails?.result?.user_personal_info?.email;
  const userId = userDetails?.result?.user_personal_info?.user_id;
  const userRole = userDetails?.result?.user_personal_info?.roles;

  const [showOtpview, setShowOtpview] = useState(false);
  const [otpPlaceholdertext, setOtpPlaceholdertext] = useState([
    ".",
    ".",
    ".",
    ".",
  ]);
  const [updateMobilenumber, setUpdateMobilenumber] = useState(
    checkUndefined(user_mobilenumber)
  );
  const [seconds, setSeconds] = React.useState(30);
  const [otpCode, setOtpCode] = useState("");
  const [passVisble, setPassVisble] = useState(true);
  const [otpbuttonColor, setOtpbuttonColor] = useState(false);
  const [errorPopup, setErrorpopup] = useState(false);
  const [errorType, setErrortype] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const onChangeOtpvalue = (v) => {
    var num = [...otpPlaceholdertext];
    for (let i = 0; i <= 3; i++) {
      if (num[i] == ".") {
        num[i] = v;
        break;
      } else if (i >= 2) {
        setOtpbuttonColor(true);
      } else {
        setOtpbuttonColor(false);
      }
    }
    setOtpPlaceholdertext(num);
  };

  const clearOtp = (v) => {
    setOtpbuttonColor(false);
    var num = [...otpPlaceholdertext];
    for (let i = 3; i >= 0; i--) {
      if (num[i] !== ".") {
        num[i] = ".";
        break;
      }
    }
    setOtpPlaceholdertext(num);
  };
  //Password Show Hide on OTP modal
  const onClick = (val) => {
    setPassVisble(!val);
  };
  //Otp text handling Start
  const onChange = (val) => {
    if (val === otpCode) {
      setOtpbuttonColor(true);
    } else {
      setOtpbuttonColor(false);
    }
  };
  // OTP page Handling
  const otpEventclick = (val) => {
    if (val == "close") {
      otpClosepopup();
    } else {
      otpClosepopup();
      validationOtpapicall();
    }
  };
  //After enterinjg 4 digits OTP Validate using this API
  const validationOtpapicall = async () => {
    const body = {
      mobile_number: updateMobilenumber,
      otp: otpCode,
    };
    try {
      const otpValidationResponse = await otpValidation(body);
      if (isResponseisValid(otpValidationResponse)) {
        updateMobilenumberApicall();
      } else {
        popupContent(otpValidationResponse.data, 0);
      }
    } catch (e) {
      popupContent(strings.apierror, 0);
    }
  };

  //Close OTP page We have to clear the data
  const otpClosepopup = () => {
    setShowOtpview(false);
    setSeconds(0);
    setPassVisble(true);
    setOtpbuttonColor(false);
    setOtpPlaceholdertext([".", ".", ".", "."]);
  };

  //Once Validation Done we have to update the Mobile number
  const updateMobilenumberApicall = async () => {
    const body = {
      email: user_email,
      mobile_number: updateMobilenumber,
      role: userRole,
      user_id: userId,
    };
    try {
      const updateMobileResponse = await updateUserdetails(body);
      console.log("update Mobile :",updateMobileResponse)
      if (isResponseisValid(updateMobileResponse)) {
        // otpClosepopup();
        backPressclick(updateMobileResponse.data.result);
      } else {
        popupContent(updateMobileResponse.data, 0);
      }
    } catch (e) {
      popupContent(strings.apierror, 0);
    }
  };

  useEffect(() => {
    setOtpCode(otpPlaceholdertext.join("").toString());
    durationCounter();
  }, [otpPlaceholdertext, seconds, showOtpview]);

  //Resend Duration Counter
  const durationCounter = () => {
    if (showOtpview == true) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds("0");
      }
    } else {
      setSeconds(30);
    }
  };

  const onCodeEnd = (val) => {
    setOtpCode(val);
  };
  //Mobile Number Text input
  const onChangemobilenumber = (val) => {
    setUpdateMobilenumber(numaricValdation(val));
  };
  //Submit Button Click on Edit
  const submitClick = () => {
    if (updateMobilenumber.length == 0) {
      popupContent(formValidations.mobile, 0);
    } else if (updateMobilenumber.length < 9) {
      popupContent(formValidations.mobileDigit, 0);
    }
    else if (updateMobilenumber === user_mobilenumber) {
      // this condtion for without update mobile number block it
      popupContent(formValidations.mobileUpdate, 0);
    }
    else {
      otpGenrationApicall();
    }
  };
  //Resend click otp not yet recived untill 30 secs
  const otpResendclick = () => {
    if (seconds === "0") {
      otpGenrationApicall();
      setSeconds(30);
    } else {
      alert(`Pleas Wait for ${seconds} sec`);
    }
  };
  //Otp genration api call
  const otpGenrationApicall = async () => {
    setLoader(true);
    const body = {
      mobile_number: updateMobilenumber,
      type: roles.MOBILE,
    };
    try {
      const onOtpsendresponse = await otpGenrate(body);
      console.log("onOtpsendresponse", onOtpsendresponse);
      if (isResponseisValid(onOtpsendresponse)) {
        durationCounter();
        setLoader(false);
        setShowOtpview(true);
      } else {
        setLoader(false);
        popupContent(strings.apierror, 0);
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
      popupContent(strings.apierror, 0);
    }
  };
  //Root Page Toast Handling
  const backPressclick = (message) => {
    navigation.goBack();
    route.params.refreshData({
      isApiCallSuccess: true,
      message: message,
    });
  };
  //Toast Handling
  const popupContent = (message, type) => {
    setErrorpopup(true);
    setAlertMessage(message);
    setErrortype(type);
  };
  //Clear Error Message Popup
  const onDismiss = () => {
    setErrorpopup(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={"Edit Mobile Number"}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          nav={navigation}
          backPress={() => navigation.navigate("profileview")}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.mdt,
          marginBottom: SIZES.padding,
        }}
      />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={styles.componentView}>
          <Loader loading={loader} />
          <OtpComponent
            arr={otpPlaceholdertext}
            visiblity={showOtpview}
            nav={navigation}
            icon={passVisble}
            show={onClick}
            time={seconds}
            sumNumber={onChangeOtpvalue}
            popItem={clearOtp}
            color={otpbuttonColor}
            codeChange={onChange}
            onCodeEnd={onCodeEnd}
            title={"Input Security Code"}
            des={`Enter the 4-digit code Zyyp just sent ${updateMobilenumber}`}
            closeModal={otpEventclick}
            resendClick={otpResendclick}
          />
          <Error
            visible={errorPopup}
            dissMiss={onDismiss}
            tittle={alertMessage}
            type={errorType}
          />

          <MobileTextField
            type={1}
            placeholderContent={"Mobile Number"}
            placeholder={"xxx - xxx - xxx"}
            onChangeText={onChangemobilenumber}
            text={updateMobilenumber}
            keyboardType={"numeric"}
          />
        </View>
        <View
          style={{
            marginHorizontal: SIZES.padding,
            flexDirection: "row",
            height: 70,
            justifyContent: "space-between",
          }}
        >
          <Button type={3} onPress={() => navigation.goBack()}>
            <ButtonText
              color={COLORS.primary}
              text={strings.bt_Back}
            ></ButtonText>
          </Button>
          <Button
            color={COLORS.primary}
            onPress={submitClick}
            icon={images.Enable_icon}
            type={2}
          >
            <ButtonText color={COLORS.white} text={"Submit"} />
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  componentView: {
    flex: 1,
    marginHorizontal: SIZES.padding * 2,
  },
});
export default EditMobile;  