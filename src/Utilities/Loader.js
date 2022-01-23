/* eslint-disable no-unused-vars */
//Common Loader For The App
import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';
// import {colors} from '../Styles/Colors';
const Loader = props => {
  const { loading, ...attributes } = props;
  return (
    <Modal visible={loading} transparent={true} animationType={'none'}>
      <View style={styles.modalBackground}>
        <ActivityIndicator
          size="large"
          animating={loading}
          color={COLORS.primary}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems:'center',
    justifyContent: 'center'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default Loader;
