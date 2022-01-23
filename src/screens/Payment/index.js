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
import {SemiBoldText} from '../../components'
const Payment = ({ navigation }) => {
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
     <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent:"center",
          margin: SIZES.padding2,
        }}
      >
        <SemiBoldText  color={COLORS.primary} text={"Coming Soon !"}/>
        
      </View>
    </SafeAreaView>
  );
};
export default Payment;
