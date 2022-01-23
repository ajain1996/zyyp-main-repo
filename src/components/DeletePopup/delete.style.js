import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS, SIZES } from "../../constants";

export default styles = (type, color) =>
  StyleSheet.create({
    container: {
        backgroundColor:"#323F4B",
        // opacity:0.75,
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "rgba(0,0,0,0.5)"
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
