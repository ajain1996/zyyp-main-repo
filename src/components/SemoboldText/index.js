//Sign_Up ,Login, Password creation component
import React from "react";
import { Text, StyleSheet, Platform, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { FONTS, COLORS, SIZES } from "../../constants";

export const SemiBoldText = ({ text, color = COLORS.secondary }) => {
  return <Text style={[styles.textView, { color: color }]}>{text}</Text>;
};

export const SmallText = ({ text, color = color ? color : COLORS.secondary2 }) => {
  return <Text numberOfLines={line=1} style={[styles.boxHeader, { color: color }]}>{text}</Text>;
};
export const ButtonText = ({ text, color, onPress }) => {
  return (
    <Text onPress={onPress} style={[styles.btnText, { color: color }]}>
      {text}
    </Text>
  );
};
export const HeaderText = ({ text }) => {
  return <Text style={styles.headerText}>{text}</Text>;
};
export const HeaderTitleText = ({ text }) => {
  return <Text style={styles.headerTittle}>{text}</Text>;
};
export const OnboardingNumberText = ({ text, color = COLORS.black }) => {
  return <Text style={[styles.numberText, { color: color }]}>{text}</Text>;
};
export const OnboardingTitleText = ({ text, color = COLORS.black }) => {
  return <Text style={[styles.titleText, { color: color }]}>{text}</Text>;
};
export const OnboardingTitleDescText = ({ text, color = COLORS.black }) => {
  return <Text style={[styles.titleDesc, { color: color }]}>{text}</Text>;
};
export const OnboardingSemiboldText = ({ text, color = COLORS.secondary }) => {
  return <Text style={[styles.d2, { color: color }]}>{text}</Text>;
};

export const OnboardingCheckinTitleText = ({ text, color }) => {
  return <Text style={[styles.d3, { color: color }]}>{text}</Text>;
};
export const OnboardingCheckinDescText = ({
  text,
  color = COLORS.lightGray,
}) => {
  return <Text style={[styles.d6, { color: color }]}>{text}</Text>;
};

export const OnboardingEmailText = ({ text, color = COLORS.white }) => {
  return <Text style={[styles.d5, { color: color }]}>{text}</Text>;
};
export const PlaceHolderText = ({ text, color = COLORS.pl }) => {
  return <Text style={[styles.placeholderText, { color: color }]}>{text}</Text>;
};

export const TagText = ({ text, color = COLORS.pl }) => {
  return <Text style={[styles.tagText, { color: color }]}>{text}</Text>;
};

export const DescText = ({ text, color = COLORS.pl }) => {
  return <Text style={[styles.desc, { color: color }]}>{text}</Text>;
};

export const TransactionTitle = ({ text, color = COLORS.black }) => {
  return <Text style={[styles.transTitle, { color: color }]}>{text}</Text>;
};

export const TransactionDesc = ({ text, color = COLORS.header }) => {
  return <Text style={[styles.transDesc, { color: color }]}>{text}</Text>;
};

export const ExpenseDetailsTitle = ({ text, color = COLORS.secondary2 }) => {
  return <Text style={[styles.expenseTitle, { color: color }]}>{text}</Text>;
};
export const ExpenseDetailsAmount = ({
  amountType,
  amount,
  color = COLORS.header,
}) => {
  return (
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <Text style={[styles.expenseAmountType, { color: color }]}>
      {amountType}
    </Text>
    <Text style={[styles.expenseAmount, { color: color }]}> {amount}</Text>
    </View>
  );
};

export const ExpenseDetailsStatus = ({ text, color = "#6E6893" }) => {
  return (
    <Text style={[styles.expenseDetailsStatus, { color: color }]}>{text}</Text>
  );
};

export const ExpenseDetailsTag = ({ text, color = COLORS.header }) => {
  return <Text style={[styles.expenseTag, { color: color }]}>{text}</Text>;
};

export const TimelineWeek = ({ text, color = COLORS.lightGray }) => {
  return <Text style={[styles.timelineWeek, { color: color }]}>{text}</Text>;
};

export const TimelineName = ({ text, color = COLORS.secondary }) => {
  return <Text style={[styles.timelineName, { color: color }]}>{text}</Text>;
};
export const TimelineAction = ({ text }) => {
  return (
    <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
      <Text style={styles.timelineName}>
        Action: 
      </Text>
      <Text style={styles.timelineAction}> {text}</Text>
    </View>
  );
};
export const TimelineDate = ({ text, color = COLORS.secondary }) => {
  return <Text style={[styles.timelineDate, { color: color }]}>{text}</Text>;
};

export const TimeLineDateNm = ({ text, color = COLORS.secondary }) => {
  return <Text style={[styles.timelineDateNm, { color: color }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  textView: {
    ...FONTS.body6,
    color: COLORS.secondary,
  },
  boxHeader: {
    ...FONTS.t1,
    marginVertical: SIZES.base,
    color: COLORS.secondary2,
  },
  btnText: {
    ...FONTS.body6,
    color: COLORS.white,
    textTransform: "uppercase",
    zIndex: 1,
  },
  headerText: {
    ...FONTS.t3,
    color: COLORS.swiper_h1,
  },
  headerTittle: {
    ...FONTS.h2,
    color: COLORS.header,
  },
  numberText: {
    ...FONTS.n1,
    fontWeight: "bold",
    color: COLORS.black,
  },
  titleText: {
    ...FONTS.title,
    fontWeight: Platform.OS == "ios" ? "600" : "bold",
    color: COLORS.secondary2,
  },
  titleDesc: {
    ...FONTS.d1,
    fontWeight: "700",
    color: COLORS.lightGray,
  },
  d2: {
    ...FONTS.d2,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  d3: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  d4: {
    ...FONTS.d4,
    color: COLORS.secondary,
  },
  d5: {
    ...FONTS.d5,
    fontWeight: "400",
    color: COLORS.white,
  },
  d6: {
    ...FONTS.d6,
    color: COLORS.pl,
  },
  placeholderText: {
    ...FONTS.body4,
    color: COLORS.pl,
  },
  tagText: {
    ...FONTS.t1,
    fontWeight: "600",
  },
  desc: {
    ...FONTS.d7,
    color: COLORS.pl,
    fontWeight: "400",
  },
  transTitle: {
    ...FONTS.d8,
    fontWeight: "600",
    color: COLORS.black,
  },
  transDesc: {
    ...FONTS.d9,
    color: COLORS.header,
    fontWeight: "400",
  },
  expenseTitle: {
    ...FONTS.d10,
    fontWeight: "bold",
    color: COLORS.secondary2,
    fontSize:18
  },
  expenseAmountType: {
    color: COLORS.secondary2,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(14, 0.1),
  },
  expenseAmount: {
    color: COLORS.secondary2,
    fontWeight: "bold",
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(28, 0.1),
    lineHeight:30
  },
  expenseDetailsStatus: {
    color: "#6E6893",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(9, 0.2),
  },
  expenseTag: {
    color: "#6E6893",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(11, 0.2),
    lineHeight: 16,
  },
  timelineWeek: {
    color: COLORS.lightGray,
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(12, 0.2),
    lineHeight: 18,
  },
  timelineName: {
    color: COLORS.secondary,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(11, 0.2),
    lineHeight: moderateScale(13, 0.2),
  },
  timelineDate: {
    color: COLORS.secondary,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(10, 0.2),
    lineHeight: moderateScale(12, 0.2),
  },
  timelineAction: {
    color: COLORS.secondary2,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(13, 0.2),
  },
  timelineDateNm: {
    color: COLORS.secondary2,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(13, 0.2),
  },
});
const TextView = {
  SemiBoldText,
  SmallText,
  ButtonText,
  HeaderText,
  HeaderTitleText,
  PlaceHolderText,
  DescText,
  TimelineAction,
};

export default TextView;
