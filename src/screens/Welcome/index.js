// GIT UI deliverables issue #3: Business on-boarding
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { ButtonText } from "../../components"; //Reusable Components
import { OfflineNotice } from "../../Utilities";
import { COLORS, images, strings, styles } from "../../constants"; //Themes

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.w_container}>
      <View style={styles.w_componetView}>
        <OfflineNotice />
        <Image
          source={images.BusinessSlider}
          style={styles.w_imageView}
          resizeMode="contain"
        />
        <Text style={styles.w_headerText}>{strings.cp_Tittle}</Text>
        <Text style={styles.w_descText}>{strings.Welcome_des}</Text>
      </View>
      <View style={styles.w_footView}>
        <TouchableOpacity
          style={styles.w_loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <ButtonText color={COLORS.white} text={strings.bt_Login} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Zyyp_SignUp")}>
          <Text style={styles.w_textView}>{strings.bt_business}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
