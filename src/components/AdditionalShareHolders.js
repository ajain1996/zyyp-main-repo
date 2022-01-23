/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
//Common Button component
import React, { useState } from "react";
import { View, Platform } from "react-native";
import {
  CustomDelete,
  TextField,
  MobileTextField,
  SharePercentage,
} from "../components";
export default AdditionalShareHolders = ({
  desc,
  type,
  shareNumber = 1,
  addedPercentage,
  shareholderFullname,
  shareholderMobile,
  shareholderEmail,
  shareHolderPress,
  onChangeShareholderFullname,
  onChangeShareholderMobile,
  onChangeShareholderEmail,
  onChangeTextInputPercentage,
  onChangeShareholderPercentage,
  percentage,
  deletePress,
  minusPress,
  plusPress,
}) => {
  return (
    <View>
      <CustomDelete
        text={`Share Holder ${shareNumber}`}
        color={"transparent"}
        onPress={deletePress}
      />
      <TextField
        placeholderContent={"Full Name"}
        placeholder={"as per company records"}
        onChangeText={onChangeShareholderFullname}
        text={shareholderFullname}
        keyboardType={
          Platform.OS === "ios" ? "ascii-capable" : "visible-password"
        }
      />
      <MobileTextField
        type={1}
        placeholderContent={"Mobile Number"}
        placeholder={"xxx-xxx-xxx"}
        onChangeText={onChangeShareholderMobile}
        text={shareholderMobile}
        keyboardType={"numeric"}
      />
      <MobileTextField
        type={2}
        placeholderContent={"Email ID"}
        maxLength={100}
        placeholder={"as per company records"}
        onChangeText={onChangeShareholderEmail}
        text={shareholderEmail}
        keyboardType={
          Platform.OS === "ios" ? "ascii-capable" : "visible-password"
        }
      />
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
  );
};
