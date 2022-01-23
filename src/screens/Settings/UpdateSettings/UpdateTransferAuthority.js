/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding TradeLicence

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
} from "react-native";
import {
  Footer,
  TextField,
  Button,
  UploadButton,
  SmallText,
  Error,
  OtpComponent,
  MobileTextField,
  Container,
  SemiBoldText,
  ButtonText,
  AuthHeader,
} from "../../../components";
import {
  COLORS,
  strings,
  FONTS,
  SIZES,
  images,
  styles,
  VECTOR,
  formValidations,
} from "../../../constants";
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import {
  otpGenrate,
  Loader,
  isResponseisValid,
  isValidEmail,
} from "../../../Utilities";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class UpdateTransferAuthority extends React.PureComponent {
  state = {
    openDatePicker: false,
    value: "",
    openDatePicker1: false,
    value1: "",
    filename: null,
    name: "",
    mobileNumber: "",
    emailID: "",
    toastShowpoup: false,
    toastType: 0,
    toastMessage: "",
    otpPlaceholder: [".", ".", ".", "."],
    otpModal: false,
    otpButtoncolor: false,
    otpValueVisble: true,
    otpResendDuration: 30,
    loader: false,
    otpCode: "",
    token: "",
    org: "",
    user_orgid: "",
    user_id: "",
    user_email: "",
  };

  componentDidMount() {
    this.prefillTransferAuthorityDetails();
  }

  prefillTransferAuthorityDetails() {
    const { UserData } = this.props.LoginReducer;

    const userInfo = UserData.result?.user_personal_info;
    this.setState({
      user_email: userInfo?.email,
    });
  }

  componentDidUpdate() {
    this.setState({ otpCode: this.state.otpPlaceholder.join("").toString() });
    if (this.state.otpModal == true) {
      this.resenDurationupdate();
    } else {
      this.setState({ otpResendDuration: 30 });
    }
  }
  resenDurationupdate = () => {
    if (this.state.otpResendDuration > 0) {
      setTimeout(
        () =>
          this.setState({
            otpResendDuration: this.state.otpResendDuration - 1,
          }),
        1000
      );
    } else {
      this.setState({ otpResendDuration: 0 });
    }
  };
  //While Entering  the otp  number get the number from custom keyboard
  onChangeOtpValue = (v) => {
    var num = [...this.state.otpPlaceholder];
    for (let i = 0; i <= 3; i++) {
      if (num[i] == ".") {
        num[i] = v;
        break;
      } else if (i >= 2) {
        this.setState({ otpButtoncolor: true });
      } else {
        this.setState({ otpButtoncolor: false });
      }
    }
    this.setState({ otpPlaceholder: num });
  };

  //Clear Entered Number on keyboard
  clearOtp = () => {
    this.setState({ otpButtoncolor: false });
    var num = [...this.state.otpPlaceholder];
    for (let i = 3; i >= 0; i--) {
      if (num[i] !== ".") {
        num[i] = ".";
        break;
      }
    }
    this.setState({ otpPlaceholder: num });
  };

  //Otp Page eye icon click
  IconOnclick = (val) => {
    this.setState({ otpValueVisble: !val });
  };
  //Toast Message Handling
  toastHandle = (type, message) => {
    this.setState({
      toastShowpoup: true,
      toastType: type,
      toastMessage: message,
    });
  };
  //Choose file from device files
  pickImage = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({
        filename: res[0].name,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  //Next Button Click Action
  updateNextPagButtonClick = () => {
    if (this.state.name === null || this.state.name === "") {
      this.toastHandle(0, formValidations.fullName);
    } else if (
      this.state.mobileNumber === null ||
      this.state.mobileNumber === ""
    ) {
      this.toastHandle(0, formValidations.mobile);
    } else if (this.state.emailID === null || this.state.emailID === "") {
      this.toastHandle(0, formValidations.emailempty);
    } else if (isValidEmail(this.state.emailID) === false) {
      this.toastHandle(0, formValidations.emailFormat);
    } else if (this.state.filename === null || this.state.filename === "") {
      this.toastHandle(0, formValidations.uploadDocument);
    } else {
      this.setState({ loader: true }, () => {
        this.otpSendApicall();
      });
    }
  };
  otpResend = () => {
    console.log("resend", this.state.otpResendDuration);
    this.resetOtpdetails();
    if (this.state.otpResendDuration === 0) {
      otpSendApicall();
      this.setState({ otpResendDuration: 30 });
    } else {
      alert(`Please Wait for ${this.state.otpResendDuration} sec`);
    }
  };
  resetOtpdetails = () => {
    this.setState({
      otpValueVisble: true,
      otpButtoncolor: false,
      otpPlaceholder: [".", ".", ".", "."],
    });
  };
  //Genrate Otp API Call
  otpSendApicall = async () => {
    const body = {
      email: this.state.user_email,
      type: "ALL",
    };
    console.log("otp ",body)
    try {
      const otpGenrateresponse = await otpGenrate(body);
      if (isResponseisValid(otpGenrateresponse)) {
        this.setState({ otpModal: true, loader: false });
      } else {
        this.toastHandle(0, otpGenrateresponse.data);
        this.setState({
          loader: false,
        });
      }
    } catch (e) {
      this.toastHandle(0, otpGenrateresponse.data);
      this.setState({
        loader: false,
      });
    }
  };
  //Otp Page Conform button Click & Close Icon client Event Hanlding
  otpEventHandling = async (val) => {
    const { route } = this.props;
    this.setState(
      { loader: true, otpCode: this.state.otpPlaceholder.join("").toString() },
      () => {
        var dt = new Date();
        dt.toISOString();
        if (val == "close") {
          this.setState({
            loader: false,
            otpModal: false,
            otpValueVisble: true,
            otpPlaceholder: [".", ".", ".", "."],
          });
        } else {
          this.setState({ otpModal: false, loader: false });
          this.props.navigation.goBack();
          route.params.refreshData({
            isApiCallSuccess: true,
            message: "Validate OTP using 2FA API TBD",
          });
        }
      }
    );
  };

  //Email Text Input Box
  emailInputbox = () => {
    return (
      <View style={{ flex: 1 }}>
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
          ]}
        >
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
            value={this.state.emailID}
            // onSubmitEditing={() => isValidEmail(email)}
            onChangeText={(text) => this.setState({ emailID: text })}
            placeholderTextColor={COLORS.pl}
          />
        </View>
      </View>
    );
  };

  render() {
    const { filename } = this.state;
    return (
      <Container>
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
          <AuthHeader tittle={`Transfer Authority`} />
          <View
            style={{
              borderTopWidth: 0.5,
              borderColor: COLORS.mdt,
              paddingBottom: SIZES.padding,
            }}
          />
          <KeyboardAwareScrollView
            scrollEnabled={true}
            keyboardShouldPersistTaps={"handled"}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            enableAutomaticScroll
            enableResetScrollToCoords={true}
            keyboardDismissMode="interactive"
          >
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ height: 20 }} />
              <SemiBoldText text={`Step 1/2`} />
              <View style={{ height: 20 }} />
              <TextField
                placeholderContent={"Full Name"}
                placeholder={"as per company records"}
                text={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
              />
              <MobileTextField
                type={1}
                placeholderContent={"Mobile Number"}
                placeholder={"xxx-xxx-xxx"}
                keyboardType={"numeric"}
                text={this.state.mobileNumber}
                onChangeText={(text) =>
                  this.setState({ mobileNumber: text.replace(/\D/g, "") })
                }
              />

              {this.emailInputbox()}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.inputborder,
                  marginVertical: 10,
                }}
              />
              {filename == null ? (
                <View />
              ) : (
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    alignSelf: "flex-start",
                    backgroundColor: "#85949F",
                    borderRadius: 15,
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: COLORS.white, alignSelf: "center" }}>
                    {filename}
                  </Text>
                  <TouchableOpacity
                    style={{ width: 50 }}
                    onPress={() => this.setState({ filename: null })}
                  >
                    {VECTOR.documentClose}
                  </TouchableOpacity>
                </View>
              )}
              <UploadButton onPress={this.pickImage}>
                <ButtonText
                  text={strings.bt_Upload}
                  color={COLORS.primary}
                ></ButtonText>
              </UploadButton>
              <SmallText
                color={COLORS.secondary}
                text={
                  "Please upload an official document like trade license, or articles of association, that authorise the above person."
                }
              />
            </View>

            <Error
              dissMiss={() => this.setState({ toastShowpoup: false })}
              visible={this.state.toastShowpoup}
              type={this.state.toastType}
              tittle={this.state.toastMessage}
            />
            <OtpComponent
              arr={this.state.otpPlaceholder}
              visiblity={this.state.otpModal}
              sumNumber={this.onChangeOtpValue}
              popItem={this.clearOtp}
              icon={this.state.otpValueVisble} //
              time={this.state.otpResendDuration}
              show={this.IconOnclick}
              color={this.state.otpButtoncolor}
              title={"Input Security Code"}
              des={`Enter the 4-digit code Zyyp just sent to email ${this.state.user_email}`}
              closeModal={this.otpEventHandling}
              resendClick={this.otpResend}
            />
            <Loader loading={this.state.loader} />
          </KeyboardAwareScrollView>
          <View
            style={{
              height: 70,
              width: SIZES.width,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // borderTopWidth: 1,
              // borderTopColor: COLORS.secondary,
            }}
          >
            <Footer>
              <Button
                onPress={() => this.props.navigation.goBack()}
                type={3}
                color={COLORS.white}
              >
                <ButtonText text={strings.bt_Back} color={COLORS.primary} />
              </Button>
              <Button
                color={COLORS.primary}
                onPress={this.updateNextPagButtonClick}
                icon={images.Enable_icon}
                type={2}
              >
                <ButtonText color={COLORS.white} text={strings.bt_Next} />
              </Button>
            </Footer>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    LoginReducer: state.LoginReducer,
  };
};

export default connect(mapStateToProps)(UpdateTransferAuthority);
