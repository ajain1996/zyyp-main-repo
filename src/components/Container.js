/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {COLORS} from '../constants';

export default Container = ({children}) => {
  return (
    <SafeAreaView
      mode={'padding'}
      edges={['bottom']}
      style={{backgroundColor: COLORS.white, flex: 1}}>
      {children}
    </SafeAreaView>
  );
};
