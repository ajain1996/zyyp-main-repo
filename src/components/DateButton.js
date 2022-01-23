/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { COLORS, FONTS } from '../constants';
import { SmallText } from '.';
import { moderateScale, verticalScale } from 'react-native-size-matters';
export default DateButton = ({ placeholderContent, value = '', color = COLORS.pl, onPress, text, type }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
      <SmallText text={placeholderContent} />
      <View style={{ height: 5 }} />
      {type === 1 ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: moderateScale(45),
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: 7,
            backgroundColor: COLORS.bg,
            borderWidth: 1,
            borderColor: COLORS.inputborder,
            borderRadius: 10,
            ...FONTS.body4,
          }}
        >
          <Image
            style={{ width: 25, height: 25, resizeMode: "contain" }}
            source={require("../../assets/icons/Calendar_fill.png")}
          />
          <View style={{ marginLeft: 10, alignSelf: "center" }}>
            <TextInput
              editable={false}
              pointerEvents="none"
              style={{
                paddingLeft: 7,
                // backgroundColor: COLORS.secondary2,
                borderColor: COLORS.inputborder,
                ...FONTS.body4,
                flex: 1,
                width: 300,
                color: COLORS.secondary2
              }}
              defaultValue={value}
              placeholder={text}
              placeholderTextColor={COLORS.pl}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: COLORS.inputborder,
            borderRadius: 10,
          }}>
           <TextInput
              editable={false}
              defaultValue={value}
              pointerEvents="none"
              style={{
                paddingLeft: 7,
                // backgroundColor: COLORS.secondary2,
                borderColor: COLORS.inputborder,
                ...FONTS.body4,
                flex: 1,
                width: 300,
                color: COLORS.black
              }}
              defaultValue={value}
              placeholder={text}
              placeholderTextColor={COLORS.pl}
            />
          <Icon name="chevron-down" size={30} color={COLORS.black} />
        </TouchableOpacity>
      )}
    </View>
  );
};
