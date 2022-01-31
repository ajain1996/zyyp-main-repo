import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { COLORS, images } from "../../constants";
import { OnboardingCheckinDescText } from "../SemoboldText";
import styles from "./expenseSearch.style";
export const PaymentSearchItem = ({ item, onItemSelected, hasImage }) => {
  return (
    <TouchableOpacity
      key={item.id}
      onPress={onItemSelected}
      style={styles().paymentItemContainer}
    >
      <View style={styles().searchIcon}>
        {hasImage ? (
          <Image source={images.item1} style={{ width: 40, height: 40 }} />
        ) : (
          <View />
        )}
        <View style={styles().padding} />
        <OnboardingCheckinDescText text={item.value} color={COLORS.black} />
      </View>
      {item.selected === true ? (
        <Icon name={"checkcircleo"} color={COLORS.primary} size={30} />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};
