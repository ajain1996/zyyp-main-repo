import React, {useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import CustomTextComponent from '../../components/CustomTextComponent';
import {COLORS} from '../../utils/colors';
import {CompanyWalletTransactionHeader} from './CompanyWalletTransactionScreen';

export default function AddFundsScreen({navigation}) {
  const [selectedAccount, setSelectedAccount] = useState('');

  return (
    <View>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Add Funds"
      />
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={{padding: 30}}>
          <CustomTextComponent
            text="Wallet Details"
            fs={20}
            color={COLORS.BLACK}
            fw="500"
          />
          <View style={{height: 8}} />
          <CustomTextComponent
            text="Add this account as beneficary in your approved bank account mentioned below"
            fs={12}
            color={COLORS.BLACK40}
            fw="500"
          />
          <View style={{height: 34}} />

          <BuildTextCopyComponent
            title="Account Number"
            info="1234-1231-12313-8273"
          />
          <View style={{height: 30}} />

          <BuildTextCopyComponent
            title="Account holder name"
            info="Zyyp-prabh--owner"
          />
          <View style={{height: 30}} />

          <BuildTextCopyComponent title="Bank Name" info="NBD23898123" />

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(203, 210, 217, 1)',
              marginTop: 40,
              marginBottom: 30,
            }}
          />
          <CustomTextComponent
            text="Approved Accounts"
            fs={20}
            color={COLORS.BLACK}
            fw="500"
          />
          <Text />

          <BuildApprovedAccount
            title="Company Account"
            accountNumber="2384-7202-9830-2"
            holderName="Aryan Jain"
            selectedVal="SDFC"
            selectedAccount={selectedAccount}
            bankName="SDFC Kerela"
            onPress={() => {}}
          />
          <BuildApprovedAccount
            title="Owner Account"
            accountNumber="2384-7202-9830-2"
            holderName="Franklin Richards"
            selectedVal="ICICI"
            selectedAccount={selectedAccount}
            bankName="ICICI Gujarat"
            onPress={() => {}}
          />

          <View style={{paddingHorizontal: 20, marginBottom: 15}}>
            <CustomTextComponent
              text={`NOTE: Your transfer will be processed\nwithin 2 working days`}
              fs={12}
              color={COLORS.BLACK40}
              fw="500"
            />
          </View>
          <Text />
          <Text />
        </View>
      </ScrollView>
    </View>
  );
}

const BuildTextCopyComponent = ({title, info}) => {
  return (
    <View>
      <CustomTextComponent
        text={title}
        fs={14}
        color={COLORS.BLACK40}
        fw="500"
      />

      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomTextComponent
          text={info}
          fs={17}
          color={COLORS.BLACK}
          fw="500"
        />
        <Image
          source={require('../../../assets/icons/copy.png')}
          style={{width: 26, height: 26}}
        />
      </View>
    </View>
  );
};

export const BuildApprovedAccount = ({
  title,
  accountNumber,
  holderName,
  bankName,
  selectedVal,
  selectedAccount,
  onPress,
}) => {
  return (
    <View
      style={{
        borderWidth: 1.4,
        borderRadius: 12,
        marginBottom: 24,
        borderStyle: 'dashed',
        borderColor:
          selectedVal === selectedAccount ? '#7B35E7' : COLORS.BLACK40,
        elevation: selectedVal === selectedAccount ? 25 : 0,
        shadowColor: '#000',
        backgroundColor: '#f7f8fa',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{paddingHorizontal: 16, paddingVertical: 12}}
        onPress={onPress}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomTextComponent
            text={title}
            fs={21}
            fw="700"
            color={selectedVal === selectedAccount ? '#7B35E7' : COLORS.BLACK40}
          />

          {selectedVal === selectedAccount ? (
            <Image
              source={require('../../../assets/icons/check_ring.png')}
              style={{width: 28, height: 28}}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={{height: 8}} />
        <CustomTextComponent
          text={accountNumber}
          fs={17}
          fw="500"
          color={selectedVal === selectedAccount ? '#7B35E7' : COLORS.BLACK40}
        />
        <View style={{height: 8}} />
        <CustomTextComponent
          text={holderName}
          fs={17}
          fw="500"
          color={selectedVal === selectedAccount ? '#7B35E7' : COLORS.BLACK40}
        />
        <View style={{height: 8}} />
        <CustomTextComponent
          text={bankName}
          fs={17}
          fw="500"
          color={selectedVal === selectedAccount ? '#7B35E7' : COLORS.BLACK40}
        />
      </TouchableOpacity>
    </View>
  );
};
