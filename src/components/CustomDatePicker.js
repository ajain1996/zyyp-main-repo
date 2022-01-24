import React, { Component } from "react";
import { Button, View, StyleSheet, Text, Image } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { windowWidth } from "../utils/utils";
import { COLORS } from "../utils/colors";
import SvgUri from "react-native-svg-uri";


var today = new Date();
var tempToday1 = new Date();
var tempToday2 = new Date();
var forSecondStart = 0;
var dateSliced = today.getFullYear() + "- 0" + parseInt(today.getMonth() + 1) + "- 0" + today.getDate();
console.log(dateSliced);


export default class CustomDatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            selectedValue: false,
            minDateObj: undefined,
            maxDateObj: undefined,
            iniDateObj: undefined
        };
    }

    today = new Date();
    initialDate = '';

    showDateTimePicker = () => {
        console.log('showing PersonalDatePicker now:');
        console.log('Today is set to: ', today);
        console.log('forsecondstart is:', forSecondStart);
        console.log('minDate is:', this.props.minimumDate);
        console.log('maxDate is:', this.props.maximumDate);
        console.log('minDate type is:', typeof this.props.minimumDate);
        console.log('maxDate type is:', typeof this.props.maximumDate);
        console.log('minDate is empty:', this.props.minimumDate.length);
        console.log('maxDate is empty:', this.props.maximumDate.length);
        this.setState({ isDateTimePickerVisible: true });


        //Setting up minDateObj
        console.log('\n\n moment date:', moment(this.props.minimumDate, 'DD-MMM-YYYY').toDate())
        var selectedMinDate = this.props.minimumDate.length == 0 ? moment('31-DEC-2010', 'DD-MMM-YYYY').toDate() : moment(this.props.minimumDate, 'DD-MMM-YYYY').toDate()
        console.log('selected min Date:', selectedMinDate);
        var startDateObj = new Date();
        console.log('type of:', typeof selectedMinDate)
        console.log('selectedMinDate is:', selectedMinDate)
        console.log('selectedDate.getDate():', selectedMinDate.getDate());
        startDateObj.setFullYear(selectedMinDate.getFullYear());
        startDateObj.setMonth(selectedMinDate.getMonth());
        startDateObj.setDate(selectedMinDate.getDate());
        console.log('Start Date Obj is: ', startDateObj);
        this.setState({ minDateObj: startDateObj });

        //Setting up maxDateObj
        console.log('\n\n moment date:', moment(this.props.maximumDate, 'DD-MMM-YYYY').toDate())
        var selectedMaxDate = this.props.maximumDate.length == 0 ? moment('31-DEC-2030', 'DD-MMM-YYYY').toDate() : moment(this.props.maximumDate, 'DD-MMM-YYYY').toDate()
        console.log('selected max Date:', selectedMaxDate);
        var endDateObj = new Date();
        console.log('type of:', typeof selectedMaxDate)
        console.log('selectedMaxDate is:', selectedMaxDate)
        console.log('selectedDate.getDate():', selectedMaxDate.getDate());
        endDateObj.setFullYear(selectedMaxDate.getFullYear());
        endDateObj.setMonth(selectedMaxDate.getMonth());
        endDateObj.setDate(selectedMaxDate.getDate());
        console.log('End Date Obj is: ', endDateObj);
        this.setState({ maxDateObj: endDateObj });


        //Setting up initialDateObj
        console.log('\n\n moment date:', moment(this.props.initialDate, 'DD-MMM-YYYY').toDate())
        var selectedInitialDate = this.props.initialDate.length == 0 ? moment().toDate() : moment(this.props.initialDate, 'DD-MMM-YYYY').toDate()
        console.log('selected initial Date:', selectedInitialDate);
        var initialDateObj = new Date();
        console.log('type of:', typeof selectedInitialDate)
        console.log('selectedInitialDate is:', selectedInitialDate)
        console.log('selectedDate.getDate():', selectedInitialDate.getDate());
        initialDateObj.setFullYear(selectedInitialDate.getFullYear());
        initialDateObj.setMonth(selectedInitialDate.getMonth());
        initialDateObj.setDate(selectedInitialDate.getDate());
        console.log('Initial Date Obj is: ', initialDateObj);
        this.setState({ iniDateObj: initialDateObj });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.initialDate = '' + date;
        this.initialDate = this.initialDate.slice(4, 16)
        this.props.isStart != 'yes' ? forSecondStart++ : forSecondStart = 0;
        tempToday1 = date
        this.props.onDateSelected(date);
        this.setState({ selectedValue: true })
        this.hideDateTimePicker();
    };



    render() {

        return (
            <View style={this.props.bigField == null ? styles.container : styles.containerBig}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={this.props.bigField == null ? styles.inputContainer : styles.inputContainerBig}>
                        <SvgUri
                            source={require("../../assets/svg/date.svg")}
                            style={{ width: 22, height: 22 }}
                        />
                        {/* <FontAwesome5Icon name="calendar-minus" color={COLORS.BLACK} size={24} /> */}
                        <View style={{ width: 5 }} />
                        {this.props.dropDownValue
                            ? <Text style={this.props.dropDownValue ? styles.inputBlack : styles.input}>
                                {this.props.dropDownValue}
                            </Text>
                            : <Text style={this.initialDate != '' ? this.props.clear ? styles.input : styles.inputBlack : styles.input}>
                                {this.initialDate != ''
                                    ? this.props.clear ? this.props.heading : this.initialDate
                                    : this.props.clear ? this.props.heading : this.props.placeholderText
                                }
                            </Text>}
                    </View>
                </TouchableOpacity>
                <DateTimePicker
                    date={this.state.iniDateObj}
                    isVisible={this.state.isDateTimePickerVisible}
                    minimumDate={this.state.minDateObj}//{Date.now()}//{this.props.isStart == 'yes' ? tempToday2 : tempToday1}
                    maximumDate={this.state.maxDateObj}//{this.props.isStart == 'yes' && forSecondStart != 0 ? tempToday1 : null}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginLeft: 0,
        backgroundColor: '#000',
    },
    containerBig: {
        fontSize: 12,
        fontFamily: 'STCForward-Regular',
        backgroundColor: '#fff',
    },
    inputContainer: {
        width: windowWidth / 2 - 30,
        height: 52,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f8f9',
        paddingHorizontal: 20,
    },
    inputContainerBig: {
        // marginHorizontal: 20,
        // width: '100%',
        height: 52,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f8f9',
        paddingHorizontal: 20,
    },
    iconStyle: {
        color: "#8e9aa0",
        marginBottom: 5,
        marginRight: 10,
        marginHorizontal: 0
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'STCForward-Regular',
        color: '#999999',
    },
    inputBlack: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'STCForward-Regular',
        color: '#000',
    },
});

