/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { COLORS, images, SIZES } from "../constants";
import {moderateScale, vs} from 'react-native-size-matters'
export default UploadButton = ({ type, color, onPress, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        backgroundColor: color,
        width: SIZES.width / 1.5,
        height: moderateScale(45),
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: SIZES.radius / 3,
        marginVertical: SIZES.padding*2,
        paddingHorizontal: SIZES.padding2,
        borderWidth: 1,
        borderColor: COLORS.primary,
      }}
    >
      <View>{children}</View>
      <Image style={{ width: 25, height: 20 }} source={images.File} />
    </TouchableOpacity>
  );
};
