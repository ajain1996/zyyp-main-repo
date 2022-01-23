/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding TradeLicence
import React from "react";
import {
  DateButton,
  Footer,
  TextField,
  Button,
  UploadButton,
  Error,
  Container,
  ButtonText,
  AuthHeader,
} from "../../../components";
import {
  Loader,
  settingsTradeLicense,
  getDateToString,
  isResponseisValid,
} from "../../../Utilities";
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import { DatePickerModal } from "react-native-paper-dates";
import { View, Text, TouchableOpacity } from "react-native";
import {
  COLORS,
  SIZES,
  strings,
  images,
  VECTOR,
  formValidations,
  documents,
  headers,
} from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class UpdateTradeLicense extends React.PureComponent {
  state = {
    tradeName: "",
    openDatePicker: false,
    value: "",
    openDatePicker1: false,
    value1: "",
    filename: null,
    url: "",
    type: "",
    showToast: false,
    alertType: 0,
    toastTitle: "",
    loader: false,
    token: "",
    org: "",
    user_orgid: "",
    user_id: "",
    user_email: "",
  };

  componentDidMount() {
    this.prefillTradeliesenceinfo();
  }

  prefillTradeliesenceinfo() {
    const { UserData } = this.props.LoginReducer;
    console.log("user data ", UserData);
    const email = UserData?.result?.user_personal_info?.email;
    this.setState({
      user_email: email,
      tradeName: UserData?.result?.id_Document?.document_id,
      value: UserData?.result?.id_Document?.issue_date,
      value1: UserData?.result?.id_Document?.expiry_date,
    });
  }

  //Choose file from device files
  uploadDocumentfromFiles = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({
        filename: res[0].name,
        type: res[0].type,
        url: res[0].uri,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  //Trade License Form Validation
  updateTradebuttonClick = () => {
    if (this.state.tradeName === null || this.state.tradeName === "") {
      this.toastHandle(false, 0, formValidations.tradeLicense);
    } else if (this.state.value === null || this.state.value === "") {
      this.toastHandle(false, 0, formValidations.issueDate);
    } else if (this.state.value1 === null || this.state.value1 === "") {
      this.toastHandle(false, 0, formValidations.expiryDate);
    } else if (this.state.filename === null || this.state.filename === "") {
      this.toastHandle(false, 0, formValidations.uploadDocument);
    } else {
      this.setState({ loader: true }, () => {
        this.updateTradeLicenseApicall();
      });
    }
  };

  // Update Trade License API call
  updateTradeLicenseApicall = async () => {
    const { route } = this.props;
    var obj = {
      document_id: this.state.tradeName,
      document_type: documents.tradeDocument,
      issue_date: this.state.value,
      expiry_date: this.state.value1,
    };
    let bodyFormData = new FormData();
    bodyFormData.append("documentDetails", JSON.stringify(obj));
    bodyFormData.append("file1", {
      uri: this.state.url, //Your Image File Path
      type: this.state.type,
      name: this.state.filename,
    });

    try {
      var tradeLicenseResponse = await settingsTradeLicense(bodyFormData);
      if (isResponseisValid(tradeLicenseResponse)) {
        this.setState({ loader: false }, () => {
          this.props.navigation.navigate("Settings", { success: true });
          route.params.refreshData({
            isApiCallSuccess: true,
            message: tradeLicenseResponse.data.result,
          });
        });
      } else {
        this.toastHandle(false, 0, tradeLicenseResponse.data);
      }
    } catch (error) {
      this.toastHandle(false, 0, strings.apierror);
    }
  };

  //Handling Toast Messgae Function (Sucess ,Failiure)
  toastHandle = (loader, type, message) => {
    this.setState({
      loader: loader,
      showToast: true,
      alertType: type,
      toastTitle: message,
    });
  };

  //Root the page
  goback = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { openDatePicker, openDatePicker1, value1, value, filename } =
      this.state;
    return (
      <Container>
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
          <AuthHeader tittle={headers.tradeLicense} />
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
              <TextField
                placeholderContent={"Trade License"}
                placeholder={"Trade License Number"}
                text={this.state.tradeName}
                onChangeText={(text) => this.setState({ tradeName: text })}
              />
              <DatePickerModal
                mode={"single"}
                visible={openDatePicker}
                disableStatusBar={true}
                onDismiss={() => this.setState({ openDatePicker: false })}
                onConfirm={(dt) => {
                  let date = getDateToString(dt.date);
                  this.setState({ openDatePicker: false, value: date });
                }}
                date={new Date()}
              />
              <DatePickerModal
                mode={"single"}
                visible={openDatePicker1}
                disableStatusBar={true}
                onDismiss={() => this.setState({ openDatePicker1: false })}
                onConfirm={(dt) => {
                  let date = getDateToString(dt.date);
                  this.setState({ openDatePicker1: false, value1: date });
                }}
                date={new Date()}
              />
              <DateButton
                type={1}
                text={"MM-DD-YYYY"}
                value={value}
                placeholderContent={"Issue Date"}
                onPress={() => this.setState({ openDatePicker: true })}
              />
              <DateButton
                type={1}
                text={"MM-DD-YYYY"}
                value={value1}
                placeholderContent={"Expiry Date"}
                onPress={() =>
                  this.setState({
                    openDatePicker1: this.state.value !== "" ? true : false,
                  })
                }
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
                    style={{ width: 30 }}
                    onPress={() => this.setState({ filename: null })}
                  >
                    {VECTOR.documentClose}
                  </TouchableOpacity>
                </View>
              )}
              <UploadButton onPress={this.uploadDocumentfromFiles}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Upload Document
                </Text>
              </UploadButton>
            </View>
            <Error
              dissMiss={() => this.setState({ showToast: false })}
              visible={this.state.showToast}
              type={this.state.alertType}
              tittle={this.state.toastTitle}
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
              borderTopWidth: 1,
              borderTopColor: COLORS.secondary,
            }}
          >
            <Footer>
              <Button onPress={this.goback} type={3} color={COLORS.white}>
                <ButtonText text={strings.bt_Back} color={COLORS.primary} />
              </Button>
              <Button
                color={COLORS.primary}
                onPress={this.updateTradebuttonClick}
                icon={images.Enable_icon}
                type={2}
              >
                <ButtonText color={COLORS.white} text={strings.bt_Confirm} />
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
export default connect(mapStateToProps)(UpdateTradeLicense);
