import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { COLORS, FONTS, SIZES, images } from "../../constants";
import { Snackbar } from "react-native-paper";
const NetWorkError = ({ tittle, visible=true, des, height, dissMiss }) => {
  return (
    <Modal transparent={true} visible={true} style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => dissMiss()}>
        <View
          style={{
            height: SIZES.height,
            paddingBottom:30,
            backgroundColor :'rgba(256,256,256,0.5)'
          }}
        >
          <Snackbar
            visible={true}
            onDismiss={() => dissMiss}
            style={{
              backgroundColor: "#FFFAF1",
              color: "#000",
              borderWidth: 1,
              borderColor: "#FFB020",
              borderRadius: 8,
              zIndex: 1,
            }}
            theme={{ colors: { accent: "#000" } }}
            action={{
              labelStyle: { color: COLORS.secondary, ...FONTS.body2 },
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
              }}
            >
              <Image source={images.warning} />
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: SIZES.padding,
                }}
              >
                <Text
                  style={{
                    color: COLORS.secondary2,
                    ...FONTS.h6,
                  }}
                >
                  {tittle}
                </Text>
                <Text
                  style={{
                    color: COLORS.secondary2,
                    ...FONTS.t1,
                  }}
                >
                  {des}
                </Text>
              </View>
            </View>
          </Snackbar>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: SIZES.height,
    backgroundColor:'pink'
  },
});
export default NetWorkError;
