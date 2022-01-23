/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import {View, Dimensions} from 'react-native';
import {COLORS, SIZES} from '../constants';
const {width} = Dimensions.get('window');
export default Footer = ({children}) => {
  return (
    <View
      style={{
        // marginHorizontal: 5,
        marginVertical: 5,
        width: width,
        height: 150,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.padding,
        paddingBottom:30
      }}>
      {children}
    </View>
  );
};
