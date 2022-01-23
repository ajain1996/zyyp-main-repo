import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    container: {
        marginBottom:10,
        paddingHorizontal: moderateScale(10),
        paddingBottom: moderateScale(20),
        paddingTop: moderateScale(10),
        borderColor: COLORS.inputborder,
        borderWidth: 1,
        borderRadius: SIZES.radius / 3,
    },
    paymentTextStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 20,
    },
    textFieldContainer:{
        flexDirection: "row",
        backgroundColor: COLORS.bg,
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: COLORS.inputborder,
        borderWidth: 1,
        borderRadius: SIZES.radius / 3,
        paddingHorizontal: moderateScale(10),
        height:moderateScale(50),
        ...FONTS.body4,
    },
    padding: {
      height:8
    },
    itemContainer: {
      height: moderateScale(70),
      flexDirection: "row",
      backgroundColor: COLORS.white,
      marginBottom: moderateScale(10),
      borderRadius: 4,
      shadowColor: COLORS.pl,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.7,
      shadowRadius: 5,
      elevation: 5,
      borderWidth: 1,
      alignItems: "center",
      paddingHorizontal: moderateScale(10)
    },
  });
