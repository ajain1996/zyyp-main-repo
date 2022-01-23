import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { TagText } from "..";

import { images } from "../../constants";
import styles from './expenseCategory.style';


export const ExpenseTag = ({ bgColor,hasImage, text, onClose, color }) => {
    return (<View style={styles(bgColor).tagStyle}>
        {hasImage ? <Image source={images.wallet} style={styles().imageIcon} /> : <View style={{height:27}}  />}
        <View style={styles().padding} />
        <TagText text={text} color={color} />
        <View style={styles().padding} />
        <TouchableOpacity  
            onPress={onClose}
            style={styles().closeIconContainer}>
            <Icon name="close" size={25} color={color} />
        </TouchableOpacity>
    </View>)
}