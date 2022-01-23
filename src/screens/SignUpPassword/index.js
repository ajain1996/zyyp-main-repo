//GIT UI deliverables issue #4: Individual first time Login and on-boarding
import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native"; // Default Elements
import { COLORS, strings, images, VECTOR, FONTS, SIZES } from "../../constants"; // Themes
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Keyboard Handling package
import ReactNativeBiometrics from "react-native-biometrics";
import {
  setBiometric,
  authPassword,
  Loader,
  getOrganization,
  isResponseisValid,
  authSignup,
} from "../../Utilities";
import Keychain from "react-native-keychain";
import { Biometric } from "../../components";

import {
  Button,
  SemiBoldText,
  SmallText,
  ButtonText,
  Error,
} from "../../components"; // Reusable Components
import { useSelector, connect, useDispatch } from "react-redux";
import { passWordValidation } from "../../Utilities/utils";
import { UserHeader } from "../Login";
import base64 from "react-native-base64";
import { Appcontext } from "../../Setup/Appcontext";
import { organizationName } from "../../Redux/Action/OnboardingAction";

const CreatePassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { OwnerOnboarding } = useContext(Appcontext);
  const org_email = useSelector(
    (state) => state.LoginReducer?.RegistrationData?.org_detail?.owner?.email
  );
  //State Handling
  const [isShowPasswordIcon, setIsShowPasswordIcon] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [colorCode, setColorCode] = useState(COLORS.pl);
  const [loading, setLoading] = useState(false);

  // Toast handling state
  const [isShowToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [alertType, setAlertType] = useState(0);

  const [isShowBiometric, setIsShowBiometric] = useState(false);

  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + "text";

  const updatePasswordStrengthColor = (type, color) => {
    setPasswordStrengthText(type);
    setColorCode(color);
  };

  // Toast Content Handling
  const toastHandle = (type, message) => {
    setAlertType(type);
    setToastTitle(message);
    setShowToast(true);
  };

  useEffect(() => {
    console.log("Rote", route.params);
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const onDismiss = () => {
    setShowToast(false);
  };

  const onChangePassword = (text) => {
    let len = text.length;
    if (len < 2) {
      updatePasswordStrengthColor("Weak", COLORS.second);
    } else if (len < 8) {
      updatePasswordStrengthColor("Normal", "#97E3B3");
    } else if (passWordValidation(text)) {
      updatePasswordStrengthColor("Strong", "#00C2CB");
    }
    setPassword(text);
  };

  const enableBiometric = () => {
    setIsShowBiometric(false);
    ReactNativeBiometrics.createKeys("Confirm fingerprint").then(
      (resultObject) => {
        const { publicKey } = resultObject;
        biometricSuccesCheck();
      }
    );
  };

  const biometricSuccesCheck = () => {
    ReactNativeBiometrics.createSignature({
      promptMessage: "Confirm Using Your Fingerprint",
      payload: payload,
    }).then((resultObject) => {
      const { success } = resultObject;
      onStoreGenericInfo(success);
    });
  };

  const onStoreGenericInfo = async (isSuccess) => {
    if (isSuccess) {
      await Keychain.setGenericPassword(route?.params?.email, password);
      setBiometric("biometric", "enable");
      OwnerOnboarding();
    } else {
      setBiometric("biometric", "disable");
      OwnerOnboarding();
    }
  };

  const biometricLaterClick = () => {
    setIsShowBiometric(false);
    setBiometric("biometric", "disable");
    OwnerOnboarding();
  };

  const biometricCheck = () => {
    ReactNativeBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;
        console.log("Available", available);
        if (available && biometryType === ReactNativeBiometrics.TouchID) {
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        } else if (
          available &&
          biometryType === ReactNativeBiometrics.Biometrics
        ) {
          setIsShowBiometric(true);
        } else {
          OwnerOnboarding();
        }
      })
      .catch((err) => {
        // OwnerOnboarding();
        toastHandle(0, "Biometric not available");
      });
  };
  const proceedClick = () => {
    if (password == "") {
      toastHandle(0, strings.pwValidation);
    } else if (!passWordValidation(password)) {
      toastHandle(0, strings.pwValidation);
    } else {
      setLoading(true);
      onCreatePasswordApi();
    }
  };

  const handleSignUpError = async (error) => {
    console.log("SingUp Error", error);
    setLoading(false);
    navigation.goBack();
    route.params.refreshData({
      message: strings.signUpError,
    });
  };

  const onCreatePasswordApi = async () => {
    try {
      const body = {
        email: route?.params?.email,
        password: password,
        organization_name: route?.params?.organization_name,
        otp: route?.params?.otpCode,
      };
      console.log("Obj", body);
      const response = await authSignup(body);
      if (isResponseisValid(response)) {
        let signupResponse = response.data;
        console.log("signupResponse", signupResponse);
        const token = signupResponse.result.token;
        const orgID = signupResponse.result.org_info.organization_id;
        const id = base64.encode(JSON.stringify(orgID));
        const userId = signupResponse.result.org_info.owner_id;
        const adminId = signupResponse.result.org_info.admin_id;
        const organization_name =
          signupResponse.result.org_info.organization_name;
        var payloadData = {
          token: token,
          orgid: id,
          email: route?.params?.email,
          userId,
          adminId,
        };
        console.log("payloadData: ", payloadData);
        dispatch(UserHeader(payloadData));
        dispatch(organizationName(organization_name));

        setLoading(false);
        biometricCheck();
      } else {
        console.log("API Failure");
        await handleSignUpError("API Failure");
      }
    } catch (error) {
      await handleSignUpError(error);
    }
  };

  const onGetUserInfoApi = async () => {
    const orgData = await getOrganization();
    const resultData = orgData.data.result;
    const orgName = resultData.org_detail.organization_name;
  };

  return (
    <SafeAreaView style={styles.contianer}>
      <View style={styles.componetView}>
        <Error
          dissMiss={onDismiss}
          visible={isShowToast}
          tittle={toastTitle}
          type={alertType}
        />
        <Loader loading={loading} />
        <Biometric
          title={""}
          des={""}
          primary_btn={""}
          secondary_btn={strings.bt_Later}
          show={isShowBiometric}
          bticon={images.Enable_icon}
          LaterClick={biometricLaterClick}
          on_Click={enableBiometric}
        />
        <KeyboardAwareScrollView
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.white }}
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          keyboardDismissMode="interactive">
          <Text style={styles.l_title}>{strings.cp_Tittle}</Text>
          <View style={{ marginVertical: SIZES.base * 3 }}>
            <SemiBoldText text={strings.cpassTittle} />
          </View>
          <SmallText text={strings.psTittle} />
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
            ]}>
            <TextInput
              placeholder={strings.cpassPH}
              secureTextEntry={isShowPasswordIcon}
              onChangeText={(text) => onChangePassword(text.trim())}
              style={{
                ...FONTS.body4,
                width: "93%",
              }}
              value={password}
              placeholderTextColor={COLORS.pl}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsShowPasswordIcon(!isShowPasswordIcon)}>
              {isShowPasswordIcon ? VECTOR.Hide : VECTOR.Show}
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}>
            <SmallText text={passwordStrengthText} color={colorCode} />
            <View
              style={{
                width: 20,
                height: 10,
                borderWidth: 1,
                borderColor: colorCode,
                borderRadius: SIZES.radius / 6,
                marginHorizontal: SIZES.base / 2,
                backgroundColor: colorCode,
              }}>
              <View
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: colorCode,
                  borderRadius: SIZES.radius / 6,
                  opacity: 0.1,
                }}></View>
            </View>
            <View
              style={{
                width: 20,
                height: 10,
                borderWidth: passwordStrengthText === "Weak" ? 1 : null,
                borderColor: passwordStrengthText === "Weak" ? colorCode : null,
                borderRadius: SIZES.radius / 6,
                marginHorizontal: SIZES.base / 2,
              }}>
              <View
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: colorCode,
                  borderRadius: SIZES.radius / 6,
                  opacity: passwordStrengthText === "Weak" ? 0.1 : null,
                }}></View>
            </View>
            <View
              style={{
                width: 20,
                height: 10,
                borderWidth: 1,
                borderColor: colorCode,
                borderWidth:
                  passwordStrengthText === "Normal" ||
                  passwordStrengthText === "Weak"
                    ? 1
                    : null,

                borderColor:
                  passwordStrengthText === "Normal" ||
                  passwordStrengthText === "Weak"
                    ? colorCode
                    : null,
                borderRadius: SIZES.radius / 6,
                marginHorizontal: SIZES.base / 2,
              }}>
              <View
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: colorCode,
                  borderRadius: SIZES.radius / 6,
                  opacity:
                    passwordStrengthText === "Normal" ||
                    passwordStrengthText === "Weak"
                      ? 0.1
                      : null,
                }}></View>
            </View>
          </View>
          <Text style={styles.l_descText}>{strings.cpValidation}</Text>
        </KeyboardAwareScrollView>
      </View>
      <View
        style={{
          height: 100,
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: COLORS.white,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 0,
          elevation: 5,
          paddingBottom: 20,
        }}>
        <Button
          type={1}
          color={COLORS.primary}
          icon={images.Next}
          onPress={proceedClick}>
          <ButtonText color={COLORS.white} text={strings.bt_Confirm} />
        </Button>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  return {
    LoginReducer: state.LoginReducer,
  };
};
export default connect(mapStateToProps)(CreatePassword);

// Design Part
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  componetView: {
    flex: 1,
    padding: SIZES.padding * 2,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  l_descText: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginTop: SIZES.base * 6,
  },
  l_title: {
    ...FONTS.h1,
    color: COLORS.header,
    marginVertical: SIZES.base * 3,
  },
});
