import React from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { COLORS, images } from "../../constants";
import styles from "./expenseTransaction.style";
export const TransactionItem = ({
  item,
  placeholder,
  onChangeText,
  value,
  clearAction,
  selected = false,
  unClaimedTransactionSelectionAction,
}) => {
  return (
    <TouchableOpacity
      onPress={unClaimedTransactionSelectionAction}
      style={[
        styles().itemContainer,
        {
          backgroundColor: item.selected ? "#F5EFFD" : COLORS.white,
          borderColor: value ? COLORS.primary : COLORS.inner_line,
        },
      ]}
    >
      {item.selected ? (
        <View style={[styles().checkbox, { backgroundColor: "#E5D6FA",alignItems:"center",justifyContent:"center" }]}>
          <Image source={images.tick} style={{ width: 20, height: 20 }} />
        </View>
      ) : (
        <View style={styles().checkbox} />
      ) }

      <View style={{ width: 10 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 15,
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
              color: "#323F4B",
            }}
          >
            ITC Hotel
          </Text>
          <View style={{ height: 5 }} />
          <Text
            style={{
              fontSize: 12,
              lineHeight: 14,
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
              color: "#7B8794",
            }}
          >
            Aug 12, 2021 | 02:30pm
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                lineHeight: 11,
                fontWeight: "700",
                fontFamily: "Poppins-Regular",
                color: "#7B8794",
              }}
            >
              AED
            </Text>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 18,
                fontWeight: "700",
                fontFamily: "Poppins-Regular",
                color: "#323F4B",
              }}
            >
              {" "}
              321
            </Text>
          </View>
          <View style={{ height: 5 }} />
          <Text
            style={{
              fontSize: 12,
              lineHeight: 13,
              fontWeight: "700",
              fontFamily: "Poppins-Regular",
              color: "#323F4B",
            }}
          >
            xxx6537
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
