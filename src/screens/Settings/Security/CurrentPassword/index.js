import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  FONTS,
  COLORS,
  VECTOR,
  SIZES,
  images,
  strings,
  formValidations,
  headers
} from "../../../../constants";
import {
  Button,
  AuthHeader,
  SmallText,
  ButtonText,
  Error,
} from "../../../../components";
import {useSelector,useDispatch} from 'react-redux'
import { Loader, authLogin, isResponseisValid } from "../../../../Utilities";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import base64 from "react-native-base64";

//Functional Component
const CurrentPassword = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state?.LoginReducer?.UserData.result?.user_personal_info);
  const [passwrodInput, setPasswrodInput] = useState(""); //Current Password value state
  const [passWordicon, setPassWordicon] = useState(true); //Password Show /Hide icon value

  const [toastShowopup, setTtoastShowopup] = useState(false); //Toast handling state
  const [toastType, setToastType] = useState(0); // Type used for is used to find what type toast we have display (Sucess /or Error type)
  const [toastMessage, setToastMessage] = useState(""); //Toast Content Hnadling
  const [loading, setLoading] = useState(false); // Loading state used for handling loader

  //Current Password Submit Button Click even
  const passwordClick = async () => {
    if (passwrodInput.length === 0) {
      toastHandling(0, formValidations.currentPassword);
    } else {
      currentPasswordAPICall();
    }
  };

  //This Api call for entered Current Password Validate or not
  const currentPasswordAPICall = async () => {
    setLoading(true);
    //Login Request Params
    const body = {
      email: userDetails?.email,
      password: passwrodInput,
    };
    try {
      const currentPasswordResponse = await authLogin(body);
      //Login Sucess Response
      if (isResponseisValid(currentPasswordResponse)) {
        const token = currentPasswordResponse.data.result.token;
        const orgID = currentPasswordResponse.data.result.organization_id;
        const orgBase64id = base64.encode(JSON.stringify(orgID));
        const userId = currentPasswordResponse.data.result.user_id;
        var payloadData = {
          token: token,
          orgid: orgBase64id,
          userId: userId,
        };
        dispatch(UserHeader(payloadData));
        navigation.navigate("NewPassword");
        setLoading(false);
      } else {
        setLoading(false);
        toastHandling(0, currentPasswordResponse.data);
      }
    } catch (error) {
      setLoading(false);
      toastHandling(0, strings.apierror);
    }
  };

  //Handle diffrent type toast message in common function
  const toastHandling = (type, message) => {
    setTtoastShowopup(true);
    setToastType(type);
    setToastMessage(message);
  };

  //UI elements
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Loader loading={loading} />
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
          paddingBottom: SIZES.padding,
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
        <View style={styles.compoentView}>
          <SmallText text={"Current Password"} />
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
              placeholder={strings.psPH}
              secureTextEntry={passWordicon}
              style={{
                ...FONTS.body5,
                width: "93%",
              }}
              placeholderTextColor={COLORS.pl}
              value={passwrodInput}
              onChangeText={(text) => setPasswrodInput(text.trimLeft())}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setPassWordicon(!passWordicon)}
            >
              {passWordicon == true ? VECTOR.Hide : VECTOR.Show}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Button
            color={COLORS.primary}
            onPress={() => passwordClick()}
            icon={images.Next}
            type={1}
          >
            <ButtonText color={COLORS.white} text={strings.bt_Proceed} />
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <Error
        dissMiss={() => setTtoastShowopup(false)}
        visible={toastShowopup}
        type={toastType}
        tittle={toastMessage}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  compoentView: {
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
export default CurrentPassword;
export function UserHeader(data) {
  return {
    type: "UserHeader",
    payload: data,
  };
}