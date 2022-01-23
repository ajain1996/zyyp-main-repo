import React, { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/EvilIcons";
import {
  Button,
  ButtonText,
  Footer,
  TransactionDesc,
  TransactionTitle,
} from "..";
import { COLORS, images } from "../../constants";
import styles from "./expenseTransaction.style";
import { TransactionItem } from "./transactionItem";
export const ExpenseTransaction = ({
  visible,
  unClaimedTransactionSelectionAction,
  claimedItemSelected,
  list,
}) => {
  const renderItem = ({ item }) => (
    <TransactionItem
      unClaimedTransactionSelectionAction={() =>
        itemSelection({ type: "selection", item })
      }
      item={item}
    />
  );

  const itemSelection = ({ type, item }) => {
    unClaimedTransactionSelectionAction({ type, item });
  };

  return (
    <Modal visible={visible} transparent={true}>
      <SafeAreaView style={[styles().container]}>
        <View style={styles().container}>
          <View style={styles().topPadding} />
          <View style={{ flex: 1 }}>
            <View style={styles().closeBtnContainer}>
              <TouchableOpacity
                onPress={() => itemSelection({ type: "close", item: null })}
                style={{ width: 40, height: 40 }}
              >
                <Icon name="close" size={30} color={COLORS.pl} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: moderateScale(20) }}>
              <TransactionTitle text={"Select Unclaimed Transactions"} />
              <TransactionDesc
                text={
                  "Below are unclaimed transactions made from your zyyp card. You can tag only one transaction to your expense request."
                }
              />
            </View>
            <View style={styles().topPadding} />
            <View style={{ flex: 1 }}>
              <FlatList
                removeClippedSubviews
                data={list}
                style={{ flex: 1, paddingHorizontal: moderateScale(20) }}
                keyExtractor={(item, index) => `${index}`}
                renderItem={renderItem}
                extraData={list}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 70,
                  backgroundColor: COLORS.white,
                }}
              >
                <Button
                  onPress={() => itemSelection({ type: "close", item: null })}
                  type={3}
                  color={COLORS.white}
                >
                  <ButtonText text={"CANCEL"} color={COLORS.primary} />
                </Button>
                <View style={{ width: 5 }} />
                <Button
                  onPress={claimedItemSelected}
                  type={2}
                  icon={images.Next}
                  color={COLORS.primary}
                >
                  <ButtonText color={COLORS.white} text={"SELECT"} />
                </Button>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
