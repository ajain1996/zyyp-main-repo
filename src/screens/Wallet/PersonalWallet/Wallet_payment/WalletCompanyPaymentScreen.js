import React, { createRef, useState } from "react";
import { View, Text, Keyboard, TouchableOpacity, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DocumentPicker from "react-native-document-picker";
import { DatePickerModal } from "react-native-paper-dates";
import Icon from "react-native-vector-icons/EvilIcons";
import {
  Button,
  ButtonText,
  EmailField,
  Error,
  NonEditableTextField,
  UploadButton,
} from "../../../../components";
import { ExpenseAmount } from "../../../../components/ExpenseAmount";
import { ExpenseCategory } from "../../../../components/ExpenseCategory";
import { Notes } from "../../../../components/Notes";
import { COLORS, FONTS, images, SIZES } from "../../../../constants";
import { ExpensePayment } from "../../../../components/ExpensePayment";
import { ExpenseSearch } from "../../../../components/ExpenseSearch";
import { ExpenseTransaction } from "../../../../components/ExpenseTransaction";
import json from "../../../../onBoardingStructure/paymentCategory.json";
import json1 from "../../../../onBoardingStructure/projectCategory.json";
import json2 from "../../../../onBoardingStructure/claimed.json";

import styles from "../../../Expense/expense.style";
import ActionSheet from "react-native-actions-sheet";
import { getDateToString } from "../../../../Utilities";
import { InfoPopup } from "../../../../components/InfoPopup";
import { CompanyWalletTransactionHeader } from "../../CompanyWalletTransactionScreen";
import { windowWidth } from "../../../../utils/utils";
import CustomTextComponent from "../../../../components/CustomTextComponent";
import { PaymentSearch } from "../../../../components/ExpenseSearch/PaymentSearch";

const actionSheetRef = createRef();
const WalletCompanyPaymentScreen = ({ navigation }) => {
  // Fields
  const [amount, SetAmount] = useState("");
  const [categoryData, SetCategoryData] = useState({
    type: 1,
    value: "",
  });
  const [projectData, SetProjectData] = useState({
    type: 1,
    value: "",
  });
  const [notes, SetNotes] = useState("");
  const [filename, SetFilename] = useState(null);

  const [searchText, SetSearchText] = useState("");
  const [projectSearchText, SetProjectSearchText] = useState("");

  const [btnTitle, SetBtnTitle] = useState("SUBMIT");
  const [ctType, SetType] = useState("category");
  const [infoPopup, SetInfoPopup] = useState(false);
  const [zyypMoreAmount, SetZyypMoreAmount] = useState(false);

  const [unClaimed, SetUnClaimed] = useState(null);
  const [paymentDate, SetPaymentDate] = useState("");
  const [paymentDateBtn, SetPaymentDateBtn] = useState(false);
  const [list, SetList] = useState(json.list);
  const [projectList, SetProjectList] = useState(json1.list);
  const [claimedList, SetClaimedList] = useState(json2.list);
  const [isCategorySelected, SetIsCategorySelected] = useState(false);
  const [isProjectSelected, SetIsProjectSelected] = useState(false);

  const [isTransactionSelected, SetIsTransactionSelected] = useState(false);
  const [paymentTypes, SetPaymentTypes] = useState([
    "Zyyp Card",
    "Personal Card",
    "Close",
  ]);

  const [paymentType, SetPaymentType] = useState("Zyyp Card");

  // Toast handling state
  const [isShowToast, setShowToast] = useState(false);
  const [alertType, setAlertType] = useState(0);
  const [toastTitle, setToasttitle] = useState("");

  const onChangeText = (text) => {
    SetSearchText(text);
    const newData = json.list.filter((item) => {
      const itemData = item.value.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    SetList(newData);
  };
  const onChangeProjectText = (text) => {
    SetProjectSearchText(text);
    const newData = json1.list.filter((item) => {
      const itemData = item.value.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    SetProjectList(newData);
  };
  const clearAction = () => {
    SetSearchText("");
    SetList(json.list);
    Keyboard.dismiss();
  };

  const clearProjectAction = () => {
    SetProjectSearchText("");
    SetProjectList(json1.list);
    Keyboard.dismiss();
  };

  const onItemSelected = (item) => {
    list.forEach((element, index) => {
      if (element.id === item.id) {
        list[index].selected = true;
      } else {
        list[index].selected = false;
      }
    });
    SetCategoryData({
      type: 2,
      value: item.value,
    });
    SetList([...list]);
    onDismiss();
  };

  const onItemProjectSelected = (item) => {
    projectList.forEach((element, index) => {
      if (element.id === item.id) {
        projectList[index].selected = true;
      } else {
        projectList[index].selected = false;
      }
    });
    SetProjectData({
      type: 2,
      value: item.value,
    });
    SetProjectList([...projectList]);
    onDismissProject();
  };

  const onCategorySelected = () => {
    SetType("category");
    SetIsCategorySelected(true);
  };

  const onProjectSelected = () => {
    SetType("Project");
    SetIsProjectSelected(true);
  };

  const onDismiss = () => {
    SetIsCategorySelected(false);
  };
  const onDismissProject = () => {
    SetIsProjectSelected(false);
  };

  const onCloseCategory = () => {
    SetCategoryData({
      type: 1,
      value: "",
    });
    list.forEach((element, index) => {
      list[index].selected = false;
    });
    SetList([...list]);
  };

  const onCloseProject = () => {
    SetProjectData({
      type: 1,
      value: "",
    });
    projectList.forEach((element, index) => {
      projectList[index].selected = false;
    });
    SetList([...projectList]);
  };

  const selectEmirate = (data) => {
    if (data === "Close") {
      actionSheetRef.current?.hide();
    } else {
      // dispatch(userEmiratevalue(data));
      SetPaymentType(data);
      actionSheetRef.current?.hide();
    }
  };

  const unClaimedTransactionSelectionAction = ({ type, item }) => {
    if (type === "close") {
      claimedList.forEach((element, index) => {
        claimedList[index].selected = false;
      });
      SetClaimedList([...claimedList]);
      SetIsTransactionSelected(false);
      SetZyypMoreAmount(false);
      SetUnClaimed(null);
    } else {
      claimedList.forEach((element, index) => {
        if (element.id === item.id) {
          claimedList[index].selected = true;
        } else {
          claimedList[index].selected = false;
        }
      });
      SetClaimedList([...claimedList]);
      if (item.id > amount) {
        SetZyypMoreAmount(true);
      } else {
        SetZyypMoreAmount(false);
      }
      SetUnClaimed(item);
    }
  };

  const claimedItemSelected = ({ type, item }) => {
    SetIsTransactionSelected(false);
  };

  const pickImage = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      SetFilename({
        filename: res[0].name,
        type: res[0].type,
        uri: res[0].uri,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const onChangeInfoDelete = () => {
    SetInfoPopup(false);
  };

  const onChangeInfoOk = () => {
    SetInfoPopup(false);
  };
  const onDismissError = () => {
    setShowToast(false);
  };
  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      keyboardShouldPersistTaps={"handled"}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.white }}
      enableOnAndroid={true}
      enableResetScrollToCoords={true}
      keyboardDismissMode="interactive"
    >
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Payment Details"
      />
      <Error
        dissMiss={onDismissError}
        visible={isShowToast}
        tittle={toastTitle}
        type={alertType}
      />
      <InfoPopup
        onChangeDelete={onChangeInfoDelete}
        onChangeOk={onChangeInfoOk}
        title={"Are you sure you want to submit?"}
        desc={
          "Your payment amount(aed 3210) exceeds request amount(aed 3000). Please provide explanation."
        }
        visible={infoPopup}
        btnTitle={btnTitle}
      />
      <DatePickerModal
        mode={"single"}
        visible={paymentDateBtn}
        disableStatusBar={true}
        onDismiss={() => SetPaymentDateBtn(false)}
        onConfirm={(dt) => {
          let date = getDateToString(dt.date);
          SetPaymentDateBtn(false);
          SetPaymentDate(date);
        }}
        date={new Date()}
      />
      <ActionSheet ref={actionSheetRef}>
        {paymentTypes.map((data, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => selectEmirate(data)}
              style={{
                marginHorizontal: SIZES.padding2 * 3,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.pl,
              }}
            >
              <Text
                style={
                  data === "Close"
                    ? styles().actionSheet
                    : styles().actionSheet1
                }
              >
                {data}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ActionSheet>
      <ExpenseTransaction
        unClaimedTransactionSelectionAction={
          unClaimedTransactionSelectionAction
        }
        visible={isTransactionSelected}
        claimedItemSelected={claimedItemSelected}
        list={claimedList}
      />
      <PaymentSearch
        visible={isCategorySelected}
        text={searchText}
        onChangeText={onChangeText}
        clearAction={clearAction}
        list={list}
        title={"Expense Category"}
        placeholder={"Search expense category"}
        onItemSelected={onItemSelected}
        extraData={list}
        onDismiss={onDismiss}
        hasImage={true}
      />
      <PaymentSearch
        visible={isProjectSelected}
        text={projectSearchText}
        onChangeText={onChangeProjectText}
        clearAction={clearProjectAction}
        list={projectList}
        onItemSelected={onItemProjectSelected}
        extraData={projectList}
        title={"Project"}
        placeholder={"Search project Name"}
        onDismiss={onDismissProject}
        hasImage={false}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          padding: moderateScale(20),
        }}
      >
        <View>
          <NonEditableTextField
            placeholderContent={"Requested Amount"}
            text={"AED    1,500"}
          />
        </View>
        {/* 
        <ExpenseAmount
          placeholderContent={"Requested Amount"}
          placeholder={"enter amount"}
          onChangeText={(text) => SetAmount(text)}
        /> */}
        <ExpenseCategory
          placeholderContent={"Expense Category"}
          placeholder={"Search with Expense Category"}
          type={categoryData.type}
          text={categoryData.value}
          color={"#317159"}
          bgColor={"#DCF2EA"}
          onItemSelected={onCategorySelected}
          onClose={onCloseCategory}
          hasImage={true}
        />
        <ExpenseCategory
          placeholderContent={"Project"}
          placeholder={"Search with Project ID"}
          type={categoryData.type}
          text={categoryData.value}
          color={"#317159"}
          bgColor={"#DCF2EA"}
          onItemSelected={onCategorySelected}
          onClose={onCloseCategory}
          hasImage={true}
        />
        <ExpenseCategory
          placeholderContent={"Department"}
          placeholder={"Search with department ID"}
          type={projectData.type}
          text={projectData.value}
          color={"#317159"}
          bgColor={"#DCF2EA"}
          onItemSelected={onProjectSelected}
          onClose={onCloseProject}
          hasImage={false}
        />

        <Notes
          placeholderContent={"Note (optional)"}
          placeholder={"Type any relevant comment to this request"}
          onChangeText={(text) => SetNotes(text)}
        />
        {filename === null ? (
          <View />
        ) : (
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              alignItems: "center",
              backgroundColor: "#85949F",
              borderRadius: 25,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                {filename.filename}
              </Text>
            </View>
            {filename === null ? (
              <View />
            ) : (
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  SetFilename(null);
                }}
              >
                <Icon name="close" size={22} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={{ height: 8 }} />
        {/* <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              textAlign: "center",
              color: "#323F4B",
              fontSize: 15,
              lineHeight: 20,
              fontWeight: "700",
              fontFamily: "Poppins-Regular",
            }}
          >
            Upload Document
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.pl,
              fontSize: 15,
              lineHeight: 20,
              fontWeight: "normal",
              fontFamily: "Poppins-Regular",
            }}
          >
            {" "}
            (if available)
          </Text>
        </View> */}
        <UploadButton onPress={pickImage}>
          <ButtonText color={COLORS.primary} text={"Upload Invoice"} />
        </UploadButton>
        <TouchableOpacity
          onPress={() => navigation.navigate("ConfirmTransferScreen")}
          activeOpacity={0.9}
          style={{
            width: windowWidth - 40,
            paddingVertical: 14,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#7B35E7",
            borderRadius: 8,
            elevation: 15,
            marginTop: "auto",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <CustomTextComponent
              text={"Confirm"}
              fs={17}
              color={"#fff"}
              fw="700"
            />
            <View
              style={{
                width: 24,
                height: 24,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                backgroundColor: "#B085F1",
                marginLeft: 40,
              }}
            >
              <Image
                source={require("../../../../../assets/icons/check.png")}
                style={{ width: 13, height: 13, tintColor: "#fff" }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WalletCompanyPaymentScreen;
