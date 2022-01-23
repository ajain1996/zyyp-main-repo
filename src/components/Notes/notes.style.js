import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    notesTextFieldContainer: {
      paddingHorizontal: moderateScale(8),
      height: moderateScale(90),
      backgroundColor: 'rgba(245, 247, 250, 0.1)',
      borderColor: COLORS.secondary,
      borderWidth: 0.5,
      borderRadius: SIZES.radius / 3,
      flexDirection: "column",
    
    },
    textField: {
      ...FONTS.body4,
      flex: 1,
      margin:SIZES.padding

    },
  });
