import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import SvgUri from "react-native-svg-uri";
import CustomTextComponent from "../../../../components/CustomTextComponent";
import { COLORS } from "../../../../utils/colors";
import { windowWidth } from "../../../../utils/utils";

export default function CustomModalComponent({ screenType, setModalVisible, isModalVisible, buttonText, mainText, titleText, svrUriOne }) {

    return (
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
            onPress={() => { setModalVisible(false) }}
        >
            <Modal isVisible={isModalVisible}>
                <View style={{
                    alignItems: "center", paddingHorizontal: 20, backgroundColor: '#fff', paddingVertical: 40,
                    borderRadius: 14
                }}>
                    {svrUriOne ? 
                    <SvgUri
                        source={require("../../../../../assets/svg/modal_header.svg")}
                        style={{ width: 50, height: 50, tintColor: COLORS.PURPLE }}
                    /> :
                    <SvgUri
                        source={require("../../../../../assets/svg/download-gs.svg")}
                        // style={{ width: 50, height: 50, tintColor: COLORS.PURPLE }}
                    /> 
                    }
                    <View style={{ height: 24 }} />
                    <CustomTextComponent
                        text={titleText} fs={22} color={COLORS.BLACK} fw="600"
                    />
                    <View style={{ height: 8 }} />
                    <CustomTextComponent
                        text={mainText} fs={16} color={COLORS.BLACK} fw="600" textAlign="center"
                    />
                    <View style={{ marginTop: 20 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{
                            width: windowWidth / 2.8, borderWidth: 1.4, borderColor: COLORS.PURPLE, borderRadius: 10, height: 46,
                            justifyContent: 'center', alignItems: 'center',
                        }} onPress={() => { setModalVisible(false) }}>
                            <CustomTextComponent
                                text={"CANCEL"} fs={15} color={COLORS.PURPLE} fw="700"
                            />
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 8 }} />

                        <TouchableOpacity style={{
                            width: windowWidth / 2.8, borderWidth: 1.4, borderColor: COLORS.PURPLE, borderRadius: 10, height: 46,
                            justifyContent: 'center', alignItems: 'center', paddingHorizontal: 14,
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.PURPLE
                        }}>
                            <CustomTextComponent
                                text={buttonText} fs={15} color={COLORS.WHITE} fw="700"
                            />
                            <SvgUri
                                source={require("../../../../../assets/svg/tick.svg")}
                                // style={{ width: 20, height: 20, tintColor: COLORS.WHITE }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    buttonStyle: {
        color: 'red',
        marginTop: 20,
        padding: 20,
        backgroundColor: 'green'
    }
});

