import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomTextComponent from '../../components/CustomTextComponent';
import { COLORS } from '../../utils/colors';
import { windowHeight, windowWidth } from '../../utils/utils';
import { BuildApprovedAccount } from './AddFundsScreen';
import { CompanyWalletTransactionHeader } from './CompanyWalletTransactionScreen';

export default function WithDrawlFundsScreen({ navigation }) {

    const [selectedAccount, setSelectedAccount] = useState("");

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <CompanyWalletTransactionHeader
                navigation={navigation}
                text="Withdraw Funds"
            />
            <ScrollView contentContainerStyle={{
                backgroundColor: '#fff', height: windowHeight / 1.14, justifyContent: 'space-between'
            }}>
                <View style={{ padding: 30, backgroundColor: 'white' }}>
                    <CustomTextComponent
                        text={"Select One Approved Account"} fs={20} color={"#000"}
                    />
                    <View style={{ height: 20 }} />
                    {/* 7B35E7 */}

                    <BuildApprovedAccount
                        title="Company Account"
                        accountNumber="2384-7202-9830-2"
                        holderName="Aryan Jain"
                        selectedVal="SDFC"
                        selectedAccount={selectedAccount}
                        bankName="SDFC Kerela"
                        onPress={() => { setSelectedAccount("SDFC") }}
                    />
                    <BuildApprovedAccount
                        title="Owner Account"
                        accountNumber="2384-7202-9830-2"
                        holderName="Franklin Richards"
                        selectedVal="ICICI"
                        selectedAccount={selectedAccount}
                        bankName="ICICI Gujarat"
                        onPress={() => { setSelectedAccount("ICICI") }}
                    />
                    <View style={{ paddingHorizontal: 10 }}>
                        <CustomTextComponent
                            text={`NOTE: Your transfer will be processed\nwithin 2 working days`}
                            fs={12.5} color={COLORS.BLACK40} fw="500"
                        />
                    </View>
                </View>

                <View style={{ justifyContent: 'flex-end', marginBottom: 20 }}>
                    <WithdrawFundsBtn
                        text="WITHDRAW TO THIS ACCOUNT"
                        onPress={() => {
                            // ConfirmTransferScreen
                            navigation.navigate("StatementInputCodeScreen");
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}


export const WithdrawFundsBtn = ({ text, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.9} style={{
            width: windowWidth - 40, paddingVertical: 14, justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#7B35E7', marginHorizontal: 20, borderRadius: 8, elevation: 15
        }} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                <CustomTextComponent
                    text={text}
                    fs={17} color={"#fff"} fw="700"
                />
                <View style={{
                    width: 24, height: 24, justifyContent: 'center', alignItems: 'center',
                    borderRadius: 100, backgroundColor: '#B085F1', marginLeft: 40
                }}>
                    <Image
                        source={require("../../../assets/icons/check.png")}
                        style={{ width: 13, height: 13, tintColor: '#fff' }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
