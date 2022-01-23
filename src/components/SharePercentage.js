/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import { ButtonText, SmallText } from ".";
import { COLORS, SIZES, images, FONTS } from "../constants";
import { OnboardingCheckinDescText } from "./SemoboldText";
export default SharePercentage = ({
  shareHolderPress,
  onChangeTextInputPercentage,
  plusPress,
  minusPress,
  percentage,
  text,
  desc,
  type,
  addedPercentage,
}) => {
  return (
    <View style={styles.container}>
      <OnboardingCheckinDescText color={COLORS.secondary2} text={"Share %"} />
      <View style={{ height: verticalScale(5) }} />
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "space-between",
            width: scale(SIZES.width * 0.4),
            height: verticalScale(45),
            borderRadius: verticalScale(10),
            backgroundColor: COLORS.bg,
            borderWidth: 1,
            borderColor: COLORS.inputborder,
          }}
        >
          <TouchableOpacity
            onPress={minusPress}
            style={{
              width: 50,
              height: verticalScale(50),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image style={{ width: 25, height: 3 }} source={images.Minus} />
          </TouchableOpacity>
          <TextInput
            style={{
              ...FONTS.h2,
              color: COLORS.black,
              height: verticalScale(50),
              flex:1,
            }}
            textAlign={'center'}
            keyboardType={'numeric'}
            onChangeText={onChangeTextInputPercentage}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'done'}
            // defaultValue={`${addedPercentage}`}
            value={`${addedPercentage}`}
          />
          {/* <Text style={{ ...FONTS.h2 }}>{addedPercentage}</Text> */}
          <TouchableOpacity
            onPress={plusPress}
            style={{
              width: 50,
              height: verticalScale(50),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image style={{ width: 20, height: 20 }} source={images.Plus} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingLeft: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OnboardingCheckinDescText
            color={COLORS.pl}
            text={`${100 - percentage} % remaining`}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          borderBottomColor: "rgba(203, 210, 217, 1)",
          borderBottomWidth: 1,
        }}
      >
        <SmallText text={"Shares must add up to 100%"} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            paddingLeft: 10,
            width: 50,
            height: verticalScale(20),
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 15, height: 15, resizeMode: "contain" }}
            source={images.mark}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: verticalScale(20) }} />
      <TouchableOpacity
        onPress={shareHolderPress}
        style={{
          alignItems: "center",
          borderColor: COLORS.primary,
          justifyContent: "center",
          width: moderateScale(SIZES.width * 0.8),
          height: verticalScale(45),
          borderRadius: verticalScale(10),
          borderWidth: 1,
        }}
      >
        <ButtonText color={COLORS.primary} text={"Save Shareholder details"} />
      </TouchableOpacity>
      <View style={{ height: verticalScale(10) }} />
      <SmallText color={COLORS.lightGray} text={desc} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
  },
});
