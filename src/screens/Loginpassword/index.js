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
import {
  Button,
  SemiBoldText,
  SmallText,
  ButtonText,
  Error,
} from "../../components"; // Reusable Components
import { newPasswordSet, Loader, isResponseisValid } from "../../Utilities";
import { connect, useSelector, useDispatch } from "react-redux";
import { SucessData } from "../../Redux/Action/Authentication";
import { Appcontext } from "../../Setup/Appcontext";
import { passWordValidation } from "../../Utilities/utils";

const LoginPassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { OwnerOnboarding } = useContext(Appcontext);
  const user_email = useSelector(
    (state) => state.LoginReducer?.RegistrationData?.result?.user?.email
  );
  //State Handling
  const [isShowPasswordIcon, setIsShowPasswordIcon] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [colorCode, setColorCode] = useState(COLORS.pl);
  const [loader, setLoader] = useState(false);

  const [colorChange, setcolorChange] = useState(false);
  const [alertType, setAlertType] = useState(0);
  const [isShowToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");

  // Toast Content Handling
  const toastHandle = (type, message) => {
    setAlertType(type);
    setToastTitle(message);
    setShowToast(true);
  };

  const validPassword = (pass) => {
    var regularExpression =
      /^(?=.||[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regularExpression.test(pass);
  };
  const updatePasswordStrengthColor = (type, color) => {
    setPasswordStrengthText(type);
    setColorCode(color);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

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

  const proceedClick = () => {
    if (password == "") {
      toastHandle(0, strings.pwValidation);
    } else if (!validPassword(password)) {
      toastHandle(0, strings.pwValidation);
    } else {
      setLoader(true);
      onCreatePasswordApi();
    }
  };

  const onCreatePasswordApi = async () => {
    console.log("onCreatePasswordApi");
    try {
      const obj = {
        email: user_email ? user_email : route.params.emailid,
        password: password,
      };
      const response = await newPasswordSet(obj);
      console.log("onCreatePasswordApi, response: ", response);
      if (isResponseisValid(response)) {
        dispatch(
          PasswordHeader({
            pwdToken: undefined,
          })
        );
        navigation.navigate("Login");
      } else {
        setLoader(false);
        if (response.data) {
          toastHandle(0, response.data);
        }
      }
    } catch (error) {
      console.log("onCreatePasswordApi, error: ", error);
      setLoader(false);
      toastHandle(0, strings.apierror);
    }
  };

  //FIXME
  // const handleNavigation = (response) => {
  //   dispatch(SucessData(response));

  //   if (response?.result?.user?.role === "OWNER") {
  //     handleOwnerNav(response);
  //   } else if (response?.result?.user?.role === "USER") {
  //     navigation.navigate("UserOnboarding");
  //   } else {
  //     navigation.navigate("Login");
  //   }
  // };

  const handleOwnerNav = (loginResponse) => {
    const token = loginResponse.result.token;
    const orgID = loginResponse.result.user.organization_id;
    const id = base64.encode(JSON.stringify(orgID));
    var payloadData = {
      token: token,
      orgid: id,
    };
    dispatch(UserHeader(payloadData));
    OwnerOnboarding();
  };

  const onDismiss = () => {
    setShowToast(false);
    setcolorChange(false);
  };
  return (
    <SafeAreaView style={styles.contianer}>
      <Loader loading={loader} />
      <Error
        dissMiss={onDismiss}
        visible={isShowToast}
        tittle={toastTitle}
        type={alertType}
      />
      <View style={styles.componetView}>
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
              onChangeText={(text) => onChangePassword(text)}
              style={{
                ...FONTS.body4,
                width: "93%",
              }}
              placeholderTextColor={COLORS.pl}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsShowPasswordIcon(!isShowPasswordIcon)}>
              {isShowPasswordIcon == true ? VECTOR.Hide : VECTOR.Show}
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
          elevation: 15,
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
export default connect(mapStateToProps)(LoginPassword);

export function PasswordHeader(data) {
  return {
    type: "PasswordHeader",
    payload: data,
  };
}

const styles = StyleSheet.create({
  // Design Part
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
