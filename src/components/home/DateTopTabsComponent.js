import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card } from 'react-native-paper';
import CustomTextComponent from '../CustomTextComponent';
import { windowHeight, windowWidth } from '../../utils/utils';

const Tab = createMaterialTopTabNavigator();

export default function DateTopTabsComponent({ navigation }) {

    const [dateBox, setDateBox] = useState("DEC22");

    return (
        <View style={{ backgroundColor: '#eee' }}>
            <View style={{ elevation: 160, shadowColor: '#999', backgroundColor: '#fff', marginVertical: 6 }}>
                <ScrollView style={{ width: '100%' }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: windowWidth / 5, paddingVertical: 2, alignItems: 'center' }}
                        onPress={() => { setDateBox("OCT22") }}
                    >
                        <View style={{ height: 10 }} />
                        <CustomTextComponent
                            text={"OCT '22"} fs={14} color={"#999"}
                        />
                        {dateBox === "OCT22" ? <View style={{ width: '74%', height: 3, backgroundColor: '#7B35E7', marginTop: 6 }} /> : <></>}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: windowWidth / 5, paddingVertical: 2, alignItems: 'center' }}
                        onPress={() => { setDateBox("NOV22") }}
                    >
                        <View style={{ height: 10 }} />
                        <CustomTextComponent
                            text={"NOV '22"} fs={14} color={"#999"}
                        />
                        {dateBox === "NOV22" ? <View style={{ width: '74%', height: 3, backgroundColor: '#7B35E7', marginTop: 6 }} /> : <></>}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: windowWidth / 5, paddingVertical: 2, alignItems: 'center' }}
                        onPress={() => { setDateBox("DEC22") }}
                    >
                        <View style={{ height: 10 }} />
                        <CustomTextComponent
                            text={"DEC '22"} fs={14} color={"#999"}
                        />
                        {dateBox === "DEC22" ? <View style={{ width: '74%', height: 3, backgroundColor: '#7B35E7', marginTop: 6 }} /> : <></>}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: windowWidth / 5, paddingVertical: 2, alignItems: 'center' }}
                        onPress={() => { setDateBox("JAN22") }}
                    >
                        <View style={{ height: 10 }} />
                        <CustomTextComponent
                            text={"JAN '22"} fs={14} color={"#999"}
                        />
                        {dateBox === "JAN22" ? <View style={{ width: '74%', height: 3, backgroundColor: '#7B35E7', marginTop: 6 }} /> : <></>}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: windowWidth / 5, paddingVertical: 2, alignItems: 'center' }}
                        onPress={() => { setDateBox("FEB22") }}
                    >
                        <View style={{ height: 10 }} />
                        <CustomTextComponent
                            text={"FEB '22"} fs={14} color={"#999"}
                        />
                        {dateBox === "FEB22" ? <View style={{ width: '74%', height: 3, backgroundColor: '#7B35E7', marginTop: 6 }} /> : <></>}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: windowWidth / 5, paddingVertical: 2, alignItems: 'center' }}
                        onPress={() => { setDateBox("MAR22") }}
                    >
                        <View style={{ height: 10 }} />
                        <CustomTextComponent
                            text={"MAR '22"} fs={14} color={"#999"}
                        />
                        {dateBox === "MAR22" ? <View style={{ width: '74%', height: 3, backgroundColor: '#7B35E7', marginTop: 6 }} /> : <></>}
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {dateBox === "OCT22" ? <BuildMonthComponent navigation={navigation} /> : <></>}
        </View>
    )
}


const BuildMonthComponent = ({ navigation }) => {
    return (
        <View style={{ height: 400, width: '100%', padding: 12 }}>
            <CustomTextComponent
                text={"Monday, 17"} fs={11} color={"#999"}
            />
            <BuildSingleMerchantComponent
                onPress={() => { navigation.navigate("CompanyWalletTransactionScreen") }}
            />
            <BuildSingleMerchantComponent />
            <BuildSingleMerchantComponent />
        </View>
    );
}


const BuildSingleMerchantComponent = ({ onPress }) => {
    return (
        <View style={{ marginVertical: 5 }}>
            <TouchableHighlight onPress={onPress}>
                <Card style={{ width: '100%', padding: 9, elevation: 4, shadowColor: '#999', backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.monthContainerStyle}>
                                <Image
                                    source={require("../../../assets/icons/Tax.png")}
                                    style={{ width: 32, height: 32, tintColor: '#315179' }}
                                />
                            </View>

                            <View style={{ width: windowWidth / 2.6 }}>
                                <CustomTextComponent
                                    text="Merchant Name Private Limited" fs={17} color={"#000"}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <View style={{ marginBottom: 3, marginRight: 6 }}>
                                <CustomTextComponent
                                    text="AED" fs={12} color={"#000"}
                                />
                            </View>
                            <CustomTextComponent
                                text="321.00" fs={24} color={"#000"} fw="700"
                            />
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8,
                        paddingHorizontal: 5
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require("../../../assets/icons/card.png")}
                                resizeMode="contain"
                                style={{ width: 24, height: 24, tintColor: 'grey' }}
                            />
                            <Image
                                source={require("../../../assets/icons/dots.png")}
                                style={{ width: 20, height: 20, tintColor: 'grey', marginHorizontal: 4 }}
                            />
                            <CustomTextComponent
                                text="4284" fs={14} color={"grey"}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                paddingHorizontal: 8, backgroundColor: '#FFE9D8', borderRadius: 30, flexDirection: 'row',
                                alignItems: 'center', paddingVertical: 4, marginRight: 5
                            }}>
                                <View style={{ width: 7, height: 7, backgroundColor: '#FF914D', borderRadius: 100, marginRight: 4 }} />
                                <CustomTextComponent
                                    text="Unclaimed" fs={10} color={"#FF914D"}
                                />
                            </View>
                            <CustomTextComponent
                                text="Dr" fs={16} color={"#000"}
                            />
                        </View>
                    </View>

                    <View style={{
                        borderTopWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center',
                        marginTop: 12, paddingTop: 12
                    }}>
                        <Image
                            source={require("../../../assets/images/e1.png")}
                            style={{ width: 26, height: 26, marginHorizontal: 4, borderRadius: 100 }}
                        />
                        <CustomTextComponent
                            text="Employee Name | Department" fs={13} color={"grey"}
                        />
                    </View>
                </Card>
            </TouchableHighlight>
        </View>
    );
}


const styles = StyleSheet.create({
    monthContainerStyle: {
        width: 48, height: 52,
        backgroundColor: '#DCF2EA',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    }
});

