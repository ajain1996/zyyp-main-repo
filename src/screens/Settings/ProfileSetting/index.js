import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  SemiBoldText,
  AuthHeader,
  Error,
  Biometric,
} from "../../../components";
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  VECTOR,
  strings,
  onSucess,
  roles,
} from "../../../constants";
import {
  getUserDetails,
  isResponseisValid,
  setBiometric,
  getBiometric,
  getbiometricPassword,
  Loader,
} from "../../../Utilities";
import * as Keychain from "react-native-keychain";
import ReactNativeBiometrics from "react-native-biometrics";

const ProfileSetting = ({ navigation }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.LoginReducer?.SucessData);
  console.log("userDetails", userDetails);

  const [switchButton, setSwitchButton] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(3);
  const [toastMessage, setToastMessage] = useState("");
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const [enableBiometric, setEnableBiometric] = useState(false);
  const [isShowBiometric, setIsShowBiometric] = useState(false);
  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + "text";

  useEffect(() => {
    getUserinfoApi();
    biometricCheck();
  }, []);

  const showLoader = () => {
    setLoader(true);
  };
  const hideLoader = () => {
    setLoader(false);
  };
  const getUserinfoApi = async () => {
    showLoader();
    const userId = userDetails?.result?.user_id;
    try {
      const userInfoResponse = await getUserDetails(userId);
      if (isResponseisValid(userInfoResponse)) {
        const userInfo = userInfoResponse?.data;
        dispatch(UserData(userInfo));
        setUserRole(userInfo?.result?.user_personal_info?.roles);
        setEmail(userInfo?.result?.user_personal_info?.email);
        hideLoader();
      } else {
        handleToast(0, userInfoResponse.data);
        hideLoader();
      }
    } catch (e) {
      handleToast(0, strings.apierror);
      hideLoader();
    }
  };
  const refreshData = ({ isApiCallSuccess, message }) => {
    if (isApiCallSuccess) {
      handleToast(3, message ? message : onSucess.tradeLicenseUpdate);
    }
  };

  const handleToast = (type, message) => {
    setShowToast(true);
    setToastType(type);
    setToastMessage(message);
  };
  const itemClickEvent = (item, nav) => {
    if (item.text == "My Profile") {
      nav.navigate("profileview");
    } else if (item.text == "Admin") {
      nav.navigate("Admin");
    } else if (item.text == "My Password") {
      nav.navigate("CurrentPassword");
    } else if (item.text == "Trade License") {
      nav.navigate("UpdateTradeLicense", { refreshData: refreshData });
    } else if (item.text == "Shareholders") {
      nav.navigate("UpdateShareHolders", { refreshData: refreshData });
    } else if (item.text == "Transfer Authority") {
      nav.navigate("UpdateTransferAuthority", { refreshData: refreshData });
    } else {
      alert(item.text);
    }
  };

  const Item = ({ title, nav, sw, toggleClick }) => (
    <TouchableOpacity
      onPress={() => itemClickEvent(title, nav)}
      activeOpacity={0.7}
      style={styles.item}
    >
      <View style={{ flex: 0.6 }}>
        <Text
          numberOfLines={2}
          style={{ ...FONTS.body4, color: COLORS.secondary2 }}
        >
          {title.text}
        </Text>
        {title.description ? (
          <Text style={{ ...FONTS.t1, color: COLORS.secondary }}>
            {title.description}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          flex: 0.4,
          alignItems: "flex-end",
        }}
      >
        {title.type === "text" ? (
          <Text style={{ ...FONTS.body5, color: COLORS.primary }}>
            {title.sub}
          </Text>
        ) : title.type === "switch" ? (
          sw == false ? (
            <TouchableOpacity
              onPress={() => toggleClick("on")}
              activeOpacity={0.7}
              style={styles.biometricEnablebutton}
            >
              <TouchableOpacity
                onPress={() => toggleClick("on")}
                activeOpacity={0.7}
                style={styles.biometricDisablebutton}
              ></TouchableOpacity>
              <Text
                style={{
                  color: COLORS.white,
                  marginRight: SIZES.padding,
                  padding: SIZES.padding / 2,
                  ...FONTS.t1,
                }}
              >
                OFF
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => toggleClick("off")}
              activeOpacity={0.7}
              style={{
                height: 40,
                backgroundColor: "#00C2CB",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: SIZES.radius,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  margin: SIZES.padding,
                  ...FONTS.t1,
                }}
              >
                ON
              </Text>
              <TouchableOpacity
                onPress={() => toggleClick("off")}
                activeOpacity={0.9}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#fff",
                  borderRadius: SIZES.radius - 5,
                }}
              ></TouchableOpacity>
            </TouchableOpacity>
          )
        ) : (
          VECTOR.Forward_Iocn
        )}
      </View>
    </TouchableOpacity>
  );
  const switchClick = (type) => {
    console.log("type", type);
    // setEnableBiometric(true)
    // setSwitchButton(!switchButton);
    if (type == "on") {
      // setSwitchButton(true);
      setEnableBiometric(true);
      
    } else {
      setSwitchButton(false);
      clearBiometric();
    }
  };
  const clearBiometric = () => {
    setBiometric("biometric", "disable");
    resetKeyChain();
    handleToast(3, onSucess.bioMetricDisable);
  };
  const resetKeyChain = async () => {
    try {
      await Keychain.resetGenericPassword();
    } catch (err) {
      console.log("Err");
    }
  };
  const biometricCheck = () => {
    showLoader()
    ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        hideLoader()
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        hideLoader()
      } else if (
        available &&
        biometryType === ReactNativeBiometrics.Biometrics
      ) {
        setIsShowBiometric(true);
        biometricValidation();
        hideLoader()
      } else {
        setIsShowBiometric(false);
        hideLoader()
      }
    });
  };
  const enableBiometricClick = () => {
    ReactNativeBiometrics.createKeys("Confirm fingerprint").then(
      (resultObject) => {
        const { publicKey } = resultObject;
        biometricSuccesCheck();
      }
    );
  };
  const biometricValidation = () => {
    getBiometric("biometric").then((response) => {
      console.log("response", response);
      if (response === "enable") {
        // strings.OWNERDATA[0].data[1].isEnabled = true;
        setSwitchButton(true);
      } else {
        setSwitchButton(false);

        // strings.OWNERDATA[0].data[1].isEnabled = false;
      }
    });
  };

  const biometricSuccesCheck = () => {
    ReactNativeBiometrics.createSignature({
      promptMessage: "Confirm Using Your Fingerprint",
      payload: payload,
    }).then((resultObject) => {
      const { success } = resultObject;
      console.log("Fingerprint", success);
      onStoreGenericInfo(success);
    });
  };
  const onStoreGenericInfo = (isSuccess) => {
    if (isSuccess) {
      console.log(isSuccess);
      getUserpassword();
    } else {
      console.log("disable");
      setBiometric("biometric", "disable");
      handleToast(3, onSucess.bioMetricDisable);
    }
  };
  const getUserpassword = () => {
    getbiometricPassword("password").then((response) => {
      console.log("response", response);
      keyChainpasswordset(response);
    });
  };
  const keyChainpasswordset = async (response) => {
    await Keychain.setGenericPassword(email, response);
    setBiometric("biometric", "enable");
    setSwitchButton(true);
    setEnableBiometric(false);
    handleToast(3, onSucess.bioMetricEnable);
  };

  const biometricLaterClick = () => {
    setEnableBiometric(false);
    setBiometric("biometric", "disable");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={"Settings"}
          right_icon={images.profile}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          nav={navigation}
          backPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: COLORS.mdt }} />

      <View style={styles.component_View}>
        <Loader loading={loader} />
        <Error
          dissMiss={() => setShowToast(false)}
          visible={showToast}
          type={toastType}
          tittle={toastMessage}
        />
        <Biometric
          title={""}
          des={""}
          primary_btn={""}
          secondary_btn={strings.bt_Later}
          show={enableBiometric}
          bticon={images.Enable_icon}
          LaterClick={biometricLaterClick}
          onClick={enableBiometricClick}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.base * 2,
          }}
        >
          <SectionList
            sections={
              userRole === roles.USER && isShowBiometric === true
                ? strings.USERDATA
                : userRole === roles.OWNER && isShowBiometric === true
                ? strings.OWNERDATA
                : userRole === roles.USER && isShowBiometric === false
                ? strings.USERWITHOUTBIOMETRIC
                : userRole === roles.OWNER && isShowBiometric === false
                ? strings.OWNERDWITHOUTBIOMETRIC
                : strings.OWNERDATA
            }
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <Item
                title={item}
                nav={navigation}
                sw={switchButton}
                toggleClick={(val) => switchClick(val)}
                biometricOption={isShowBiometric}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View
                style={{
                  paddingVertical: SIZES.base * 3,
                  // backgroundColor:'pink',
                }}
              >
                <SemiBoldText text={title} />
              </View>
            )}
            renderSectionFooter={({ section: { title } }) => (
              <View
                style={{
                  marginTop: SIZES.padding2 * 1.5,
                  // borderWidth:1,
                  borderTopWidth: title == "Personal" ? 0 : 0.5,
                  backgroundColor: "pink",
                  borderColor: COLORS.inner_line,
                }}
              ></View>
            )}
          />
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
export default connect(mapStateToProps)(ProfileSetting);
export function UserData(data) {
  return {
    type: "UserData",
    payload: data,
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  component_View: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  item: {
    flex: 1,
    marginVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.padding2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  biometricEnablebutton: {
    height: 40,
    backgroundColor: COLORS.second,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.radius,
    shadowColor: COLORS.bg,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: SIZES.base,
    elevation: 5,
  },
  biometricDisablebutton: {
    width: 45,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: SIZES.radius,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: SIZES.base,
    elevation: 5,
  },
});
