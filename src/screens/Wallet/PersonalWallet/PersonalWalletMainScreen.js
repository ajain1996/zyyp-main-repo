import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomTextComponent from "../../../components/CustomTextComponent";
import { COLORS } from "../../../utils/colors";
import { windowHeight, windowWidth } from "../../../utils/utils";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import CustomModalComponent from "./lock_wallet/LockWalletScreen";
import SvgUri from "react-native-svg-uri";
import BottomSheet from "react-native-gesture-bottom-sheet";
export default function PersonalWalletMainScreen({ navigation }) {
  const bottomSheet = useRef();

  const imagesList = [
    {
      img: require("../../../../assets/images/card-1.png"),
    },
    {
      img: require("../../../../assets/images/card-1.png"),
    },
    {
      img: require("../../../../assets/images/card-1.png"),
    },
  ];

  useEffect(() => {
    bottomSheet.current.show();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#EEECF2" }}>
      <MainHeaderComponent navigation={navigation} />

      <View
        style={{ height: windowHeight / 1.3, justifyContent: "space-between" }}
      >
        <BuildAddFundsComponent navigation={navigation} />

        <SwiperFlatList
          index={1}
          showPagination
          data={imagesList}
          centerContent={true}
          showPagination={true}
          paginationActiveColor="#7b35e7"
          paginationStyleItem={{
            width: 7,
            height: 7,
            marginTop: -windowWidth / 2.4,
            marginHorizontal: 5,
          }}
          contentContainerStyle={{ justifyContent: "center" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("PersonalCardMainScreen")}
            >
              <Image
                source={item.img}
                // resizeMode="cover"
                style={{
                  width: windowWidth / 1.05,
                  height: 250,
                  borderRadius: 20,
                  marginLeft: 20,
                }}
              />
            </TouchableOpacity>
          )}
        />

        <BottomSheet
          hasDraggableIcon={false}
          ref={bottomSheet}
          backgroundColor={"transparent"}
          height={120}
          sheetBackgroundColor={"#fff"}
          draggable={true}
          radius={22}
        >
          <View style={styles.transactionContainer}>
            <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
              <View
                style={{
                  width: 34,
                  height: 3.6,
                  backgroundColor: "grey",
                  marginVertical: 1.5,
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  width: 34,
                  height: 3.6,
                  backgroundColor: "grey",
                  marginVertical: 0.3,
                  borderRadius: 50,
                }}
              />
              <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                <CustomTextComponent
                  text="Transactions"
                  fs={22}
                  color={"#000"}
                  ff="PlayfairDisplay-Black"
                />
              </View>
            </View>

            <Text />
          </View>
        </BottomSheet>
      </View>
    </ScrollView>
  );
}

const MainHeaderComponent = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => { navigation.navigate("CompanyWalletMainScreen") }}>
          <CustomTextComponent
            text="Wallet"
            fs={22}
            color={"#000"}
            ff="PlayfairDisplay-Black"
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.headerContainer2}>
            <View style={{ width: 9 }} />
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 100,
                backgroundColor: "#85949F",
              }}
            />
            <View style={{ width: 12 }} />
            <CustomTextComponent text="Personal" fs={15} color={"#000"} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("GeneratStatementScreen")}
          >
            <SvgUri
              source={require("../../../../assets/svg/download.svg")}
              style={{ marginLeft: 20, tintColor: "#7B8794" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text />

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={{ alignItems: "center" }}>
          <CustomTextComponent text="AED" fs={20} color={"grey"} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SvgUri
              source={require("../../../../assets/svg/lock.svg")}
              style={{
                marginHorizontal: 10
              }}
            />
            <CustomTextComponent
              text="321.00"
              fs={30}
              color={"#000"}
              ff="Montserrat-Bold"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const BuildAddFundsComponent = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const renderSingleFundComponent = (image, text, onPress, color) => {
    return (
      <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
        <SvgUri
          source={image}
          style={{
            width: 28,
            height: 28,
            tintColor: "#FF914D",
            marginBottom: 4,
          }}
        />
        <CustomTextComponent text={text} fs={13} color={color} fw="bold" />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingVertical: 30,
        }}
      >
        {renderSingleFundComponent(
          require("../../../../assets/svg/add-funds.svg"),
          "ADD FUNDS",
          () => {
            navigation.navigate("StatementInputCodeScreen");
          },
          "#85949F"
        )}

        {renderSingleFundComponent(
          require("../../../../assets/svg/unlock.svg"),
          "UNLOCK WALLET",
          () => {
            setModalVisible(true);
          },
          "#FF914D"
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 30,
        }}
      >
        <CustomTextComponent
          text={"My Cards"}
          fs={17}
          color={COLORS.BLACK}
          fw="600"
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            navigation.navigate("PWRequestNewCardScreen");
          }}
        >
          <Image
            source={require("../../../../assets/icons/Plus.png")}
            style={{
              width: 14,
              height: 14,
              tintColor: "#622AB9",
              marginBottom: 2,
              marginRight: 4,
            }}
          />
          <CustomTextComponent
            text={"Request New Card"}
            fs={14}
            color={"#622AB9"}
            fw="600"
          />
        </TouchableOpacity>
      </View>

      <CustomModalComponent
        screenType="lock_wallet"
        svrUriOne={true}
        setModalVisible={setModalVisible}
        isModalVisible={isModalVisible}
        buttonText={"UNLOCK"}
        titleText={"Unlock Wallet?"}
        mainText={
          "The wallet will become active and you will be able to do transactions. Are you sure you want to unlock your wallet?"
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 24,
    shadowColor: "#999",
    backgroundColor: "#f7f8f9",
    width: "100%",
    paddingTop: 42,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer2: {
    flexDirection: "row",
    width: 150,
    height: 35,
    backgroundColor: "#EAF2F5",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  transactionContainer: {
    width: "100%",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  transactionBtn: {
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#dcdcdc",
    justifyContent: "center",
    backgroundColor: "#fbfbfb",
    marginRight: 8,
    paddingHorizontal: 12,
  },
});
