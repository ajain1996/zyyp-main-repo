import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
// import CustomInputScreen from '../components/CustomInputComponent';
import { COLORS } from "../../utils/colors";
import CustomTextComponent from "../../components/CustomTextComponent";
import { CompanyWalletTransactionHeader } from "./CompanyWalletTransactionScreen";
import CustomInputScreen from "../../components/CustomInputComponent";

export default function NewReciepentPaymentScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="New Recipent"
      />

      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
      >
        <View
          style={{
            paddingHorizontal: 16,
            backgroundColor: "#fff",
            marginTop: 20,
            width: "100%",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#7B8794",
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
              }}
            >
              <Image
                source={require("../../../assets/icons/SearchIcon.png")}
                style={{ width: 20, height: 20, tintColor: "#999" }}
              />
              <CustomInputScreen
                placeholderText="Search name, mobile, email"
                height={45}
                bgColor="#fff"
                onChangeText={(val) => {
                  // setEmail(val);
                  // setEmailError("");
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ height: 20, backgroundColor: "#fff" }} />

        <View style={{ paddingHorizontal: 20 }}>
          <BuildCardContainer
            icon={require("../../../assets/icons/windows.png")}
            text={"Company Name"}
            navigation={navigation}
          />

          <BuildCardContainer
            icon={require("../../../assets/icons/amazon.png")}
            text={"Company Name"}
            navigation={navigation}
          />

          <BuildCardContainer
            icon={require("../../../assets/icons/cn.png")}
            text={"Company Name"}
            navigation={navigation}
          />

          <BuildCardContainer
            icon={require("../../../assets/icons/cn.png")}
            text={"Company Name"}
            navigation={navigation}
          />

          <BuildCardContainer
            icon={require("../../../assets/icons/amazon.png")}
            text={"Company Name"}
            navigation={navigation}
          />

          <BuildCardContainer
            icon={require("../../../assets/icons/windows.png")}
            text={"Company Name"}
            navigation={navigation}
          />

          <BuildCardContainer
            icon={require("../../../assets/icons/cn.png")}
            text={"Company Name"}
            navigation={navigation}
          />

          <BuildCardContainer
            icon={require("../../../assets/icons/amazon.png")}
            text={"Company Name"}
            navigation={navigation}
          />

          <BuildCardContainer
            icon={require("../../../assets/icons/windows.png")}
            text={"Company Name"}
            navigation={navigation}
          />
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

export const BuildCardContainer = ({ icon, text, navigation }) => {
  const [dropAccordian, setDropAccordian] = useState(false);
  return (
    <View style={{ marginBottom: 8 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardContainer}
        onPress={() => {
          setDropAccordian(!dropAccordian);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.cardImgContainer}>
            <Image
              source={icon}
              resizeMode="contain"
              style={{ width: 25, height: 25 }}
            />
          </View>
          <CustomTextComponent text={text} fs={14} color={"#000"} fw="500" />
        </View>
        <Image
          source={require("../../../assets/icons/down-arrow.png")}
          resizeMode="contain"
          style={{
            width: 14,
            height: 14,
            transform: [{ rotate: dropAccordian ? "0deg" : "270deg" }],
            tintColor: "#999",
          }}
        />
      </TouchableOpacity>
      {dropAccordian ? (
        <View
          style={{
            backgroundColor: "#EAF2F5",
            padding: 20,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            marginTop: -5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View>
              <CustomTextComponent
                text={"Mobile No"}
                fs={11}
                color={"#999"}
                fw="600"
              />
              <CustomTextComponent
                text={"Email"}
                fs={11}
                color={"#999"}
                fw="600"
              />
              <CustomTextComponent
                text={"Address"}
                fs={11}
                color={"#999"}
                fw="600"
              />
            </View>
            <Image
              source={require("../../../assets/icons/star.png")}
              resizeMode="contain"
              style={{ width: 18, height: 18 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewRecepientAddFundsScreen")}
            style={{ alignItems: "center" }}
          >
            <CustomTextComponent
              text={"MAKE PAYMENT"}
              fs={15}
              color={COLORS.PURPLE}
              fw="700"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export const BuildCardIBANContainer = ({ icon, text, navigation }) => {
  const [dropAccordian, setDropAccordian] = useState(false);
  return (
    <View style={{ marginBottom: 8 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardContainer}
        onPress={() => {
          setDropAccordian(!dropAccordian);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.cardImgContainer}>
            <Image
              source={icon}
              resizeMode="contain"
              style={{ width: 25, height: 25 }}
            />
          </View>
          <CustomTextComponent text={text} fs={14} color={"#000"} fw="500" />
        </View>
        <Image
          source={require("../../../assets/icons/down-arrow.png")}
          resizeMode="contain"
          style={{
            width: 14,
            height: 14,
            transform: [{ rotate: dropAccordian ? "0deg" : "270deg" }],
            tintColor: "#999",
          }}
        />
      </TouchableOpacity>
      {dropAccordian ? (
        <View
          style={{
            backgroundColor: "#EAF2F5",
            padding: 20,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            marginTop: -5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View>
              <CustomTextComponent
                text={"IBAN"}
                fs={11}
                color={"#999"}
                fw="600"
              />
              <CustomTextComponent
                text={"bank name"}
                fs={11}
                color={"#999"}
                fw="600"
              />
              <CustomTextComponent
                text={"mobile"}
                fs={11}
                color={"#999"}
                fw="600"
              />
              <CustomTextComponent
                text={"email"}
                fs={11}
                color={"#999"}
                fw="600"
              />
              <CustomTextComponent
                text={"address"}
                fs={11}
                color={"#999"}
                fw="600"
              />
            </View>
            <View>
              <Image
                source={require("../../../assets/icons/Delete.png")}
                resizeMode="contain"
                style={{ width: 18, height: 18, marginBottom: 15 }}
              />
              <Image
                source={require("../../../assets/icons/Edit.png")}
                resizeMode="contain"
                style={{ width: 18, height: 18 }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewRecepientAddFundsScreen")}
            style={{ alignItems: "center" }}
          >
            <CustomTextComponent
              text={"MAKE PAYMENT"}
              fs={15}
              color={COLORS.PURPLE}
              fw="700"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    elevation: 200,
    shadowColor: "#999",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
    marginVertical: 4,
    borderRadius: 8,
  },
  cardImgContainer: {
    backgroundColor: "#EAF2F5",
    width: 42,
    height: 42,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
