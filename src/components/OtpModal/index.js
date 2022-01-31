//Otp code Modules
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, FONTS, images, SIZES, VECTOR } from "../../constants";
import { Button, ButtonText } from "../../components";
import { moderateScale } from "react-native-size-matters";
import DoubleOtp from "./DoubleOtp";

const OtpComponent = ({
  arr,
  sumNumber,
  popItem,
  visiblity,
  title,
  des,
  show,
  icon,
  closeModal,
  color,
  time,
  resendClick,
  btntext,
  double,
}) => {

  const [againVisible, setagainVisible] = useState(false);

  const handleAgainVisible = () => {
    setagainVisible(!againVisible);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visiblity}
      // onRequestClose={closeModal}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
              height: SIZES.padding * 8,
              paddingHorizontal: SIZES.padding2,
            }}
          >
            <TouchableOpacity onPress={() => closeModal("close")}>
              {VECTOR.Close}
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <View
              style={{
                width: 80,
                borderWidth: 3,
                borderRadius: SIZES.radius / 3.5,
                marginVertical: SIZES.base,
                borderColor: COLORS.inputborder,
              }}
            />
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.secondary,
                paddingVertical: SIZES.padding,
              }}
            >
              {title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View style={{ flex: 3 }}>
                <Text style={styles.modalText}>{des}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.timerText}>
                  {time != null ? `00:${time}` : null}
                </Text>
              </View>
            </View>
            {show === false ? <Text>{arr}</Text> : null}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {arr.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 14,
                      height: 14,
                      backgroundColor:
                        data === "."
                          ? COLORS.mdtitle
                          : icon === false
                          ? null
                          : COLORS.second,
                      borderRadius: SIZES.radius / 3,
                      margin: SIZES.base * 2,
                      opacity: data === "." ? 0.1 : null,
                    }}
                  >
                    {icon === false ? (
                      <Text style={{ ...FONTS.t1 }}>{data}</Text>
                    ) : null}
                  </View>
                );
              })}

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => show(icon)}
                style={{ marginLeft: SIZES.base * 3 }}
              >
                {icon == true ? VECTOR.Hide : VECTOR.Show}
              </TouchableOpacity>
            </View>
            {time != null ? (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.swiper_h1,
                    paddingVertical: SIZES.padding2,
                  }}
                >
                  Didn’t receive the code ? {"  "}
                </Text>
                <TouchableOpacity
                  onPress={resendClick}
                  style={{ justifyContent: "center" }}
                  activeOpacity={0.7}
                >
                  <Text style={{ ...FONTS.body6, color: COLORS.primary }}>
                    Resend
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View
              style={{
                width: SIZES.width,
                height: moderateScale(SIZES.height / 3),
                backgroundColor: COLORS.white,
              }}
            >
              {/* <View style={{ height: 350, width: SIZES.width }}> */}
              <View style={styles.MainView}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => sumNumber(1)}
                >
                  <Text style={styles.keypadStyle}>{"1"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => sumNumber(2)}
                >
                  <Text style={styles.keypadStyle}>{"2"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => sumNumber(3)}
                >
                  <Text style={styles.keypadStyle}>{"3"}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.MainView}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => sumNumber(4)}
                >
                  <Text style={styles.keypadStyle}>{"4"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => sumNumber(5)}
                >
                  <Text style={styles.keypadStyle}>{"5"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => sumNumber(6)}
                >
                  <Text style={styles.keypadStyle}>{"6"}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.MainView}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => sumNumber(7)}
                >
                  <Text style={styles.keypadStyle}>{"7"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => sumNumber(8)}
                >
                  <Text style={styles.keypadStyle}>{"8"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => sumNumber(9)}
                >
                  <Text style={styles.keypadStyle}>{"9"}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.MainView}>
                <View style={styles.button1}></View>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => sumNumber(0)}
                >
                  <Text style={styles.keypadStyle}>{"0"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => popItem()}
                >
                  <Image source={images.clear} />
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              height: 70,
              backgroundColor: COLORS.white,
              shadowColor: COLORS.black,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              // shadowOpacity: 0.25,
              // shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Button
              type={5}
              color={color == true ? COLORS.primary : COLORS.inputborder}
              onPress={
                color == true
                  ? double ? () => handleAgainVisible() : closeModal("send")
                  : () => alert("please enter otp")
              }
            >
              <ButtonText
                color={color !== true ? COLORS.mdt : COLORS.white}
                text={btntext != null ? btntext : "Confirm Security Code"}
              />
            </Button>
          </View>
        </View>
        <DoubleOtp
          arr={arr}
          visiblity={againVisible}
          sumNumber={sumNumber}
          popItem={popItem}
          icon={icon}
          show={show}
          time={time}
          color={color}
          title={"Re-enter Security Code"}
          des={`Please confirm the security pin for your card ending with 2130`}
          closeModal={closeModal}
          resendClick={resendClick}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default OtpComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:COLORS.error1
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(245,245,245,0.85)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 1,
  },
  modalView: {
    // marginTop: SIZES.padding * 8,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    padding: SIZES.padding * 2,
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 1,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    ...FONTS.body5,
    color: COLORS.secondary2,
  },
  timerText: {
    color: COLORS.second,
    ...FONTS.body6,
  },
  MainView: {
    flex: 0.25,
    flexDirection: "row",
  },
  button1: { flex: 0.33, alignItems: "center", justifyContent: "center" },
  button2: { flex: 0.34, alignItems: "center", justifyContent: "center" },
  keypadStyle: { ...FONTS.otp, color: COLORS.secondary2 },
});
