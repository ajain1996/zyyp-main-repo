/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { SmallText } from '.';
import { COLORS, FONTS, SIZES } from '../constants';
export default TextField = ({ placeholderContent, maxLength = 100, editable = true, keyboardType = "default", onChangeText, text, placeholder }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: SIZES.radius / 3,
        ...FONTS.body4, 
        marginVertical: 5
      }}>
      <SmallText text={placeholderContent} />
      <View style={{ height: 5 }} />
      <TextInput
        editable={editable}
        style={{
          height: moderateScale(45),
          paddingLeft: 7,
          backgroundColor: COLORS.bg,
          borderRadius: 10,
          borderWidth: 1,
          color: COLORS.secondary2,
          borderColor: COLORS.inputborder,
          ...FONTS.body4,
          width: '100%'
        }}
        maxLength={maxLength}
        keyboardType={keyboardType}
        defaultValue={text}
        value={text}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.pl}
        returnKeyType={Platform.OS === 'ios' ? 'done' : 'done'}
      />
    </View>
  );
};
