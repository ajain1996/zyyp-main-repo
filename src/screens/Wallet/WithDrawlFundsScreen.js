import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import CustomTextComponent from "../../components/CustomTextComponent";
import { images } from "../../constants";
import { COLORS } from "../../utils/colors";
import { windowHeight, windowWidth } from "../../utils/utils";
import { BuildApprovedAccount } from "./AddFundsScreen";
import { CompanyWalletTransactionHeader } from "./CompanyWalletTransactionScreen";

export default function WithDrawlFundsScreen({ navigation }) {
  const [selectedAccount, setSelectedAccount] = useState("");

  const [approvedAccounts, setApprovedAccounts] = useState([
    {
      "account_holder_name": "John Doe",
      "account_id": "b6822247-052d-4bb1-ad49-5e46f7c8fdd0",
      "account_number": 1511593983,
      "account_type": "OWNER",
      "address": {
        "address_line_1": "magna fugiat aliqua commodo",
        "address_line_2": "ut",
        "city": "consequat",
        "country": "reprehenderit",
        "postal_code": "reprehenderit sint minim dolor ad",
        "state": "in commodo quis",
        "street": "quis deserunt officia"
      },
      "bank_address": {
        "address_line_1": "Lorem adipisicing minim",
        "address_line_2": "sunt exercitation laborum",
        "city": "in tempor minim",
        "country": "anim magna labore id",
        "postal_code": "irure magna proident in",
        "state": "consequat esse",
        "street": "sunt qui enim amet"
      },
      "bank_name": "Bank of Sharjah",
      "email": "bob@example.com",
      "iban": "AE070331234567890123456",
      "mobile": "+551185249635",
      "org_id": 100001,
      "swift_code": "CBAUAEAAXXX",
      "user_id": 200001
    },
    {
      "account_holder_name": "John Doe",
      "account_id": "b6822247-052d-4bb1-ad49-5e46f7c8fdd0",
      "account_number": 1511593984,
      "account_type": "OWNER",
      "address": {
        "address_line_1": "consectetur sed",
        "address_line_2": "laborum cupidatat labore",
        "city": "velit",
        "country": "labore elit tempor culpa exercitation",
        "postal_code": "ullamco",
        "state": "non sunt ad",
        "street": "velit labore"
      },
      "bank_address": {
        "address_line_1": "exercitation ut consectetur",
        "address_line_2": "Excepteur cupidatat",
        "city": "tempor",
        "country": "in anim",
        "postal_code": "consequat ullamco reprehenderit esse",
        "state": "dolor sint consectetur eu",
        "street": "ex quis"
      },
      "bank_name": "Bank of Sharjah",
      "email": "bob@example.com",
      "iban": "AE070331234567890123456",
      "mobile": "+551185249635",
      "org_id": 100001,
      "swift_code": "CBAUAEAAXXX",
      "user_id": 200001
    }
  ]);

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Withdraw Funds"
      />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#fff",
          height: windowHeight / 1.14,
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 30, backgroundColor: "white" }}>
          <CustomTextComponent
            text={"Select One Approved Account"}
            fs={20}
            color={"#000"}
          />
          <View style={{ height: 20 }} />
          {/* 7B35E7 */}

          {
            approvedAccounts.map((accounts, index) => {
              return (
                <BuildApprovedAccount
                  title={accounts.account_type}
                  accountNumber={accounts.account_number}
                  holderName={accounts.account_holder_name}
                  selectedVal={accounts.account_number.toString()}
                  selectedAccount={selectedAccount}
                  bankName={accounts.bank_name}
                  onPress={() => { setSelectedAccount(accounts.account_number.toString()); }}
                />
              );
            })
          }

          <View style={{ paddingHorizontal: 10 }}>
            <CustomTextComponent
              text={`NOTE: Your transfer will be processed\nwithin 2 working days`}
              fs={12.5}
              color={COLORS.BLACK40}
              fw="500"
            />
          </View>
        </View>

        <View style={{ justifyContent: "flex-end", marginBottom: 20 }}>
          <WithdrawFundsBtn
            text="WITHDRAW TO THIS ACCOUNT"
            onPress={() => {
              // ConfirmTransferScreen
              navigation.navigate("StatementInputCodeScreen");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export const WithdrawFundsBtn = ({ text, onPress, rightIcon }) => {
  const Rightfig = ({ rightIcon }) => {
    if (rightIcon) {
      return (
        <Image
          source={images.Next}
          style={{ width: 26, height: 26 }}
        />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/icons/check.png")}
          style={{ width: 13, height: 13, tintColor: "#fff" }}
        />
      );
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width: windowWidth - 40,
        paddingVertical: 14,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#7B35E7",
        marginHorizontal: 20,
        borderRadius: 8,
        elevation: 15,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <CustomTextComponent text={text} fs={17} color={"#fff"} fw="700" />
        <View
          style={{
            width: 24,
            height: 24,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            backgroundColor: "#B085F1",
            marginLeft: 40,
          }}
        >
          <Rightfig rightIcon={rightIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
