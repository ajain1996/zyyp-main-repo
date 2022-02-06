import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Animated,
  Modal,
} from "react-native";
import CustomTextComponent from "../../components/CustomTextComponent";
import DateTopTabsComponent from "../../components/home/DateTopTabsComponent";
import SvgUri from "react-native-svg-uri";
import { COLORS, FONTS, images, SIZES } from "../../constants";
import { Button, ButtonText, SemiBoldText } from "../../components";
import { Searchbar } from "react-native-paper";
import { getTransactionsOnOrganizationLevel } from "../../utils/API";

export default function CompanyWalletMainScreen({ navigation }) {
  const [selectPopup, setSelectPopup] = useState(false);

  // useEffect(() => {
  //   getTransactionsOnOrganizationLevel(
  //     () => { }
  //   );
  // }, []);


  const renderTransactionsBtnBlock = (image, text, isLarge) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectPopup(true)}
        style={styles.transactionBtn}
      >
        <CustomTextComponent text={text} fs={15} color={"#000"} />
        <SvgUri
          source={image}
          style={{
            width: isLarge ? 24 : 14,
            height: isLarge ? 24 : 14,
            marginLeft: isLarge ? 8 : 20,
          }}
        />

        <Modal visible={selectPopup} transparent>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            }}
          >
            <View
              style={{
                backgroundColor: "#FBFBFB",
                padding: SIZES.padding2 * 2,
                borderTopRightRadius: SIZES.radius / 1.5,
                borderTopLeftRadius: SIZES.radius / 1.5,
              }}
            >
              <View
                style={{
                  height: 80,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SemiBoldText text={"Project Name"} color={COLORS.secondary2} />
                <TouchableOpacity>
                  <SemiBoldText text={"Rest"} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              <Searchbar
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.pl,
                  borderRadius: SIZES.radius / 3,
                }}
                // onFocus={() => onSearchClick(filterType)}
                placeholder={`Search by Project Name`}
              />

              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.secondary2,
                  paddingVertical: SIZES.base * 3,
                }}
              >
                {`Recently searched Project Name`}
              </Text>

              <View
                style={{
                  paddingBottom: SIZES.padding2 * 2,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    ...FONTS.e1,
                    color: COLORS.secondary,
                    paddingVertical: SIZES.base,
                    marginLeft: SIZES.width / 3,
                  }}
                >
                  {`No Recent Search found`}
                </Text>
                {/* <SelectComponent
                  key={item?.key}
                  isSelected={
                    filterType === 0 || filterType === 3
                      ? item?.isCategoriesSelected
                      : filterType === 1 || filterType === 4
                      ? item?.isStatusSelected
                      : filterType === 2
                      ? item?.isDepartmentSelected
                      : null
                  }
                  text={
                    filterType == 0 || filterType === 3
                      ? item?.spend_category_name
                      : filterType === 1 || filterType === 4
                      ? item?.status.toLowerCase().replace("_", " ")
                      : filterType === 2
                      ? item?.department_name
                      : null
                  }
                  selectPress={() => selectItemPress(item, index)}
                /> */}
              </View>
              <View
                style={{
                  height: 80,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  type={3}
                  color={COLORS.white}
                  onPress={() => setSelectPopup(false)}
                >
                  <ButtonText text={"CANCEL"} color={COLORS.primary} />
                </Button>
                <View style={{ flex: 1, marginLeft: SIZES.base }}>
                  <Button
                    type={2}
                    // onPress={selectPress}
                    icon={images.Enable_icon}
                    color={COLORS.primary}
                  >
                    <ButtonText text={"SELECT"} color={COLORS.white} />
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#EEECF2" }}>
      <MainHeaderComponent navigation={navigation} />

      <BuildAddFundsComponent navigation={navigation} />

      <View style={styles.transactionContainer}>
        <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
          <View style={{ width: 34, height: 3.6, backgroundColor: "grey", marginVertical: 0.5, borderRadius: 50 }} />
          <View style={{ width: 34, height: 3.6, backgroundColor: "grey", marginVertical: 0.6, borderRadius: 50 }} />
        </View>

        <TouchableOpacity style={{ paddingHorizontal: 20 }}>
          <Text style={styles.fontStyle}>Transactions</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 10 }}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View style={{ width: 20 }} />
            <SvgUri
              source={require("../../../assets/svg/filter.svg")}
              style={{ width: 22, height: 22, marginRight: 12 }}
            />
            {renderTransactionsBtnBlock(
              require("../../../assets/svg/down-arrow.svg"),
              "Department",
              false
            )}

            {renderTransactionsBtnBlock(
              require("../../../assets/svg/search.svg"),
              "Project",
              true
            )}

            {renderTransactionsBtnBlock(
              require("../../../assets/svg/down-arrow.svg"),
              "Employment",
              false
            )}
            <View style={{ width: 20 }} />
          </ScrollView>
        </View>
        <View style={{ width: "100%", backgroundColor: "#fff" }}>
          <DateTopTabsComponent navigation={navigation} />
        </View>
      </View>
      {/* <Text /> */}
    </ScrollView>
  );
}

const MainHeaderComponent = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
  const toggleSwitch = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 4000,
    }).start();
    setIsEnabled((previousState) => !previousState);
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PersonalWalletMainScreen");
          }}
        >
          <Text style={styles.fontStyle}>Wallet</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.headerContainer2}
            onPress={toggleSwitch}
          >
            {isEnabled ? (
              <></>
            ) : (
              <>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 100,
                    backgroundColor: "#B085F1",
                  }}
                />
                <View style={{ width: 12 }} />
              </>
            )}
            <CustomTextComponent text="Company" fs={14} color={"#000"} />
            {isEnabled ? (
              <>
                <View style={{ width: 14 }} />
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 100,
                    backgroundColor: "#B085F1",
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { navigation.navigate("InsightsTrendAnalysisScreen") }}>
            <SvgUri
              source={require("../../../assets/svg/download.svg")}
              style={{ width: 30, height: 30, marginLeft: 14 }}
            />
          </TouchableOpacity>
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

const BuildAddFundsComponent = ({ navigation }) => {
  const renderSingleFundComponent = (image, text, onPress, isLarge) => {
    return (
      <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
        <SvgUri
          source={image}
          resizeMode="contain"
          style={{
            width: isLarge ? 42 : 30,
            height: isLarge ? 42 : 30,
            tintColor: "#85949F",
            marginBottom: isLarge ? -2 : 2,
          }}
        />
        <CustomTextComponent text={text} fs={13} color={"#85949F"} fw="bold" />
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingVertical: 30,
      }}
    >
      {renderSingleFundComponent(
        require("../../../assets/icons/addfunds.svg"),
        "ADD FUNDS",
        () => {
          navigation.navigate("AddFundsScreen");
        },
        false
      )}

      {renderSingleFundComponent(
        require("../../../assets/svg/withdraw.svg"),
        "WITHDRAW",
        () => {
          navigation.navigate("WithDrawlFundsScreen");
        },
        false
      )}

      {renderSingleFundComponent(
        require("../../../assets/icons/statement.svg"),
        "STATEMENT",
        () => {
          navigation.navigate("StampedStatementScreen");
        },
        false
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 24,
    shadowColor: "rgba(50,50,71,0.88)",
    backgroundColor: "#f7f8f9",
    width: "100%",
    paddingTop: 42,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  fontStyle: {
    fontSize: 22,
    color: "#000",
    // fontWeight: '700',
    fontFamily: "PlayfairDisplay-Black",
  },
  headerContainer2: {
    flexDirection: "row",
    paddingHorizontal: 14,
    height: 35,
    backgroundColor: "#F2ECFB",
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
