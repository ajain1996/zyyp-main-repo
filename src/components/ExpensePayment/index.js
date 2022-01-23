import React, { useState } from "react";
import { View, Switch, Text } from "react-native";
import { DescText, PlaceHolderText } from "..";
import { COLORS } from "../../constants";
import styles from "./expensePayment.style";
import { PaymentMethod } from "./paymentMethod";
export const ExpensePayment = ({
  isPaymentEnable,
  onChangePayment,
  paymentType,
  clickUnclaimedAction,
  unClaimed,
  zyypDocument,
  pickZyypFile,
  closeBtn,
  isCheckIn,
  onChangeZyypCheckInBtn,
  paymentDate,
  onPressDate,
  personalDocument,
  pickPersonalFile,
  isPersonalCheckIn,
  onChangePersonalCheckInBtn,
  personalMoreAmount,
  onChangePersonalAmount,
  onChangeZyypAmount,
  onChangePaymentSwitch,
}) => {
  const [isEnabled, setIsEnabled] = useState(isPaymentEnable);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onChangePaymentSwitch(isEnabled);
  };
  return (
    <View style={styles().container}>
      <View style={styles().paymentTextStyle}>
        <PlaceHolderText color={COLORS.black} text={"Payment Made?"} />
        <View style={{right:10}}>
        <Switch
          style={{ transform: [{ scaleX: 2.0 }, { scaleY: 2.0 }] }}
          trackColor={{ false: COLORS.second, true: COLORS.strong }}
          thumbColor={isEnabled ? COLORS.white : COLORS.white}
          ios_backgroundColor={COLORS.second}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        </View>
      </View>
      <View>
        <DescText
          text={
            "Select if you have already made a transaction through this app, cash, or your personal card."
          }
        />
      </View>
      <PaymentMethod
        isPaymentEnable={isEnabled}
        onChangePayment={onChangePayment}
        paymentType={paymentType}
        unClaimed={unClaimed}
        zyypDocument={zyypDocument}
        clickUnclaimedAction={clickUnclaimedAction}
        pickZyypFile={pickZyypFile}
        closeBtn={closeBtn}
        isCheckIn={isCheckIn}
        onChangeZyypCheckInBtn={onChangeZyypCheckInBtn}
        paymentDate={paymentDate}
        onPressDate={onPressDate}
        personalDocument={personalDocument}
        pickPersonalFile={pickPersonalFile}
        isPersonalCheckIn={isPersonalCheckIn}
        onChangePersonalCheckInBtn={onChangePersonalCheckInBtn}
        personalMoreAmount={personalMoreAmount}
        onChangePersonalAmount={onChangePersonalAmount}
        onChangeZyypAmount={onChangeZyypAmount}
      />
    </View>
  );
};
