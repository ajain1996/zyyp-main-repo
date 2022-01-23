/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
//Common Button component 
import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS, SIZES, images } from '../constants';
import styles from '../styles/button.style';
export default Button = ({ type, color, onPress, children, icon }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles(type, color).button}>
      <View>{children}</View>
      {type === 3 || type == 5 ? (
        <View />
      ) : (
        <Image
          style={{ width: 24, height: 24 }}
          // source={type == 4 ? images.Close : images.Next}
        source={icon}
        />
      )}
    </TouchableOpacity>
  );
};

