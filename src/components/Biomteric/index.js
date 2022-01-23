import React from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, strings } from "../../constants";
import { Button, ButtonText } from "../../components";

const Biometric = ({
  show,
  LaterClick,
  title,
  des,
  primary_btn,
  secondary_btn,
  bticon,
  onClick
}) => {
  return (
    <Modal transparent={true} visible={show} style={styles.container}>
      <View style={styles.modal_View}>
        <View style={styles.modal_IN}>
          <Text style={{ ...FONTS.body2, color: COLORS.secondary2 }}>
            {title != "" ? title : "Enable biometric authentication?"}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.secondary2,
              textAlign: "center",
              paddingVertical: SIZES.padding * 2,
            }}
          >
            {des != ""
              ? des
              : "Use your biometric to sign in and confirm payments. You can always set it up later in Settings"}
          </Text>
          <Button onPress={onClick} color={COLORS.primary} icon={bticon} type={2}>
            <ButtonText
              color={COLORS.white}
              text={primary_btn != "" ? primary_btn : strings.bt_Enable}
            />
          </Button>
          <Text
            onPress={LaterClick}
            style={{
              ...FONTS.body6,
              color: COLORS.primary,
              textTransform: "uppercase",
              paddingVertical: SIZES.padding * 2,
            }}
          >
            {secondary_btn != "" ? secondary_btn : strings.bt_Later}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default Biometric;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal_View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 60, 68, 0.75)",
  },
  modal_IN: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    marginHorizontal: SIZES.base * 3,
    padding: SIZES.padding2 * 2,
    borderRadius: SIZES.radius / 1.9,
  },
});
