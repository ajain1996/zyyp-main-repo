import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
import { COLORS, images, styles } from "../../constants";
import { Button, ButtonText } from "../../components";
import ReadMore from "react-native-read-more-text"; // Expandable Text package
import { Appcontext } from "../../Setup/Appcontext";

// Read More Click Event Start ------
const _renderTruncatedFooter = (handlePress) => {
  return (
    <Text style={styles.sc_ReadMoreText} onPress={handlePress}>
      Read more
    </Text>
  );
};

const _renderRevealedFooter = (handlePress) => {
  return (
    <Text style={styles.sc_ReadMoreText} onPress={handlePress}>
      Show less
    </Text>
  );
};

//------- Read More Click Event End
const Sucess = ({ navigation }) => {
  const { homeClick } = useContext(Appcontext);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={styles.sc_container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.sc_componentView}>
          <Image
            style={styles.sc_imageView}
            source={images.onSucess}
            resizeMode="contain"
          />
          <View style={styles.sc_bodyView}>
            <Text style={styles.sc_tittle_Text}>SUCCESS!</Text>
            <Text style={styles.sc_sub_tittle}>Application submitted</Text>
            <ReadMore
              numberOfLines={4}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}>
              <Text style={styles.sc_description}>
                You have successfully applied for your company account. We will
                notify you within 24 hours once your account is verfied and
                approved
              </Text>
            </ReadMore>
          </View>
        </View>
      </ScrollView>
      <View style={styles.sc_footerview}>
        <Button
          type={1}
          color={COLORS.primary}
          icon={images.Next}
          onPress={() => homeClick()}>
          <ButtonText color={COLORS.white} text={"Explore"} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Sucess;
