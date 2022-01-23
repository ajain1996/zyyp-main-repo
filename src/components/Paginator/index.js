import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import {COLORS, FONTS, images} from '../../constants';

import Svg, {G, Circle} from 'react-native-svg';

export default NextButton = ({
  percentage,
  onCLick,
  current_Index,
  last_Index,
}) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    animation(percentage);
  }, [percentage]);
  
  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );
    return () => {
      progressAnimation.removeAllListeners;
    };
  });
  return (
    <View style={styles.container}>
      <Svg   fill={current_Index == last_Index ? COLORS.primary:"transparent"}  width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke={COLORS.primary1}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={COLORS.primary}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity onPress={onCLick} style={styles.button}>
        {current_Index != last_Index ? (
          <Image source={images.Circle} />
        ) : (
          <Text style={styles.buttonText}>Ready</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'pink'
  },
  button: {
    position: 'absolute',
    borderRadius: 100,
    padding: 20,
  },
  buttonText:{
    ...FONTS.body4,
    color:COLORS.white
  }
});
