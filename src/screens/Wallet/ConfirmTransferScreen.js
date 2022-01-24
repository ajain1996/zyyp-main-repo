import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomTextComponent from '../../components/CustomTextComponent';
import {COLORS} from '../../utils/colors';
import {windowHeight, windowWidth} from '../../utils/utils';
import {CompanyWalletTransactionHeader} from './CompanyWalletTransactionScreen';

export default function ConfirmTransferScreen({navigation}) {
  return (
    <View>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Confirm Transfer"
      />
      <ScrollView
        contentContainerStyle={{height: windowHeight, backgroundColor: '#fff'}}>
        <View style={{alignItems: 'center', marginTop: 60}}>
          <View style={styles.transferMainContainer}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.transferImage}>
                <Image
                  source={require('../../../assets/svg/transfer.png')}
                  style={{width: 26, height: 36, tintColor: '#fff'}}
                />
              </View>
              <View style={{height: 30}} />

              <CustomTextComponent
                text="37,000.00"
                fs={23}
                color={COLORS.BLACK}
                ff="Montserrat-Regular"
              />
              <CustomTextComponent
                text="Company Wallet"
                fs={18}
                color={COLORS.BLACK40}
              />
            </View>
          </View>
          <View
            style={[
              styles.transferMainContainer,
              {marginTop: -2, alignItems: 'stretch'},
            ]}>
            <View
              style={{
                marginTop: -20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomTextComponent
                text="....."
                fs={28}
                color={COLORS.BLACK20}
                fw="700"
                mt={-14}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomTextComponent
                  text="1500.00"
                  fs={28}
                  color={COLORS.BLACK}
                  ff="Montserrat-Regular"
                />
                <Image
                  source={require('../../../assets/icons/downarrow.png')}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: '#00C2CB',
                    marginLeft: 12,
                  }}
                />
              </View>
              <CustomTextComponent
                text="....."
                fs={28}
                color={COLORS.BLACK20}
                fw="700"
                mt={-14}
              />
            </View>
            <View style={{height: 60}} />

            <View style={{alignItems: 'center'}}>
              <CustomTextComponent
                text="321.00"
                fs={23}
                color={COLORS.BLACK}
                ff="Montserrat-Regular"
              />
              <CustomTextComponent
                text="Personal Wallet"
                fs={18}
                color={COLORS.BLACK40}
              />
            </View>
          </View>
        </View>
        <View style={{height: windowHeight / 4.5}} />

        <SwipeToAddBtn
          text="SWIPE TO ADD"
          onPress={() => navigation.navigate('InputSecurityCodeScreen')}
        />
      </ScrollView>
    </View>
  );
}

export const SwipeToAddBtn = ({text, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width: windowWidth - 40,
        paddingVertical: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#7B35E7',
        marginHorizontal: 20,
        borderRadius: 10,
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: 56,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#fff',
          }}>
          <Image
            source={require('../../../assets/icons/right-arrow.png')}
            style={{width: 18, height: 18, tintColor: '#7B35E7'}}
          />
        </View>
        <CustomTextComponent text={text} fs={18} color={'#fff'} fw="700" />
        <CustomTextComponent text={'t'} fs={17} color={'#7B35E7'} fw="700" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  transferMainContainer: {
    width: windowWidth - 60,
    paddingHorizontal: 30,
    elevation: 10,
    shadowColor: '#999',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingBottom: 80,
    alignItems: 'center',
  },
  transferImage: {
    width: 70,
    height: 70,
    backgroundColor: '#7B35E7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: -30,
  },
});
