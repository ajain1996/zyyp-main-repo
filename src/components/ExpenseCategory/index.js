import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { PlaceHolderText, SmallText } from "../../components";
import { images } from "../../constants";
import styles from './expenseCategory.style';
import { ExpenseTag } from "./expenseTag";

export const ExpenseCategory = ({ type,hasImage, onItemSelected,onClose, placeholderContent, text, bgColor, color, placeholder, noIcon }) => {
    return (<TouchableOpacity onPress={onItemSelected} style={styles().container}>
        <SmallText text={placeholderContent} />
        <View
            style={styles().textFieldContainer}
        >
            {type === 1 ? <View><PlaceHolderText text={placeholder} /></View> :
                <ExpenseTag hasImage={hasImage} bgColor={bgColor} text={text} color={color} onClose={onClose} />}
            {noIcon ? <></> : <Image source={images.searchIcon} style={styles().imageIcon} />}
        </View>
    </TouchableOpacity>);
}