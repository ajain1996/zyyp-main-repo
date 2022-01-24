import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import CustomTextComponent from '../../../components/CustomTextComponent';
import CustomInputSecurity from '../../../components/CustomInputSecurity';
import {COLORS} from '../../../utils/colors';
import {windowHeight, windowWidth} from '../../../utils/utils';

export default function InputSecurityCodeScreen({navigation}) {
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#f7f8f9'}}>
      <StatusBar backgroundColor={'#f7f8f9'} barStyle="dark-content" />
      <View style={{alignItems: 'flex-end', padding: 20, marginTop: 20}}>
        <Image
          source={require('../../../../assets/icons/close.png')}
          style={{width: 20, height: 20, tintColor: COLORS.BLACK40}}
        />
      </View>
      <View style={{height: 20}} />
      <View
        style={{
          elevation: 20,
          shadowColor: '#999',
          backgroundColor: '#fff',
          paddingVertical: 15,
          borderRadius: 50,
        }}>
        <View style={{alignItems: 'center'}}>
        <View
            style={{
              width: 34,
              height: 3.6,
              backgroundColor: '#9FA2AB',
              marginVertical: 0.6,
              marginBottom: 14,
              borderRadius: 50,
            }}
          />
          <CustomTextComponent
            text={'Input Security Code'}
            fs={24}
            fw="400"
            color={'#999'}
          />
          <View style={{height: 20}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
              alignItems: 'center',
            }}>
            <CustomTextComponent
              text={'Enter the 4-digit code Zyyp just to \nprh***@**yp.io'}
              fs={12}
              fw="400"
              color={COLORS.BLACK}
            />
            <CustomTextComponent
              text={'00:25'}
              fs={12}
              ff="Montserrat-Regular"
              color={COLORS.ORANGE}
            />
          </View>
          <CustomInputSecurity callBack={list => {}} />
        </View>
        <View style={{marginTop: -(windowWidth / 1.9), alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              width: windowWidth - 40,
              paddingVertical: 14,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#9FA2AB',
              marginHorizontal: 20,
              borderRadius: 8,
              elevation: 15,
            }}
            onPress={() => navigation.navigate('StatementInputCodeScreen')}>
            <View
              style={{
                // flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
                width: '90%',
              }}>
              <CustomTextComponent
                text={'CONFIRM SECURITY CODE'}
                fs={15}
                color={'lightgrey'}
                fw="700"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
