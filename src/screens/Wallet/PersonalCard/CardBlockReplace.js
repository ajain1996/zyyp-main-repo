import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import SelectDropdown from "react-native-select-dropdown";
import SvgUri from "react-native-svg-uri";
import CustomTextComponent from "../../../components/CustomTextComponent";
import { COLORS } from "../../../utils/colors";
import { CompanyWalletTransactionHeader } from "../CompanyWalletTransactionScreen";
import { WithdrawFundsBtn } from "../WithDrawlFundsScreen";
export default CardBlockReplace = ({ navigation }) => {
  const cardData = ["Card lost", "card1", "card2", "card3"];

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#fff" }}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: 44,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icons/arrow-back.png')}
            style={[styles.ImageStyle, {tintColor:'#7B8794'}]}
          />
        </TouchableOpacity>
        <View
          style={{alignItems: 'center', justifyContent: 'center', height: 60}}>
          <Text
            style={{
              color: '#323F4B',
              fontSize: 21,
              marginRight:100,
              fontWeight: '400',
              fontFamily: 'Poppins-Regular',
            }}>
            Block & Replace
          </Text>
        </View>
      </View> */}
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Block & Replace"
      />

      <View style={{ marginTop: 20 }} />

      <Text
        style={{
          color: "#343C44",
          fontSize: 13,
          marginLeft: 30,
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
        }}
      >
        Reason for request
      </Text>

      <View
        style={{
          marginLeft: 30,
          marginRight: 30,
          marginTop: 10,
          backgroundColor: "#E5E5E5",
        }}
      >
        <SelectDropdown
          data={cardData}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"Card lost"}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            console.log(isOpened);
            return (
              <SvgUri
                source={require("../../../../assets/svg/down-arrow.svg")}
                style={[
                  styles.ImageStyle,
                  { tintColor: "#7B8794", width: 20, height: 20 },
                ]}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1, marginLeft: 15 }}
          placeholderTextColor={"#85949F"}
          placeholder="Type any relevant comment on this request"
          textAlignVertical="top"
          fontSize={18}
          multiline={true}
          textAlignVertical={"top"}
          underlineColorAndroid="transparent"
        />
      </View>

      {/* <Text
        style={{
          color: "#85949F",
          fontSize: 20,
          marginLeft: 30,

          marginRight: 30,
          fontWeight: "600",
          fontFamily: "Poppins-Regular",
        }}
      >
        You will be changed a fixed fee of aed 40 for each request for a
        physical card replacement.
      </Text> */}
      <View style={{ marginHorizontal: 30 }}>
        <CustomTextComponent
          text={"You will be charged a fixed fee of"}
          fs={18}
          color={COLORS.BLACK40}
          fw="700"
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomTextComponent
            text={"aed 20"}
            fs={18}
            color={COLORS.ORANGE}
            fw="700"
          />
          <CustomTextComponent
            text={" for each request for a"}
            fs={18}
            color={COLORS.BLACK40}
            fw="700"
          />
        </View>
        <CustomTextComponent
          text={"stamped statement."}
          fs={18}
          color={COLORS.BLACK40}
          fw="700"
        />
      </View>
      {/* <View style={styles.ButtonStyle}>
        <Text
          style={{
            fontSize: 15,
            color: "#ffff",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          REQUEST CARD
        </Text>
        <Image
          source={require("../../../../assets/images/Tick.png")}
          style={styles.ImageStyle}
        />
      </View> */}
      <View style={{ justifyContent: "flex-end", marginBottom: 20, marginTop: "auto" }}>
        <WithdrawFundsBtn
          text="REQUEST CARD"
          onPress={() => {
            // ConfirmTransferScreen
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD2D9",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",

    backgroundColor: "#F7F8FA",
    elevation: 1,
    height: 220,
    borderRadius: 8,
    margin: 30,
  },

  ButtonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#7B35E7",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 50,
    borderRadius: 10,
    margin: 30,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,

    resizeMode: "stretch",
    alignItems: "center",
  },

  dropdown1BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#F7F8FA",
    elevation: 1,
    borderRadius: 8,
  },
  dropdown1BtnTxtStyle: { color: "#AABBC6", textAlign: "left", fontSize: 16 },
  dropdown1DropdownStyle: { backgroundColor: "#F7F8FA" },
  dropdown1RowStyle: {
    backgroundColor: "#F7F8FA",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#AABBC6", textAlign: "left", fontSize: 18 },
});
