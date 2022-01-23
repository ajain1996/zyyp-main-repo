import React, { useState, useEffect } from "react";
import {
  ButtonText,
  SemiBoldText,
  TextField,
  AuthHeader,
  Biometric,
  MobileTextField,
  Error,
  Button,
} from "../../../components";
import {
  adminDelete,
  isResponseisValid,
  getUserDetails,
  getOrganization,
  addnewAdmin,
  isValidEmail,
  Loader
} from "../../../Utilities";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  strings,
  formValidations,
  roles,
} from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Admin = ({ navigation ,route}) => {
  const dispatch = useDispatch();

  //Admin form Values States
  const [deletePopup, setDeletePopup] = useState(false);
  const [showToastpopup, setShowToastpopup] = useState(false);
  const [toastMessage, setToastMessage] = useState(0);
  const [toastType, setToastType] = useState(0);

  const [fullName, setFullname] = useState("");
  const [mobileNumber, setMobilenumber] = useState("");
  const [email, setEmail] = useState("");
  const [adminUserid, setAdminUserid] = useState("");
  const [adminId, setAdminId] = useState("");
  const [loader,setLoader]=useState(false)

  useEffect(() => {
    getOrginfo();
  }, []);
  //fetch “Admin ID”
  const getOrginfo = async () => {
    setLoader(true)
    try {
      const currentAdminResponse = await getOrganization();
      console.log("Current Admin response :", currentAdminResponse.data);
      if (isResponseisValid(currentAdminResponse)) {
        checkAdminIsavalible(currentAdminResponse);
        setLoader(false)
      } else {
        setLoader(false)
        popupContent(0, userInfoResponse.data);
      }
    } catch (e) {
      setLoader(false)
      // popupContent(0, strings.apierror);
    }
  };
  const checkAdminIsavalible = (currentAdminResponse) => {
    console.log(
      "Current Admin response :",
      currentAdminResponse.data.result?.org_info.admin_id
    );
    setAdminId(currentAdminResponse.data.result?.org_info.admin_id);
    if (currentAdminResponse.data.result?.org_info.admin_id !== 0) {
      const admin_id = currentAdminResponse?.data?.result?.org_info?.admin_id;
      getCurrentAdmininfoapicall(admin_id);
      setLoader(false)
    } else {
      setAdminId(currentAdminResponse.data.result?.org_info.admin_id);
      setLoader(false)
    }
  };

  const getCurrentAdmininfoapicall = async (adminUserid) => {
    setLoader(true)
    try {
      const currrentAdminresponse = await getUserDetails(adminUserid);
      console.log(
        "Current Admin Details response :",
        currrentAdminresponse.data
      );
      if (isResponseisValid(currrentAdminresponse)) {
        // dispatch(CurrentAdminData(currrentAdminresponse.data));
        const adminInfo = currrentAdminresponse.data.result.user_personal_info;
        setFullname(adminInfo?.full_name);
        setEmail(adminInfo?.email);
        setMobilenumber(adminInfo?.mobile_number);
        setAdminUserid(adminInfo?.user_id);
        setLoader(false)
      } else {
        popupContent(0, strings.apierror);
        setLoader(false)
      }
    } catch (e) {
      popupContent(0, strings.apierror);
      setLoader(false)
    }
  };

  //To handle the toast messages from diffrent root modules
  const refreshData = ({ isApiCallSuccess, message }) => {
    if (isApiCallSuccess) {
      popupContent(3, message);
      getOrginfo();
    }
  };

  //Edit Email Icon Click
  const emailEditclick = () => {
    navigation.navigate("AdminEditEmail", {
      refreshData: refreshData,
      mail: email,
      admin_userid: adminUserid,
    });
  };
  //Admin Delete api call
  const deleteAdminApicall = async () => {
    setLoader(true)
    try {
      const adminDeleteResponse = await adminDelete(adminUserid);
      console.log("Delete API response :", adminDeleteResponse);

      if (isResponseisValid(adminDeleteResponse)) {
        setDeletePopup(false);
        setFullname("");
        setEmail("");
        setMobilenumber("");
        setLoader(false)
        popupContent(3, adminDeleteResponse.data.result);
        // updateEmail();
        getOrginfo();
      } else {
        popupContent(0, adminDeleteResponse.data);
        setLoader(false)
      }
    } catch (e) {
      setLoader(false)
      popupContent(0, strings.apierror);
    }
  };

  //Toast Message Show Handling
  const popupContent = (type, message) => {
    setShowToastpopup(true);
    setToastType(type);
    setToastMessage(message);
  };
  //Toast Message popup Close
  const onDismiss = () => {
    setShowToastpopup(false);
  };

  const createAdminUser = () => {
    if (fullName.length === 0) {
      popupContent(0, formValidations.fullName);
    } else if (mobileNumber.length === 0) {
      popupContent(0, formValidations.mobile);
    } else if (mobileNumber.length < 9) {
      popupContent(0, formValidations.mobileDigit);
    } else if (email.length === 0) {
      popupContent(0, formValidations.emailempty);
    } else if (isValidEmail(email) === false) {
      popupContent(0, formValidations.emailFormat);
    } else {
      addnewAdminApicall();
    }
  };
  const addnewAdminApicall = async () => {
    setLoader(true)
    const body = {
      email: email,
      full_name: fullName,
      mobile_number: mobileNumber,
      role: roles.ADMIN,
    };
    try {
      console.log(body);
      const userCreateResponse = await addnewAdmin(body);
      if (isResponseisValid(userCreateResponse)) {
        popupContent(3, userCreateResponse.data.result);
        getOrginfo();
        setLoader(false)
      } else {
        popupContent(0, userCreateResponse.data);
        setLoader(false)
      }
    } catch (e) {
      popupContent(0, strings.apierror);
      setLoader(false)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={"Admin"}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          nav={navigation}
          backPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: COLORS.mdt,
          paddingBottom: SIZES.padding,
        }}
      />
      <Error
        dissMiss={onDismiss}
        visible={showToastpopup}
        type={toastType}
        tittle={toastMessage}
      />
      <Loader loading={loader} />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={styles.componentView}>
          <Biometric
            title={strings.adminDeletetitle}
            des={strings.adminDeletedesc}
            primary_btn={"Delete"}
            secondary_btn={strings.bt_Cancel}
            show={deletePopup}
            bticon={images.Trash}
            onClick={deleteAdminApicall}
            LaterClick={() => setDeletePopup(false)}
          />
          <View style={{ marginBottom: SIZES.padding*2 }}>
            <SemiBoldText
              text={adminId !== 0 ? "Current Admin User" : "Add New Admin"}
            />
          </View>
          <TextField
            placeholderContent={"Full Name"}
            placeholder={"Enter Your Full name"}
            text={fullName}
            onChangeText={(text) => setFullname(text)}
          />
          <MobileTextField
            type={1}
            placeholderContent={"Mobile Number"}
            placeholder={"xxx - xxx - xxx"}
            text={mobileNumber}
            onChangeText={(text) => setMobilenumber(text)}
          />
          <MobileTextField
            placeholderContent={"Email ID"}
            placeholder={"Enter Email ID"}
            type={adminId !== 0 ? 3 : null}
            maxLength={200}
            rightIcon={images.Edit}
            rightIconclick={emailEditclick}
            text={email}
            onChangeText={(text) => setEmail(text)}
          />

          <View
            style={{
              borderBottomWidth: 0.2,
              color: COLORS.background,
              marginVertical: SIZES.padding * 3,
            }}
          />
          {adminId === 0 ? (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <Button type={3} onPress={() => navigation.goBack()}>
                <ButtonText
                  color={COLORS.primary}
                  text={strings.bt_Back}
                ></ButtonText>
              </Button>
              <View style={{ marginHorizontal: SIZES.padding /2}}>
                <Button
                  color={COLORS.primary}
                  onPress={createAdminUser}
                  icon={images.Enable_icon}
                  type={2}
                >
                  <ButtonText color={COLORS.white} text={"Add Admin"} />
                </Button>
              </View>
            </View>
          ) : (
            <View>
              <ButtonText
                onPress={() =>
                  navigation.navigate("ReplacementAdmin", {
                    refreshData: refreshData,
                    admin_userid: adminUserid,
                  })
                }
                text={"Replace Admin"}
                color={COLORS.primary}
              />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.secondary,
                  paddingTop: SIZES.padding,
                  paddingBottom: SIZES.padding * 2,
                }}
              >
                This will remove admin rights from this user.
              </Text>
              <ButtonText
                onPress={() => setDeletePopup(true)}
                text={"Delete Admin"}
                color={COLORS.primary}
              />

              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.secondary,
                  paddingVertical: SIZES.padding,
                }}
              >
                This will remove the admin rights from the current user and make
                you the admin.
              </Text>
            </View>
          )}
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
    padding: SIZES.padding * 2,
  },
  l_inputBox: {
    ...FONTS.body5,
    borderWidth: 2,
    borderColor: COLORS.inputborder,
    backgroundColor: COLORS.bg,
    borderRadius: SIZES.radius / 3,
    paddingHorizontal: SIZES.padding2,
    height: 50,
  },
});
export default Admin;
export function UserData(data) {
  return {
    type: "CurrentAdminData",
    payload: data,
  };
}
