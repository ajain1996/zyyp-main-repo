import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { COLORS, images } from "../../constants";
import styles from "./transaction.style";
export const TransactionDetails = ({ type }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View
      style={[
        styles().container,
        { borderColor: type === 1 ? "#F3F3F3" : "#FF914D" },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#323F4B",
            fontSize: 17,
            fontWeight: "700",
            lineHeight: 20,
            fontWeight: "bold",
            fontFamily: "Poppins-Regular",
          }}
        >
          Transaction Details
        </Text>
        <View
          style={{ backgroundColor: "#F8E3DA", borderRadius: 8, padding: 8 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#85462B",
              fontSize: 12,
              fontWeight: "700",
              lineHeight: 16,
              fontWeight: "bold",
              fontFamily: "Poppins-Regular",
            }}
          >
            Billed to Company
          </Text>
        </View>
      </View>
      <View style={{ height: 8 }} />
      <View style={{ flexDirection: "row",justifyContent:"center" }}>
        <ImageBackground
          style={{ width: 140, height: 150, justifyContent: "flex-end" }}
          source={images.pdf}
        >
          <TouchableOpacity style={{}}>
            <Image style={{ width: 35, height: 35 }} source={images.pdfFile} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={{ width: 15 }} />
        <View style={{flex:1}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: COLORS.black,
              fontFamily: "Poppins-Regular",
            }}
          >
            ZYYP Card (Physical)
          </Text>
          <View style={{height:4}} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "#343C44",
              fontFamily: "Poppins-Regular",
            }}
          >
            Merchant Name private
          </Text>
          <View style={{height:4}} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "#343C44",
              fontFamily: "Poppins-Regular",
            }}
          >
            Date
          </Text>
          <View style={{height:4}} />
          <View style={{flexDirection:"row"}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: COLORS.lightGray,
              fontFamily: "Poppins-Regular",
            }}
          >
            AED
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "#343C44",
              fontFamily: "Poppins-Regular",
            }}
          > 23,635</Text>
          </View>
          <View style={{height:4}} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "#343C44",
              fontFamily: "Poppins-Regular",
            }}
          >
            Receipt #
          </Text>
        </View>
      </View>
      {type === 2 ? (
        <View>
          <View style={{ height: 8 }} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "#FF914D",
              fontFamily: "Poppins-Regular",
            }}
          >
            Payment amount is more than requested amount
          </Text>
          <View style={{ height: 8 }} />
          <View style={styles().excessAmount}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: COLORS.black,
                fontFamily: "Poppins-Regular",
              }}
            >
              Approve excess amount?
            </Text>
            <View style={{ height: 8 }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 50,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 19,
                  fontWeight: "400",
                  color: "#323F4B",
                  fontFamily: "Poppins-Regular",
                }}
              >
                Refund to requestor
              </Text>
              <Switch
                style={{ transform: [{ scaleX: 2.0 }, { scaleY: 2.0 }] }}
                trackColor={{ false: COLORS.second, true: COLORS.strong }}
                thumbColor={isEnabled ? COLORS.white : COLORS.white}
                ios_backgroundColor={COLORS.second}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={{ height: 8 }} />
            <Text
              style={{
                fontSize: 14,
                lineHeight: 19,
                fontWeight: "400",
                color: "#7B8794",
                fontFamily: "Poppins-Regular",
              }}
            >
              “Requestor’s explanation: Lorem ipsum dolor sit amet. Lorem ipsum
              dolor sit amet. Lorem ipsum dolor”
            </Text>
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};
