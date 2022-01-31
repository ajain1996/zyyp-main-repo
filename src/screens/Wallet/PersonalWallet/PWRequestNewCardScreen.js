import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import CustomInputScreen from "../../../components/CustomInputComponent";
import CustomTextComponent from "../../../components/CustomTextComponent";
import { COLORS } from "../../../utils/colors";
import { windowWidth } from "../../../utils/utils";
import { CompanyWalletTransactionHeader } from "../CompanyWalletTransactionScreen";
import { Notes } from "../../../components/Notes";
import { WithdrawFundsBtn } from "../WithDrawlFundsScreen";

export default function PWRequestNewCardScreen({ navigation }) {
  const [cardType, setCardType] = useState([]);
  var cardTypeList = [
    {
      name: "Virtual Only",
      value: "Virtual Only",
      image: require("../../../../assets/icons/Cloud_card.png"),
    },
    {
      name: "Physical Card",
      value: "Physical Card",
      image: require("../../../../assets/icons/credit_card_light.png"),
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Request New Card"
      />

      <View style={{ paddingVertical: 30, paddingHorizontal: 24 }}>
        <CustomTextComponent
          text={"Card Type"}
          fs={16}
          color={"#000"}
          fw="300"
        />
        <View style={{ height: 12 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {cardTypeList.map((data, index) => {
            return (
              <BuildCustomCardTypeBox
                key={index}
                text={data.name}
                selectedVal={cardType}
                image={data.image}
                onPress={() => {
                  // setCardType(data.name)
                  if (!cardType.includes(data.name)) {
                    setCardType((val) => [...val, data.name]);
                  } else {
                  }
                }}
              />
            );
          })}
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <View style={{ width: windowWidth / 2.5, marginTop: 6 }}>
            <CustomTextComponent
              text={"*Select this option if you need a physical card as well."}
              fs={10}
              color={"#999"}
              fw="300"
            />
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          {/* <CustomTextComponent
                        text={"Reason for request"} fs={13} color={"#000"} fw="300"
                    /> */}
          {/* <View style={{ alignItems: 'center', marginTop: 8, }}>
                        <CustomInputScreen
                            placeholderText="Type any relevant comment to this request"
                            keyboardType={'email-address'}
                            autoCapitalize='none'
                            error={"emailError"}
                            labelValue={"email"}
                            onChangeText={(val) => {
                                // setEmail(val);
                                // setEmailError("");
                            }}
                        />
                    </View> */}
          <Notes
            placeholderContent={"Reason for request"}
            placeholder={"Type any relevant comment to this request"}
            popup={true}
          />
        </View>

        <View style={{ alignItems: "center", marginTop: windowWidth / 2.2 }}>
          <WithdrawFundsBtn
            text="REQUEST CARD"
            onPress={() => {
              console.log(
                "\n\n \n\n AAAAAAAAA: ",
                cardType,
                cardType.includes("Virtual Only")
              );
            }}
          />
        </View>
        <View style={{ height: 50 }} />
      </View>
    </ScrollView>
  );
}

const BuildCustomCardTypeBox = ({
  text,
  image,
  onPress,
  selectedVal,
  index,
}) => {
  function handleCheck(val) {
    return selectedVal.some((item) => val.name === item.name);
  }

  return (
    <View
      key={index}
      style={{
        width: windowWidth / 2.4,
        borderWidth: 2.4,
        borderStyle: "dotted",
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderColor: selectedVal.includes(text)
          ? COLORS.PURPLE
          : COLORS.BLACK40,
        elevation: selectedVal.includes(text) ? 25 : 0,
        shadowColor: "#000",
        backgroundColor: "#f7f8fa",
      }}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={{
            alignItems: "flex-end",
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          {selectedVal.includes(text) ? (
            <Image
              source={require("../../../../assets/icons/tick.png")}
              style={{ width: 20, height: 20, tintColor: COLORS.PURPLE }}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={{ alignItems: "center", marginTop: 12 }}>
          <Image
            source={image}
            style={{
              width: 44,
              height: 44,
              tintColor: selectedVal.includes(text)
                ? COLORS.PURPLE
                : COLORS.BLACK40,
            }}
          />
          <CustomTextComponent
            text={text}
            fs={15}
            fw="300"
            color={selectedVal.includes(text) ? COLORS.PURPLE : COLORS.BLACK40}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
