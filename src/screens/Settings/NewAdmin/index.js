import React, { useState, useEffect } from "react";
import {
  MobileTextField,
  TextField,
  AuthHeader,
  SemiBoldText,
  ButtonText,
  Button,
  Error,
  SmallText,
} from "../../../components";
import {
  numaricValdation,
  isResponseisValid,
  userCreation,
  adminReplace,
  getUserlist,
  isValidEmail,
  addnewAdmin,
} from "../../../Utilities";
import { useSelector } from "react-redux";
import {
  COLORS,
  SIZES,
  strings,
  images,
  onSucess,
  formValidations,
  roles,
} from "../../../constants";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const NewAdmin = ({ navigation, route }) => {
  const [replaceFullname, setReplaceFullname] = useState("");
  const [replaceMobilenumber, setReplaceMobilenumber] = useState("");
  const [replaceEmail, setReplaceEmail] = useState("");
  const [isExistinguser, setIsExistinguser] = useState(false);
  const [showToastpopup, setShowToastpopup] = useState(false);
  const [toastMessage, setToastMessage] = useState(0);
  const [toastType, setToastType] = useState(0);
  const [newemail, setNewemail] = useState("");

  useEffect(() => {
    // getExistinguserListApicall();
  }, []);

  //User List aApi call
  const getExistinguserListApicall = async () => {
    try {
      const userListResponse = await getUserlist();
      if (isResponseisValid(userListResponse)) {
        setUserList(userListResponse.data);
      } else {
        popupContent(0, strings.apierror);
      }
    } catch (e) {
      popupContent(0, strings.apierror);
    }
  };
  const replaceSubmitbuttonclick = () => {
    if (replaceFullname.length === 0) {
      popupContent(0, formValidations.fullName);
    } else if (replaceMobilenumber.length === 0) {
      popupContent(0, formValidations.mobile);
    } else if (replaceMobilenumber.length < 9) {
      popupContent(0, formValidations.mobileDigit);
    } else if (replaceEmail.length === 0) {
      popupContent(0, formValidations.emailempty);
    } else if (isValidEmail(replaceEmail) === false) {
      popupContent(0, formValidations.emailFormat);
    } else {
      if (isExistinguser === true) {
        replaceAdminApicall();
      } else {
        createUserapicall();
      }
    }
  };
  const createUserapicall = async () => {
    const body = {
      email: replaceEmail,
      full_name: replaceFullname,
      mobile_number: replaceMobilenumber,
      role: roles.ADMIN,
    };
    console.log("body :", body);
    try {
      console.log(body);
      const userCreateResponse = await addnewAdmin(body);
      console.log("Replace Admin User Create :", userCreateResponse.data);

      if (isResponseisValid(userCreateResponse)) {
        //Once Email Recived We have to set
        // setNewemail(userCreateResponse?.data?.result);
        replaceAdminApicall();
      } else {
        popupContent(0, userCreateResponse.data.error);
      }
    } catch (e) {
      popupContent(0, strings.apierror);
    }
  };

  const replaceAdminApicall = async () => {
    try {
      const body = {
        email: replaceEmail,
      };
      const adminReplaceResponse = await adminReplace(body);
      console.log("Replace Admin User Create :", adminReplaceResponse.data);

      if (isResponseisValid(adminReplaceResponse)) {
        navigation.goBack();
        route.params.refreshData({
          isApiCallSuccess: true,
          message: adminReplaceResponse.data.result,
        });
      } else {
        popupContent(0, adminReplaceResponse.data);
      }
    } catch (e) {
      popupContent(0, strings.apierror);
    }
  };
  const selectEmaildata = ({ isApiCallSuccess, message }) => {
    if (isApiCallSuccess) {
      setIsExistinguser(true);
      setNewemail(message.email);
      setReplaceFullname(message.full_name);
      setReplaceEmail(message.email);
      setReplaceMobilenumber(message.mobile_number);
    }
  };
  const clearClick = () => {
    setIsExistinguser(false);
    setReplaceFullname("");
    setReplaceEmail("");
    setReplaceMobilenumber("");
  };
  const popupContent = (type, message) => {
    setShowToastpopup(true);
    setToastType(type);
    setToastMessage(message);
  };
  const onDismiss = () => {
    setShowToastpopup(false);
  };

  const onChangefullname = (text) => {
    setReplaceFullname(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={"NewAdmin"}
          title_color={COLORS.secondary2}
          nav={navigation}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.mdt,
          marginBottom: SIZES.padding * 3,
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
          <Error
            dissMiss={onDismiss}
            visible={showToastpopup}
            type={toastType}
            tittle={toastMessage}
          />
          <View
            style={{
              marginBottom: SIZES.padding,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <SemiBoldText text={"Assign New Admin User"} />
            <TouchableOpacity onPress={() => clearClick()}>
              <SmallText text={"Clear"} color={COLORS.primary}></SmallText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <TextField
                placeholderContent={"Full Name"}
                placeholder={"as per company records"}
                text={replaceFullname}
                onChangeText={(text) => {
                  onChangefullname(text);
                }}
                editable={isExistinguser === true ? false : true}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SearchEmployees", {
                  selectEmaildata: selectEmaildata,
                })
              }
              style={{
                top: SIZES.padding2 * 4,
                left: SIZES.width - 80,
                position: "absolute",
                flex: 1,
              }}
            >
              <Image source={images.search} />
            </TouchableOpacity>
          </View>

          <MobileTextField
            type={1}
            editable={isExistinguser === true ? false : true}
            placeholderContent={"Mobile Number"}
            placeholder={"xxx - xxx - xxx"}
            keyboardType={"numeric"}
            text={replaceMobilenumber}
            onChangeText={(text) => {
              setReplaceMobilenumber(numaricValdation(text));
            }}
          />
          <MobileTextField
            editable={isExistinguser === true ? false : true}
            placeholderContent={"Email ID"}
            placeholder={"as per company records"}
            text={replaceEmail}
            maxLength={200}
            onChangeText={(text) => {
              setReplaceEmail(text);
            }}
          />
          <View
            style={{
              borderBottomWidth: 0.2,
              color: COLORS.background,
              marginVertical: SIZES.padding * 3,
            }}
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
          <Button type={3} onPress={() => navigation.navigate("Admin")}>
            <ButtonText
              color={COLORS.primary}
              text={strings.bt_Back}
            ></ButtonText>
          </Button>
          <Button
            color={COLORS.primary}
            onPress={() => setOtpmodal(true)}
            icon={images.Enable_icon}
            type={2}
            onPress={replaceSubmitbuttonclick}
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
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding * 2,
  },
});
export default NewAdmin;
