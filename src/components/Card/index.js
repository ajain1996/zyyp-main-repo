import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, images, SIZES, strings, VECTOR } from "../../constants";
import { SmallText } from "..";

const Card = ({ navigation, pinclick, pincard }) => {
  return (
    <View style={styles.componetView}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
            borderRadius: SIZES.radius * 3,
            backgroundColor: COLORS.inputborder,
          }}
        >
          <Image
            source={images.onSucess}
            style={{
              width: 120,
              height: 120,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ flex: 1, margin: SIZES.base, justifyContent: "center" }}>
          <Text numberOfLines={2} style={{ ...FONTS.t2 }}>
            Prhabhu S
          </Text>
          <SmallText text={"haks***@gmail.in"}></SmallText>
          <Text
            onPress={() => navigation.navigate("Settings")}
            style={{ ...FONTS.h6, color: COLORS.primary }}
          >
            Edit Profile
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          height: 120,
          backgroundColor: "rgba(246, 251, 255, 1)",
          marginVertical: SIZES.base * 3,
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 5,
          alignItems: "center",
          borderRadius: SIZES.radius / 3,
        }}
      >
        <Image
          source={images.card}
          style={{
            flex: 0.5,
            //   width: "100%",
            height: "100%",
            resizeMode: "cover",
            marginTop: SIZES.base * 3.5,
          }}
        />
        <View style={{ flex: 0.5, margin: SIZES.base }}>
          <Text style={{ ...FONTS.body6 }}>.... .... ..XX 2130 </Text>
          <Text
            onPress={() => navigation.navigate("Settings")}
            style={{ ...FONTS.t1, color: COLORS.secondary }}
          >
            06/27
          </Text>
          <Text
            onPress={pinclick}
            style={{ ...FONTS.h6, color: COLORS.primary }}
          >
            {pincard == true ? `Reset Security PIN` : ` Set Security PIN`}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  componetView: {
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.base,
  },
});
export default Card;
