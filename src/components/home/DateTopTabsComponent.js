import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Card } from "react-native-paper";
import CustomTextComponent from "../CustomTextComponent";
import { windowHeight, windowWidth } from "../../utils/utils";
import SvgUri from "react-native-svg-uri";
import { showWeekDay } from "react-native-paper-dates/lib/typescript/src/Date/dateUtils";
const Tab = createMaterialTopTabNavigator();

const BuildTabComponent = ({ text, selectedVal, val, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{
      width: windowWidth / 5,
      paddingVertical: 2,
      alignItems: "center",
    }}>
      <View style={{ height: 10 }} />
      <CustomTextComponent
        text={text}
        fs={13}
        fw={"bold"}
        color={selectedVal === val ? "#000" : "#999"}
      />
      {selectedVal === val
        ? <View style={{ width: "74%", height: 3, backgroundColor: "#7B35E7", marginTop: 6 }} />
        : <></>}
    </TouchableOpacity>
  );
}

export default function DateTopTabsComponent({ navigation, showEmployee }) {
  const [dateBox, setDateBox] = useState("DEC22");

  const [merchantDetails, setMerchantDetails] = useState([
    {
      "amount": 100,
      "card_last_4_digits": "1234",
      "counter_party_account_label": "7827",
      "counter_party_account_name": "Merchant Name",
      "currency": "AED",
      "department_name": "Department Name",
      "employee_name": "Employee Name",
      "expense_id": "0ujsszwN8NRY24Y",
      "first_party_account_label": "5038",
      "first_party_account_name": "ITC Hotel Pvt Ltd",
      "merchant_city": "Dubai",
      "merchant_country": "UAE",
      "merchant_name": "CARD ACCEPTOR Name",
      "mode": "CASH",
      "receipt_document_url": "https://example.com/zyypdoc/5/8/receipt123",
      "receipt_in_company_name": true,
      "receipt_number": "234551234561008",
      "spend_category_icon": "meals.png",
      "spend_category_name": "Food",
      "transaction_direction": "DR",
      "transaction_id": "0ujsswThIGTUYm2K8FjOOfXtY1K",
      "transaction_status": "UNCLAIMED",
      "transaction_timestamp": "2021-01-02T19:42:32.987Z"
    }
  ]);

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          elevation: 160,
          shadowColor: "#999",
          backgroundColor: "#fff",
          marginVertical: 6,
        }}
      >
        <ScrollView
          style={{ width: "100%" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <BuildTabComponent
            text={"OCT '22"}
            selectedVal={dateBox}
            val="OCT22"
            onPress={() => { setDateBox("OCT22"); }}
          />

          <BuildTabComponent
            text={"NOV '22"}
            selectedVal={dateBox}
            val="NOV22"
            onPress={() => { setDateBox("NOV22"); }}
          />

          <BuildTabComponent
            text={"DEC '22"}
            selectedVal={dateBox}
            val="DEC22"
            onPress={() => { setDateBox("DEC22"); }}
          />

          <BuildTabComponent
            text={"JAN '22"}
            selectedVal={dateBox}
            val="JAN22"
            onPress={() => { setDateBox("JAN22"); }}
          />

          <BuildTabComponent
            text={"FEB '22"}
            selectedVal={dateBox}
            val="FEB22"
            onPress={() => { setDateBox("FEB22"); }}
          />

          <BuildTabComponent
            text={"MAR '22"}
            selectedVal={dateBox}
            val="MAR22"
            onPress={() => { setDateBox("MAR22"); }}
          />
        </ScrollView>
      </View>

      {dateBox === "OCT22" ? (
        <BuildMonthComponent
          navigation={navigation}
          showEmployee={showEmployee}
          merchantDetails={merchantDetails}
        />
      ) : (
        <></>
      )}

      {dateBox === "NOV22" ? (
        <BuildMonthComponent
          navigation={navigation}
          showEmployee={showEmployee}
          merchantDetails={merchantDetails}
        />
      ) : (
        <></>
      )}

      {dateBox === "DEC22"
        ? <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
          <CustomTextComponent text={"No Data"} fs={16} color="#000" />
        </View>
        : <></>}

      {dateBox === "JAN22" ? (
        <BuildMonthComponent
          navigation={navigation}
          showEmployee={showEmployee}
          merchantDetails={merchantDetails}
        />
      ) : (
        <></>
      )}

      {dateBox === "FEB22" ? (
        <BuildMonthComponent
          navigation={navigation}
          showEmployee={showEmployee}
          merchantDetails={merchantDetails}
        />
      ) : (
        <></>
      )}

      {dateBox === "MAR22"
        ? <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
          <CustomTextComponent text={"No Data"} fs={16} color="#000" />
        </View>
        : <></>}

    </View>
  );
}

const BuildMonthComponent = ({ navigation, showEmployee, merchantDetails }) => {
  return (
    <View
      style={{
        backgroundColor: "#F7F5FA",
        // height: 400,
        width: "100%",
        padding: 12,
      }}
    >
      <CustomTextComponent
        text="Monday, 17"
        fs={12}
        color={"rgba(133, 148, 159, 1)"}
      />
      {
        merchantDetails.map((singleMerchant) => {
          return (
            <BuildSingleMerchantComponent
              showEmployee={showEmployee}
              merchantDetails={singleMerchant}
              onPress={() => {
                navigation.navigate("CompanyWalletTransactionScreen");
              }}
            />
          );
        })
      }
    </View>
  );
};

const BuildSingleMerchantComponent = ({ onPress, showEmployee, merchantDetails }) => {
  const employeeDetail = () => {
    return (
      <>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#eee",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
            paddingTop: 12,
          }}
        >
          <Image
            source={require("../../../assets/images/e1.png")}
            style={{
              width: 26,
              height: 26,
              marginHorizontal: 4,
              borderRadius: 100,
            }}
          />
          <CustomTextComponent
            text={`${merchantDetails.employee_name} | ${merchantDetails.department_name}`}
            fs={13}
            color={"grey"}
          />
        </View>
      </>
    );
  };

  return (
    <View style={{ marginVertical: 5 }}>
      <TouchableHighlight onPress={onPress}>
        <Card
          style={{
            width: "100%",
            padding: 9,
            elevation: 7,
            // shadowColor: '#999',
            backgroundColor: "rgba(255, 255, 255, 1)",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.monthContainerStyle}>
                <SvgUri
                  source={require("../../../assets/svg/tax.svg")}
                  style={{
                    width: 16,
                    height: 16,
                    marginBottom: "auto",
                    top: 7,
                  }}
                />
              </View>

              <View style={{ width: windowWidth / 2.6 }}>
                <CustomTextComponent
                  text={merchantDetails.merchant_name}
                  fs={16}
                  color={"#000"}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <View style={{ marginBottom: 0, marginRight: 6 }}>
                <CustomTextComponent text="AED" fs={12} color={"#000"} />
              </View>
              <CustomTextComponent
                text={merchantDetails.amount + ".00"}
                fs={24}
                color={"#000"}
                ff="Montserrat-Bold"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 0,
              paddingHorizontal: 5,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgUri
                source={require("../../../assets/svg/Card.svg")}
                resizeMode="contain"
                style={{ width: 15, height: 15, tintColor: "grey" }}
              />
              <Image
                source={require("../../../assets/icons/dots.png")}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: "grey",
                  marginHorizontal: 4,
                }}
              />
              <CustomTextComponent text={merchantDetails.card_last_4_digits} fs={15} color={"grey"} />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  paddingHorizontal: 8,
                  backgroundColor: "#FFE9D8",
                  borderRadius: 30,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 4,
                  marginRight: 5,
                }}
              >
                <View
                  style={{
                    width: 7,
                    height: 7,
                    backgroundColor: "#FF914D",
                    borderRadius: 100,
                    marginRight: 4,
                  }}
                />
                <CustomTextComponent
                  text="Unclaimed"
                  fs={10}
                  color={"#FF914D"}
                />
              </View>
              <CustomTextComponent text="Dr" fs={16} color={"#000"} />
            </View>
          </View>

          {showEmployee ? <View /> : employeeDetail()}
        </Card>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  monthContainerStyle: {
    width: 40,
    height: 40,
    backgroundColor: "#DCF2EA",
    flexDirection: "row",
    // alignItems: 'center',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});
