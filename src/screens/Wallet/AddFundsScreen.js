import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomTextComponent from '../../components/CustomTextComponent';
import { COLORS } from '../../utils/colors';
import { CompanyWalletTransactionHeader } from './CompanyWalletTransactionScreen';

export default function AddFundsScreen({ navigation }) {
  const [selectedAccount, setSelectedAccount] = useState('');

  const [approvedAccounts, setApprovedAccounts] = useState([
    {
      "account_holder_name": "John Doe",
      "account_id": "b6822247-052d-4bb1-ad49-5e46f7c8fdd0",
      "account_number": 1511593983,
      "account_type": "OWNER",
      "address": {
        "address_line_1": "aliqua sit",
        "address_line_2": "nulla ea aliqua amet dolor",
        "city": "consequat cupidatat ex tempor",
        "country": "dolore nisi",
        "postal_code": "sunt dolor consequat Duis",
        "state": "non laboris",
        "street": "sint cillum"
      },
      "bank_address": {
        "address_line_1": "dolore",
        "address_line_2": "est exercitation deserunt officia",
        "city": "sunt",
        "country": "enim Excepteur",
        "postal_code": "velit Duis enim",
        "state": "elit in officia nisi ullamco",
        "street": "eiusmod voluptate"
      },
      "bank_name": "Bank of Sharjah",
      "email": "bob@example.com",
      "iban": "AE070331234567890123456",
      "mobile": "+551185249635",
      "org_id": 100001,
      "swift_code": "CBAUAEAAXXX",
      "user_id": 200001
    }
  ]);

  return (
    <View>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Add Funds"
      />
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ padding: 30 }}>
          <CustomTextComponent
            text="Wallet Details"
            fs={20}
            color={COLORS.BLACK}
            fw="500"
          />
          <View style={{ height: 8 }} />
          <CustomTextComponent
            text="Add this account as beneficary in your approved bank account mentioned below"
            fs={12}
            color={COLORS.BLACK40}
            fw="500"
          />
          <View style={{ height: 34 }} />

          <BuildTextCopyComponent
            title="Account Number"
            info="1234-1231-12313-8273"
          />
          <View style={{ height: 30 }} />

          <BuildTextCopyComponent
            title="Account holder name"
            info="Zyyp-prabh--owner"
          />
          <View style={{ height: 30 }} />

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

          {
            approvedAccounts.map((accounts, index) => {
              return (
                <BuildApprovedAccount
                  title={accounts.account_type}
                  accountNumber={accounts.account_number}
                  holderName={accounts.account_holder_name}
                  selectedVal="SDFC"
                  selectedAccount={selectedAccount}
                  bankName={accounts.bank_name}
                  onPress={() => { }}
                />
              );
            })
          }

          <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
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

const BuildTextCopyComponent = ({ title, info }) => {
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
          style={{ width: 26, height: 26 }}
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
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        onPress={onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomTextComponent
            text={title}
            fs={21}
            fw="700"
            color={selectedVal === selectedAccount ? '#7B35E7' : COLORS.BLACK40}
          />

          {selectedVal === selectedAccount ? (
            <Image
              source={require('../../../assets/icons/check_ring.png')}
              style={{ width: 28, height: 28 }}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={{ height: 8 }} />
        <CustomTextComponent
          text={accountNumber}
          fs={17}
          fw="500"
          color={selectedVal === selectedAccount ? '#7B35E7' : COLORS.BLACK40}
        />
        <View style={{ height: 8 }} />
        <CustomTextComponent
          text={holderName}
          fs={17}
          fw="500"
          color={selectedVal === selectedAccount ? '#7B35E7' : COLORS.BLACK40}
        />
        <View style={{ height: 8 }} />
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
