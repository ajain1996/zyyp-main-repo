/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from "react";
import { Platform, View } from "react-native";
import { isIphoneX } from "../Utilities/utils";
import { COLORS, SIZES } from "../constants";
export default Header = ({ children }) => {
  return (
    <View
      style={{
        height: isIphoneX() ? 100 : 100,
        flexDirection: "row",
        backgroundColor: COLORS.white,
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingRight: 10,
        paddingBottom: isIphoneX() ? SIZES.padding * 2 : SIZES.padding,
        borderBottomLeftRadius: SIZES.radius / 1.5,
        borderBottomEndRadius: SIZES.radius / 1.5,
        shadowColor: COLORS.secondary2,
        shadowOffset: {
          width: 0,
          height: Platform.OS === "android" ? 20 : 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: SIZES.base,
        elevation: 20,
      }}
    >
      {children}
    </View>
  );
};
