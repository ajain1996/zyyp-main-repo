/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
//Common Button component
import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { ButtonText, SharePercentage } from "../components";
import { COLORS, SIZES, styles, images } from "../constants";
import { OnboardingCheckinTitleText, SemiBoldText } from "./SemoboldText";
export default MyshareHolders = ({
  desc,
  type,
  addedPercentage,
  shareHolderPress,
  percentage,
  minusPress,
  plusPress,
  onChangeTextInputPercentage,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1 }}>
        <OnboardingCheckinTitleText
          color={COLORS.lightGray}
          text={"Shareholder 1"}
        />
        <View style={{ height: 20 }} />
        <SharePercentage
          minusPress={minusPress}
          plusPress={plusPress}
          percentage={percentage}
          addedPercentage={addedPercentage}
          shareHolderPress={shareHolderPress}
          onChangeTextInputPercentage={onChangeTextInputPercentage}
          desc={desc}
        />
      </View>
    </View>
  );
};
