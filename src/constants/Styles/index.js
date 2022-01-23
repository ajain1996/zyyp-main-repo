//StyleSheet handling
import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { indigo100 } from "react-native-paper/lib/typescript/styles/colors";

const styles = StyleSheet.create({
  //----- Intro Styles Start ------------//
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  componentView: {
    flex: 1,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width / 1.1,
    paddingHorizontal: SIZES.padding * 2.5,
    alignSelf: "center",
    backgroundColor: "rgba(176, 133, 241, 0.08)",
  },
  headerText: {
    color: COLORS.primary,
    ...FONTS.h2,
    marginVertical: SIZES.padding * 2,
    textTransform: "uppercase",
  },
  skipText: {
    color: COLORS.black,
    ...FONTS.body5,
    zIndex: 1,
  },
  swipecontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
  },
  intro_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
  },
  imageView: {
    flex: 0.55,
    justifyContent: "center",
    width: SIZES.width / 1.1,
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
  },
  text: {
    color: COLORS.black,
    ...FONTS.body3,
    textAlign: "center",
    paddingHorizontal: SIZES.padding,
  },
  tittle_view: {
    flex: 0.45,
    width: SIZES.width,
    justifyContent: "center",
    alignItems: "center",
  },
  //---------Intro Styles End--------//

  //-------Welcome Page Start--------//
  w_container: {
    flex: 1,
    // backgroundColor: 'rgba(52, 60, 68, 0.75)',
  },
  w_componetView: {
    flex: 1,
    alignItems: "center",
    padding: SIZES.padding,
    backgroundColor:COLORS.white
  },
  w_imageView: {
    flex: 1,
    // backgroundColor:COLORS.white

  },
  w_headerText: {
    color: COLORS.primary,
    ...FONTS.h2,
    marginVertical: SIZES.padding2 * 2,
  },
  w_descText: {
    ...FONTS.body4,
    textAlign: "center",
    color: COLORS.secondary2,
  },
  w_textView: {
    ...FONTS.body6,
    color: COLORS.primary,
    // paddingVertical: SIZES.padding2 / 2,
    textTransform: "uppercase",
  },
  w_ReadMoreText: {
    ...FONTS.h6,
    color: COLORS.primary,
  },
  w_footView: {
    // height: moderateScale(SIZES.height / 3),
    alignItems: "center",
    // backgroundColor:'pink',
    paddingBottom: scale(SIZES.base * 6),
    backgroundColor:COLORS.white

  },
  w_loginButton: {
    borderRadius: SIZES.radius / 3,
    // height: 50,

    height: scale(45),
    width: SIZES.width / 1.2,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.base * 6,

  },
  //------- Welcome Styles End --------//

  //------ Signup Styles start -----//
  s_container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  s_inputBox: {
    ...FONTS.body4,
    borderWidth: 1,
    borderColor: COLORS.inputborder,
    backgroundColor: COLORS.bg,
    borderRadius: SIZES.radius / 3,
    paddingHorizontal: SIZES.padding2,
    height: 50,
  },
  s_boxHeader: {
    ...FONTS.t1,
    marginBottom: SIZES.base,
    color: COLORS.secondary2,
  },
  s_descText: {
    ...FONTS.body4,
    color: COLORS.secondary2,
    // paddingVertical: SIZES.padding * 3,
    zIndex:1
    // fontWeight: "400",
  },
  s_hightlightText: {
    ...FONTS.body4,
    color: COLORS.primary,
    zIndex:1
    // fontWeight: "400",
  },
  s_signupBody: {
    flex: 4,
    paddingHorizontal: SIZES.padding * 2,
  },
  s_headerbox: {
    borderBottomColor: COLORS.secondary,
    marginVertical: SIZES.base * 2,
  },
  s_footerView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom:20
  },
  s_emBox: {
    marginLeft: SIZES.base * 2,
    ...FONTS.body4,
    width: "90%",
  },
  s_emChildView: {
    flexDirection: "row",
    marginBottom: SIZES.base * 2,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.inputborder,
  },
  //---Login styles Start ---//
  l_container: {
    flex: 1,
    backgroundColor:COLORS.white
  },
  l_componentView: {
    flex: 1,
    backgroundColor:COLORS.white,
    alignItems: "center",
    // overflow: 'visible',
    // marginVertical:50,
    borderRadius: 4,
    // shadowOffset: { width: 5, height: 0 },
    // shadowColor: '#000',
    // shadowOpacity: 0.9,
    // elevation:18
  },
  l_regheaderText: {
    ...FONTS.body6,
    color: COLORS.secondary,
  },
  l_boxHeader: {
    ...FONTS.t1,
    marginVertical: SIZES.base,
    color: COLORS.secondary2,
    backgroundColor:'pink'

  },
  l_inputBox: {
    ...FONTS.body5,
    borderWidth: 2,
    borderColor: COLORS.inputborder,
    backgroundColor: COLORS.bg,
    borderRadius: SIZES.radius / 3,
    paddingHorizontal: SIZES.padding2,
    height: 50,
  },
  l_descText: {
    ...FONTS.body5,
    color: COLORS.secondary2,
    fontWeight: "400",
    paddingVertical: SIZES.padding * 3,
    // letterSpacing: 0.2,
  },
  l_hightlightText: {
    ...FONTS.body5,
    fontWeight: "400",
    color: COLORS.primary,
    zIndex: 1,
  },

  l_fgText: {
    ...FONTS.body6,
    color: COLORS.primary,
    textTransform: "uppercase",
    textAlign: "right",
    paddingVertical: SIZES.padding,
  },
  l_loginform: {
    flex: 4,
    paddingHorizontal: SIZES.padding * 2,
  },
  //-----Login styles End ---------
  //-----Sucess Page Styles Start----
  sc_container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  sc_componentView: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: SIZES.base,
  },
  sc_bodyView: {
    flex: 0.5,
    alignItems: "center",

    // justifyContent:'center'
  },
  sc_imageView: {
    flex: 1,
  },
  sc_tittle_Text: {
    ...FONTS.body1,
    color: COLORS.primary,
    paddingVertical: SIZES.padding / 2,
  },
  sc_footerview: {
    height: 70,
    alignItems: "center",
    opacity: 0.5,
  },
  sc_sub_tittle: {
    ...FONTS.body2,
    color: COLORS.header,
    paddingVertical: SIZES.padding2 * 2,
  },
  sc_description: {
    ...FONTS.body5,
    color: COLORS.header,
    textAlign: "center",
  },
  sc_ReadMoreText: {
    ...FONTS.h6,
    color: COLORS.primary,
  },
  //----Sucess Page Styles End -----
});

export default styles;
