import { StyleSheet,Dimensions, Platform } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";
const {width} = Dimensions.get("window")
export default styles = (type, color) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    header: {
      height: Platform.OS === "android" ? 60 : 80,
      backgroundColor: COLORS.white,
      flexDirection: "row",
      alignItems:"center",
      justifyContent: "space-between",
      paddingHorizontal: moderateScale(15),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.inner_line,
    
    },
    padding: {
      height: 7,
    },
    body: {
      flex: 1,
      backgroundColor: COLORS.transactionBG,
    },
    topContainer: {
      height: 200,
      backgroundColor: COLORS.white,
      flexDirection: "row",
      borderBottomLeftRadius: moderateScale(32),
      borderBottomRightRadius: moderateScale(32),
      shadowColor: COLORS.pl,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.7,
      shadowRadius: 5,
      elevation: 5,
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
    actionSheet: {
      ...FONTS.h4,
      textAlign: "center",
      backgroundColor: COLORS.white,
      paddingVertical: SIZES.padding2 * 1.5,
      color: COLORS.error,
    },
    actionSheet1: {
      ...FONTS.body3,
      textAlign: "center",
      backgroundColor: COLORS.white,
      paddingVertical: SIZES.padding2 * 1.5,
      color: COLORS.blue,
    },
    expandStyle: {
      fontFamily: "Poppins-Regular",
      fontSize: moderateScale(15),
      fontWeight: "bold",
      lineHeight: 20,
      color:COLORS.primary
    },
    btnStyle: {
      flexDirection: "row",
      backgroundColor: color,
      height: moderateScale(45),
      alignItems: "center",
      borderRadius: SIZES.radius / 3,
      borderColor: COLORS.primary,
      width: width/ 2.2,
      justifyContent:  "space-between",
      paddingHorizontal: SIZES.padding2 * 2,
      borderColor: COLORS.primary,
      borderWidth:1,
    }
  });
