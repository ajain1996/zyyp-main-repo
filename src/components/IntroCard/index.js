//Intro Slider componet
import React, {useState, useRef,useContext} from 'react';
import {View, FlatList, Animated} from 'react-native';
import {styles, images, strings} from '../../constants';
import {NextButton, OnBoardItem} from '../../components';
import { Appcontext } from '../../Setup/Appcontext';

const IntroData = [
  {
    id: '1',
    tittle: strings.Slider_1,
    src: images.Slider1,
  },
  {
    id: '2',
    tittle: strings.Slider_2,
    src: images.Slider2,
  },
  {
    id: '3',
    tittle: strings.Slider_3,
    src: images.Slider3,
  },
  {
    id: '4',
    tittle: strings.Slider_4,
    src: images.Slider4,
  },
  {
    id: '5',
    tittle: strings.Slider_5,
    src: images.Slider5,
  },
];

export default Onboarding = ({onChangeSlideIndex}) => {
  const { introClick } = useContext(Appcontext)
  const [currenIndex, setCurrenIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const viewableItemChanged = useRef(({viewableItems}) => {
    setCurrenIndex(viewableItems[0].index);
    onChangeSlideIndex(viewableItems[0].index, IntroData.length - 1);
  }).current;
  const scrollTO = () => {
    if (currenIndex < IntroData.length - 1) {
      slideRef.current.scrollToIndex({index: currenIndex + 1});
      onChangeSlideIndex(currenIndex, IntroData.length - 1);
    } else {
      introClick()
    }
  };
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.swipecontainer}>
      <FlatList
        data={IntroData}
        renderItem={({item}) => <OnBoardItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled={true}
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={viewableItemChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slideRef}
      />
      <NextButton
        onCLick={scrollTO}
        percentage={(currenIndex + 1) * (100 / IntroData.length)}
        current_Index={currenIndex}
        last_Index={IntroData.length - 1}
      />
    </View>
  );
};
