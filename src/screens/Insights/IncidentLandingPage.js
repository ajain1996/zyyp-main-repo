import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { TransactionItem } from "../../components/ExpenseTransaction/transactionItem";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../Expense/expense.style";
import { COLORS, FONTS, images, SIZES } from "../../constants";

const jsonList = [
  {
    id: 1,
    value: "Expense Project 1",
    color: "Green",
    selected: false,
  },
  {
    id: 2,
    value: "Expense Project 2",
    color: "Green",
    selected: false,
  },
  {
    id: 3,
    value: "Expense Project 3",
    color: "Green",
    selected: false,
  },
  {
    id: 4,
    value: "Expense Project 4",
    color: "Green",
    selected: false,
  },
  {
    id: 5,
    value: "Expense Project 5",
    color: "Green",
    selected: false,
  },
  {
    id: 6,
    value: "Expense Project 6",
    color: "Green",
    selected: false,
  },
  {
    id: 7,
    value: "Expense Project 7",
    color: "Green",
    selected: false,
  },
  {
    id: 8,
    value: "Expense Project 8",
    color: "Green",
    selected: false,
  },
  {
    id: 9,
    value: "Expense Project 9",
    color: "Green",
    selected: false,
  },
  {
    id: 10,
    value: "Expense Project 10",
    color: "Green",
    selected: false,
  },
];

export default function IncidentLandingPage({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('IncidentDetails')}
      style={[
        styles2.itemContainer,
        {
          backgroundColor: item.selected ? "#F5EFFD" : COLORS.white,
          borderColor: COLORS.white,
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
              fontWeight: "400",
              fontFamily: "Poppins-Regular",
              color: "#323F4B",
            }}
          >
            #INCI2983742983
          </Text>
          <View style={{ height: 5 }} />
          <Text
            style={{
              fontSize: 12,
              lineHeight: 14,
              fontWeight: "400",
              fontFamily: "Poppins-Regular",
              color: "#7B8794",
            }}
          >
            31 Dec, 2021{" "}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: '#FFE9DB',
              borderRadius: 15,
              paddingHorizontal: 10,
              paddingVertical: 2 
            }}
          >
            <View
              style={{
                backgroundColor: '#FF914D',
                width: 5  ,
                height: 5 ,
                borderRadius: 10,
                marginRight: 2
              }}
            >
            </View>
            <Text
              style={{
                fontSize: 10,
                // lineHeight: 10,
                fontWeight: "500",
                fontFamily: "Poppins-Regular",
                color: "#FF914D",
              }}
            >
              {" "}
              Pending
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
            
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // const itemSelection = ({ type, item }) => {
  //   unClaimedTransactionSelectionAction({ type, item });
  // };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles().header}>
          <TouchableOpacity
            style={{
              //   width: 44,
              //   height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name={"chevron-back"} size={27} color={"#85949F"} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              //   height: 60,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color: "#323F4B",
                fontSize: 21,
                fontWeight: "400",
                fontFamily: "Poppins-Regular",
              }}
            >
              Incidents
            </Text>
          </View>
          <TouchableOpacity
            style={{
              //   width: 44,
              //   height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate('ReportIncident')}
          >
            <Icon1 name={"plus"} size={24} color={"#85949F"} />
          </TouchableOpacity>
        </View>

        <FlatList
          removeClippedSubviews
          data={jsonList}
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(20),
            paddingVertical: 10,
            marginBottom: 13,
            backgroundColor: "#F7F5FA",
          }}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.modalBG,
  },
  topPadding: {
    height: 10,
  },
  closeBtnContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: moderateScale(20),
  },
  textFieldContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.bg,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: COLORS.inputborder,
    borderWidth: 1,
    borderRadius: SIZES.radius / 3,
    paddingHorizontal: moderateScale(10),
    height: moderateScale(50),
    ...FONTS.body4,
  },
  itemContainer: {
    height: moderateScale(70),
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginBottom: moderateScale(10),
    borderRadius: 8,
    shadowColor: COLORS.pl,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  checkbox: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.bc,
    borderRadius: 4,
  },
});
