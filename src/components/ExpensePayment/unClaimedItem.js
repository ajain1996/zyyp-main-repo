import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { COLORS } from "../../constants";
import styles from "./expensePayment.style";
export const UnClaimedItem = ({ highlighted = true, closeBtn }) => {
  return (
    <View
      style={[
        styles().itemContainer,
        {
          borderColor: "transparent",
          backgroundColor: highlighted ? COLORS.selectedBG : COLORS.white,
        },
      ]}
    >
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
        <TouchableOpacity
          onPress={closeBtn}
          style={{
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="close" size={30} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
