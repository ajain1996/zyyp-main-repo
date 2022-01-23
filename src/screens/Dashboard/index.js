import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  BackHandler,
  Image,
  TouchableOpacity,
} from "react-native";
import {ButtonText, SemiBoldText} from '../../components'
import { COLORS, FONTS, images, SIZES } from "../../constants";
const Dashboard = ({ navigation }) => {
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
      <TouchableOpacity
        style={{ alignItems: "flex-end",margin: SIZES.padding2,}}
          onPress={() => {
            navigation.navigate("Settings");
          }}
          activeOpacity={0.7}
        >
          <Image source={images.profile} />
        </TouchableOpacity>
      <View
        style={{
          flex: 1,
          
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        
        <ButtonText text={"Sample Dashboard"} color={COLORS.primary}/>

      </View>
    </SafeAreaView>
  );
};
export default Dashboard;
