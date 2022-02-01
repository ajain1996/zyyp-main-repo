import React, { useEffect, useState } from "react";

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
import { ButtonText, UploadButton } from "../../components";
import { Notes } from "../../components/Notes";
import { COLORS } from "../../constants";
// import { Notes } from "../../../components/Notes";
import { CompanyWalletTransactionHeader } from "../Wallet/CompanyWalletTransactionScreen";
import { WithdrawFundsBtn } from "../Wallet/WithDrawlFundsScreen";
export default ReportIncident = ({ navigation }) => {
  const cardData = ["Card 1", "card 2", "card 3", "card 4"];

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#fff" }}>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Report New Incident"
      />

      <View style={{ marginTop: 20 }} />

      <Text
        style={{
          color: "#343C44",
          fontSize: 12,
          marginHorizontal: 24,
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
        }}
      >
        Incident Type
      </Text>

      <View
        style={{
          marginHorizontal: 24,
          marginTop: 10,
          // backgroundColor: "#E5E5E5",
        }}
      >
        <SelectDropdown
          data={cardData}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"Select type of Incident"}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            console.log(isOpened);
            return (
              <SvgUri
                source={require("../../../assets/svg/down-arrow-br.svg")}
                // style={[
                //   styles.ImageStyle,
                //   { tintColor: "#7B8794", width: 20, height: 20 },
                // ]}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={{ marginHorizontal: 24, marginTop: 20 }}>
        <Notes
          placeholderContent={"Description"}
          placeholder={"Please describe the issue in detail."}
          popup={true}
          borCol={true}
        />
      </View>
      <View style={{ marginHorizontal: 24, marginTop: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              textAlign: "center",
              color: "#323F4B",
              fontSize: 15,
              lineHeight: 20,
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
            }}
          >
            Upload Screenshot
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.pl,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "normal",
              fontFamily: "Poppins-Regular",
            }}
          >
            {" "}
            (if available)
          </Text>
        </View>
        <UploadButton>
          <ButtonText color={COLORS.primary} text={"Upload Screenshot"} />
        </UploadButton>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          marginBottom: 20,
          marginTop: "auto",
        }}
      >
        <WithdrawFundsBtn text="SUBMIT" rightIcon={true} />
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
  dropdown1BtnTxtStyle: {
    color: "#AABBC6",
    textAlign: "left",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  dropdown1DropdownStyle: { backgroundColor: "#F7F8FA" },
  dropdown1RowStyle: {
    backgroundColor: "#F7F8FA",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#777", textAlign: "left", fontSize: 18 },
});
