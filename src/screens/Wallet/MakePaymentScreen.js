import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Animated,
} from "react-native";
import SvgUri from "react-native-svg-uri";
import { windowHeight, windowWidth } from "../../utils/utils";
import CustomTextComponent from "../../components/CustomTextComponent";
import { COLORS } from "../../utils/colors";
import {
  BuildCardContainer,
  BuildCardIBANContainer,
} from "./NewReciepentPaymentScreen";
import CustomInputScreen from "../../components/CustomInputComponent";
import { FONTS, SIZES } from "../../constants";

export default function MakePaymentScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("ZYYPWalet");

  const showFunction = () => {
    if (selectedTab == "ZYYPWalet") {
      return (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <CustomTextComponent
              text={"Recipients"}
              fs={16}
              color={COLORS.BLACK}
              fw={"bold"}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("NewReciepentPaymentScreen")}
            >
              <CustomTextComponent
                text={"+ New"}
                fs={16}
                color={COLORS.PURPLE}
                fw={"bold"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              marginTop: 20,
              width: "100%",
              paddingHorizontal: 20,
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

          <View
            style={{
              marginHorizontal: 20,
              backgroundColor: "#fff",
              marginBottom: 50,
            }}
          >
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
        </>
      );
    } else {
      return (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <CustomTextComponent
              text={"Recipients"}
              fs={16}
              color={COLORS.BLACK}
              fw={"bold"}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("NewPaymentRecepient")}
            >
              <CustomTextComponent
                text={"+ New"}
                fs={16}
                color={COLORS.PURPLE}
                fw={"bold"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              marginTop: 20,
              width: "100%",
              paddingHorizontal: 20,
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

          <View
            style={{
              marginHorizontal: 20,
              backgroundColor: "#fff",
              marginBottom: 50,
            }}
          >
            <BuildCardIBANContainer
              icon={require("../../../assets/icons/windows.png")}
              text={"Company Name"}
              navigation={navigation}
            />

            <BuildCardIBANContainer
              icon={require("../../../assets/icons/amazon.png")}
              text={"Company Name"}
              navigation={navigation}
            />

            <BuildCardIBANContainer
              icon={require("../../../assets/icons/cn.png")}
              text={"Company Name"}
              navigation={navigation}
            />

            <BuildCardIBANContainer
              icon={require("../../../assets/icons/cn.png")}
              text={"Company Name"}
              navigation={navigation}
            />

            <BuildCardIBANContainer
              icon={require("../../../assets/icons/amazon.png")}
              text={"Company Name"}
              navigation={navigation}
            />

            <BuildCardIBANContainer
              icon={require("../../../assets/icons/windows.png")}
              text={"Company Name"}
              navigation={navigation}
            />

            <BuildCardIBANContainer
              icon={require("../../../assets/icons/cn.png")}
              text={"Company Name"}
              navigation={navigation}
            />

            <BuildCardIBANContainer
              icon={require("../../../assets/icons/amazon.png")}
              text={"Company Name"}
              navigation={navigation}
            />

            <BuildCardIBANContainer
              icon={require("../../../assets/icons/windows.png")}
              text={"Company Name"}
              navigation={navigation}
            />
          </View>
        </>
      );
    }
  };

  return (
    <View>
      <MainHeaderComponent
        navigation={navigation}
        title={"Make Payment"}
        secondText={"From"}
      />

      <ScrollView
        style={{
          width: "100%",
          height: windowHeight / 1.4,
          backgroundColor: "#fff",
        }}
      >
        <Text />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <BuildTabComponent
            title="ZYYP Walet"
            selectedVal={selectedTab}
            val={"ZYYPWalet"}
            onPress={() => {
              setSelectedTab("ZYYPWalet");
            }}
          />
          <BuildTabComponent
            title="Company IBAN"
            selectedVal={selectedTab}
            val={"CompanyIBAN"}
            onPress={() => {
              setSelectedTab("CompanyIBAN");
            }}
          />
        </View>
        <View style={{ height: 30 }} />

        {showFunction()}
      </ScrollView>
    </View>
  );
}

const BuildTabComponent = ({ title, selectedVal, val, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        borderBottomWidth: 2,
        alignItems: "center",
        width: windowWidth / 2.1,
        borderColor: selectedVal === val ? COLORS.PURPLE : "#fff",
      }}
      onPress={onPress}
    >
      <CustomTextComponent
        text={title}
        fs={16}
        color={selectedVal === val ? COLORS.PURPLE : "#000"}
      />
    </TouchableOpacity>
  );
};

export const MainHeaderComponent = ({
  navigation,
  title,
  lastIcon,
  secondText,
}) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
  const [expenseToggle, setExpenseToggle] = useState(true);

  const expenseToggleClick = () => {
    setExpenseToggle(!expenseToggle); 
  }

  const toggleSwitch = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 4000,
    }).start();
    setIsEnabled((previousState) => !previousState);
  };

  const ExpenseButton = ({
    onClick,
    dotColor,
    buttonColor,
    buttonText,
    textColor,
    type,
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onClick}
        style={[styles.switchButtonContainer, { backgroundColor: buttonColor }]}
      >
        {type === 1 ? (
          <View style={styles.switchElementView}>
            <Text
              numberOfLines={1}
              style={[styles.switchText, { color: textColor }]}
            >
              {buttonText}
            </Text>
            <View
              style={[styles.switchDotView, { backgroundColor: dotColor }]}
            />
          </View>
        ) : (
          <View style={styles.switchElementView}>
            <View
              style={[styles.switchDotView, { backgroundColor: dotColor }]}
            />
            <Text
              numberOfLines={1}
              style={[styles.switchText, { color: textColor }]}
            >
              {buttonText}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.fontStyle}>{title}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {secondText ? (
            <CustomTextComponent text={secondText} fs={14} color={"#999"} />
          ) : (
            <></>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 12,
            }}
          >
            {expenseToggle ? (
              <ExpenseButton
                onClick={() => expenseToggleClick(0)}
                buttonText={'Personal'}
                textColor="#091020"
                dotColor={'#85949F'}
                buttonColor={'#EAF2F5'}
              />
            ) : (
              <ExpenseButton
                onClick={() => expenseToggleClick(1)}
                buttonText={'Company'}
                textColor="#091020"
                dotColor={"#B085F1"}
                buttonColor={"#F2ECFB"}
                type={1}
              />
            )}

            {lastIcon ? (
              <SvgUri
                source={require("../../../assets/svg/download.svg")}
                style={{ width: 30, height: 30, marginLeft: 14 }}
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      <Text />

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={{ alignItems: "flex-start" }}>
          <CustomTextComponent text="AED" fs={18} fw="700" color={"grey"} />
          <CustomTextComponent
            text="321.00"
            fs={36}
            color={"#343C44"}
            ff="Montserrat-Bold"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 24,
    shadowColor: "rgba(50,50,71,0.88)",
    backgroundColor: "#fff",
    width: "100%",
    paddingTop: 42,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  switchButtonContainer: {
    width: 125,
    height: 38,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.base,
  },
  switchElementView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    ...FONTS.t1,
    marginHorizontal: SIZES.base * 1.2,
    flex: 1,
  },
  switchDotView: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  fontStyle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
    fontFamily: "PlayfairDisplay-Black",
  },
  headerContainer2: {
    flexDirection: "row",
    paddingHorizontal: 14,
    height: 35,
    backgroundColor: "#EAF2F5",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionContainer: {
    width: "100%",
    elevation: 24,
    shadowColor: "#999",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  transactionBtn: {
    // paddingVertical: 7,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dcdcdc",
    justifyContent: "center",
    backgroundColor: "#fbfbfb",
    marginRight: 8,
    paddingHorizontal: 12,
  },
});
