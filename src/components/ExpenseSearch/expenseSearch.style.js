import { Platform, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent"
    },
    headerStyle: {
      height: Platform.OS === "android" ? 60 : 90,
      backgroundColor: COLORS.white,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingBottom: moderateScale(8),
      paddingHorizontal: moderateScale(10),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.inner_line,
    },
    padding: {
      width: moderateScale(7),
    },
    body: {
      flex: 1,
      backgroundColor: COLORS.white
    },
    searchContainer: {
      height: 50,
      flexDirection: "row",
      margin: moderateScale(20),
      paddingHorizontal: moderateScale(10),
      borderColor: COLORS.inner_line,
      borderWidth: 1,
      borderRadius: SIZES.radius / 3,
      alignItems: "center",
      justifyContent: "space-between"
    },
    imageIcon: {
      width: 27, height: 27
    },
    searchIcon:{
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row"
    },
    itemContainer: {
      height: moderateScale(60),
      flexDirection: "row",
      borderColor: COLORS.inner_line,
      borderWidth: 1,
      borderRadius: SIZES.radius / 3,
      marginHorizontal: moderateScale(20),
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: moderateScale(10),
      marginBottom: moderateScale(10)
    }

  });
