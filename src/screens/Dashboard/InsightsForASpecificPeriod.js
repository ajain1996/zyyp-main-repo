import { View, Text, Animated, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React from 'react';
import { useState } from 'react';
import CustomTextComponent from '../../components/CustomTextComponent';
import SvgUri from 'react-native-svg-uri';
import { Button, ButtonText, SemiBoldText } from '../../components';
import { Searchbar } from 'react-native-paper';
import { COLORS, FONTS, images, SIZES } from "../../constants";
import { BarChart } from 'react-native-chart-kit';
import { windowHeight, windowWidth } from '../../utils/utils';
import DateTopTabsComponent from '../../components/home/DateTopTabsComponent';

export default function InsightsForASpecificPeriod({ navigation }) {

    const data = {
        labels: ["NOV 20", "DEC 20", "JAN 21", "FEB 21", "MAR 21", "APR 21"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    return (
        <ScrollView style={{ backgroundColor: '#F1EFF5' }}>
            <InsightsHeaderComponent navigation={navigation} />
            <View style={{ padding: 15, marginTop: 30, marginBottom: 10 }}>
                <BarChart
                    style={{ backgroundColor: '#999' }}
                    data={data}
                    width={windowWidth - 30}
                    height={220}
                    yAxisLabel=""
                    chartConfig={{
                        backgroundColor: '#F1EFF5',
                        backgroundGradientFrom: '#F1EFF5',
                        backgroundGradientTo: '#F1EFF5',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `#000`,
                        labelColor: (opacity = 1) => `#000`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#999"
                        }
                    }}
                    verticalLabelRotation={0}
                />
            </View>
            <View style={styles.transactionContainer}>
                <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
                    <View style={{ width: 34, height: 3.6, backgroundColor: "grey", marginVertical: 0.5, borderRadius: 50 }} />
                    <View style={{ width: 34, height: 3.6, backgroundColor: "grey", marginVertical: 0.6, borderRadius: 50 }} />
                </View>

                <TouchableOpacity style={{ paddingHorizontal: 20 }}>
                    <Text style={styles.fontStyle}>Transactions</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 10 }}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ alignItems: "center" }}
                    >
                        <View style={{ width: 20 }} />
                        <SvgUri
                            source={require("../../../assets/svg/filter.svg")}
                            style={{ width: 22, height: 22, marginRight: 12 }}
                        />
                        {renderTransactionsBtnBlock(
                            require("../../../assets/svg/down-arrow.svg"),
                            "Department",
                            false
                        )}

                        {renderTransactionsBtnBlock(
                            require("../../../assets/svg/search.svg"),
                            "Project",
                            true
                        )}

                        {renderTransactionsBtnBlock(
                            require("../../../assets/svg/down-arrow.svg"),
                            "Employment",
                            false
                        )}
                        <View style={{ width: 20 }} />
                    </ScrollView>
                </View>
                <View style={{ width: "100%", backgroundColor: "#fff" }}>
                    <DateTopTabsComponent navigation={navigation} />
                </View>
            </View>
        </ScrollView>
    );
}


const InsightsHeaderComponent = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [selectedBtn, setSelectedBtn] = useState("Department");
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));

    const toggleSwitch = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 4000,
        }).start();
        setIsEnabled((previousState) => !previousState);
    };

    return (
        <View style={styles.headerContainer}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("PersonalWalletMainScreen");
                    }}
                >
                    <Text style={styles.fontStyle}>Insights</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.headerContainer2}
                        onPress={toggleSwitch}
                    >
                        {isEnabled
                            ? <></>
                            : <>
                                <View style={{ width: 24, height: 24, borderRadius: 100, backgroundColor: "#B085F1" }} />
                                <View style={{ width: 12 }} />
                            </>}
                        <CustomTextComponent text="Specific Period" fs={14} color={"#000"} />
                        {isEnabled
                            ? <>
                                <View style={{ width: 14 }} />
                                <View
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 100,
                                        backgroundColor: "#B085F1",
                                    }}
                                />
                            </>
                            : <></>}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 30 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <CustomTextComponent
                        text={"Year"} fs={11} color="#999"
                    />
                    {renderTransactionsBtnBlock(
                        require("../../../assets/svg/down-arrow.svg"),
                        "2021",
                        false
                    )}
                </View>
                <View>
                    <CustomTextComponent
                        text={"Month"} fs={11} color="#999"
                    />
                    {renderTransactionsBtnBlock(
                        require("../../../assets/svg/down-arrow.svg"),
                        "All",
                        false
                    )}
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 13, paddingVertical: 3, borderRadius: 30, backgroundColor: selectedBtn === "Department" ? "#7B35E7" : "transparent" }} onP>
                        <CustomTextComponent
                            text={"Department"} fs={11} color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 13, paddingVertical: 3, borderRadius: 30, backgroundColor: selectedBtn === "Employees" ? "#7B35E7" : "transparent" }}>
                        <CustomTextComponent
                            text={"Employees"} fs={11} color="#000"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 13, paddingVertical: 3, borderRadius: 30, backgroundColor: selectedBtn === "Projects" ? "#7B35E7" : "transparent" }}>
                        <CustomTextComponent
                            text={"Projects"} fs={11} color="#000"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 13, paddingVertical: 3, borderRadius: 30, backgroundColor: selectedBtn === "Category" ? "#7B35E7" : "transparent" }}>
                        <CustomTextComponent
                            text={"Category"} fs={11} color="#000"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 8 }} />
        </View>
    );
};


export const renderTransactionsBtnBlock = (image, text, isLarge) => {

    const [selectPopup, setSelectPopup] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => setSelectPopup(true)}
            style={[styles.transactionBtn]}
        >
            <CustomTextComponent text={text} fs={14} color={"#000"} />
            <View style={{ alignItems: 'center', marginTop: isLarge ? -4 : 8 }}>
                <SvgUri
                    source={image}
                    style={{
                        width: isLarge ? 24 : 18,
                        height: isLarge ? 24 : 18,
                        marginLeft: isLarge ? 8 : 20,
                    }}
                />
            </View>

            <Modal visible={selectPopup} transparent>
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.12)" }}>
                    <View
                        style={{
                            backgroundColor: "#FBFBFB",
                            padding: SIZES.padding2 * 2,
                            borderTopRightRadius: SIZES.radius / 1.5,
                            borderTopLeftRadius: SIZES.radius / 1.5,
                        }}
                    >
                        <View
                            style={{
                                height: 80,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <SemiBoldText text={"Project Name"} color={COLORS.secondary2} />
                            <TouchableOpacity>
                                <SemiBoldText text={"Rest"} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                        <Searchbar
                            style={{
                                borderWidth: 1,
                                borderColor: COLORS.pl,
                                borderRadius: SIZES.radius / 3,
                            }}
                            // onFocus={() => onSearchClick(filterType)}
                            placeholder={`Search by Project Name`}
                        />

                        <Text style={{ ...FONTS.body4, color: COLORS.secondary2, paddingVertical: SIZES.base * 3 }}>
                            {`Recently searched Project Name`}
                        </Text>

                        <View style={{ paddingBottom: SIZES.padding2 * 2, flexDirection: "row", flexWrap: "wrap" }}>
                            <Text style={{ ...FONTS.e1, color: COLORS.secondary, paddingVertical: SIZES.base, marginLeft: SIZES.width / 3 }}>
                                {`No Recent Search found`}
                            </Text>
                            {/* <SelectComponent
                  key={item?.key}
                  isSelected={
                    filterType === 0 || filterType === 3
                      ? item?.isCategoriesSelected
                      : filterType === 1 || filterType === 4
                      ? item?.isStatusSelected
                      : filterType === 2
                      ? item?.isDepartmentSelected
                      : null
                  }
                  text={
                    filterType == 0 || filterType === 3
                      ? item?.spend_category_name
                      : filterType === 1 || filterType === 4
                      ? item?.status.toLowerCase().replace("_", " ")
                      : filterType === 2
                      ? item?.department_name
                      : null
                  }
                  selectPress={() => selectItemPress(item, index)}
                /> */}
                        </View>
                        <View
                            style={{
                                height: 80,
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                type={3}
                                color={COLORS.white}
                                onPress={() => setSelectPopup(false)}
                            >
                                <ButtonText text={"CANCEL"} color={COLORS.primary} />
                            </Button>
                            <View style={{ flex: 1, marginLeft: SIZES.base }}>
                                <Button
                                    type={2}
                                    // onPress={selectPress}
                                    icon={images.Enable_icon}
                                    color={COLORS.primary}
                                >
                                    <ButtonText text={"SELECT"} color={COLORS.white} />
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    headerContainer: {
        elevation: 24,
        shadowColor: "rgba(50,50,71,0.88)",
        backgroundColor: "#f7f8f9",
        width: "100%",
        paddingTop: 42,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    fontStyle: {
        fontSize: 22,
        color: "#000",
        // fontWeight: '700',
        fontFamily: "PlayfairDisplay-Black",
    },
    headerContainer2: {
        flexDirection: "row",
        paddingHorizontal: 14,
        height: 35,
        backgroundColor: "#F2ECFB",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    transactionContainer: {
        width: "100%",
        elevation: 24,
        shadowColor: "#999",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#fff",
        paddingVertical: 20,
    },
    transactionBtn: {
        // paddingVertical: 7,
        height: 42,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#dcdcdc",
        justifyContent: "center",
        backgroundColor: "#fbfbfb",
        marginRight: 8,
        paddingHorizontal: 12,
        paddingTop: 4, paddingRight: 6
    },
});

