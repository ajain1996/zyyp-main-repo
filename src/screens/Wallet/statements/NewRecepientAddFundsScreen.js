import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import CustomInputBoxScreen from '../../../components/CustomInputBoxScreen';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { COLORS } from '../../../utils/colors';
import { windowHeight, windowWidth } from '../../../utils/utils';
import { CompanyWalletTransactionHeader } from '../CompanyWalletTransactionScreen';
import { WithdrawFundsBtn } from '../WithDrawlFundsScreen';

export default function NewRecepientAddFundsScreen({ navigation }) {


    return (
        <>
            <CompanyWalletTransactionHeader
                navigation={navigation}
                text="Make Payment"
            />
            <View style={{ width: '100%', height: "100%", padding: 20, backgroundColor: '#fff' }}>
                {/* <View style={{ alignItems: 'flex-end' }}>
                    <Image
                        source={require("../../../../assets/icons/close.png")}
                        style={{ width: 20, height: 20, tintColor: COLORS.BLACK40 }}
                    />
                </View> */}
                <View style={{ height: 40 }} />
                <View style={{ alignItems: 'center' }}>
                    <CustomTextComponent
                        text={"AMOUNT TO TRANSFER"}
                        fs={12}
                        fw="600"
                        color={"#000"}
                    />
                    <CustomInputBoxScreen
                        callBack={(list) => { }}
                    />
                </View>
                <View style={{ marginTop: -(windowWidth / 2.4), alignItems: 'center' }}>
                    <WithdrawFundsBtn
                        text="MAKE PAYMENT"
                        onPress={() => {
                            // ConfirmTransferScreen
                            navigation.navigate("WalletCompanyPaymentScreen");
                        }}
                    />
                </View>
            </View>
        </>
    )
}
