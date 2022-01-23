import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  BackHandler,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, images, SIZES } from "../../constants";
import { SemiBoldText } from '../../components'
import CompanyWalletMainScreen from "./CompanyWalletMainScreen";
const Wallet = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <CompanyWalletMainScreen />
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent:"center",
          margin: SIZES.padding2,
        }}
      >
        <SemiBoldText  color={COLORS.primary} text={"Coming Soon !"}/>
        
      </View> */}
    </SafeAreaView>
  );
};
export default Wallet;
