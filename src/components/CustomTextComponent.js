import React from 'react';
import { View, Text } from 'react-native';

export default function CustomTextComponent({ text, fs, fw, color, mt, textAlign, lineHeight, ff, ml }) {
    return (
        <View>
            <Text style={{
                color: color, fontSize: fs, fontFamily: ff ? ff : "Poppins-Regular", fontWeight: fw, marginTop: mt,
                textAlign: textAlign, lineHeight: lineHeight, marginLeft: ml
            }}>
                {text}
            </Text>
        </View>
    )
}
