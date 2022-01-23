import React from "react";
import { View, Text, Image } from "react-native";

import {
  EditableField,
  UploadButton,
  TextField,
  DateButton,
} from "../../components";
import { COLORS, strings, SIZES, images } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { scale, verticalScale } from "react-native-size-matters";

const Emirates = ({
  item,
  editable,
  editPress,
  onCancelPress,
  onSuccesPress,
  onMobileChange,
  uploadClick,
  datePicker,
  issueDate,
  expirydate,
  frontImg,
  backImg,
  Name,
  editName,
  onChangeid,
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
      <View>
        <EditableField
          onCancelPress={onCancelPress}
          onSuccesPress={onSuccesPress}
          editPress={editPress}
          editable={editable}
          item={item.editable}
          value={Name}
          orgName={Name}
          onChangeText={editName}
        />
        <TextField
          placeholderContent={"ID No"}
          placeholder={"784 - XXXX - XXXXXXX - X"}
          onChangeText={onChangeid}
          text={onMobileChange}
          keyboardType={"numeric"}
        />
        <DateButton
          type={1}
          text={"MM-DD-YYYY"}
          placeholderContent={"Issue Date"}
          onPress={() => datePicker(0)}
          value={issueDate}
        />
        <DateButton
          type={1}
          text={"MM-DD-YYYY"}
          placeholderContent={"Expiry Date"}
          onPress={() => datePicker(1)}
          value={expirydate}
        />
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {frontImg == "" ? (
            <UploadDotButton
              color={COLORS.bg}
              text={"Front of document"}
              onPress={() => uploadClick("front")}
            />
          ) : (
            <View
              style={{
                height: verticalScale(80),
                borderRadius: 8,
                borderStyle: "dashed",
                borderWidth: 2,
                marginVertical: 20,
                borderColor: COLORS.pl,
              }}
            >
              <Image
                source={{ uri: frontImg }}
                style={{
                  width: scale(SIZES.width * 0.35),
                  height: verticalScale(80),
                  borderRadius: 8,
                  borderStyle: "dashed",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  resizeMode: "cover",
                }}
              />
            </View>
          )}
          {backImg == "" ? (
            <UploadDotButton
              color={COLORS.bg}
              text={"Front of document"}
              onPress={() => uploadClick("back")}
            />
          ) : (
            <View
              style={{
                height: verticalScale(80),
                borderRadius: 8,
                borderStyle: "dashed",
                borderWidth: 2,
                marginVertical: 20,
                borderColor: COLORS.pl,
              }}
            >
              <Image
                source={{ uri: backImg }}
                style={{
                  width: scale(SIZES.width * 0.35),
                  height: verticalScale(80),
                  borderRadius: 8,
                  borderStyle: "dashed",
                  paddingVertical: SIZES.base,
                  paddingHorizontal: SIZES.padding,
                  resizeMode: "cover",
                }}
              />
            </View>
          )}
        </View>
        {/* <UploadButton onPress={uploadClick}>
          <ButtonText text={strings.bt_Upload} color={COLORS.primary} />
        </UploadButton> */}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Emirates;
