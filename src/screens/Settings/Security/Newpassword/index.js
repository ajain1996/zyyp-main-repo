import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  SemiBoldText,
  SmallText,
  ButtonText,
  Button,
  AuthHeader,
  Error,
} from "../../../../components";
import {
  COLORS,
  SIZES,
  strings,
  VECTOR,
  FONTS,
  images,
  onSucess,
  formValidations,
  headers,
} from "../../../../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  newPasswordSet,
  isResponseisValid,
  passWordValidation,
  getBiometric,
  setBiometric
} from "../../../../Utilities";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Appcontext } from "../../../../Setup/Appcontext";
import { Logout } from "../../../../Redux/Action/Authentication";
import * as Keychain from "react-native-keychain";

const NewPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) => state?.LoginReducer?.UserData.result?.user_personal_info
  );
  const { resetClick } = useContext(Appcontext);

  const [password, setPassword] = useState(""); //New Password Value state
  const [passWordicon, setPassWordicon] = useState(true); //Password Icon

  const [passMetertext, setPassMetertext] = useState(""); //Given Password Strength Check Value state (Weak,Normal.Strength )
  const [colorCode, setColorCode] = useState(COLORS.pl); //Its used for Given Password Strength Color for Easy User Experience

  const [toastShowopup, setTtoastShowopup] = useState(false); //Toast handling state
  const [toastType, setToastType] = useState(0); // Type used for is used to find what type toast we have display (Sucess /or Error type)
  const [toastMessage, setToastMessage] = useState(""); //Toast Content Hnadling
  const [loader, setLoader] = useState(false); // Loading state used for handling loader

  const onChangeNewpassword = (text) => {
    let len = text.length;
    if (len < 2) {
      passwordStrengthcheck(formValidations.weak, COLORS.second);
    } else if (len < 8) {
      passwordStrengthcheck(formValidations.normal, COLORS.normal);
    } else if (passWordValidation(text)) {
      passwordStrengthcheck(formValidations.strong, COLORS.strong);
    }
    setPassword(text);
  };

  const proceedClick = async () => {
    if (password == "") {
      toastHandling(0, formValidations.newPassword);
    } else if (!passWordValidation(password)) {
      toastHandling(0, formValidations.newPasswordguide);
    } else {
      setNewpasswordApicall();
    }
  };

  //Toast Message Handling
  const toastHandling = (type, message) => {
    setToastMessage(message);
    setTtoastShowopup(true);
    setToastType(type);
  };
  //Given Password Strength Handling
  const passwordStrengthcheck = (text, colorCode) => {
    setPassMetertext(text);
    setColorCode(colorCode);
  };

  //Reset Password API call
  const setNewpasswordApicall = async () => {
    checkSensordetails();
    setLoader(true);
    const body = {
      email: userDetails?.email,
      password: password,
    };
    try {
      const newPasswordResponse = await newPasswordSet(body);
      console.log("pass response ", newPasswordResponse.data);
      if (isResponseisValid(newPasswordResponse)) {
        setLoader(false);
        toastHandling(3, newPasswordResponse.data.result);
        //Storeage Need to clear
        dispatch(Logout());
        checkSensordetails();
        resetClick(newPasswordResponse.data.result);
      } else {
        setLoader(false);
        toastHandling(0, newPasswordResponse.data);
      }
    } catch (error) {
      setLoader(false);
      toastHandling(0, strings.apierror);
    }
  };
  const checkSensordetails = () => {
    getBiometric("biometric").then((response) => {
      console.log("biometric :", response);
      if (response === "enable") {
        setBiometric("biometric", "disable");
        resetKeychain();
      } else {
        console.log("disable part");
      }
    });
  };
  const resetKeychain = async () => {
    console.log("keychain");
    try {
      await Keychain.resetGenericPassword();
    } catch (err) {
      console.log("Err");
    }
  };

  const onDismiss = () => {
    setTtoastShowopup(false);
    if (toastType == 3) {
      navigation.navigate("Settings");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={headers.currentPassword}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          nav={navigation}
          backPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.mdt,
        }}
      />
      <View style={styles.componentView}>
        <View style={{ marginVertical: SIZES.padding * 2 }}>
          <SemiBoldText text={"Pick New Password"} />
        </View>
        <KeyboardAwareScrollView
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          keyboardDismissMode="interactive"
        >
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
            ]}
          >
            <TextInput
              placeholder={strings.cpassPH}
              secureTextEntry={passWordicon}
              onChangeText={(text) => onChangeNewpassword(text)}
              style={{
                ...FONTS.body5,
                width: "93%",
              }}
              placeholderTextColor={COLORS.pl}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setPassWordicon(!passWordicon)}
            >
              {passWordicon == true ? VECTOR.Hide : VECTOR.Show}
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <SmallText text={passMetertext} color={colorCode} />
            <View
              style={{
                width: 20,
                height: 10,
                borderWidth: 1,
                borderColor: colorCode,
                borderRadius: SIZES.radius / 6,
                marginHorizontal: SIZES.base / 2,
                backgroundColor: colorCode,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: colorCode,
                  borderRadius: SIZES.radius / 6,
                  opacity: 0.1,
                }}
              ></View>
            </View>
            <View
              style={{
                width: 20,
                height: 10,
                borderWidth: passMetertext === "Weak" ? 1 : null,
                borderColor: passMetertext === "Weak" ? colorCode : null,
                borderRadius: SIZES.radius / 6,
                marginHorizontal: SIZES.base / 2,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: colorCode,
                  borderRadius: SIZES.radius / 6,
                  opacity: passMetertext === "Weak" ? 0.1 : null,
                }}
              ></View>
            </View>
            <View
              style={{
                width: 20,
                height: 10,
                borderWidth: 1,
                borderColor: colorCode,
                borderWidth:
                  passMetertext === "Normal" || passMetertext === "Weak"
                    ? 1
                    : null,

                borderColor:
                  passMetertext === "Normal" || passMetertext === "Weak"
                    ? colorCode
                    : null,
                borderRadius: SIZES.radius / 6,
                marginHorizontal: SIZES.base / 2,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 10,
                  backgroundColor: colorCode,
                  borderRadius: SIZES.radius / 6,
                  opacity:
                    passMetertext === "Normal" || passMetertext === "Weak"
                      ? 0.1
                      : null,
                }}
              ></View>
            </View>
          </View>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.secondary,
              marginTop: SIZES.base * 6,
            }}
          >
            {strings.cpValidation}
          </Text>

          <Error
            dissMiss={onDismiss}
            visible={toastShowopup}
            tittle={toastMessage}
            type={toastType}
          />
        </KeyboardAwareScrollView>
      </View>
      <View
        style={{
          height: 70,
          padding: SIZES.padding,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button type={3} icon={images.Next} onPress={() => navigation.goBack()}>
          <ButtonText color={COLORS.primary} text={strings.bt_Back} />
        </Button>
        <Button
          type={2}
          color={COLORS.primary}
          icon={images.Enable_icon}
          onPress={proceedClick}
        >
          <ButtonText color={COLORS.white} text={"Submit"} />
        </Button>
      </View>
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

export default NewPassword;
