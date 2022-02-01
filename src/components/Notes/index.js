import React from "react";
import { View, TextInput, Keyboard } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SmallText } from "..";
import { COLORS } from "../../constants";
import styles from "./notes.style";

export const Notes = ({
  placeholderContent,
  onChangeText,
  placeholder,
  popup = false,
  borCol
}) => {
  return (
    <View style={styles().container}>
      <SmallText text={placeholderContent} color="#000" />
      <View
        style={[
          styles().notesTextFieldContainer,
          { height: popup ? moderateScale(160) : moderateScale(90), borderColor: borCol ? 'transparent' : '#85949F' },
        ]}
      >
        <TextInput
          textAlignVertical={"top"}
          placeholder={placeholder}
          placeholderTextColor={COLORS.secondary}
          onChangeText={onChangeText}
          style={styles().textField}
          multiline
          returnKeyType={"done"}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};
