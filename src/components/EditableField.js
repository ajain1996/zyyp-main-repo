/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { COLORS, FONTS } from "../constants";
import Icon from "react-native-vector-icons/EvilIcons";
import { SmallText, SemiBoldText } from ".";
import { OnboardingSemiboldText } from "./SemoboldText";

export default EditableField = ({ item, editable = false, orgName,value, onChangeText, onCancelPress, onSuccesPress, editPress }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        height: 60,
      }}
    >
      {item.isEditable === true ? (
        <View>
          {editable === false ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: 50,
              }}>
              <OnboardingSemiboldText text={orgName} />
              <TouchableOpacity
                onPress={editPress}
              >
                <Image
                  style={{ width: 25, height: 25, resizeMode: "contain" }}
                  source={require("../../assets/icons/Edit.png")}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: 60,
              }}
            >
              <View style={{ flex: 1 }}>
                <TextInput onChangeText={onChangeText} style={{ borderBottomWidth: 1, ...FONTS.d5, borderBottomColor: COLORS.pl, paddingRight: 10 }} defaultValue={orgName} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={onCancelPress}
                  style={{ width: 40, height: 40 }}
                >
                  <Icon name="close" size={30} color={COLORS.pl} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
        }}>
          <OnboardingSemiboldText text={orgName} />
        </View>
      )}
    </View>
  );
};
