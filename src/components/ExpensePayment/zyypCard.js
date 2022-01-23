import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  ButtonText,
  SelectTransactionBtnText,
  TextField,
  UploadButton,
} from "..";
import { COLORS, images } from "../../constants";
import styles from "./expensePayment.style";
import { UnClaimedItem } from "./unClaimedItem";
const { width } = Dimensions.get("window");
export const ZyypCard = ({
  unClaimed,
  zyypDocument,
  isCheckIn,
  clickUnclaimedAction,
  pickZyypFile,
  closeBtn,
  onChangeZyypCheckInBtn,
  onChangeZyypAmount,
}) => {
  console.log("zyypDocument", zyypDocument);
  return (
    <View>
      {unClaimed != null ? (
        <UnClaimedItem highlighted={onChangeZyypAmount} closeBtn={closeBtn} />
      ) : (
        <View />
      )}
      {unClaimed != null ? (
        onChangeZyypAmount ? (
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
        )
      ) : (
        <View />
      )}

      <View style={styles().padding} />
      <TouchableOpacity onPress={clickUnclaimedAction}>
        <SelectTransactionBtnText text={"SELECT UNCLAIMED TRANSACTION"} />
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            textAlign: "center",
            color: "#323F4B",
            fontSize: 15,
            lineHeight: 20,
            fontWeight: "700",
            fontFamily: "Poppins-Regular",
          }}
        >
          Upload Receipt{" "}
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: COLORS.pl,
            fontSize: 15,
            lineHeight: 20,
            fontWeight: "normal",
            fontFamily: "Poppins-Regular",
          }}
        >
          (if available)
        </Text>
      </View>
      {zyypDocument != null ? (
        <View>
          <View style={styles().padding} />
          <ImageBackground
            style={{ width: 140, height: 140, justifyContent: "flex-end" }}
            source={images.pdf}
          >
            <TouchableOpacity style={{}}>
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
                onPress={onChangeZyypCheckInBtn}
                style={{
                  alignItems: "flex-end",
                }}
              >
                {isCheckIn ? (
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
      <UploadButton onPress={pickZyypFile}>
        <ButtonText color={COLORS.primary} text={"Upload Receipt"} />
      </UploadButton>
    </View>
  );
};
