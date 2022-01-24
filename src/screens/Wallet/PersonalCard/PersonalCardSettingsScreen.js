import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, Image } from 'react-native';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { COLORS } from '../../../utils/colors';
import { windowHeight, windowWidth } from '../../../utils/utils';
import { CompanyWalletTransactionHeader } from '../CompanyWalletTransactionScreen';

export default function PersonalCardSettingsScreen({ navigation }) {

    const [switchValue, setSwitchValue] = useState(false);

    const toggleSwitch = async (val) => {
        setSwitchValue(previousState => !previousState)
    };

    return (
        <View>
            <CompanyWalletTransactionHeader
                navigation={navigation}
                text="Card Settings"
            />

            <ScrollView style={{ backgroundColor: '#fff', height: windowHeight }}>
                <View style={{ paddingHorizontal: 26 }}>
                    <View style={{ height: 30 }} />
                    <CustomTextComponent
                        text="Security" fs={20} color={COLORS.BLACK40} fw="700"
                    />
                    <View style={{ height: 35 }} />

                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CustomTextComponent
                                text="Security Pin" fs={18} color={COLORS.BLACK} fw="500"
                            />

                            <CustomTextComponent
                                text="Reset" fs={16} color={COLORS.PURPLE} fw="500"
                            />
                        </View>
                        <View style={{ height: 30 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: windowWidth / 1.6 }}>
                                <CustomTextComponent
                                    text="Lock Card" fs={19} color={COLORS.BLACK} fw="500"
                                />
                                <CustomTextComponent
                                    text="This will temporarily lock your card and put all transaction for this card on hold."
                                    fs={12} color={COLORS.BLACK40} fw="500"
                                />
                            </View>

                            <Switch
                                trackColor={{ false: COLORS.ORANGE, true: COLORS.WHITE }}
                                thumbColor={"white"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={switchValue}
                                style={{ transform: [{ scaleX: 2.4 }, { scaleY: 2.4 }] }}
                            />
                            <View style={{ position: 'absolute', right: -3 }}>
                                <CustomTextComponent
                                    text="OFF" fs={12} color={COLORS.WHITE} fw="500"
                                />
                            </View>
                        </View>
                        <View style={{ height: 30 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CustomTextComponent
                                text="Block & Replace" fs={18} color={COLORS.BLACK} fw="500"
                            />

                            <Image
                                source={require("../../../../assets/icons/arrow-back.png")}
                                style={{ width: 34, height: 34 }}
                            />
                        </View>
                        <View style={{ height: 30 }} />

                        <View style={{ width: '100%', height: 1, backgroundColor: "#CBD2D9" }} />
                    </View>

                    <View style={{ height: 30 }} />
                    <CustomTextComponent
                        text="Information" fs={20} color={COLORS.BLACK40} fw="700"
                    />
                    <View style={{ height: 35 }} />

                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CustomTextComponent
                                text="Samsung Card" fs={18} color={COLORS.BLACK} fw="500"
                            />

                            <CustomTextComponent
                                text="View Instructions" fs={16} color={COLORS.PURPLE} fw="500"
                            />
                        </View>
                        <View style={{ height: 30 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CustomTextComponent
                                text="Apple Pay" fs={18} color={COLORS.BLACK} fw="500"
                            />

                            <CustomTextComponent
                                text="View Instructions" fs={16} color={COLORS.PURPLE} fw="500"
                            />
                        </View>
                        <View style={{ height: 30 }} />

                        <View style={{ width: '100%', height: 1, backgroundColor: "#CBD2D9" }} />

                    </View>

                </View>
            </ScrollView>
        </View>
    )
}
