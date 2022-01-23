//Sign_up & Login header
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, images, SIZES } from "../../constants";
const AuthHeader = ({ tittle, left_icon, right_icon,title_color=COLORS.secondary2,backPress, headerClick }) => {
  return (
    <View
      style={{
        width: SIZES.width,
        height: 70,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal:SIZES.padding2,
      }}
    >
      <TouchableOpacity style={{height:44,width:44,justifyContent:'center',alignItems:'center'}} onPress={backPress}>
        <Image
          style={{ width: 20, height: 20 }}
          source={left_icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text numberOfLines={2} style={{ ...FONTS.body2, color: title_color }}>{tittle}</Text>
      <TouchableOpacity activeOpacity={0.9} onPress={headerClick}>
        <Image
          source={right_icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AuthHeader;
