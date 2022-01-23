import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    container: {
        marginBottom:10,
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
    }
  });
