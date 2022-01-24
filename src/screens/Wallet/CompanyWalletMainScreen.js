import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Animated } from 'react-native';
import CustomTextComponent from '../../components/CustomTextComponent';
import DateTopTabsComponent from '../../components/home/DateTopTabsComponent';
import SvgUri from 'react-native-svg-uri';

export default function CompanyWalletMainScreen({ }) {

    const navigation = useNavigation();

    const renderTransactionsBtnBlock = (image, text, isLarge) => {
        return (
            <View style={styles.transactionBtn}>
                <CustomTextComponent text={text} fs={15} color={'#000'} />
                <Image
                    source={image}
                    style={{
                        width: isLarge ? 36 : 14,
                        height: isLarge ? 36 : 14,
                        marginLeft: isLarge ? 8 : 20,
                    }}
                />
            </View>
        );
    };

    return (
        <ScrollView style={{ backgroundColor: '#EEECF2' }}>
            <MainHeaderComponent navigation={navigation} />

            <BuildAddFundsComponent navigation={navigation} />

            <View style={styles.transactionContainer}>
                <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                    <View
                        style={{
                            width: 34,
                            height: 3.6,
                            backgroundColor: 'grey',
                            marginVertical: 0.5,
                            borderRadius: 50,
                        }}
                    />
                    <View
                        style={{
                            width: 34,
                            height: 3.6,
                            backgroundColor: 'grey',
                            marginVertical: 0.6,
                            borderRadius: 50,
                        }}
                    />
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={styles.fontStyle}>Transactions</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ alignItems: 'center' }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ width: 20 }} />
                        <Image
                            source={require('../../../assets/icons/filter.png')}
                            style={{ width: 22, height: 22, marginRight: 12 }}
                        />
                        {renderTransactionsBtnBlock(
                            require('../../../assets/icons/down-arrow.png'),
                            'Department',
                            false,
                        )}

                        {renderTransactionsBtnBlock(
                            require('../../../assets/icons/search.png'),
                            'Project',
                            true,
                        )}

                        {renderTransactionsBtnBlock(
                            require('../../../assets/icons/down-arrow.png'),
                            'Employment',
                            false,
                        )}
                        <View style={{ width: 20 }} />
                    </ScrollView>
                </View>
            </View>
            {/* <Text /> */}

            <View style={{ width: '100%', elevation: 120, shadowColor: '#999' }}>
                <DateTopTabsComponent />
            </View>
        </ScrollView>
    );
}

const MainHeaderComponent = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
    const toggleSwitch = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 4000,
        }).start();
        setIsEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.headerContainer}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('PersonalWalletMainScreen');
                    }}>
                    <Text style={styles.fontStyle}>Wallet</Text>
                </TouchableOpacity>
                {/* <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    /> */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.headerContainer2}
                        onPress={toggleSwitch}>
                        {isEnabled ? (
                            <></>
                        ) : (
                            <>
                                <View
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 100,
                                        backgroundColor: '#B085F1',
                                    }}
                                />
                                <View style={{ width: 12 }} />
                            </>
                        )}
                        <CustomTextComponent text="Company" fs={14} color={'#000'} />
                        {isEnabled ? (
                            <>
                                <View style={{ width: 14 }} />
                                <View
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 100,
                                        backgroundColor: '#B085F1',
                                    }}
                                />
                            </>
                        ) : (
                            <></>
                        )}
                    </TouchableOpacity>

                    <Image
                        source={require('../../../assets/icons/download.png')}
                        style={{ width: 30, height: 30, marginLeft: 14 }}
                    />
                </View>
            </View>
            <Text />

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <CustomTextComponent text="AED" fs={18} fw="700" color={'grey'} />
                    <CustomTextComponent text="321.00" fs={36} color={'#343C44'} ff="Montserrat-Bold" />
                </View>
            </View>
        </View>
    );
};

const BuildAddFundsComponent = ({ navigation }) => {
    const renderSingleFundComponent = (image, text, onPress, isLarge) => {
        return (
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
                <SvgUri
                    source={image}
                    resizeMode="contain"
                    style={{
                        width: isLarge ? 42 : 30,
                        height: isLarge ? 42 : 30,
                        tintColor: '#85949F',
                        marginBottom: isLarge ? -2 : 2,
                    }}
                />
                <CustomTextComponent text={text} fs={13} color={'#85949F'} fw="700" />
            </TouchableOpacity>
        );
    };
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingVertical: 30,
            }}>
            {renderSingleFundComponent(
                require('../../../assets/icons/addfunds.svg'),
                'ADD FUNDS',
                () => {
                    navigation.navigate('AddFundsScreen');
                },
                false,
            )}

            {renderSingleFundComponent(
                require('../../../assets/icons/withdrawal.svg'),
                'WITHDRAW',
                () => {
                    navigation.navigate('WithDrawlFundsScreen');
                },
                false,
            )}

            {renderSingleFundComponent(
                require('../../../assets/icons/statement.svg'),
                'STATEMENT',
                () => {
                    navigation.navigate('StampedStatementScreen');
                },
                false,
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        elevation: 24,
        shadowColor: 'rgba(50,50,71,0.88)',
        backgroundColor: '#f7f8f9',
        width: '100%',
        paddingTop: 42,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    fontStyle: {
        fontSize: 22,
        color: '#000',
        // fontWeight: '700',
        fontFamily: 'PlayfairDisplay-Black',
    },
    headerContainer2: {
        flexDirection: 'row',
        paddingHorizontal: 14,
        height: 35,
        backgroundColor: '#F2ECFB',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    transactionContainer: {
        width: '100%',
        elevation: 24,
        shadowColor: '#999',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    transactionBtn: {
        // paddingVertical: 7,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dcdcdc',
        justifyContent: 'center',
        backgroundColor: '#fbfbfb',
        marginRight: 8,
        paddingHorizontal: 12,
    },
});
