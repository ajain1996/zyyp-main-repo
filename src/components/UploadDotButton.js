/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { scale, verticalScale,moderateScale } from 'react-native-size-matters';
import { ButtonText, SemiBoldText, SmallText } from '.';
import { COLORS, images, SIZES } from '../constants';
export default UploadDotButton = ({ type, text, color, onPress, children }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'column',
                backgroundColor: color,
                width: moderateScale(SIZES.width * 0.38),
                height: verticalScale(80),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                borderStyle: 'dashed',
                marginVertical: 20,
                paddingHorizontal: 10,
                borderWidth: 2,
                borderColor: COLORS.pl,
            }}>
            <SmallText color={COLORS.secondary} text={text} />
            <View style={{ height: 5 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ButtonText color={COLORS.primary} text={'Upload'}  />
                <View style={{ width: 5 }} />
                <Image style={{ width: 25, height: 25 }} source={images.UploadBtn} />
            </View>
        </TouchableOpacity>
    );
};
