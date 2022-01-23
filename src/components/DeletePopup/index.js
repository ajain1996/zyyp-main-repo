import React from "react";
import {
  Modal,
  View,
  SafeAreaView,
  Text,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, images, SIZES, strings, FONTS } from "../../constants";
import styles from "./delete.style";
import { ButtonText, Button } from "..";
export const DeletePopup = ({
  visible,
  btnTitle,
  onChangeDelete,
  onCancelClick,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <SafeAreaView style={styles().container}>
        <View style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(30),
              borderRadius: 8,
            }}
          >
            <View style={{ width: SIZES.width * 0.85 }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.secondary2,
                  textAlign: "center",
                  paddingVertical: SIZES.padding,
                }}
              >
               {strings.expenseDelete}
              </Text>
            </View>
            <View style={{ height: 15 }} />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button onPress={onCancelClick} color={COLORS.white} type={3}>
                <ButtonText text={strings.bt_Cancel} color={COLORS.primary} />
              </Button>
              <View style={{ width: 8 }} />
              <Button
                onPress={onChangeDelete}
                color={COLORS.primary}
                icon={images.deleteButton}
              >
                <ButtonText text={btnTitle} color={COLORS.white} />
              </Button>
            </View>
            <View style={{ height: 10 }} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
