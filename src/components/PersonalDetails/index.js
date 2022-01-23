import React ,{ createRef } from "react";
import { StyleSheet, View ,Text} from "react-native";
import {
  DateButton,
  TextField,
  MobileTextField,
  EmailField,
} from "../../components";
import { images, SIZES } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionSheet from "react-native-actions-sheet";
const actionSheetRef = createRef();

const PersonalDetails = ({
  fullName,
  mobileNumber,
  addressLine1,
  addressLine2,
  cityName,
  emirateValue,
  countryValue,
  boxNo,
  emiratesClick,
  emailText,
  onChangefullname,
  onchangeMobile,
  onChangeaddressLine1,
  onchangeAddress2,
  onchangeCity,
  onChangeBox
}) => {
  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableResetScrollToCoords={true}
      keyboardDismissMode="interactive"
    >
      <View style={{ marginHorizontal: SIZES.base }}>
        <TextField
          placeholderContent={"Full Name"}
          placeholder={"As per trade license"}
          onChangeText={onChangefullname}
          text={fullName}
          keyboardType={
            Platform.OS === "ios" ? "ascii-capable" : "visible-password"
          }
        />
        <MobileTextField
          type={1}
          placeholderContent={"Mobile Number"}
          placeholder={"xxx - xxx - xxx"}
          onChangeText={onchangeMobile}
          text={mobileNumber}
          keyboardType = 'phone-pad'
        />
        <EmailField
          placeholderContent={"Email ID"}
          text={emailText}
        />
        <TextField
          placeholderContent={"Address Line 1"}
          placeholder={"Appartment Number & Name"}
          onChangeText={onChangeaddressLine1}
          text={addressLine1}
          keyboardType={
            Platform.OS === "ios" ? "ascii-capable" : "visible-password"
          }
        />
        <TextField
          placeholderContent={"Address Line 2"}
          placeholder={"Street Number/Name"}
          onChangeText={onchangeAddress2}
          text={addressLine2}
          keyboardType={
            Platform.OS === "ios" ? "ascii-capable" : "visible-password"
          }
        />
        <TextField
          placeholderContent={"City"}
          placeholder={"City Name"}
          onChangeText={onchangeCity}
          text={cityName}
          keyboardType={
            Platform.OS === "ios" ? "ascii-capable" : "visible-password"
          }
        />
        <DateButton
          text={'Select Emirates'}
          value={emirateValue}
          icon={images.down}
          type={2}
          placeholderContent={"Emirate"}
          onPress={emiratesClick}
        />
        
        <TextField
          placeholderContent={"Country"}
          placeholder={"United Arab Emirates"}
          onChangeText={countryValue}
          text={'United Arab Emirates'}
          editable={false}
        />
        <TextField
          placeholderContent={"PO Box #"}
          placeholder={"Optional"}
          onChangeText={onChangeBox}
          text={boxNo}
          keyboardType = 'phone-pad'
          maxLength={6}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({});
export default PersonalDetails;
