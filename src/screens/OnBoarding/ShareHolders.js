/* eslint-disable react-native/no-inline-styles */
//GIT UI deliverables issue #4: Individual first time Login and on-boarding ---- ShareHolders
import React from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AdditionalShareHolders,
  CheckinBox,
  ShareHoldersList,
  MyshareHolders,
} from "../../components";
import { SIZES, strings } from "../../constants";
export default class ShareHolders extends React.PureComponent {
  render() {
    const {
      isCheckin,
      addedPercentage,
      shareholderFullname,
      shareholderMobile,
      shareholderEmail,
      onChangeShareholderFullname,
      onChangeShareholderMobile,
      onChangeShareholderEmail,
      onChangeTextInputPercentage,
      onChangeTextInputPercentageUpdate,
      onChangeShareholderPlusPercentage,
      onChangeShareholderMinusPercentage,
      onPress,
      shareHolderCheckIn,
      deletePress,
      addSharePage,
      addAnotherSharePress,
      pressEditNavigation,
      stage,
      myPercentage,
      plusPress,
      minusPress,
      shareHolderList,
      shareHolderPress,
    } = this.props;
    return (
      <View style={{ paddingHorizontal: 0, height: SIZES.height - 180 }}>
        <KeyboardAwareScrollView
          scrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          enableOnAndroid={true}
          enableResetScrollToCoords={true}
          keyboardDismissMode="interactive"
        >
          <View style={{ paddingHorizontal: 20 }}>
            {stage === 3 ? (
              <View />
            ) : (
              <CheckinBox
                onPress={onPress}
                shareHolderCheckIn={shareHolderCheckIn}
                title={"I am a Shareholder"}
                isCheckin={isCheckin}
                borderEnable={stage === 1 ? false : true}
                desc={strings.checkBoxInfo}
              />
            )}
            {stage === 1 ? (
              <MyshareHolders
                desc={strings.shareHolderInfo}
                shareHolderPress={shareHolderPress}
                plusPress={plusPress}
                minusPress={minusPress}
                percentage={myPercentage}
                addedPercentage={addedPercentage}
                onChangeTextInputPercentage={onChangeTextInputPercentage}
                type={1}
              />
            ) : stage === 3 ? (
              <ShareHoldersList
                deletePress={deletePress}
                desc={strings.shareHolderInfo}
                shareHolderPress={shareHolderPress}
                pressEditNavigation={pressEditNavigation}
                addAnotherSharePress={addAnotherSharePress}
                addSharePage={addSharePage}
                percentage={myPercentage}
                addedPercentage={addedPercentage}
                plusPress={plusPress}
                minusPress={minusPress}
                shareholderFullname={shareholderFullname}
                shareholderMobile={shareholderMobile}
                shareholderEmail={shareholderEmail}
                onChangeShareholderFullname={onChangeShareholderFullname}
                onChangeShareholderMobile={onChangeShareholderMobile}
                onChangeShareholderEmail={onChangeShareholderEmail}
                onChangeTextInputPercentage={onChangeTextInputPercentageUpdate}
                shareHolderList={shareHolderList}
              />
            ) : (
              <AdditionalShareHolders
                deletePress={deletePress}
                shareHolderPress={shareHolderPress}
                desc={strings.shareHolderInfo}
                shareNumber={1}
                plusPress={plusPress}
                minusPress={minusPress}
                percentage={myPercentage}
                addedPercentage={addedPercentage}
                shareholderFullname={shareholderFullname}
                shareholderMobile={shareholderMobile}
                shareholderEmail={shareholderEmail}
                onChangeShareholderFullname={onChangeShareholderFullname}
                onChangeShareholderMobile={onChangeShareholderMobile}
                onChangeShareholderEmail={onChangeShareholderEmail}
                onChangeTextInputPercentage={onChangeTextInputPercentage}
                onChangeShareholderPlusPercentage={
                  onChangeShareholderPlusPercentage
                }
                onChangeShareholderMinusPercentage={
                  onChangeShareholderMinusPercentage
                }
                type={1}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
