import React, { useState } from "react";
import {
  AuthHeader,
  Button,
  ButtonText,
  MobileTextField,
} from "../../../components";
import { COLORS, FONTS, SIZES, images } from "../../../constants";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditEmail = ({ navigation,route }) => {
  
  const [email, setEmail] = useState(route.params.mail);
  const [buttonEnable, setButtonEnable] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={"Edit Email"}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          nav={navigation}
          backPress={() => navigation.navigate("profileview")}
        />
      </View>
      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: COLORS.mdt,
          paddingBottom: SIZES.padding,
        }}
      />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={styles.componentView}>
          <MobileTextField
            placeholderContent={"Email ID"}
            placeholder={"prhabhu@zyyp.io"}
            maxLength={200}
            text={email}
            onChangeText={(text)=>{
              setEmail(text)
              setButtonEnable(true)
            }}
          />
          <Text style={{ ...FONTS.body4, color: COLORS.secondary2 }}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>
        </View>
        {buttonEnable != true ? (
          <Button
            type={1}
            color={COLORS.secondary}
            onPress={() => navigation.navigate("profileview")}
            icon={images.Next_light}
          >
            <ButtonText color={COLORS.secondary2} text={"Submit Request"} />
          </Button>
        ) : (
          <Button
            type={1}
            color={COLORS.primary}
            onPress={() =>{
              navigation.goBack()
              route.params.refreshData({
                isApiCallSuccess: true,
                message:"TBD"
              });
            }}
            icon={images.Next}
          >
            <ButtonText color={COLORS.white} text={"Submit Request"} />
          </Button>
        )}
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
export default EditEmail;
