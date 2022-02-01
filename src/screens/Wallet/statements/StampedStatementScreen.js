import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { COLORS } from '../../../utils/colors';
import { windowHeight } from '../../../utils/utils';
import { CompanyWalletTransactionHeader } from '../CompanyWalletTransactionScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import moment from 'moment';
import CustomDatePicker from '../../../components/CustomDatePicker';
import { BuildApprovedAccount } from '../AddFundsScreen';
import { WithdrawFundsBtn } from '../WithDrawlFundsScreen';

export default function StampedStatementScreen({ navigation }) {

    const [clear3, setClear3] = useState(false);

    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");

    const [loading, setLoading] = useState(false);

    return (
        <View>
            <CompanyWalletTransactionHeader
                navigation={navigation}
                text="Stamped Statement"
            />
            <ScrollView style={{ height: windowHeight, width: '100%', backgroundColor: 'rgba(253, 253, 253, 1)' }}>
                <View style={{ padding: 25 }}>
                    <CustomTextComponent
                        text={"A stamped physical statement will be sent through courier on your registered address."}
                        fs={19} color={"#85949F"} fw="500"
                    />
                    <View style={{ height: 32 }} />

                    <CustomTextComponent
                        text={"Select date range for statement"}
                        fs={18} color={COLORS.BLACK} fw="500"
                    />
                    <Text />

                    <>
                        <CustomTextComponent
                            text={"From Date"}
                            fs={13} color={COLORS.BLACK} fw="500"
                        />
                        <View style={{ marginTop: 8 }} />
                        <CustomDatePicker
                            placeholderText="MM-DD-YYYY"
                            minimumDate='24-Dec-1900'
                            maximumDate='24-Dec-2200'
                            initialDate={StartDate}
                            dropDownValue={StartDate}
                            clear={clear3}
                            bigField='true'
                            onDateSelected={function (date) {
                                setStartDate(moment(date).format('DD-MMM-YYYY'));
                            }}
                        />
                    </>
                    <Text />

                    <>
                        <CustomTextComponent
                            text={"To Date"}
                            fs={13} color={COLORS.BLACK} fw="500"
                        />
                        <View style={{ marginTop: 8 }} />
                        <CustomDatePicker
                            heading="MM-DD-YYYY"
                            placeholderText="MM-DD-YYYY"
                            minimumDate='24-Dec-1900'
                            maximumDate='24-Dec-2200'
                            initialDate={EndDate}
                            dropDownValue={EndDate}
                            clear={clear3}
                            bigField='true'
                            onDateSelected={function (date) {
                                setEndDate(moment(date).format('DD-MMM-YYYY'));
                            }}
                        />
                    </>
                    <View style={{ marginTop: 30 }} />

                    <BuildApprovedAccount
                        title="Company Account"
                        accountNumber="2384-7202-9830-2"
                        holderName="Aryan Jain"
                        selectedVal="SDFC"
                        selectedAccount={"selectedAccount"}
                        bankName="SDFC Kerela"
                    // onPress={() => { setSelectedAccount("SDFC") }}
                    />

                    <>
                        <CustomTextComponent
                            text={"You will be charged a fixed fee of"}
                            fs={18} color={COLORS.BLACK40} fw="700"
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CustomTextComponent
                                text={"aed 20"}
                                fs={18} color={COLORS.ORANGE} fw="700"
                            />
                            <CustomTextComponent
                                text={" for each request for a"}
                                fs={18} color={COLORS.BLACK40} fw="700"
                            />
                        </View>
                        <CustomTextComponent
                            text={"stamped statement."}
                            fs={18} color={COLORS.BLACK40} fw="700"
                        />
                    </>
                    <View style={{ width: '100%', height: 2, backgroundColor: COLORS.BLACK20, marginVertical: 20 }} />

                    <CustomTextComponent
                        text={"Note:"}
                        fs={16} color={"#85949F"} fw="600"
                    />
                    <CustomTextComponent
                        text={"A digital statement is availble for free. Please use the download button on your account page. Please look for the icon."}
                        fs={16} color={"#85949F"} fw="600"
                    />
                    <Text />

                    <View style={{ alignItems: 'center', elevation: 30, top: 40 }}>
                        <WithdrawFundsBtn
                            text="SUBMIT REQUEST"
                            onPress={() => { navigation.navigate("StatementInputCodeScreen") }}
                        />
                    </View>
                    <View style={{ height: 150 }} />

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        height: 46,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f8',
        marginTop: 20
    },
    input: {
        padding: 10,
        paddingLeft: 18,
        flex: 1,
        fontSize: 18,
        fontFamily: 'lucida grande',
        color: COLORS.BLACK,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.black,
    },
});

