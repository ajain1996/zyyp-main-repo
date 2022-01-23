import React from "react";
import { View, Image } from "react-native";
import { TimelineDate, TimelineAction, TimelineName } from "..";
import { images } from "../../constants";
import styles from "./expenseTimeline.style";
export const ExpenseFeed = ({text = ""}) => {
  return (
    <View style={styles().shadow}>
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
  );
};
