/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding --- Emirates
import React from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DatePickerModal } from "react-native-paper-dates";
import ImagePicker from "react-native-image-crop-picker";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { COLORS, images, SIZES } from "../../constants";
import {
  EditableField,
  UploadButton,
  TextField,
  DateButton,
  UploadDotButton,
  ButtonText,
} from "../../components";
import image from "../../constants/image";
import { getDateToString } from "../../Utilities/utils";

export default class Emirates extends React.PureComponent {
  state = {
    issueDatePicker: false,
    issueValue: "",
    expiryDatePicker: false,
    expiryValue: "",
    frontImg: null,
    backImg: null,
    frontImagePickerVisible: false,
    backImagePickerVisible: false,
  };

  pickFrontImage = () => {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: "photo",
    }).then((image) => {
      this.setState(
        {
          frontImagePickerVisible: false,
        },
        () => {
          this.setState(
            {
              frontImg: {
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
              },
            },
            () => {
              this.props.onChangeFrontDocument({
                uri: image.path,
                name: image.filename,
                type: image.mime,
              });
            }
          );
        }
      );
    });
  };

  pickFrontCameraImage = () => {
    ImagePicker.openCamera({
      cropping: false,
      mediaType: "photo",
    }).then((image) => {
      this.setState(
        {
          frontImagePickerVisible: false,
        },
        () => {
          this.setState(
            {
              frontImg: {
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
              },
            },
            () => {
              this.props.onChangeFrontDocument({
                uri: image.path,
                name: image.filename,
                type: image.mime,
              });
            }
          );
        }
      );
    });
  };

  pickBackImage = () => {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: "photo",
    }).then((image) => {
      this.setState(
        {
          backImagePickerVisible: false,
        },
        () => {
          this.setState({
            backImg: {
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: image.mime,
            },
          });
          this.props.onChangeBackDocument({
            uri: image.path,
            name: image.filename,
            type: image.mime,
          });
        }
      );
    });
  };

  pickBackCameraImage = () => {
    ImagePicker.openCamera({
      cropping: false,
      mediaType: "photo",
    }).then((image) => {
      this.setState(
        {
          backImagePickerVisible: false,
        },
        () => {
          this.setState({
            backImg: {
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: image.mime,
            },
          });
          this.props.onChangeBackDocument({
            uri: image.path,
            name: image.filename,
            type: image.mime,
          });
        }
      );
    });
  };

  openModal = () => {
    this.setState({
      frontImagePickerVisible: true,
    });
  };

  openModal1 = () => {
    this.setState({
      backImagePickerVisible: true,
    });
  };

  render() {
    const {
      item,
      editable,
      onChangeFullname,
      document_id,
      emiratesIssueDate,
      emiratesExpiryDate,
      emiratesFrontDocument,
      emiratesBackDocument,
      editPress,
      onCancelPress,
      onChangeIdNumber,
      onSuccesPress,
      orgName,
    } = this.props;
    const {
      issueDatePicker,
      expiryDatePicker,
      expiryValue,
      issueValue,
      frontImagePickerVisible,
      backImagePickerVisible,
      frontImg,
      backImg,
    } = this.state;
    return (
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        keyboardDismissMode="interactive"
      >
        <Modal
          transparent={true}
          visible={frontImagePickerVisible}
          animationType={"none"}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({
                frontImagePickerVisible: !this.state.frontImagePickerVisible,
              });
            }}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                height: verticalScale(150),
                marginHorizontal: 5,
                marginBottom: 20,
                borderRadius: 16,
              }}
            >
              <TouchableOpacity
                onPress={this.pickFrontImage}
                style={{
                  height: verticalScale(50),
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              >
                <ButtonText color={COLORS.black} text={"File Browser"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.pickFrontCameraImage}
                style={{
                  height: verticalScale(50),
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ButtonText color={COLORS.black} text={"CAMERA"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    frontImagePickerVisible:
                      !this.state.frontImagePickerVisible,
                  });
                }}
                style={{
                  height: verticalScale(50),
                  backgroundColor: COLORS.secondary2,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <ButtonText color={COLORS.white} text={"CANCEL"} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          transparent={true}
          visible={backImagePickerVisible}
          animationType={"none"}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({
                backImagePickerVisible: !this.state.backImagePickerVisible,
              });
            }}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                height: verticalScale(150),
                marginHorizontal: 5,
                marginBottom: 20,
                borderRadius: 16,
              }}
            >
              <TouchableOpacity
                onPress={this.pickBackImage}
                style={{
                  height: verticalScale(50),
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              >
                <ButtonText color={COLORS.black} text={"File Browser"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.pickBackCameraImage}
                style={{
                  height: verticalScale(50),
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ButtonText color={COLORS.black} text={"CAMERA"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    backImagePickerVisible: !this.state.backImagePickerVisible,
                  });
                }}
                style={{
                  height: verticalScale(50),
                  backgroundColor: COLORS.secondary2,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <ButtonText color={COLORS.white} text={"CANCEL"} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={{ paddingHorizontal: 20 }}>
          <EditableField
            onChangeText={onChangeFullname}
            orgName={orgName}
            onCancelPress={onCancelPress}
            onSuccesPress={onSuccesPress}
            editPress={editPress}
            editable={editable}
            item={item.editable}
          />
          <TextField
            placeholderContent={"ID No"}
            placeholder={"784 - XXXX - XXXXXXX - X"}
            onChangeText={onChangeIdNumber}
            text={document_id}
            keyboardType={"numeric"}
          />
          <DatePickerModal
            mode={"single"}
            visible={issueDatePicker}
            disableStatusBar={true}
            onDismiss={() => this.setState({ issueDatePicker: false })}
            onConfirm={(dt) => {
              let date = getDateToString(dt.date);
              this.setState({
                issueDatePicker: false,
                issueValue: dt.date.toISOString(),
              });
              this.props.onChangeEmiratesIssueDate(dt.date);
            }}
            date={new Date()}
          />
          <DatePickerModal
            mode={"single"}
            visible={expiryDatePicker}
            disableStatusBar={true}
            onDismiss={() => this.setState({ expiryDatePicker: false })}
            onConfirm={(dt) => {
              let date = getDateToString(dt.date);
              this.setState({
                expiryDatePicker: false,
                expiryValue: dt.date.toISOString(),
              });
              this.props.onChangeEmiratesExpiryDate(dt.date);
            }}
            date={new Date()}
          />
          <DateButton
            type={1}
            text={"MM-DD-YYYY"}
            value={emiratesIssueDate}
            placeholderContent={"Issue Date"}
            onPress={() => this.setState({ issueDatePicker: true })}
          />
          <DateButton
            type={1}
            text={"MM-DD-YYYY"}
            value={emiratesExpiryDate}
            placeholderContent={"Expiry Date"}
            onPress={() => this.setState({ expiryDatePicker: true })}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            {frontImg === null ? (
              <UploadDotButton
                color={COLORS.bg}
                text={"Front of document"}
                onPress={this.openModal}
              />
            ) : (
              <Image
                source={frontImg}
                style={{
                  width: moderateScale(SIZES.width * 0.38),
                  height: verticalScale(80),
                  borderRadius: 8,
                  borderStyle: "dashed",
                  marginVertical: 20,
                  paddingHorizontal: 10,
                  borderWidth: 2,
                  borderColor: COLORS.pl,
                }}
              />
            )}
            {backImg === null ? (
              <UploadDotButton
                color={COLORS.bg}
                text={"Back of document"}
                onPress={this.openModal1}
              />
            ) : (
              <Image
                source={backImg}
                style={{
                  width: moderateScale(SIZES.width * 0.38),
                  height: verticalScale(80),
                  borderRadius: 8,
                  borderStyle: "dashed",
                  marginVertical: 20,
                  paddingHorizontal: 10,
                  borderWidth: 2,
                  borderColor: COLORS.pl,
                }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            {frontImg === null ? (
              <View />
            ) : (
              <TouchableOpacity
                onPress={() => this.setState({ frontImg: null })}
                style={{
                  width: moderateScale(SIZES.width * 0.38),
                  height: verticalScale(80),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={image.CloseBtn}
                />
              </TouchableOpacity>
            )}
            {backImg === null ? (
              <View />
            ) : (
              <TouchableOpacity
                onPress={() => this.setState({ backImg: null })}
                style={{
                  width: moderateScale(SIZES.width * 0.38),
                  height: verticalScale(80),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={image.CloseBtn}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
