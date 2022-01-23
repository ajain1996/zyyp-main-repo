//Sign_Up ,Login, Password creation component
import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { FONTS, COLORS, SIZES } from "../../constants";

export const SelectTransactionBtnText = ({ text, color = COLORS.primary }) => {
  return (
    <Text style={[styles.transactionBtnText, { color: color }]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  transactionBtnText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(15, 0.2),
    lineHeight: 20,
  },
});
