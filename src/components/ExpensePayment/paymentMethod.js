import React from "react";
import { View } from "react-native";
import { DateButton } from "..";
import styles from "./expensePayment.style";
import { PersonalCard } from "./personalCard";
import { ZyypCard } from "./zyypCard";

export const PaymentMethod = ({
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
  onChangeZyypAmount
}) => {
  return (
    <View>
      {isPaymentEnable === true ? (
        <View>
          <DateButton
            onPress={onChangePayment}
            value={paymentType}
            type={2}
            placeholderContent={"Payment Type"}
          />
          <View style={styles().padding} />
          {paymentType === "Zyyp Card" ? (
            <ZyypCard
              unClaimed={unClaimed}
              zyypDocument={zyypDocument}
              clickUnclaimedAction={clickUnclaimedAction}
              pickZyypFile={pickZyypFile}
              closeBtn={closeBtn}
              isCheckIn={isCheckIn}
              onChangeZyypCheckInBtn={onChangeZyypCheckInBtn}
              onChangeZyypAmount={onChangeZyypAmount}
            />
          ) : (
            <PersonalCard
            paymentDate={paymentDate}
            onPressDate={onPressDate}
            personalDocument={personalDocument}
            pickPersonalFile={pickPersonalFile}
            isPersonalCheckIn={isPersonalCheckIn}
            onChangePersonalCheckInBtn={onChangePersonalCheckInBtn}
            personalMoreAmount={personalMoreAmount}
            onChangePersonalAmount={onChangePersonalAmount}
            />
          )}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};
