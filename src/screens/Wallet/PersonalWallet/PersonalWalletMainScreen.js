import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { COLORS } from '../../../utils/colors';
import { windowHeight, windowWidth } from '../../../utils/utils';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CustomModalComponent from './lock_wallet/LockWalletScreen';

export default function PersonalWalletMainScreen({ navigation }) {

    const imagesList = [
        {
            img: require("../../../../assets/images/card-1.png"),
        },
        {
            img: require("../../../../assets/images/card-1.png"),
        },
        {
            img: require("../../../../assets/images/card-1.png"),
        },
    ]

    return (
        <ScrollView style={{ backgroundColor: '#EEECF2' }}>
            <MainHeaderComponent />

            <View style={{ height: windowHeight / 1.3, justifyContent: 'space-between' }}>
                <BuildAddFundsComponent navigation={navigation} />

                <SwiperFlatList
                    index={1}
                    showPagination
                    data={imagesList}
                    centerContent={true}
                    showPagination={true}
                    paginationStyleItem={{
                        width: 7, height: 7, marginTop: -windowWidth / 2.4, marginHorizontal: 5
                    }}
                    contentContainerStyle={{ justifyContent: 'center' }}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("PersonalCardMainScreen") }}>
                            <Image
                                source={item.img}
                                resizeMode="cover"
                                style={{
                                    width: windowWidth / 1.05, height: 220, borderRadius: 20, marginLeft: 20
                                }}
                            />
                        </TouchableOpacity>
                    )}
                />

                <View style={styles.transactionContainer}>
                    <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                        <View style={{ width: 34, height: 3.6, backgroundColor: 'grey', marginVertical: 1.5, borderRadius: 50 }} />
                        <View style={{ width: 34, height: 3.6, backgroundColor: 'grey', marginVertical: 0.3, borderRadius: 50 }} />
                        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                            <CustomTextComponent
                                text="Transactions" fs={22} color={"#000"} ff="PlayfairDisplay-Black"
                            />
                        </View>
                    </View>

                    <Text />
                </View>
            </View>
        </ScrollView>
    )
}


const MainHeaderComponent = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <CustomTextComponent
                    text="Wallet" fs={22} color={"#000"} ff="PlayfairDisplay-Black"
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.headerContainer2}>
                        <View style={{ width: 9 }} />
                        <View style={{ width: 24, height: 24, borderRadius: 100, backgroundColor: '#85949F' }} />
                        <View style={{ width: 12 }} />
                        <CustomTextComponent
                            text="Personal" fs={15} color={"#000"}
                        />
                    </View>

                    <Image
                        source={require("../../../../assets/icons/download.png")}
                        style={{ width: 22, height: 22, marginLeft: 20 }}
                    />
                </View>
            </View>
            <Text />

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <CustomTextComponent
                        text="AED" fs={18} color={"grey"}
                    />
                    <CustomTextComponent
                        text="321.00" fs={30} color={"#000"} ff="Montserrat-Bold"
                    />
                </View>
            </View>
        </View>
    );
}


const BuildAddFundsComponent = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const renderSingleFundComponent = (image, text, onPress) => {
        return (
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
                <SvgUri
                    source={image}
                    style={{ width: 28, height: 28, tintColor: '#85949F', marginBottom: 4 }}
                />
                <CustomTextComponent
                    text={text} fs={13} color={"#85949F"} fw="700"
                />
            </TouchableOpacity>
        );
    }
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 30 }}>
                {renderSingleFundComponent(
                    require("../../../../assets/svg/add-funds.svg"),
                    "ADD FUNDS", () => {
                        navigation.navigate("AddFundsScreen")
                    }
                )}

                {renderSingleFundComponent(
                    require("../../../../assets/icons/statement.svg"),
                    "LOCK WALLET", () => {
                        setModalVisible(true);
                    }
                )}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30 }}>
                <CustomTextComponent
                    text={"My Cards"} fs={17} color={COLORS.BLACK} fw="600"
                />

                <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => { navigation.navigate("PWRequestNewCardScreen") }}
                >
                    <Image
                        source={require("../../../../assets/icons/Plus.png")}
                        style={{ width: 14, height: 14, tintColor: '#622AB9', marginBottom: 2, marginRight: 4 }}
                    />
                    <CustomTextComponent
                        text={"Request New Card"} fs={14} color={"#622AB9"} fw="600"
                    />
                </TouchableOpacity>
            </View>

            <CustomModalComponent
                screenType="lock_wallet"
                setModalVisible={setModalVisible}
                isModalVisible={isModalVisible}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        elevation: 24, shadowColor: '#999',
        backgroundColor: '#f7f8f9',
        width: '100%', paddingTop: 42,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    headerContainer2: {
        flexDirection: 'row',
        width: 150,
        height: 35,
        backgroundColor: '#EAF2F5',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    transactionContainer: {
        width: '100%', elevation: 24,
        shadowColor: '#999',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    transactionBtn: {
        paddingVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#dcdcdc',
        justifyContent: 'center',
        backgroundColor: '#fbfbfb',
        marginRight: 8,
        paddingHorizontal: 12
    },
});

