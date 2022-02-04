import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { CompanyWalletTransactionHeader } from '../Wallet/CompanyWalletTransactionScreen';
import CustomTextComponent from '../../components/CustomTextComponent';
import { windowWidth } from '../../utils/utils';
import { COLORS } from '../../utils/colors';

export default function DashboardNotification({ navigation }) {

    const [selectedTab, setSelectedTab] = useState("Tab 1");

    return (
        <View>
            <CompanyWalletTransactionHeader
                navigation={navigation}
                text="Confirm Transfer"
            />

            <ScrollView contentContainerStyle={{ width: '100%', backgroundColor: '#fff' }}>
                <Text />
                <NotificationComponent setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}


const NotificationComponent = ({ setSelectedTab, selectedTab }) => {
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'column', elevation: 10, shadowColor: '#999', backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center' }}>
                    <BuildTabComponent
                        images={require('../../../assets/icons/Expense2x.png')}
                        selectedVal={selectedTab}
                        onPress={() => { setSelectedTab("Tab 1") }}
                        text="Tab 1"
                    />

                    <BuildTabComponent
                        images={require('../../../assets/icons/Frame1x.png')}
                        selectedVal={selectedTab}
                        onPress={() => { setSelectedTab("Tab 2") }}
                        text="Tab 2"
                    />

                    <BuildTabComponent
                        images={require('../../../assets/icons/Reports1x.png')}
                        selectedVal={selectedTab}
                        onPress={() => { setSelectedTab("Tab 3") }}
                        text="Tab 3"
                    />

                    <BuildTabComponent
                        images={require('../../../assets/icons/Reports1x.png')}
                        selectedVal={selectedTab}
                        onPress={() => { setSelectedTab("Tab 4") }}
                        text="Tab 4"
                    />
                </View>
                <ScrollView style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 10 }}>
                    {selectedTab === 'Tab 1'
                        ? <View style={{ backgroundColor: '#fff' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <CustomTextComponent fs={18} text="Expense" fw="700" color={COLORS.BLACK} />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require("../../../assets/icons/double-tick.png")}
                                        style={{ width: 20, height: 20, tintColor: COLORS.PURPLE, marginRight: 4 }}
                                    />
                                    <CustomTextComponent fs={16} text="Mark as read" fw="500" color={COLORS.PURPLE} />
                                </View>
                            </View>
                            <View style={{ height: 8 }} />
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => {
                                    return (
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }} key={index}>
                                            <View style={{ marginTop: 6, marginRight: 8 }}>
                                                <View style={{ width: 8, height: 8, backgroundColor: COLORS.ORANGE, borderRadius: 100 }} />
                                            </View>
                                            <View style={{ borderBottomWidth: 1, borderColor: '#eee' }}>
                                                <CustomTextComponent
                                                    fs={13} color={COLORS.BLACK}
                                                    text="An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review"
                                                />
                                                <CustomTextComponent fs={11} text="Dec 23,2021 at 09:15 pm" color={"#999"} />
                                                <View style={{ height: 3 }} />
                                            </View>
                                        </View>
                                    );
                                })
                            }

                            <View style={{ marginVertical: 10 }}>
                                <CustomTextComponent
                                    fs={13} color={COLORS.BLACK}
                                    text="An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review"
                                />
                                <CustomTextComponent
                                    fs={13} color={COLORS.BLACK}
                                    text="Dec 23,2021 at 09:15 pm"
                                />
                            </View>
                        </View> : <></>}

                    {selectedTab === 'Tab 2' ? <View style={{ backgroundColor: '#fff' }}>
                        <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                        <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                            <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
                        </View>
                    </View> : <></>}

                    {selectedTab === 'Tab 3' ? <View style={{ backgroundColor: '#FBFBFB' }}>
                        <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                        <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                            <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
                        </View>
                    </View> : <></>}
                    {selectedTab === 'Tab 4' ? <View style={{ backgroundColor: '#FBFBFB' }}>
                        <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                        <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                            <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
                        </View>
                    </View> : <></>}
                </ScrollView>
            </View>
            <Text />
        </View>

    )
}


const BuildTabComponent = ({ images, text, selectedVal, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center', width: windowWidth / 4 - 10, paddingVertical: 10,
                backgroundColor: selectedVal === text ? "#fff" : '#EAF2F5',
            }}
            onPress={onPress}
        >
            <Image style={{ width: 25, height: 25 }} source={images} />
            {/* {selectedVal === text ? <View style={{ width: '100%', height: 2, backgroundColor: 'blue' }} /> : <></>} */}
        </TouchableOpacity>
    );
};

