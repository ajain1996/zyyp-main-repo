import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import CustomInputSecurityBox from '../../../components/CustomInputSecurityBox';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { COLORS } from '../../../utils/colors';
import { windowWidth } from '../../../utils/utils';
import { WithdrawFundsBtn } from '../WithDrawlFundsScreen';

export default function InputSecurityCodeScreen({ navigation }) {

    return (
        <View style={{ width: '100%', height: "100%", backgroundColor: '#f7f8f9' }}>
            <StatusBar backgroundColor={"#f7f8f9"} barStyle="dark-content" />
            <View style={{ alignItems: 'flex-end', padding: 20, marginTop: 20 }}>
                <Image
                    source={require("../../../../assets/icons/close.png")}
                    style={{ width: 20, height: 20, tintColor: COLORS.BLACK40 }}
                />
            </View>
            <View style={{ height: 20 }} />
            <View style={{ elevation: 20, shadowColor: '#999', backgroundColor: '#fff', paddingVertical: 30, borderRadius: 50 }}>
                <View style={{ alignItems: 'center' }}>
                    <CustomTextComponent
                        text={"Input Security Code"}
                        fs={24}
                        fw="400"
                        color={"#999"}
                    />
                    <View style={{ height: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
                        <CustomTextComponent
                            text={"Enter the 4-digit code Zyyp just to \nprh***@**yp.io"}
                            fs={12}
                            fw="400"
                            color={COLORS.BLACK}
                        />
                        <CustomTextComponent
                            text={"00:25"}
                            fs={12}
                            ff="Montserrat-Regular"
                            color={COLORS.ORANGE}
                        />
                    </View>
                    <CustomInputSecurityBox
                        callBack={(list) => { }}
                    />
                </View>
                <View style={{ marginTop: -(windowWidth / 2.1), alignItems: 'center', }}>
                    <WithdrawFundsBtn
                        text="WITHDRAW TO THIS ACCOUNT"
                        onPress={() => {
                            // ConfirmTransferScreen
                            navigation.navigate("StatementInputCodeScreen");
                        }}
                    />
                </View>
            </View>
        </View>
    )
}
