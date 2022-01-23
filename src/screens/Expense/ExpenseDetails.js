import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  LogBox,
  Dimensions,
  Image,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  OnboardingCheckinTitleText,
  ExpenseDetailsTitle,
  ExpenseDetailsAmount,
  ExpenseDetailsStatus,
  ExpenseDetailsTag,
} from "../../components/SemoboldText";
import { COLORS, images } from "../../constants";
import styles from "./expense.style";
import image from "../../constants/image";
import json from "../../onBoardingStructure/paymentCategory.json";
import { ExpenseTimeline } from "../../components/ExpenseTimeline";
import { ExpenseSingleTimeline } from "../../components/ExpenseSingleTimeline";
import { TransactionDetails } from "../../components/TransactionDetails";
import { Button, ButtonText } from "../../components";
import { DeletePopup } from "../../components/DeletePopup";
import { InfoPopup } from "../../components/InfoPopup";

const { width } = Dimensions.get("window");

export default ExpenseDetails = ({ navigation, route }) => {
  const [list, SetList] = useState(json.list);
  const [isExpand, SetIsExpand] = useState(false);
  const [deletePopup, SetDeletePopup] = useState(false);
  const [infoPopup, SetInfoPopup] = useState(false);
  const [approver, SetApprover] = useState(route.params.approver);
  const [transactionDetailsType, SetTransactionDetailsType] = useState(
    route.params.transactionType
  );
  const [btnTitle, SetBtnTitle] = useState("SUBMIT");

  const renderItem = ({ item }) => <ExpenseTimeline item={item} />;

  const onChangeExpand = () => {
    SetIsExpand(!isExpand);
  };
  const onChangeDelete = () => {
    SetDeletePopup(!deletePopup);
  };
  const onChangeOk = () => {
    SetDeletePopup(!deletePopup);
  };
  const deletePress = () => {
    SetDeletePopup(true);
  };

  const infoBtnAction = () => {
    SetBtnTitle("ASK INFO");
    SetInfoPopup(true);
  };

  const approveBtnAction = () => {
    SetBtnTitle("APPROVE");
    SetInfoPopup(true);
  };
  const rejectBtnAction = () => {
    SetBtnTitle("REJECT");
    SetInfoPopup(true);
  };

  const onChangeInfoDelete = () => {
    SetInfoPopup(false);
  };

  const onChangeInfoOk = () => {
    SetInfoPopup(false);
  };
  const navigateExpenseForm = () => {
    navigation.navigate("ExpenseRequest", {
      isPaymentEnable: false,
      isEditable: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles().header}>
        <TouchableOpacity
          style={{
            width: 44,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name={"chevron-back"} size={27} color={COLORS.black} />
        </TouchableOpacity>
        <View
          style={{ alignItems: "center", justifyContent: "center", height: 60 }}
        >
          <Text
            style={{
              color: "#323F4B",
              fontSize: 19,
              fontWeight: "400",
              fontFamily: "Poppins-Regular",
            }}
          >
            View Expense Request
          </Text>
        </View>
        {approver === false ? (
          <TouchableOpacity
            style={{
              width: 44,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={deletePress}
          >
            <Icon1 name={"delete"} size={24} color={COLORS.black} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <DeletePopup
        onChangeDelete={onChangeDelete}
        onChangeOk={onChangeOk}
        btnTitle={"SUBMIT"}
        visible={deletePopup}
      />
      <InfoPopup
        onChangeDelete={onChangeInfoDelete}
        onChangeOk={onChangeInfoOk}
        title={"Add Comment"}
        desc={""}
        visible={infoPopup}
        btnTitle={btnTitle}
      />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.transactionBG,
        }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={styles().body}>
          <View style={styles().topContainer}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: width - 20,
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <View />
                <ExpenseDetailsTitle text={"EXPENSE ID"} />
                <TouchableOpacity onPress={navigateExpenseForm}>
                  <Image
                    style={{ width: 25, height: 25, resizeMode: "contain" }}
                    source={image.Edit}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles().padding} />
              <View style={{ flexDirection: "row",right:10 }}>
                <ExpenseDetailsAmount amountType={"aed"} amount={"321.00"} />
              </View>
              <View style={styles().padding} />
              <View
                style={{
                  paddingHorizontal: 15,
                  backgroundColor: "#F2F0F9",
                  flexDirection:"row",
                  alignItems:"center",
                  justifyContent:"center",
                  paddingVertical: 5,
                  marginTop: 10,
                  borderRadius: 16,
                }}
              >
                 <Image source={images.dot} style={{ width: 6, height: 6 }} />
                 <View style={{width:5}} />
                <ExpenseDetailsStatus color={"#6E6893"} text={"Receipt Submitted"} />
              </View>
              <View style={styles().padding} />
              <View style={{ flexDirection: "row", width: width - 20 }}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    backgroundColor: "#DCF2EA",
                    paddingVertical: 5,
                    marginTop: 10,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={images.wallet}
                    style={{ width: 25, height: 25 }}
                  />
                  <View style={{ width: 5 }} />
                  <ExpenseDetailsTag text={"Expense category 1"} />
                </View>
                <View style={{ width: 8 }} />
                <View
                  style={{
                    paddingHorizontal: 15,
                    backgroundColor: "#FFEFD2",
                    paddingVertical: 5,
                    marginTop: 10,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ExpenseDetailsTag color={"#66460D"} text={"Project Name"} />
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 20 }} />
          <View style={{ flex: 1 }}>
            {isExpand ? (
              list.map((item, index) => (
                <ExpenseTimeline key={`${index}`} item={item} />
              ))
            ) : (
              <ExpenseSingleTimeline
                text={
                  "Hey, please can you provide additional reasoning for why this expense is needed. We will also need additional approval for this request"
                }
              />
            )}

            <TouchableOpacity
              onPress={onChangeExpand}
              style={{
                padding: 20,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={isExpand ? images.collapse : images.expand}
                style={{ width: 30, height: 30 }}
              />
              <View style={{ width: 5 }} />
              <Text style={styles().expandStyle}>
                {isExpand ? "COLLAPSE" : "EXPAND"}
              </Text>
            </TouchableOpacity>
            <View style={{ height: 8 }} />
            <TransactionDetails type={transactionDetailsType} />
            <View style={{ height: 8 }} />
            {approver ? (
              <View>
                <View
                  style={{
                    height: 50,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={infoBtnAction}
                    style={{
                      height: 50,
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "#343C44",
                      alignItems: "center",
                      justifyContent: "center",
                      width: width * 0.7,
                      borderRadius: 7,
                    }}
                  >
                    <Text style={{ color: "#85949F" }}>NEED MORE INFO</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: 15 }} />
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    onPress={rejectBtnAction}
                    style={styles().btnStyle}
                  >
                    <ButtonText color={COLORS.primary} text={"REJECT"} />
                    <Image
                      style={{ width: 27, height: 27 }}
                      source={images.reject}
                    />
                  </TouchableOpacity>
                  <View style={{ width: 6 }} />
                  <Button
                    onPress={approveBtnAction}
                    type={2}
                    icon={images.submit}
                    color={COLORS.primary}
                  >
                    <ButtonText color={COLORS.white} text={"APPROVE"} />
                  </Button>
                </View>
              </View>
            ) : (
              <View />
            )}
            <View style={{ height: 20 }} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
