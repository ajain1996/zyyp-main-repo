// GIT UI deliverables issue #3: Business on-boarding
import React, { useState, useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { styles } from "../../constants"; //Themes (color,fonts,typhography)
import { Onboard, IntroHeader } from "../../components"; //Custom component
import { OfflineNotice } from "../../Utilities";

const IntroSlider = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalIndex, setFinalIndex] = useState(0);

  //Slider Changes function
  const onChangeSlideIndex = (val, finalIndex) => {
    setCurrentIndex(val);
    setFinalIndex(finalIndex);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.componentView}>
        <OfflineNotice />
        <IntroHeader index={currentIndex} finalIndex={finalIndex} />
        <Onboard nav={navigation} onChangeSlideIndex={onChangeSlideIndex} />
      </View>
    </SafeAreaView>
  );
};
export default IntroSlider;
