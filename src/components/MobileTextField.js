/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import image from "../constants/image";
import { SmallText } from ".";

export default MobileTextField = ({
  placeholderContent,
  keyboardType = "default",
  onChangeText,
  text,
  editable=true,
  maxLength = 9,
  type,
  placeholder,
  rightIcon,
  rightIconclick
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
      <SmallText text={placeholderContent} />
      <View style={{ height: 5 }} />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.bg,
          justifyContent: "flex-start",
          alignItems: "center",
          borderColor: COLORS.inputborder,
          borderWidth: 1,
          borderRadius: SIZES.radius / 3,
          paddingHorizontal: 5,
          ...FONTS.body4,
        }}
      >
        {type === 1 ? (
          <Text style={{ ...FONTS.body4,color:COLORS.secondary2 }}>
            +971
          </Text>
        ) : (
          <Image style={{ width: 25, height: 25 }} source={image.EmailId} />
        )}
        <TextInput
          style={{
            height: 50,
            paddingLeft: 10,
            ...FONTS.body4,
            width: "90%",
            color:COLORS.secondary2
          }}
          keyboardType={keyboardType}
          defaultValue={text}
          value={text}
          editable={editable}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={COLORS.pl}
          onChangeText={onChangeText}
          autoCapitalize="none"
          returnKeyType={Platform.OS === "ios" ? "done" : "done"}
        />
        {type === 3 ? (
          <TouchableOpacity onPress={rightIconclick}>
            <Image
              style={{ width: 25, height: 25, right: 20 }}
              source={rightIcon}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
