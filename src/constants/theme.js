//--- Font Family , Color codes
import { PixelRatio, Dimensions } from "react-native";
import { scale, ms, moderateScale } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");
const pixelRatio = PixelRatio.get(); //Ratio for getting density of mobile devices

//Responsive Layout Calculations
const adjust = (size) => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (width < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (height < 667) {
      return size;
      // iphone 6-6s
    }
    if (height >= 667 && height <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (width <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (height < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (height >= 667 && height <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.2;
  }
  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (width <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (height < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (height >= 667 && height <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.15;
  }
  return size;
};

const colors = {
  purple: "#7B35E7",
  lightgray: "#85949F",
  darkgray: "#AABBC6",
  orange: "#FF914D",
  lightpurple: "#CAAEF5",
  naturalwhite: "#F6F8FC",
  dark: "#343C44",
  Athens_Gray: "rgba(247, 248, 250, 1)",
  Athens_gray1: "#F1F2F4",
  Santas_Gray: "#9FA2AB",
  Baltic_Sea: "#1D1B23",
  Oxford_Blue: "#323F4B",
  Flush_Mahogany: "#D14343",
  Denim: "#1251D4",
  Black: "#000000",
  // White: '#FFFFFF',
  White: "rgba(255,255,255,1)",
  Red: "#FF0000",
  Portage: "rgba(176, 133, 241, 0.08)",
  Portage1: "rgba(176, 133, 241, 0.1)",
  Athens_Gray2: "#CBD2D9",
  light_white: "#FBFBFB",
  Athens_gray3: "#7B8794",
  white_border: "#F4F0FD",
  modalBG: "#F5F7FA",
  transactionDt: "#F7F5FA",
  Whisper: "#F7F5FA",
};

export const COLORS = {
  // App theme colors
  progressLightColor: "#F4F0FD",
  bc: "#EAF2F5",
  primary: colors.purple, //Button color
  background: colors.light_white,
  second: colors.orange, //Orange color & Otp page color
  secondary: colors.lightgray, // light gray &  semi Text color
  primary1: colors.lightpurple, //light Purple
  secondary1: colors.naturalwhite, //Light white & Layout bg color
  secondary2: colors.dark, //Dark black & Text color
  modalBG: colors.modalBG,
  transactionBG: colors.transactionDt,
  //Input field color
  bg: colors.Athens_Gray, //Text input field fill background color
  pl: colors.darkgray, //Dark gray color & Placeholder text
  inputborder: colors.Athens_gray1, //border color of text input box
  center_border: colors.white_border,

  mdt: colors.Santas_Gray, //Modal descrition text color
  mdtitle: colors.Baltic_Sea, //Modal tittle text color
  header: colors.Oxford_Blue, //Neutral / Grey
  //Gradient colors
  g1: colors.Portage,
  g2: colors.Portage1,
  swiper_h1: colors.Athens_gray3,
  selectedBG: "#FFEFE5",
  selectionText: "#FF914D",

  //Password Strength Meter colors
  strong: "#00C2CB",
  normal: "#97E3B3",

  // base colors
  lightGray: "#7B8794",
  black: colors.Black, // Black
  white: colors.White, // White & Baground color
  error: colors.Red,
  //Alert Box colors
  error1: colors.Flush_Mahogany, //light red color
  blue: colors.Denim, // light blue color
  inner_line: colors.Athens_Gray2,
  //Expense Module
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  //Vector Icons size
  icon: 35,
  icon1: 22,
  icon_Color: "#273B4A",

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 15,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 24,

  t1: 11,
  t2: 14,
  e1: 8,
  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(SIZES.largeTitle),
    lineHeight: 55,
  },
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(SIZES.h1),
    lineHeight: 36,
  },
  h2: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(SIZES.h2),
    lineHeight: 30,
  },
  h3: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(SIZES.h3),
    lineHeight: 22,
  },
  h4: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(SIZES.h4),
    lineHeight: 22,
  },
  h5: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(SIZES.h5),
    lineHeight: 16,
  },
  h6: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(SIZES.body5),
    lineHeight: 22,
  },
  otp: {
    fontFamily: "Montserrat-Medium",
    fontSize: moderateScale(26),
    lineHeight: 30,
  },
  share: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(SIZES.h2),
    lineHeight: 30,
  },
  body1: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(SIZES.body1),
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(SIZES.body2),
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(SIZES.body3),
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(SIZES.body4),
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(SIZES.body5),
    lineHeight: 22,
  },
  body6: {
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(SIZES.h5),
    lineHeight: 22,
  },
  t1: {
    lineHeight: 13,
    fontSize: moderateScale(SIZES.t1),
    fontFamily: "Poppins-Regular",
  },
  t2: {
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(SIZES.t2),
    lineHeight: 22,
  },
  t3: {
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(9),
    lineHeight: 22,
  },
  n1: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(SIZES.t2),
    lineHeight: 18,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(SIZES.body6),
    lineHeight: 29,
  },
  d1: {
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(SIZES.body5),
    lineHeight: 18,
  },
  d2: {
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(SIZES.body3, 0.2),
    lineHeight: 21,
  },
  d3: {
    fontSize: moderateScale(SIZES.body3),
    fontFamily: "Poppins-Bold",
    lineHeight: 21,
  },
  d4: {
    fontSize: moderateScale(SIZES.t1, 0.2),
    fontFamily: "Montserrat-Medium",
    lineHeight: 16,
  },
  d5: {
    fontSize: moderateScale(16, 0.2),
    fontFamily: "Poppins-Regular",
    lineHeight: 21,
  },
  d6: {
    fontSize: moderateScale(SIZES.body4),
    fontFamily: "Montserrat-Medium",
    lineHeight: 16,
  },
  d7: {
    fontSize: moderateScale(14, 0.1),
    fontFamily: "Poppins-Regular",
    lineHeight: 19,
  },
  d8: {
    fontSize: moderateScale(34, 0.1),
    fontFamily: "Poppins-Regular",
  },
  d9: {
    fontSize: moderateScale(17, 0.1),
    fontFamily: "Poppins-Regular",
  },
  d10: {
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(17, 0.1),
  },

  e1: {
    fontSize: moderateScale(SIZES.e1),
    fontFamily: "Poppins-Regular",
  },
};

const urlKey = {
  onboarding: "onboarding",
  identity: "identity",
};
var url = `http://13.92.23.100:3000/onboarding/api/v1/org`;
const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
