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
export default DateButton = ({ placeholderContent, onPress, text, type }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        borderRadius: 10,
        marginVertical: 10,
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
          backgroundColor: "#85949F",
          borderRadius: SIZES.radius / 3,
        }}
      >
        <Image
          style={{ width: 20, height: 15, resizeMode: "contain" }}
          source={images.light_Mail}
        />
        <View style={{ marginLeft: 10 }}>
          <OnboardingEmailText color={COLORS.white} text={text} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
