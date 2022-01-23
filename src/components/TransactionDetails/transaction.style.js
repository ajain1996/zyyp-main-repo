import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    container: {
      marginBottom: moderateScale(10),
      marginHorizontal: moderateScale(10),
      backgroundColor: COLORS.white,
      padding: moderateScale(10),
      borderRadius: moderateScale(8),
      borderWidth:1
    },
    excessAmount: {
      backgroundColor: COLORS.white,
      padding: moderateScale(10),
      borderRadius: 4,
      shadowColor: COLORS.pl,
      borderWidth:1,
      borderColor: "#F3F3F3",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.7,
      shadowRadius: 5,
      elevation: 5,
      
    },
  });
