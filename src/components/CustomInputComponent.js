import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

// import Entypo from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../utils/colors";
import { windowWidth } from "../utils/utils";

const CustomInputScreen = ({
  checkInputImage,
  labelValue,
  showPassword,
  setShowPassword,
  secureTextEntry,
  placeholderText,
  iconType,
  passwordIcon,
  value,
  headingText,
  error,
  onPress,
  ...rest
}) => {
  return (
    <View
      style={{
        width: checkInputImage ? "97.5%" : "100%",
        backgroundColor: "#F7F8FA",
        borderRadius: 8,
        paddingHorizontal: 12,
      }}
    >
      <TextInput
        multiline={true}
        numberOfLines={15}
        style={{ height: 200, textAlignVertical: "top", fontSize: 15 }}
        placeholder={placeholderText}
        placeholderTextColor="#999"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    backgroundColor: "#F7F8FA",
    borderRadius: 8,
    paddingHorizontal: 12,
    // elevation: 1
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  input: {
    flex: 1,
    paddingLeft: 18,
    fontSize: 14,
    // height: 40,
    fontFamily: "lucida grande",
    justifyContent: "center",
    alignItems: "center",
    color: COLORS.BLACK,
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: 42,
    fontSize: 16,
    fontFamily: "lucida grande",
    borderRadius: 8,
    borderWidth: 1,
  },
});
export default CustomInputScreen;
