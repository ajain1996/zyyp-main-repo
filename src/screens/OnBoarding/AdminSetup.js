/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding ----> Admin Setup

import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  CheckinBox,
  CustomDelete,
  MobileTextField,
  TextField,
} from "../../components";
import { SIZES } from "../../constants";

export default class AdminSetup extends React.PureComponent {
  render() {
    const {
      isCheckin,
      shareHolderCheckIn,
      onPress,
      onChangeAdminFullName,
      onChangeMobileNumber,
      onChangeEmailId,
      email_id,
      full_name,
      mobile_number,
    } = this.props;
    return (
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={{ paddingHorizontal: 20, height: SIZES.height - 180 }}>
          <CheckinBox
            onPress={onPress}
            shareHolderCheckIn={shareHolderCheckIn}
            title={"I will be the admin"}
            isCheckin={isCheckin}
            desc={
              "Uncheck this box if you want to select someone else as the admin"
            }
          />
          {!isCheckin ? (
            <View>
              <CustomDelete text={"Assign Admin User"} onPress={onPress} />
              <TextField
                placeholderContent={"Full Name"}
                placeholder={"as per company records"}
                onChangeText={onChangeAdminFullName}
                text={full_name}
                keyboardType={
                  Platform.OS === "ios" ? "ascii-capable" : "visible-password"
                }
              />
              <MobileTextField
                type={1}
                placeholderContent={"Mobile Number"}
                placeholder={"xxx - xxx - xxx"}
                onChangeText={onChangeMobileNumber}
                text={mobile_number}
                keyboardType={"numeric"}
              />
              <MobileTextField
                type={2}
                placeholderContent={"Email ID"}
                placeholder={"as per company records"}
                onChangeText={onChangeEmailId}
                text={email_id}
                maxLength={100}
                keyboardType={
                  Platform.OS === "ios" ? "ascii-capable" : "visible-password"
                }
              />
            </View>
          ) : (
            <View />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
