//Sign_up & Login header
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS, VECTOR, SIZES } from "../../constants";
import { Snackbar } from "react-native-paper";

const Error = ({ tittle, type, visible, height, dissMiss }) => {
  return (
    <Modal transparent={true} visible={visible} style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity activeOpacity={0.9} onPress={() => dissMiss()}>
          <View style={{ height: SIZES.height, bottom: 130 }}>
            <Snackbar
              visible={visible}
              onDismiss={() => dissMiss}
              // duration={1000}
              style={{
                // backgroundColor:'pink',
                backgroundColor:
                  type == 1 ? "#F3F6FF" : type == 3 ? "#F5FBF8" : "#FDF4F4",
                color: "#000",
                borderWidth: 1,
                borderColor:
                  type == 1 ? "#2952CC" : type == 3 ? "#52BD94" : "#A73636",
                borderRadius: 8,
                zIndex: 1,
              }}
              theme={{ colors: { accent: "#000" } }}
              action={{
                label: type != 3 ? "×" : "",
                labelStyle: { color: COLORS.secondary, ...FONTS.body5 },
                onPress: () => {
                  dissMiss();
                  // alert("dissMiss")
                },
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  width: SIZES.width / 1.3,
                  alignItems: "center",
                }}
              >
                {type === 1
                  ? VECTOR.Information
                  : type == 3
                  ? VECTOR.check
                  : VECTOR.Info_Error}
                <Text
                  style={{
                    color:
                      type == 1 ? "#2952CC" : type == 3 ? "#317159" : "#A73636",
                    ...FONTS.h6,
                    textAlign: "center",
                  }}
                >
                  {"    "}
                  {tittle}
                </Text>
              </View>
            </Snackbar>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: SIZES.height,
  },
});

export default Error;

//Tyeps Usages ...

// type 0 for error message handling
// type 1 for info message handidling
// type 2 for internet message handling
// type 3 for fileupload message handling