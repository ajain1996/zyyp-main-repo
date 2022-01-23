/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding --- Owner Details
import React from "react";
import { View, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  EditableField,
  MobileTextField,
  EmailField,
  TextField,
  DateButton,
} from "../../components";

export default class OwnerDetails extends React.PureComponent {
  render() {
    const {
      email,
      full_name,
      mobile_number,
      item,
      orgName,
      onChangeFullnameText,
      onChangeMobileText,
      onChangeAddress1,
      address_line_1,
      onChangeAddress2,
      address_line_2,
      onChangeCity,
      city,
      state,
      emiratesClick,
      onChangeCountry,
      country,
      onChangePo,
      postal_code,
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
        <View style={{ paddingHorizontal: 20 }}>
          <EditableField
            orgName={orgName}
            editable={item.editable.editable}
            item={item.editable}
          />
          <TextField
            placeholderContent={"Full Name"}
            placeholder={"As per id document"}
            onChangeText={onChangeFullnameText}
            text={full_name}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
          />
          <MobileTextField
            type={1}
            placeholderContent={"Mobile Number"}
            placeholder={"xxx-xxx-xxx"}
            onChangeText={onChangeMobileText}
            text={mobile_number}
            keyboardType={"numeric"}
          />
          <EmailField placeholderContent={"Email ID"} text={email} />
          <TextField
            placeholderContent={"Address Line 1"}
            placeholder={"Appartment Number & Name"}
            onChangeText={onChangeAddress1}
            text={address_line_1}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
          />
          <TextField
            placeholderContent={"Address Line 2"}
            placeholder={"Street Number/Name"}
            onChangeText={onChangeAddress2}
            text={address_line_2}
          />
          <TextField
            placeholderContent={"City"}
            placeholder={"City Name"}
            onChangeText={onChangeCity}
            text={city}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
          />
           <DateButton
            text={"Select Emirates"}
            value={state}
            type={2}
            placeholderContent={"Emirate"}
            // onPress={this.onPress}
            onPress={emiratesClick}
          />
          <TextField
            placeholderContent={"Country"}
            placeholder={"United Arab Emirates"}
            onChangeText={onChangeCountry}
            editable={false}
            text={country}
          />
          <TextField
            placeholderContent={"PO Box #"}
            placeholder={"Optional"}
            keyboardType={"numeric"}
            onChangeText={onChangePo}
            maxLength={6}
            text={postal_code}
          />
         
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
