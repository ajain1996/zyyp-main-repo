import React, { useState } from 'react';
import { View, Text, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/colors';
import { windowWidth } from '../utils/utils';
import CustomTextComponent from './CustomTextComponent';

export default function CustomInputBoxScreen({ callBack }) {

    const numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const [myList, setMyList] = useState([]);

    const renderAmountComponent = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 60 }}>
                <CustomTextComponent
                    text={"AED"}
                    fs={14}
                    fw="700"
                    color={"#999"}
                />
                <View style={{ marginHorizontal: 10, marginTop: 8 }}>
                    {myList.length !== 0
                        ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {
                                myList.map((item) => {
                                    return (
                                        <CustomTextComponent
                                            text={item.item}
                                            fs={44}
                                            fw="300"
                                            color={COLORS.BLACK}
                                        />
                                    );
                                })
                            }
                            <CustomTextComponent
                                text={".00"}
                                fs={44}
                                fw="300"
                                color={COLORS.BLACK}
                            />
                        </View>
                        : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <CustomTextComponent
                                text={"0"}
                                fs={44}
                                fw="400"
                                color={"#999"}
                            />
                        </View>}
                </View>
                <CustomTextComponent
                    text={"AED"}
                    fs={14}
                    fw="600"
                    color={"#fff"}
                />
            </View>
        );
    }

    return (
        <View style={{ alignItems: 'center' }}>
            {renderAmountComponent()}

            <View style={{ height: 40 }} />
            <CustomTextComponent
                text={"Company Balance: AED 35,500.00"}
                fs={14}
                fw="600"
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
                                fw="600"
                                color={"#000"}
                            />
                        </TouchableHighlight>
                    );
                }}
            />
        </View>
    )
}
