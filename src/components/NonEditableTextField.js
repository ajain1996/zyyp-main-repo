/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SmallText } from ".";
import { COLORS, FONTS, images, SIZES } from "../constants";
import {
  OnboardingCheckinTitleText,
  OnboardingEmailText,
} from "./SemoboldText";
export default NonEditableTextField = ({ placeholderContent, onPress, text, type }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        borderRadius: 10,
        marginVertical: 5,
      }}
    >
      <SmallText text={placeholderContent} />
      <View style={{ height: 5 }} />
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: 7,
          backgroundColor: "#D6E4EC",
          borderRadius: SIZES.radius / 3,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <OnboardingEmailText color={COLORS.black} text={text} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
