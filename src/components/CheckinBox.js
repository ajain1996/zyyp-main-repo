/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, images } from "../constants";
import { ButtonText, SmallText } from ".";
import {
  OnboardingCheckinDescText,
  OnboardingCheckinTitleText,
  OnboardingTitleDescText,
} from "./SemoboldText";
export default CheckinBox = ({
  title,
  shareHolderCheckIn,
  desc,
  isCheckin = false,
  borderEnable=true,
  onPress,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        borderBottomColor: "rgba(203, 210, 217, 1)",
        paddingBottom: 10,
        borderBottomWidth:borderEnable ? 1 : 0,
      }}
    >
      <View style={{ flex: 0.8 }}>
        <OnboardingCheckinTitleText text={title} color={COLORS.secondary2} />
        <View style={{ height: 5 }} />
        <OnboardingCheckinDescText text={desc} color={COLORS.lightGray} />
      </View>
      
        <TouchableOpacity
          onPress={onPress}
          style={{
            flex: 0.2,
            height: 70,
            alignItems: "flex-end",
          }}
        >
          {isCheckin ? (
            <Image
              resizeMode={"stretch"}
              style={{ width: 25, height: 25 }}
              source={images.Checkin}
            />
          ) : (
            <Image
              resizeMode={"stretch"}
              style={{ width: 25, height: 25 }}
              source={images.CheckOut}
            />
          )}
        </TouchableOpacity>
      
    </View>
  );
};
