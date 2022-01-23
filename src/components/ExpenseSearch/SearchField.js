import React from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { COLORS, images } from "../../constants";
import { OnboardingCheckinDescText } from "../SemoboldText";
import styles from "./expenseSearch.style";
export const SearchField = ({ placeholder, onChangeText, value, clearAction }) => {
    return (<View style={[styles().searchContainer, { borderColor: value ? COLORS.primary : COLORS.inner_line }]}>
        <View style={styles().searchIcon}>
           {value ? <View /> : <Image source={images.searchIcon} style={styles().imageIcon} />}  
            <View style={styles().padding} />
            <TextInput
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
        {value ? <TouchableOpacity onPress={clearAction}>
            <OnboardingCheckinDescText text={"clear"}
                color={COLORS.primary} />
        </TouchableOpacity> : <View />}
    </View>)
}