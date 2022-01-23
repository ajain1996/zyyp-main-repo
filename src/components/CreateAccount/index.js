import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  BackHandler,
  useColorScheme,
  Modal,
} from "react-native";
import { triggerSSEForCreateAccount } from "../../Utilities"; //Api Call and Common field validations
import { COLORS, FONTS, SIZES, strings } from "../../constants";
import EventSource, { EventSourceListener } from "react-native-sse";
import { useSelector } from "react-redux";
import base64 from "react-native-base64";

const CreateAccount = ({ navigation, accountShow, data, click }) => {
  return (
    <Modal visible={accountShow}>
      <SafeAreaView style={styles.container}>
        <View style={styles.componentView}>
          <Text
            style={{
              ...FONTS.body1,
              color: COLORS.header,
              paddingVertical: SIZES.padding / 2,
            }}>
            {strings.Ca_tittle}
          </Text>
          <Text style={styles.currentMarker}>{strings.Ca_des}</Text>
          <View style={styles.verticalLine}></View>
          <View style={styles.verticalWrap}>
            {data.map((item, index) => (
              <View key={index} style={styles.itemWrap}>
                <View
                  style={item?.isCurrent ? styles.current : styles.pointWrap}>
                  <Text
                    style={[
                      styles.markerText,
                      item?.isCurrent ? styles.tittleText : null,
                    ]}>
                    {item?.isCurrent ? "✓" : Number(item?.lastEventId) + 1}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 5,
                    flex: 1,
                    marginLeft: SIZES.base * 2,
                    alignSelf: "center",
                  }}>
                  <Text style={styles.currentMarker}>{item?.title}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text onPress={click} style={styles.timerText}>
            {"...Please wait..."}
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  componentView: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding2,
    justifyContent: "center",
    alignSelf: "center",
  },
  timerText: {
    color: COLORS.second,
    ...FONTS.body6,
  },
  verticalLine: {
    backgroundColor: COLORS.secondary,
    width: 1,
    flex: 1,
    height: "50%",
    position: "absolute",
    marginLeft: 55,
    marginTop: 30,
  },
  verticalWrap: {
    margin: SIZES.base * 3,
    flex: 0.75,
    height: 200,
    // justifyContent: "space-between",
  },
  itemWrap: {
    marginVertical: 30,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  pointWrap: {
    // backgroundColor: "black",
    width: 40,
    height: 40,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.secondary,
    borderRadius: SIZES.radius / 1.5,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical:SIZES.base*3
  },
  markerText: {
    color: COLORS.secondary,
    ...FONTS.body5,
  },
  current: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#00C2CB",
    backgroundColor: "#00C2CB",
    borderRadius: SIZES.radius / 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  tittleText: {
    color: COLORS.white,
    ...FONTS.body4,
  },
  currentMarker: {
    color: COLORS.secondary2,
    ...FONTS.body4,
  },
});
export default CreateAccount;
