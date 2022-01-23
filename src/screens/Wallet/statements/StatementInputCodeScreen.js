import React from 'react';
import { View } from 'react-native';
import CustomInputBoxScreen from '../../../components/CustomInputBoxScreen';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { windowWidth } from '../../../utils/utils';
import { CompanyWalletTransactionHeader } from '../CompanyWalletTransactionScreen';
import { WithdrawFundsBtn } from '../WithDrawlFundsScreen';

export default function StatementInputCodeScreen({ navigation }) {

    return (
        <>
            <CompanyWalletTransactionHeader
                navigation={navigation}
                text="Add Funds"
            />
            <View style={{ width: '100%', height: "100%", padding: 20, backgroundColor: '#fff' }}>
                {/* <View style={{ alignItems: 'flex-end' }}>
                    <Image
                        source={require("../../../assets/icons/close.png")}
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
                        text="WITHDRAW TO THIS ACCOUNT"
                        onPress={() => {
                            // ConfirmTransferScreen
                            navigation.navigate("InputSecurityCodeScreen");
                        }}
                    />
                </View>
            </View>
        </>
    )
}
