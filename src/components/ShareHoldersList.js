/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
//Common Button component
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { COLORS, SIZES } from "../constants";
import AdditionalShareHolders from "./AdditionalShareHolders";
import {
  ButtonText,
  OnboardingCheckinDescText,
  OnboardingCheckinTitleText,
} from "./SemoboldText";
export default ShareHoldersList = ({
  desc,
  shareHolderList = [],
  deletePress,
  shareHolderPress,
  pressEditNavigation,
  addSharePage,
  addAnotherSharePress,
  type,
  percentage,
  addedPercentage,
  onPress,
  minusPress,
  plusPress,
  onChangeShareholderFullname,
  onChangeShareholderMobile,
  onChangeShareholderEmail,
  onChangeTextInputPercentage,
  shareholderFullname,
  shareholderMobile,
  shareholderEmail,
}) => {
  return (
    <View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "rgba(203, 210, 217, 1)",
          marginBottom: 10,
        }}
      >
        {shareHolderList.map((shareholder, index) => (
          <TouchableOpacity
            key={`${index}`}
            style={{
              borderWidth: 1,
              borderColor: COLORS.bc,
              height: verticalScale(60),
              paddingRight: 10,
              borderColor: "transparent",
              borderRadius: SIZES.radius / 2,
              marginBottom: 20,
              flexDirection: "row",
              backgroundColor: COLORS.white,
              borderWidth: 1,
              ...styles.cardShadow,
            }}
          >
            <View
              style={{
                width: 40,
                height: verticalScale(60),
                paddingLeft: 15,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Montserrat-SemiBold",
                  color: "#AABBC6",
                  //Figma styles
                }}
              >
                {`0${index + 1}`}{" "}
              </Text>
              {/* <ButtonText color={COLORS.lightGray} text={`0${index + 1}`} /> */}
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{ justifyContent: "space-between", paddingLeft: 10 }}
              >
                <OnboardingCheckinTitleText
                  key={index}
                  text={shareholder.share_holder_name}
                />
                <View style={{ height: 5 }} />
                <TouchableOpacity
                  onPress={() => {
                    pressEditNavigation(index);
                  }}
                >
                  <ButtonText color={COLORS.primary} text={"EDIT"} />
                </TouchableOpacity>
              </View>
              <OnboardingCheckinTitleText
                text={`${shareholder.share_holder_percentage} %`}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 10 }} />
      {addSharePage ? (
        <AdditionalShareHolders
          deletePress={deletePress}
          desc={desc}
          shareHolderPress={shareHolderPress}
          percentage={percentage}
          addedPercentage={addedPercentage}
          plusPress={plusPress}
          minusPress={minusPress}
          shareholderFullname={shareholderFullname}
          shareholderMobile={shareholderMobile}
          shareholderEmail={shareholderEmail}
          onChangeShareholderFullname={onChangeShareholderFullname}
          onChangeShareholderMobile={onChangeShareholderMobile}
          onChangeShareholderEmail={onChangeShareholderEmail}
          onChangeTextInputPercentage={onChangeTextInputPercentage}
          shareNumber={shareHolderList.length + 1}
          shareholderFullname={shareholderFullname}
          shareholderMobile={shareholderMobile}
          shareholderEmail={shareholderEmail}
        />
      ) : (
        <View>
          {percentage !== 100 ? (
            <TouchableOpacity
              onPress={addAnotherSharePress}
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
              <ButtonText
                color={COLORS.primary}
                text={"Add Another SHareholder"}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <View style={{ height: verticalScale(10) }} />
          <OnboardingCheckinDescText text={desc} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.pl,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: COLORS.bc,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
});
