import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SmallText } from "../../components";
import CustomInputScreen from "../../components/CustomInputComponent";
import CustomTextComponent from "../../components/CustomTextComponent";
import { Notes } from "../../components/Notes";
import { COLORS } from "../../constants";
import { windowWidth } from "../../utils/utils";
import { BuildApprovedAccount } from "../Wallet/AddFundsScreen";
import { CompanyWalletTransactionHeader } from "../Wallet/CompanyWalletTransactionScreen";
export default IncidentDetails = ({ navigation }) => {
  const IncidentDisc = () => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles2.itemContainer,
            {
              backgroundColor: "#fff",
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
                  fontWeight: "bold",
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
                  backgroundColor: "#CCF3F5",
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#00C2CB",
                    width: 5,
                    height: 5,
                    borderRadius: 10,
                    marginRight: 2,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 10,
                    // lineHeight: 10,
                    fontWeight: "500",
                    fontFamily: "Poppins-Regular",
                    color: "#00C2CB",
                  }}
                >
                  {" "}
                  Unresolved
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
              ></Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const BuildInvoiceComponent = ({ image }) => {
    return (
      <View
        style={{
          width: windowWidth / 2.9,
          height: windowWidth / 2.6,
          backgroundColor: "#eee",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Image source={image} style={{ width: "80%", height: "100%" }} />
        <View
          style={{
            width: 28,
            height: 28,
            backgroundColor: "#FF914D",
            borderRadius: 1000,
            left: 2,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 6,
          }}
        >
          <Image
            source={require("../../../assets/icons/view.png")}
            style={{ width: 20, height: 20, tintColor: "#fff" }}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Incident Details"
      />

      <IncidentDisc />

      <View style={{ marginTop: 20 }} />
      <View style={{ marginHorizontal: 24 }}>
        <CustomTextComponent text="Incident Type" fs={12} color={"#000"} />
        <CustomInputScreen
          placeholderText="Type of Incident"
          height={45}
          bgColor="#fff"
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
      <View style={{ marginHorizontal: 24 }}>
        <CustomTextComponent
          text="Screenshot"
          fs={14}
          color={"#323F4B"}
          fw={"bold"}
        />
        <View style={{ marginVertical: 6 }} />
        <BuildInvoiceComponent
          image={require("../../../assets/svg/paper.png")}
        />
      </View>
      <View style={{ marginTop: 30, marginHorizontal: 24, marginBottom: 20 }}>
        <View
          style={{
            borderWidth: 1.4,
            borderRadius: 12,
            marginBottom: 24,
            borderStyle: "dashed",
            borderColor: '#AABBC6',
            elevation: 0,
            shadowColor: "#000",
            backgroundColor: "#F7F8FA",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ paddingHorizontal: 16, paddingVertical: 12 }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomTextComponent
                text={'Resolution Comments'}
                fs={18}
                fw="bold"
                color={'#AABBC6'}
              />

    
            </View>
            <View style={{ height: 8 }} />
            <CustomTextComponent
              text={'31 Dec, 2021'}
              fs={17}
              fw="bold"
              color={'#85949F'}
            />
            <View style={{ height: 8 }} />
            <CustomTextComponent
              text={'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'}
              fs={15}
              fw="500"
              color={'#85949F'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles2 = StyleSheet.create({
  itemContainer: {
    height: moderateScale(70),
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginTop: moderateScale(17),
    borderRadius: 8,
    marginHorizontal: moderateScale(16),
    elevation: 35,
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
});
