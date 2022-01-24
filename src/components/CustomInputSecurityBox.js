import React, { useState } from 'react';
import { View, Text, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/colors';
import { windowWidth } from '../utils/utils';
import CustomTextComponent from './CustomTextComponent';

export default function CustomInputSecurityBox({ callBack }) {

    const numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const [myList, setMyList] = useState([]);

    const renderAmountComponent = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 50 }}>
                <View style={{ width: 10, height: 10, backgroundColor: COLORS.ORANGE, borderRadius: 100, marginHorizontal: 6 }} />
                <View style={{ width: 10, height: 10, backgroundColor: COLORS.ORANGE, borderRadius: 100, marginHorizontal: 6 }} />
                <View style={{ width: 10, height: 10, backgroundColor: COLORS.ORANGE, borderRadius: 100, marginHorizontal: 6 }} />
                <View style={{ width: 10, height: 10, backgroundColor: "#dcdcdc", borderRadius: 100, marginHorizontal: 6 }} />
            </View>
        );
    }

    return (
        <View style={{ alignItems: 'center' }}>
            {renderAmountComponent()}

            <View style={{ height: 30 }} />
            <CustomTextComponent
                text={"Company Balance: AED 35,500.00"}
                fs={14}
                ff="Montserrat-Regular"
                color={COLORS.BLACK}
            />
            <View style={{ height: 10 }} />
            <FlatList
                data={numbersList}
                numColumns={3}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item, index, separators }) => {
                    return (
                        <TouchableHighlight
                            underlayColor={"#eee"}
                            key={item.key}
                            style={{
                                width: windowWidth / 3.3, height: 100, justifyContent: 'center', alignItems: 'center',
                                backgroundColor: '#fff',
                            }}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}
                            onPress={() => {
                                // console.log("\n\n \n\n myList.push(item): ", item, myList);
                                // setMyList(localList);
                                callBack(myList);
                                if (myList.length < 5) {
                                    setMyList(previousMovies => [...previousMovies, { item }]);
                                }
                            }}
                        >
                            <CustomTextComponent
                                text={item}
                                fs={20}
                                ff="Montserrat-Regular"
                                color={"#000"}
                            />
                        </TouchableHighlight>
                    );
                }}
            />
        </View>
    )
}
