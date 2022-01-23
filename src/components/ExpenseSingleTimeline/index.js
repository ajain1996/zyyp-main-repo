import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import {
  PlaceHolderText,
  TimelineAction,
  TimelineDate,
  TimelineName,
  TimelineWeek,
} from "../../components";
import { COLORS, images } from "../../constants";
import { TimeLineDateNm } from "../SemoboldText";
import styles from "./expense.style";
export const ExpenseSingleTimeline = ({ text }) => {
  return (
    <View style={styles().container}>
      <View
        style={{ width: 50, flexDirection: "column", alignItems: "center" }}
      >
        <TimelineWeek text={"THU"} />
        <TimeLineDateNm text={"23"} color={COLORS.secondary2} />
        <Image source={images.dot} style={{ width: 6, height: 6 }} />
      </View>
      <View
        style={{
          flex: 1,
          marginRight: 10,
          shadowColor: COLORS.pl,
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.7,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFill,
            bottom: 7,
            backgroundColor: "white",
            borderRadius: 7,
            shadowColor: COLORS.pl,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.7,
            shadowRadius: 5,
            elevation: 5,
          }}
        />
        <View
          style={{
            ...StyleSheet.absoluteFill,
            bottom: 14,
            backgroundColor: "white",
            borderRadius: 7,
            shadowColor: COLORS.pl,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.7,
            shadowRadius: 5,
            elevation: 5,
          }}
        />
        <View style={styles().timelineContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              height: 50,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={images.face} style={styles().imageIcon} />
              <View style={{ width: 5 }} />
              <TimelineName text={"Approver 1 Name"} />
            </View>
            <View style={{ height: 27, justifyContent: "center" }}>
              <TimelineDate text={"02:23pm"} />
            </View>
          </View>
          <TimelineAction text={"Asked Info"} />
          <View style={{ height: 10 }} />
          <TimelineName text={text} />
        </View>
      </View>
    </View>
  );
};
