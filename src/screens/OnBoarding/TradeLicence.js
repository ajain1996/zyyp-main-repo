/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding TradeLicence

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import DocumentPicker from "react-native-document-picker";
import Icon from "react-native-vector-icons/EvilIcons";
import {
  ButtonText,
  DateButton,
  EditableField,
  TextField,
  UploadButton,
} from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getDateToString } from "../../Utilities/utils";
import { COLORS, FONTS } from "../../constants";
export default class TradeLicence extends React.PureComponent {
  state = {
    issueDatePicker: false,
    issueValue: "",
    expiryDatePicker: false,
    expiryValue: "",
    filename: "",
    backgroundColor: "transparent",
  };

  pickImage = async () => {
    const { onTradeLicenceDocument } = this.props;
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({
        filename: res[0].name,
        backgroundColor: "#85949F",
      });
      onTradeLicenceDocument({
        filename: res[0].name,
        type: res[0].type,
        uri: res[0].uri,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  render() {
    const {
      item,
      editable,
      orgName,
      onChangeOrganizationText,
      tradeLicense,
      tradeLicenseIssueDate,
      tradeLicenseExpiryDate,
      onChangeIssueText,
      onChangeExpiryText,
      editPress,
      onChangeTradeLicenseText,
      onCancelPress,
      onSuccesPress,
      onTradeLicenceDocument,
    } = this.props;
    const { issueDatePicker, expiryDatePicker, filename, backgroundColor } =
      this.state;
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
            onChangeText={onChangeOrganizationText}
            orgName={orgName}
            onCancelPress={onCancelPress}
            onSuccesPress={onSuccesPress}
            editPress={editPress}
            editable={editable}
            item={item.editable}
          />
          <TextField
            placeholderContent={"Trade License"}
            placeholder={"Trade License Number"}
            onChangeText={onChangeTradeLicenseText}
            text={tradeLicense}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
          />
          <DatePickerModal
            mode={"single"}
            visible={issueDatePicker}
            disableStatusBar={true}
            onDismiss={() => this.setState({ issueDatePicker: false })}
            onConfirm={(dt) => {
              let date = getDateToString(dt.date);
              this.setState({ issueDatePicker: false, issueValue: date });
              onChangeIssueText(dt.date);
            }}
            date={new Date()}
          />
          <DatePickerModal
            mode={"single"}
            visible={expiryDatePicker}
            disableStatusBar={true}
            onDismiss={() => this.setState({ expiryDatePicker: false })}
            onConfirm={(dt) => {
              let date = getDateToString(dt.date);
              this.setState({ expiryDatePicker: false, expiryValue: date });
              onChangeExpiryText(dt.date);
            }}
            date={new Date()}
          />
          <DateButton
            type={1}
            text={"MM-DD-YYYY"}
            value={tradeLicenseIssueDate}
            placeholderContent={"Issue Date"}
            onPress={() => this.setState({ issueDatePicker: true })}
          />
          <DateButton
            type={1}
            text={"MM-DD-YYYY"}
            value={tradeLicenseExpiryDate}
            placeholderContent={"Expiry Date"}
            onPress={() => this.setState({ expiryDatePicker: true })}
          />
          {filename === "" ? (
            <View />
          ) : (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignItems: "center",
                backgroundColor: backgroundColor,
                borderRadius: 25,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                  {filename}
                </Text>
              </View>
              {filename === "" ? (
                <View />
              ) : (
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    this.setState({
                      filename: "",
                      backgroundColor: "transparent",
                    });
                    onTradeLicenceDocument(null);
                  }}
                >
                  <Icon name="close" size={22} color={COLORS.white} />
                </TouchableOpacity>
              )}
            </View>
          )}
          <UploadButton onPress={this.pickImage}>
            <ButtonText color={COLORS.primary} text={"Upload Document"} />
          </UploadButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
