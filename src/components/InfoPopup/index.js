import React from "react";
import {
  Modal,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, ButtonText } from "..";
import { COLORS, images, strings } from "../../constants";
import { Notes } from "../Notes";
import styles from "./info.style";
const { width } = Dimensions.get("window");
export const InfoPopup = ({
  title,
  desc,
  btnTitle,
  visible,
  onChangeDelete,
  onChangeOk,
  onChangeText
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <SafeAreaView style={styles().container}>
        <KeyboardAwareScrollView
          scrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          enableOnAndroid={true}
          enableResetScrollToCoords={true}
          keyboardDismissMode="interactive"
        >
          <View style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(30),
                borderRadius: 8,
              }}
            >
              <View style={{ width: width * 0.8 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#323F4B",
                    fontSize: 20,
                    fontWeight: "normal",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {title}
                </Text>
                {desc ? <View style={{ height: 10 }} /> : <View />}
                {desc ? (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#323F4B",
                      fontSize: 15,
                      lineHeight: 20,
                      fontWeight: "normal",
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    {desc}
                  </Text>
                ) : (
                  <View />
                )}
              </View>
              <Notes
                placeholderContent={""}
                placeholder={"Type in your comment"}
                popup={true}
                onChangeText={onChangeText}
              />
              <View style={{ height: 10 }} />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={onChangeDelete}
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    padding: 10,
                    width: width * 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                  }}
                >
                    <ButtonText text={strings.bt_Cancel} color={COLORS.primary}/>
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity
                  onPress={onChangeOk}
                  style={{
                    borderRadius: 10,
                    width: width * 0.4,
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    padding: 10,
                    height: 50,
                  }}
                >
                  <ButtonText text={btnTitle} color={COLORS.white}/>
                  <Image
                    style={{ width: 27, height: 27 }}
                    source={
                      btnTitle === strings.buttonAskInfo
                        ? images.rejectIcon
                        : btnTitle === strings.buttonReject
                        ? images.closeButton
                        : images.submit
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: 10 }} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
};
