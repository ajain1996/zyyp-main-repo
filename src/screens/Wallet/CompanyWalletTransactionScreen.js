import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight } from 'react-native';
import CustomTextComponent from '../../components/CustomTextComponent';
import { COLORS } from '../../utils/colors';
import { windowWidth } from '../../utils/utils';

export default function CompanyWalletTransactionScreen({ navigation, route }) {
    return (
        <>
            <CompanyWalletTransactionHeader
                navigation={navigation}
                text="Transaction details"
            />
            <ScrollView style={{ backgroundColor: '#fff' }}>

                <View>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <CustomTextComponent
                            text="ITC Hotel" fs={22} color={COLORS.BLACK} fw="700"
                        />
                        <CustomTextComponent
                            text="Private Limited" fs={22} color={COLORS.BLACK} fw="700"
                        />
                        <View style={{ height: 8 }} />
                        <CustomTextComponent
                            text="Expense ID" fs={18} color={COLORS.BLACK} fw="500"
                        />
                    </View>
                    <View style={{ height: 12 }} />

                    <View style={{ elevation: 10, shadowColor: '#999', backgroundColor: '#fff', margin: 20, borderRadius: 20 }}>
                        <CompanyWalletExpenseBlock
                            image={require("../../../assets/svg/transactionstatement.svg")}
                            text="aed 321.00" istintColor={true}
                        />
                        <CompanyWalletExpenseBlock
                            image={require("../../../assets/svg/briefcase.svg")}
                            text="23/06/2021" istintColor={true}
                        />
                        <CompanyWalletExpenseBlock
                            image={require("../../../assets/svg/briefcase2.svg")}
                            text="... 3282" istintColor={true}
                        />
                        <CompanyWalletExpenseBlock
                            image={require("../../../assets/svg/left-right-icon.svg")}
                            text="Debit" istintColor={true}
                        />
                    </View>

                    <View style={{ elevation: 10, shadowColor: '#999', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 20 }}>
                        <CompanyWalletExpenseBlock
                            image={require("../../../assets/images/man2.jpg")}
                            istintColor={false}
                            text="Brooklyn Simmons"
                        />
                        <CompanyWalletExpenseBlock
                            image={require("../../../assets/svg/finance.svg")}
                            text="Finance" istintColor={true}
                        />
                        <CompanyWalletExpenseBlock
                            image={require("../../../assets/svg/travel.svg")}
                            text="Travel" istintColor={true}
                        />
                        <CompanyWalletExpenseBlock
                            image={require("../../../assets/svg/document.svg")}
                            text="Project Name" istintColor={true}
                        />
                    </View>
                    <Text />

                    <View style={{ elevation: 18, shadowColor: '#999', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 20 }}>
                        <View style={{
                            paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            paddingVertical: 20
                        }}>
                            <View>
                                <CustomTextComponent
                                    text="Invoice" fs={20} color={"#000"}
                                />
                                <BuildInvoiceComponent
                                    image={require("../../../assets/images/paper.jpg")}
                                />
                                <CustomTextComponent
                                    text="Invoice#" fs={20} color={"#999"}
                                />
                            </View>
                            <View>
                                <CustomTextComponent
                                    text="Reciept" fs={20} color={"#000"}
                                />
                                <BuildInvoiceComponent
                                    image={require("../../../assets/images/paper.jpg")}
                                />
                                <CustomTextComponent
                                    text="Reciept#" fs={20} color={"#999"}
                                />
                            </View>
                        </View>
                    </View>
                    <Text />

                </View>
            </ScrollView>
        </>
    )
}


export const CompanyWalletTransactionHeader = ({ navigation, text }) => {
    return (
        <View style={{
            width: '100%', height: 56, elevation: 12, shadowColor: '#999', backgroundColor: '#fff', alignItems: 'center',
            flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 10,
        }}>
            <TouchableHighlight onPress={() => { navigation.goBack() }}>
                <Image
                    source={require("../../../assets/icons/arrow-back.png")}
                    style={{ width: 34, height: 34, }}
                />
            </TouchableHighlight>
            <CustomTextComponent
                text={text} fs={24} color={"#000"}
            />
            <View style={{ width: 10, height: 10, backgroundColor: '#fff' }} />
        </View>
    );
}


const CompanyWalletExpenseBlock = ({ image, text, istintColor }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
            {istintColor ? <SvgUri
                source={image}
                style={{ width: 28, height: 28, tintColor: COLORS.BLACK40 }}
            /> : <Image
                source={image}
                style={{ width: 28, height: 28, borderRadius: 1000 }}
            />}
            <View style={{ width: 20 }} />
            <CustomTextComponent
                text={text} fs={17} color={COLORS.BLACK} fw="500"
            />
        </View>
    );
}


const BuildInvoiceComponent = ({ image }) => {
    return (
        <View style={{
            width: windowWidth / 2.9, height: windowWidth / 2.6, backgroundColor: '#eee', borderRadius: 8,
            justifyContent: 'center', alignItems: 'center'
        }}>
            <Image
                source={image}
                style={{ width: '80%', height: '92%' }}
            />
            <View style={{
                width: 28, height: 28, backgroundColor: '#FF914D', borderRadius: 1000, left: 2,
                justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 6
            }}>
                <Image
                    source={require("../../../assets/icons/view.png")}
                    style={{ width: 20, height: 20, tintColor: '#fff' }}
                />
            </View>
        </View>
    );
}

