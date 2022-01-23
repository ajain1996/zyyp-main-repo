//Privacy policy & Terms Modal componet used in Login,Sign-up
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, images, SIZES } from "../../constants";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "../../components";

const ModalComponent = ({ visiblity, title, des, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visiblity}
      // onRequestClose={closeModal}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.centeredView}>
          <LinearGradient
            style={styles.centeredView}
            colors={[
              "rgba(0, 0, 0, 0.45)",
              "rgba(0, 0, 0, 0.45)",
              "rgb(255,255,255)",
            ]}
          >
            <ScrollView>
              <View style={styles.modalView}>
                <View
                  style={{
                    width: 80,
                    borderWidth: 3,
                    borderRadius: SIZES.radius / 3.5,
                    marginVertical: SIZES.base,
                    borderColor: COLORS.inputborder,
                    marginHorizontal: SIZES.base,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body2,
                    color: COLORS.mdtitle,
                    paddingVertical: SIZES.padding,
                  }}
                >
                  {title}
                </Text>
                <Text style={styles.modalText}>{des}</Text>
              </View>
            </ScrollView>
            <View
              style={{
                backgroundColor: COLORS.white,
                paddingVertical: SIZES.base,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                alignItems: "center",
              }}
            >
              <Button
                type={4}
                icon={images.Close}
                color={COLORS.primary}
                onPress={closeModal}
              >
                <Text style={styles.btnText}>Close</Text>
              </Button>
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  btnText: {
    ...FONTS.body6,
    color: COLORS.white,
    textTransform: "uppercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    marginTop: SIZES.padding * 12,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: SIZES.base * 2,
    ...FONTS.body4,
    color: COLORS.mdt,
  },
});
