import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card } from 'react-native-paper';
import CustomTextComponent from '../CustomTextComponent';
import { windowHeight, windowWidth } from '../../utils/utils';

const Tab = createMaterialTopTabNavigator();

export default function PersonalCardDateTabsComponent({ navigation }) {
    return (
        <View style={{ width: '100%', height: windowHeight }}>
            <Tab.Navigator screenOptions={{
                "tabBarLabelStyle": { textTransform: 'none' },
                "tabBarStyle": {
                    backgroundColor: "#fff",
                    elevation: 3, height: 50
                },
                tabBarInactiveTintColor: '#000',
                tabBarPressColor: "#dcdcdc",
            }}>
                <Tab.Screen
                    name="Oct '21" component={BuildMonthComponent}
                    initialParams={{ navigation: navigation }}
                />
                <Tab.Screen
                    name="Nov '21" component={BuildMonthComponent}
                    initialParams={{ navigation: navigation }}
                />
                <Tab.Screen
                    name="Dec '21" component={BuildMonthComponent}
                    initialParams={{ navigation: navigation }}
                />
                <Tab.Screen
                    name="Jan '21" component={BuildMonthComponent}
                    initialParams={{ navigation: navigation }}
                />
            </Tab.Navigator>
        </View>
    )
}


const BuildMonthComponent = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: '#fff', height: 400, width: '100%', padding: 12 }}>
            <BuildSingleMerchantComponent
                onPress={() => { navigation.navigate("CompanyWalletTransactionScreen") }}
            />
            <BuildSingleMerchantComponent
                onPress={() => { navigation.navigate("CompanyWalletTransactionScreen") }}
            />
            <BuildSingleMerchantComponent
                onPress={() => { navigation.navigate("CompanyWalletTransactionScreen") }}
            />
        </View>
    );
}


const BuildSingleMerchantComponent = ({ onPress }) => {
    return (
        <View style={{ marginVertical: 8 }}>
            <TouchableHighlight onPress={onPress} style={{ borderRadius: 5 }}>
                <Card style={{ width: '100%', padding: 9, elevation: 4, shadowColor: '#999', backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.monthContainerStyle}>
                                <Image
                                    source={require("../../../assets/icons/statement.png")}
                                    style={{ width: 22, height: 22, tintColor: '#315179' }}
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
                                style={{ width: 20, height: 20, tintColor: 'grey' }}
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
                            <CustomTextComponent
                                text="Dr" fs={14} color={"#000"}
                            />
                        </View>
                    </View>
                </Card>
            </TouchableHighlight>
        </View>
    );
}


const styles = StyleSheet.create({
    monthContainerStyle: {
        width: 40, height: 40,
        backgroundColor: '#DCF2EA',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    }
});

