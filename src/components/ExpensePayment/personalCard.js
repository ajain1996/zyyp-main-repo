import React from "react";
import {
  View,
  Text,
  Platform,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ButtonText, DateButton, TextField, UploadButton } from "..";
import { COLORS, images } from "../../constants";
import { ExpenseAmount } from "../ExpenseAmount";
const { width } = Dimensions.get("window");
import styles from "./expensePayment.style";
export const PersonalCard = ({
  personalDocument,
  isPersonalCheckIn,
  pickPersonalFile,
  onChangePersonalCheckInBtn,
  onPressDate,
  isCheckIn = true,
  paymentDate,
  personalMoreAmount,
  onChangePersonalAmount,
}) => {
  console.log("paymentDate", paymentDate);
  return (
    <View>
      <ExpenseAmount
        placeholderContent={"Payment Amount"}
        placeholder={"enter amount"}
        highlighted={personalMoreAmount}
        onChangeText={onChangePersonalAmount}
      />
      {personalMoreAmount ? (
        <Text
          style={{
            color: "#FF914D",
            fontSize: 12,
            lineHeight: 16,
            fontWeight: "normal",
            fontFamily: "Poppins-Regular",
          }}
        >
          Payment amount is more than requested amount
        </Text>
      ) : (
        <View />
      )}
      <TextField
        placeholderContent={"Merchant Name"}
        placeholder={"Merchant XYZ"}
        // onChangeText={onChangeAddress1}
        // text={address_line_1}
        keyboardType={
          Platform.OS === "ios" ? "ascii-capable" : "visible-password"
        }
      />
      <DateButton
        type={1}
        text={"MM-DD-YYYY"}
        value={paymentDate}
        placeholderContent={"Payment Date"}
        onPress={onPressDate}
      />
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 22,
            fontWeight: "700",
            fontFamily: "Poppins-Regular",
            color: COLORS.black,
          }}
        >
          Upload Receipt
        </Text>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 22,
            fontWeight: "400",
            fontFamily: "Poppins-Regular",
            color: COLORS.pl,
          }}
        >
           (if available)
        </Text>
      </View>
      {personalDocument != null ? (
        <View>
          <View style={{height:8}} />
          <ImageBackground
            style={{ width: 140, height: 150, justifyContent: "flex-end" }}
            source={images.pdf}
          >
            <TouchableOpacity>
              <Image
                style={{ width: 35, height: 35 }}
                source={images.pdfFile}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles().padding} />
          <TextField
            placeholderContent={"Receipt Number"}
            placeholder={"REC 23498791863"}
            // onChangeText={onChangeAddress1}
            // text={address_line_1}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
          />
          <View style={styles().padding} />
          <View
            style={{
              padding: 10,
              borderColor: COLORS.inner_line,
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 6,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: "bold",
                  fontFamily: "Poppins-Regular",
                  color: "#323F4B",
                }}
              >
                Receipt in company name?
              </Text>
              <TouchableOpacity
                onPress={onChangePersonalCheckInBtn}
                style={{
                  alignItems: "flex-end",
                }}
              >
                {isPersonalCheckIn ? (
                  <Image
                    resizeMode={"stretch"}
                    style={{ width: 25, height: 25 }}
                    source={images.Checkin}
                  />
                ) : (
                  <Image
                    resizeMode={"stretch"}
                    style={{ width: 25, height: 25 }}
                    source={images.CheckOut}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ width: width * 0.65 }}>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 15,
                  fontWeight: "400",
                  fontFamily: "Poppins-Regular",
                  color: COLORS.secondary,
                }}
              >
                Please select this if the bill/receipt been generated in
                company’s name
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View />
      )}
      <UploadButton onPress={pickPersonalFile}>
        <ButtonText color={COLORS.primary} text={"Upload Receipt"} />
      </UploadButton>
    </View>
  );
};
