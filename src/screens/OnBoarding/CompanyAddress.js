/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding --- Company Adress
import React from "react";
import {
  View,
  KeyboardAvoidingView,
  ActionSheetIOS,
  Platform,
} from "react-native";
import { DateButton, EditableField, TextField } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ActionSheetProvider,
  connectActionSheet,
  ActionSheetProps,
} from "@expo/react-native-action-sheet";
import { COLORS } from "../../constants";
export default class CompanyAddress extends React.PureComponent {
  state = {
    openDatePicker: false,
    selectedIndex: 0,
    list: [
      "Cancel",
      "Abu Dhabi",
      "Ajman",
      "Dubai",
      "Fujairah",
      "Ras Al Khaimah",
      "Sharjah",
      "Umm Al Quwain",
    ],
    emirate: "Emirate",
    color: COLORS.pl,
  };
  _updateSelectionText = (selectedIndex) => {
    this.setState({
      selectedIndex,
    });
  };

  onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: this.state.list,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "light",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else {
          let emirates = this.state.list[buttonIndex];
          this.setState({
            emirate: emirates,
            color: COLORS.black,
          });
          this.props.onChangeEmirates(emirates);
        }
      }
    );
  render() {
    const {
      item,
      editable,
      editPress,
      onCancelPress,
      onSuccesPress,
      onChangeAddress1,
      onChangeAddress2,
      onChangeCity,
      onChangeCountry,
      onChangePo,
      orgName,
      address_line_1,
      city,
      state,
      country,
      postal_code,
      emiratesClick,
      address_line_2,
    } = this.props;
    return (
      <KeyboardAwareScrollView
        onKeyboardWillShow={(frames) => {
        }}
        scrollEnabled={true}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={{ paddingHorizontal: 20 }}>
          <EditableField
            orgName={orgName}
            onCancelPress={onCancelPress}
            onSuccesPress={onSuccesPress}
            editPress={editPress}
            editable={editable}
            item={item.editable}
          />
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
            color={this.state.color}
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
