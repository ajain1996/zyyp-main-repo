/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
//Common Button component 
import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { ButtonText, SemiBoldText } from '.';
import { COLORS, SIZES, images } from '../constants';
export default CustomDelete = ({ type, text, color, onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: color,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',

      }}>
      <SemiBoldText text={text} />
      <TouchableOpacity
        onPress={onPress}
      >
        <ButtonText text={'DELETE'} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
