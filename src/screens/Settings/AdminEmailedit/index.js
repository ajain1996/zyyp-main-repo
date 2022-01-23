import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  AuthHeader,
  Button,
  ButtonText,
  MobileTextField,
  SemiBoldText,
  Error,
} from "../../../components";
import {
  emailUpdate,
  isResponseisValid,
  isValidEmail,
} from "../../../Utilities";
import {
  COLORS,
  FONTS,
  SIZES,
  strings,
  images,
  formValidations,
} from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Functional AdminEmail Edit Module
const AdminEditEmail = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.mail); // To get enter email value
  const [userId] = useState(route.params.admin_userid);

  //Handle Toast Messages (Sucess /Fail)
  const [showToastpopup, setShowToastpopup] = useState(false);
  const [toastMessage, setToastMessage] = useState(0);
  const [toastType, setToastType] = useState(0);

  //Submit Button Click
  const editEmailSubmitbuttonclick = () => {
    if (email.length === 0) {
      popupContent(0, formValidations.emailempty);
    } else if (isValidEmail(email) === false) {
      popupContent(0, formValidations.emailFormat);
    } else {
      adminemailUpdateApicall();
    }
  };
  //The Root page Toast Handling
  const refreshData = ({ isApiCallSuccess, message }) => {
    if (isApiCallSuccess) {
      popupContent(3, message);
    }
  };
  //Admin Email Update API call
  const adminemailUpdateApicall = async () => {
    try {
      const reqObj = {
        new_email: email,
      };
      const adminemailUpdateresponse = await emailUpdate(userId, reqObj);
      console.log("user_id", adminemailUpdateresponse.data.result);
      if (isResponseisValid(adminemailUpdateresponse)) {
        navigation.goBack();
        route.params.refreshData({
          isApiCallSuccess: true,
          message: adminemailUpdateresponse.data.result,
        });
      } else {
        popupContent(0, adminemailUpdateresponse.data);
      }
    } catch (e) {
      popupContent(0, strings.apierror);
    }
  };

  const popupContent = (type, message) => {
    setShowToastpopup(true);
    setToastMessage(message);
    setToastType(type);
  };
  const onDismiss = () => {
    setShowToastpopup(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={"Edit Email"}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          nav={navigation}
          backPress={() => navigation.navigate("Admin")}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.mdt,
          marginBottom: SIZES.padding * 2,
        }}
      />
      <Error
        dissMiss={onDismiss}
        visible={showToastpopup}
        type={toastType}
        tittle={toastMessage}
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
          <SemiBoldText text={"Enter new admin email ID"} />
          <MobileTextField
            placeholderContent={"Email ID"}
            placeholder={"xxxxx@xxx.in"}
            maxLength={200}
            text={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.secondary2,
                paddingTop: SIZES.padding * 2,
              }}
            >
              This option will update the email address of the existing admin.If
              you want to change the admin instead, please go to
              <ButtonText
                onPress={() => {
                  navigation.navigate("ReplacementAdmin", {
                    refreshData: refreshData,
                    admin_userid: route.params.admin_userid,
                  });
                }}
                text={" Replace Admin"}
                color={COLORS.primary}
              />
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
          icon={images.Next}
          type={2}
          onPress={editEmailSubmitbuttonclick}
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
export default AdminEditEmail;
