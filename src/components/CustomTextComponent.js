import React from 'react';
import { View, Text } from 'react-native';

export default function CustomTextComponent({ text, fs, fw, color, mt, textAlign, lineHeight }) {
    return (
        <View>
            <Text style={{
                color: color, fontSize: fs, fontFamily: "Poppins-Regular", fontWeight: fw, marginTop: mt,
                textAlign: textAlign, lineHeight: lineHeight
            }}>
                {text}
            </Text>
        </View>
    )
}
