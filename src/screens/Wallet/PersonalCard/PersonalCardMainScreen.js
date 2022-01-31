import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import CustomTextComponent from '../../../components/CustomTextComponent';
import DateTopTabsComponent from '../../../components/home/DateTopTabsComponent';
import PersonalCardDateTabsComponent from '../../../components/personalcard/PersonalCardDateTabsComponent';
import { COLORS } from '../../../utils/colors';
import { windowWidth } from '../../../utils/utils';
import { CompanyWalletTransactionHeader } from '../CompanyWalletTransactionScreen';

export default function PersonalCardMainScreen({ navigation }) {

    const renderTransactionsBtnBlock = (image, text) => {
        return (
            <View style={styles.transactionBtn}>
                <CustomTextComponent
                    text={text} fs={15} color={"#000"}
                />
                <SvgUri
                    source={image}
                    style={{  marginLeft: 20 }}
                />
            </View>
        );
    }

    return (
        <>
            <CompanyWalletTransactionHeader
                navigation={navigation}
                text="My Card"
            />
            <ScrollView style={{ backgroundColor: '#f7f8f9' }}>

                <View style={{ backgroundColor: '#fff', paddingBottom: 20, borderRadius: 10, }}>
                    <View style={{ paddingHorizontal: 30, alignItems: "center", paddingVertical: 20 }}>
                        {/* <View style={{ paddingHorizontal: 4, paddingVertical: 3, borderRadius: 40, backgroundColor: '#CCF3F5', width: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', paddingBottom: 9 }}>
                            <CustomTextComponent
                                text="Active" fs={9} color={"#00C2CB"} fw="600"
                            />
                        </View> */}
                        <Image
                            source={require("../../../../assets/images/card-1.png")}
                            resizeMode="cover"
                            style={{ width: "100%", height: 220, marginLeft: 15 }}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 40 }}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <BuildMyCardBox1
                                text="Card Settings"
                                image={require("../../../../assets/icons/setting.png")}
                                onPress={() => { navigation.navigate("PersonalCardSettingsScreen") }}
                            />
                            <View style={{ width: 20, width: 1, height: 24, backgroundColor: COLORS.PURPLE }} />
                            <BuildMyCardBox1
                                text="View Card details"
                                image={require("../../../../assets/icons/view.png")}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 40 }}>
                    <View style={styles.transactionContainer}>
                        <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 34, height: 3.6, backgroundColor: 'grey', marginVertical: 0.3, borderRadius: 50 }} />
                            <View style={{ width: 34, height: 3.6, backgroundColor: 'grey', marginVertical: 0.3, borderRadius: 50 }} />
                        </View>

                        <View style={{ paddingHorizontal: 20 }}>
                            <CustomTextComponent
                                text="Transcations" fs={22} color={"#000"} ff="PlayfairDisplay-Black"
                            />
                        </View>

                        <View style={{ marginTop: 10 }}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View style={{ width: 20 }} />
            <SvgUri
              source={require("../../../../assets/svg/filter.svg")}
              style={{ width: 22, height: 22, marginRight: 12 }}
            />
            {renderTransactionsBtnBlock(
              require("../../../../assets/svg/down-arrow.svg"),
              "Department",
              false
            )}

            {renderTransactionsBtnBlock(
              require("../../../../assets/svg/search.svg"),
              "Project",
              true
            )}

            {renderTransactionsBtnBlock(
              require("../../../../assets/svg/down-arrow.svg"),
              "Employment",
              false
            )}
            <View style={{ width: 20 }} />
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            // elevation: 17,
            // shadowColor: '#999',
            backgroundColor: "#fff",
          }}
        >
          <DateTopTabsComponent navigation={navigation} />
        </View>
                    </View>
                    {/* <Text /> */}

                </View>
            </ScrollView>
        </>
    )
}


const BuildMyCardBox1 = ({ image, text, onPress }) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}
            onPress={onPress}
        >
            <Image
                source={image}
                style={{ width: 22, height: 22, borderRadius: 30, tintColor: COLORS.PURPLE, marginRight: 4 }}
            />
            <CustomTextComponent
                text={text} fs={15} color={COLORS.PURPLE} fw="600"
            />
        </TouchableOpacity>
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
        backgroundColor: '#F2ECFB',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
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

