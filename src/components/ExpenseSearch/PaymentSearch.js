import React from "react";
import { View, Modal, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../constants";
import { OnboardingCheckinTitleText } from "../SemoboldText";
import styles from "./expenseSearch.style";
import { PaymentSearchItem } from "./PaymentSearchItem";
import { SearchField } from "./SearchField";

export const PaymentSearch = ({
  title,
  placeholder,
  hasImage,
  visible,
  list,
  onDismiss,
  onChangeText,
  extraData,
  onItemSelected,
  text,
  clearAction,
}) => {
  const renderItem = ({ item }) => (
    <PaymentSearchItem
      item={item}
      hasImage={hasImage}
      onItemSelected={() => onItemSelected(item)}
    />
  );
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles().container}>
        <View style={styles().headerStyle}>
          <TouchableOpacity onPress={onDismiss}>
            <Icon name={"chevron-back"} size={27} color={COLORS.black} />
          </TouchableOpacity>
          <OnboardingCheckinTitleText text={title} />
          <View />
        </View>
        <View style={styles().body}>
          <SearchField
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={text}
            clearAction={clearAction}
          />
          <FlatList
            removeClippedSubviews
            data={list}
            keyExtractor={(item, index) => `${index}`}
            renderItem={renderItem}
            extraData={extraData}
          />
        </View>
      </View>
    </Modal>
  );
};
