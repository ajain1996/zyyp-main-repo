import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
      flexDirection: "row",
    },
    imageIcon: {
      width: 27,
      height: 27,
    },
    timelineContainer: {
      backgroundColor: COLORS.white,
      marginHorizontal: 10,
      padding: 10,
      paddingBottom:20,
      flex: 1,
      borderRadius: 7,
      zIndex:1,
      shadowColor: COLORS.pl,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.7,
      shadowRadius: 5,
      elevation: 5,
    },
  });
