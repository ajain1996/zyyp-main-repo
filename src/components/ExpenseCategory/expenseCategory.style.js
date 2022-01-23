import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

const applyAlpha = (color, alpha) => {
  const alpha256 = (alpha * 255).toFixed()
  const alphaBase16 = Number(alpha256).toString(16) // we're ensuring this is a number then converting
  const paddedAlpha = alphaBase16.length() === 1 ? alphaBase16.padStart(1, 0) : alphaBase16
  return color.concat('', paddedAlpha)
}
export default styles = (color) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    padding: {
      width: moderateScale(7),
    },
    textFieldContainer: {
      flexDirection: "row",
      backgroundColor: COLORS.bg,
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: COLORS.inputborder,
      borderWidth: 1,
      borderRadius: SIZES.radius / 3,
      paddingHorizontal: moderateScale(10),
      height: moderateScale(50),
      ...FONTS.body4,
    },
    imageIcon: {
      width: 27, height: 27
    },
    tagStyle: {
      backgroundColor: color,
      flexDirection: "row",
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(6),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: SIZES.radius / 3,
    },
    closeIconContainer: {
      alignItems: "center",
      justifyContent: "center"
    }
  });
