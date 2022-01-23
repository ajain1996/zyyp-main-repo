import React from "react";
import { Text, View,Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, images } from "../../constants";
import DashedLine from "../DashedLine";
import { PlaceHolderText,TimelineWeek,TimeLineDateNm } from "../SemoboldText";
import { ExpenseFeed } from "./expenseFeed";
import styles from "./expenseTimeline.style";

export const ExpenseTimeline = ({ item }) => {
    return (<View style={styles().container}>
        <View style={{ width:50, flexDirection: "column", alignItems: "center" }}>
            <TimelineWeek text={"THU"} />
            <TimeLineDateNm text={"23"} color={COLORS.secondary2} />
            <Image source={images.dot} style={{width:6,height:6}} />
            <View style={{ flexDirection: "row", flex: 1 }}>
            <DashedLine axis={"vertical"} dashColor='#CBD2D9' dashLength={3} dashThickness={3} />
                {/* <View style={{ width:2, borderStyle: "dotted",borderRadius:2, borderWidth: 1, borderColor: "#CBD2D9" }} /> */}
            </View>
        </View>
        <View style={{ flex: 1, marginBottom: moderateScale(20), borderRadius: 4, }}>
           <ExpenseFeed text={"Hey, please can you provide additional reasoning for why this expense is needed. We will also need additional approval for this request"} />
        </View>
    </View>)
}