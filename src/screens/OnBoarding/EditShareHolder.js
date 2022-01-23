/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding TradeLicence

import React from "react";
import { View, Text } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import {
  AdditionalShareHolders,
  DateButton,
  EditableField,
  TextField,
  UploadButton,
  Error,
} from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, formValidations, onSucess, strings } from "../../constants";
import axios from "axios";
import {
  isResponseisValid,
  isValidEmail,
  shareHolderDelete,
} from "../../Utilities";

export default class EditShareHolder extends React.PureComponent {
  state = {
    openDatePicker: false,
    items: null,
    percentage: 0,
    addedPercentage: 0,
    shareholdername: "",
    shareholdermobile: "",
    shareholderemail: "",
    index: 0,
    percentageForStage3: 0,
    isSettingsPage: false,
    showToastpopup: false,
    toastType: 0,
    toastMessage: "",
  };
  constructor(props) {
    super(props);
  }

  // Shareholders Plus button

  plusPress = () => {
    if (100 - this.state.percentage >= 1) {
      this.setState({
        percentage: this.state.percentage + 1,
        addedPercentage: this.state.addedPercentage + 1,
      });
    } else {
    }
  };

  // Shareholders Minus button

  minusPress = () => {
    if (this.state.addedPercentage <= 1) {
    } else {
      this.setState({
        percentage: this.state.percentage - 1,
        addedPercentage: this.state.addedPercentage - 1,
      });
    }
  };

  componentDidMount() {
    const { item, totalPercentage, settingsPage, index } =
      this.props.route.params;

    if (item != null) {
      this.setState({
        items: item,
        percentage: totalPercentage,
        percentageForStage3: totalPercentage,
        addedPercentage: parseInt(item.share_holder_percentage),
        shareholdername: item.share_holder_name,
        shareholdermobile: item.mobile_number,
        shareholderemail: item.email,
        isSettingsPage: settingsPage,
        index,
      });
    }
  }

  onChangeTextInputPercentage = (text) => {};

  goback = () => {
    const { navigation, route } = this.props;
    const {
      shareholdername,
      shareholdermobile,
      shareholderemail,
      items,
      addedPercentage,
      percentage,
      index,
      isSettingsPage,
    } = this.state;
    if (shareholdername.length === 0) {
      this.handleToast(0, formValidations.fullName);
    } else if (shareholdermobile.length === 0) {
      this.handleToast(0, formValidations.mobile);
    } else if (shareholdermobile.length < 9) {
      this.handleToast(0, formValidations.mobileDigit);
    } else if (shareholderemail.length === 0) {
      this.handleToast(0, formValidations.emailempty);
    } else if (isValidEmail(shareholderemail) === false) {
      this.handleToast(0, formValidations.emailFormat);
    } else {
      var obj = {
        mobile_number: shareholdermobile,
        share_holder_name: shareholdername,
        email: shareholderemail,
        id: items.id,
        share_holder_percentage: `${addedPercentage}`,
      };
      console.log("IsSettings", isSettingsPage);
      navigation.goBack();
      route.params.updateData({
        item: obj,
        percentage: percentage,
        index,
        deleteShareholder: false,
      });
    }
  };

  onChangeShareholderEmail = (text) => {
    this.setState({
      shareholderemail: text,
    });
  };

  onChangeShareholderFullname = (text) => {
    this.setState({
      shareholdername: text,
    });
  };

  onChangeShareholderMobile = (text) => {
    this.setState({
      shareholdermobile: text,
    });
  };

  deletePress = async () => {
    const { navigation, route } = this.props;
    const {
      shareholdername,
      shareholdermobile,
      shareholderemail,
      items,
      addedPercentage,
      percentage,
      index,
      isSettingsPage,
    } = this.state;
    var obj = {
      mobile_number: shareholdermobile,
      share_holder_name: shareholdername,
      email: shareholderemail,
      id: items.id,
      share_holder_percentage: `${addedPercentage}`,
    };

    if (isSettingsPage) {
      console.log("isSettingsPage", isSettingsPage);
      try {
        if (obj.id) {
          const response = await shareHolderDelete(obj.id);
          if (isResponseisValid(response)) {
            navigation.goBack();
            route.params.updateData({
              item: obj,
              percentage: percentage,
              index,
              deleteShareholder: true,
              message: response.data.result,
            });
          } else {
            if (response.data) {
              this.handleToast(0, response.data);
            } else {
              this.handleToast(0, strings.apierror);
            }
          }
        }else{
          navigation.goBack();
          route.params.updateData({
            item: obj,
            percentage: percentage,
            index,
            deleteShareholder: true,
            message: onSucess.deleteShareholder
          });
        }
      } catch (e) {
        this.handleToast(0, strings.apierror);
      }
    } else {
      navigation.goBack();
      route.params.updateData({
        item: obj,
        percentage: percentage,
        index,
        deleteShareholder: true,
      });
    }
  };
  handleToast = (type, message) => {
    this.setState({
      showToastpopup: true,
      toastType: type,
      toastMessage: message,
    });
  };
  // Dismiss Popup
  onDismiss = () => {
    this.setState({
      showToastpopup: false,
    });
  };
  render() {
    const {
      items,
      percentage,
      shareholdername,
      shareholdermobile,
      shareholderemail,
      addedPercentage,
      showToastpopup,
      toastType,
      toastMessage,
    } = this.state;
    return (
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.white }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Error
            dissMiss={this.onDismiss}
            visible={showToastpopup}
            type={toastType}
            tittle={toastMessage}
          />
          <View style={{ height: 20 }} />
          <AdditionalShareHolders
            shareholderFullname={items === null ? "" : shareholdername}
            shareholderMobile={items === null ? "" : shareholdermobile}
            shareholderEmail={items === null ? "" : shareholderemail}
            addedPercentage={addedPercentage}
            onChangeShareholderEmail={this.onChangeShareholderEmail}
            onChangeShareholderFullname={this.onChangeShareholderFullname}
            onChangeShareholderMobile={this.onChangeShareholderMobile}
            onChangeTextInputPercentage={this.onChangeTextInputPercentage}
            plusPress={this.plusPress}
            minusPress={this.minusPress}
            percentage={percentage}
            shareHolderPress={this.goback}
            deletePress={this.deletePress}
            type={1}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
