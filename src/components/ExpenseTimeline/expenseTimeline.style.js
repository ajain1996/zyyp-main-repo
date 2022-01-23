import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      marginHorizontal: moderateScale(10),
    },
    textFieldContainer: {
      flexDirection: "row",
      backgroundColor: COLORS.bg,
      justifyContent: "flex-start",
      alignItems: "center",
      borderColor: COLORS.inputborder,
      borderWidth: 1,
      borderRadius: SIZES.radius / 3,
      paddingHorizontal: moderateScale(10),
      height: moderateScale(50),
      ...FONTS.body4,
    },
    imageIcon: {
      width: 27,
      height: 27,
    },
    shadow: {
      padding: 10,
      backgroundColor:COLORS.white,
      borderColor: COLORS.inner_line,
      // borderWidth: 1,
      borderRadius: 10,
      // shadowColor: COLORS.inner_line,
      // shadowOffset: {
      //   width: 0,
      //   height: 5,
      // },
      // shadowOpacity: 0.7,
      // shadowRadius: 5,
      // elevation: 5,
    },
  });
