import React from "react";
import { View, Text, TextInput, Platform } from "react-native";
import { SmallText } from "..";
import { FONTS, COLORS } from "../../constants";
import styles from './expenseAmount.style';

export const ExpenseAmount = ({ placeholderContent,highlighted, text, placeholder, onChangeText }) => {
    return (<View style={styles().container}>
        <SmallText text={placeholderContent} />
        <View
            style={[styles().textFieldContainer,{borderColor: highlighted ? "#FF914D" : "transparent"}]}
        >
            <Text style={{ ...FONTS.body4, color: COLORS.secondary2 }}>
                AED
            </Text>
            <TextInput
                style={{
                    height: 50,
                    paddingLeft: 10,
                    ...FONTS.body4,
                    width: "90%",
                    color: COLORS.secondary2
                }}
                keyboardType={"numeric"}
                defaultValue={text}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={COLORS.pl}
                onChangeText={onChangeText}
                autoCapitalize="none"
                returnKeyType={Platform.OS === "ios" ? "done" : "done"}
            />
        </View>
    </View>);
}