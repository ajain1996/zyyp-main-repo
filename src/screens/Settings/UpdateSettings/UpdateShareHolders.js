/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding TradeLicence

import React from "react";
import { View, ActivityIndicator } from "react-native";
import {
  Footer,
  Button,
  ShareHoldersList,
  ButtonText,
  Container,
  AuthHeader,
  Error,
} from "../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  COLORS,
  formValidations,
  images,
  onSucess,
  SIZES,
  strings,
} from "../../../constants";
import {
  getShareholderList,
  isResponseisValid,
  shareHolderDelete,
  isValidEmail,
  updateShareHolders,
  Loader,
} from "../../../Utilities";

export default class UpdateShareHolders extends React.PureComponent {
  state = {
    isLoading: true,
    addAnotherShareholderitem: false,
    shareHolderList: [],
    totalPercentage: 0,
    temporaryPercentage: 0,
    initialValue: 1,
    shareholderFullname: "",
    shareholderMobile: "",
    shareholderEmail: "",
    showToastpopup: false,
    toastType: 0,
    toastMessage: "",
  };

  // Toast Handling
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

  componentDidMount() {
    this.getShareholderListApicall();
  }

  //Get ShareHolder List API calls
  async getShareholderListApicall() {
    this.setState({ isLoading: true });
    try {
      const shalholderListResponse = await getShareholderList();
      if (isResponseisValid(shalholderListResponse)) {
        console.log("Resp", shalholderListResponse.data.result.share_holders);
        if (shalholderListResponse.data.result.share_holders === null) {
          this.setState({ isLoading: false });
        } else {
          this.setState(
            {
              shareHolderList: shalholderListResponse.data.result.share_holders,
              isLoading: false,
            },
            () => {
              this.shareHolderPercentagecalculation();
            }
          );
        }

        this.setState({ isLoading: false });
      } else {
        this.setState({ isLoading: false });
        this.handleToast(0, shalholderListResponse.data);
      }
    } catch (e) {
      this.setState({ isLoading: false });
      this.handleToast(0, strings.apierror);
    }
  }

  //Percentage Calculation
  shareHolderPercentagecalculation() {
    var totalPerc = 0;
    if (this.state.shareHolderList.length === 1) {
      totalPerc = parseInt(
        this.state.shareHolderList[0].share_holder_percentage
      );
    } else {
      totalPerc = this.state.shareHolderList.reduce(
        (a, b) => a + parseInt(b.share_holder_percentage),
        0
      );
    }
    this.setState({
      totalPercentage: totalPerc,
      temporaryPercentage: totalPerc,
      isLoading: false,
    });
  }

  //Add another Share holder
  addAnotherSharePress = () => {
    this.setState({
      addAnotherShareholderitem: true,
      totalPercentage: this.state.temporaryPercentage + 1,
    });
  };

  // Shareholder update and delete function
  updateData = ({ item, percentage, index, deleteShareholder, message }) => {
    if (deleteShareholder) {
      var st = this.state.shareHolderList;
      var share_holder_percentage =
        this.state.shareHolderList[index].share_holder_percentage;

      st.splice(index, 1);
      this.setState(
        {
          shareHolderList: [...st],
          totalPercentage:
            this.state.temporaryPercentage - parseInt(share_holder_percentage),
        },
        () => {
          this.setState({
            temporaryPercentage:
              this.state.temporaryPercentage -
              parseInt(share_holder_percentage),
          });
        }
      );
      this.handleToast(3, message);
    } else {
      var st = this.state.shareHolderList;
      st[index] = item;
      this.setState({
        shareHolderList: [...st],
        totalPercentage: percentage,
        temporaryPercentage: percentage,
      });
    }
  };

  // Navigation to edit Shareholders page
  pressEditNavigation = (index) => {
    console.log("Index", index);
    // this.props.navigation.navigate("EditShareHolder");
    this.props.navigation.navigate("EditShareHolder", {
      item: this.state.shareHolderList[index],
      index,
      settingsPage: true,
      totalPercentage: this.state.totalPercentage,
      updateData: this.updateData,
    });
  };

  deleteNewShareholders = () => {
    this.setState({
      addAnotherShareholderitem: false,
      initialValue: 1,
      totalPercentage: this.state.temporaryPercentage,
      shareholderFullname: "",
      shareholderMobile: "",
      shareholderEmail: "",
    });
  };
  plusClick = () => {
    console.log(this.state.totalPercentage);
    if (this.state.totalPercentage < 100) {
      this.setState({
        totalPercentage: this.state.totalPercentage + 1,
        initialValue: this.state.initialValue + 1,
      });
    } else {
    }
  };
  minusClick = () => {
    if (this.state.initialValue <= 1) {
    } else {
      this.setState({
        totalPercentage: this.state.totalPercentage - 1,
        initialValue: this.state.initialValue - 1,
      });
    }
  };

  onCallShareHoldersApi = async () => {
    const { navigation, route } = this.props;
    try {
      const updateShareholderResponse = await updateShareHolders(
        this.state.shareHolderList
      );
      if (isResponseisValid(updateShareholderResponse)) {
        navigation.goBack();
        route.params.refreshData({
          isApiCallSuccess: true,
          message: updateShareholderResponse.data.result,
        });
      } else {
        this.handleToast(0, updateShareholderResponse.data);
      }
    } catch (e) {
      this.handleToast(0, strings.apierror);
    }
  };

  updateNextPage = async () => {
    if (!this.state.addAnotherShareholderitem) {
      this.onCallShareHoldersApi();
    } else {
      const { shareholderFullname, shareholderMobile, shareholderEmail } =
        this.state;
      if (shareholderFullname.length === 0) {
        this.handleToast(0, formValidations.fullName);
      } else if (shareholderMobile.length === 0) {
        this.handleToast(0, formValidations.mobile);
      } else if (shareholderMobile.length < 9) {
        this.handleToast(0, formValidations.mobileDigit);
      } else if (shareholderEmail.length == 0) {
        this.handleToast(0, formValidations.emailempty);
      } else if (isValidEmail(shareholderEmail) === false) {
        this.handleToast(0, formValidations.emailFormat);
      } else {
        this.onCallShareHoldersApi();
      }
    }
  };

  onChangeShareholderFullname = (text) => {
    this.setState({
      shareholderFullname: text,
    });
  };

  onChangeShareholderMobile = (text) => {
    this.setState({
      shareholderMobile: text,
    });
  };

  onChangeShareholderEmail = (text) => {
    this.setState({
      shareholderEmail: text,
    });
  };
  saveShareHolderItem = () => {
    const {
      shareholderFullname,
      initialValue,
      shareholderMobile,
      shareholderEmail,
    } = this.state;
    if (shareholderFullname.length === 0) {
      this.handleToast(0, formValidations.fullName);
    } else if (shareholderMobile.length === 0) {
      this.handleToast(0, formValidations.mobile);
    } else if (shareholderMobile.length < 9) {
      this.handleToast(0, formValidations.mobileDigit);
    } else if (shareholderEmail.length == 0) {
      this.handleToast(0, formValidations.emailempty);
    } else if (isValidEmail(shareholderEmail) === false) {
      this.handleToast(0, formValidations.emailFormat);
    } else {
      var item = {
        email: shareholderEmail,
        mobile_number: shareholderMobile,
        share_holder_name: shareholderFullname,
        share_holder_percentage: `${initialValue}`,
      };

      this.setState(
        {
          totalPercentage: this.state.temporaryPercentage + initialValue,
          temporaryPercentage: this.state.temporaryPercentage + initialValue,
        },
        () => {
          this.setState({
            shareHolderList: [...this.state.shareHolderList, item],
            shareholderFullname: "",
            shareholderMobile: "",
            shareholderEmail: "",
            addAnotherShareholderitem: false,
            initialValue: 1,
          });
        }
      );
    }
  };

  render() {
    const {
      shareHolderList,
      totalPercentage,
      addAnotherShareholderitem,
      isLoading,
      initialValue,
      shareholderFullname,
      shareholderMobile,
      shareholderEmail,
      showToastpopup,
      toastType,
      toastMessage,
    } = this.state;
    return (
      <Container>
        {isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Loader />
          </View>
        ) : (
          <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <AuthHeader tittle={`Share Holders`} />
            <View
              style={{
                borderTopWidth: 0.5,
                borderColor: COLORS.mdt,
                paddingBottom: SIZES.padding,
              }}
            />
            <Error
              dissMiss={this.onDismiss}
              visible={showToastpopup}
              type={toastType}
              tittle={toastMessage}
            />
            <KeyboardAwareScrollView
              scrollEnabled={true}
              keyboardShouldPersistTaps={"handled"}
              contentContainerStyle={{ flexGrow: 1 }}
              enableOnAndroid={true}
              enableAutomaticScroll
              enableResetScrollToCoords={true}
              keyboardDismissMode="interactive"
            >
              <View style={{ paddingHorizontal: 20 }}>
                <View style={{ height: 20 }} />
                <ShareHoldersList
                  desc={""}
                  shareHolderPress={this.saveShareHolderItem}
                  pressEditNavigation={this.pressEditNavigation}
                  addAnotherSharePress={this.addAnotherSharePress}
                  addSharePage={addAnotherShareholderitem}
                  percentage={totalPercentage}
                  addedPercentage={initialValue}
                  shareHolderList={shareHolderList}
                  deletePress={this.deleteNewShareholders}
                  plusPress={this.plusClick}
                  minusPress={this.minusClick}
                  shareholderFullname={shareholderFullname}
                  shareholderMobile={shareholderMobile}
                  shareholderEmail={shareholderEmail}
                  onChangeShareholderFullname={this.onChangeShareholderFullname}
                  onChangeShareholderMobile={this.onChangeShareholderMobile}
                  onChangeShareholderEmail={this.onChangeShareholderEmail}
                />
              </View>
            </KeyboardAwareScrollView>
            <View
              style={{
                height: 70,
                width: SIZES.width,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Footer>
                <Button
                  onPress={() => this.props.navigation.goBack()}
                  type={3}
                  color={COLORS.white}
                >
                  <ButtonText
                    color={COLORS.primary}
                    text={strings.bt_Back}
                  ></ButtonText>
                </Button>
                <Button
                  icon={images.Enable_icon}
                  onPress={this.updateNextPage}
                  type={2}
                  color={COLORS.primary}
                >
                  <ButtonText
                    color={COLORS.white}
                    text={strings.bt_Confirm}
                  ></ButtonText>
                </Button>
              </Footer>
            </View>
          </View>
        )}
      </Container>
    );
  }
}
