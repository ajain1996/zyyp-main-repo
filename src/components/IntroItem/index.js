//Intro Slider Child component
import React from 'react';
import {View, Text, Image} from 'react-native';
import {SIZES, COLORS, styles} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
const OnBoardItem = ({item}) => {
  return (
    <View style={[styles.intro_container, {...SIZES.width}]}>
      <LinearGradient
        style={[styles.intro_container, {...SIZES.width}]}
        colors={[COLORS.g1, COLORS.g2]}>
        <Image
          style={styles.imageView}
          source={item.src}
          resizeMode="contain"
        />
      </LinearGradient>
      <View style={styles.tittle_view}>
        <Text adjustsFontSizeToFit style={styles.text}>
          {item.tittle}
        </Text>
      </View>
    </View>
  );
};

export default OnBoardItem;
