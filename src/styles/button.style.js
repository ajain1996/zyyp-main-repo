import { StyleSheet } from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { COLORS, SIZES } from "../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    button: {
      flexDirection: "row",
      backgroundColor: color,
      height: moderateScale(45),
      alignItems: "center",
      borderRadius: SIZES.radius / 3,
      borderColor: COLORS.primary,
      width: calculateWidth(type),
      justifyContent: type === 3 ? "center" : "space-between",
      paddingHorizontal: SIZES.padding2 * 2,
      borderColor: COLORS.primary,
      borderWidth: type === 3 ? 1 : 0,
    },
  });

function calculateWidth(type) {
  if (type === 1 || type === 4 || type === 5) {
    return SIZES.width - 30;
  } else {
    return SIZES.width / 2.4;
  }
}
