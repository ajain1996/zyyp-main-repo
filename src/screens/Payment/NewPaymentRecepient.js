import React, { createRef, useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
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
  MobileTextField,
  TextField,
  NonEditableTextField,
  UploadButton,
  DateButton,
} from "../../components";
import { ExpenseAmount } from "../../components/ExpenseAmount";
import { ExpenseCategory } from "../../components/ExpenseCategory";
import { Notes } from "../../components/Notes";
import { COLORS, FONTS, images, SIZES } from "../../constants";
import { ExpensePayment } from "../../components/ExpensePayment";
import { ExpenseSearch } from "../../components/ExpenseSearch";
import { ExpenseTransaction } from "../../components/ExpenseTransaction";
import json from "../../onBoardingStructure/paymentCategory.json";
import json1 from "../../onBoardingStructure/projectCategory.json";
import json2 from "../../onBoardingStructure/claimed.json";

import styles from "../Expense/expense.style";
import ActionSheet from "react-native-actions-sheet";
import { getDateToString } from "../../Utilities";
import { InfoPopup } from "../../components/InfoPopup";
import { CompanyWalletTransactionHeader } from "../Wallet/CompanyWalletTransactionScreen";
import { WithdrawFundsBtn } from "../Wallet/WithDrawlFundsScreen";
const { width } = Dimensions.get("window");

const actionSheetRef = createRef();
const NewPaymentRecepient = ({ navigation }) => {
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

  const requestSubmitAction = () => {
    if (amount === "") {
      toastHandle(0, "Please enter the amount");
    } else if (categoryData.value === "") {
      toastHandle(0, "Please Select Expense Category");
    } else if (projectData.value === "") {
      toastHandle(0, "Please Select Project");
    } else if (notes === "") {
      toastHandle(0, "Please Enter Notes");
    } else {
      checkPayment();
    }
  };

  const onCallRequestFormApi = () => {};

  const checkPayment = () => {
    if (paymentSwitch === false) {
      onCallRequestFormApi();
    } else {
      if (zyypMoreAmount || personalMoreAmount) {
        SetInfoPopup(true);
      } else {
        onCallRequestFormApi();
      }
    }
  };

  const [paymentSwitch, SetPaymentSwitch] = useState(true);

  const [searchText, SetSearchText] = useState("");
  const [projectSearchText, SetProjectSearchText] = useState("");

  const [btnTitle, SetBtnTitle] = useState("SUBMIT");
  const [ctType, SetType] = useState("category");
  const [infoPopup, SetInfoPopup] = useState(false);
  const [zyypMoreAmount, SetZyypMoreAmount] = useState(false);
  const [personalMoreAmount, SetPersonalMoreAmount] = useState(false);

  const [unClaimed, SetUnClaimed] = useState(null);
  const [isCheckIn, SetIsCheckIn] = useState(true);
  const [isPersonalCheckIn, SetIsPersonalCheckIn] = useState(true);
  const [paymentDate, SetPaymentDate] = useState("");
  const [paymentDateBtn, SetPaymentDateBtn] = useState(false);
  const [zyypDocument, SetZyypDocument] = useState(null);
  const [personalDocument, SetPersonalDocument] = useState(null);
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

  // Toast Content Handling
  const toastHandle = (type, message) => {
    setAlertType(type);
    setToasttitle(message);
    setShowToast(true);
  };

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

  const onChangePayment = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      actionSheetRef.current?.show();
    }, 100);
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

  const clickUnclaimedAction = () => {
    SetIsTransactionSelected(true);
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

  const pickZyypFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      SetZyypDocument({
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

  const pickPersonalFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      SetPersonalDocument({
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

  const closeClaimBtn = () => {
    claimedList.forEach((element, index) => {
      claimedList[index].selected = false;
    });
    SetClaimedList([...claimedList]);
    SetIsTransactionSelected(false);
    SetZyypMoreAmount(false);
    SetUnClaimed(null);
    SetIsTransactionSelected(false);
    SetUnClaimed(null);
  };
  const onChangeZyypCheckInBtn = () => {
    SetIsCheckIn(!isCheckIn);
  };

  const personalDatePicker = () => {
    SetPaymentDateBtn(true);
  };

  const onChangePersonalCheckInBtn = () => {
    SetIsPersonalCheckIn(!isPersonalCheckIn);
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

  const onChangePersonalAmount = (text) => {
    console.log("text", text);
    if (parseInt(text) > amount) {
      SetPersonalMoreAmount(true);
    } else {
      SetPersonalMoreAmount(false);
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

  const onChangePaymentSwitch = () => {
    SetPaymentSwitch(!paymentSwitch);
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
        text="New Receipent"
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
      <ExpenseSearch
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
      <ExpenseSearch
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
        <TextField
          placeholderContent={"IBAN"}
          placeholder={"AE07 - 0331 - 2345 - 6789 - 0123 - 456"}
          //   type={categoryData.type}
          //   text={categoryData.value}
          //   color={"#317159"}
          //   bgColor={"#DCF2EA"}
          //   onItemSelected={onCategorySelected}
          //   onClose={onCloseCategory}
          //   hasImage={true}
          //   noIcon={true}
        />
        <TextField
          placeholderContent={"Recepient Full Name"}
          placeholder={"As per trade license            "}
          // text={fullName}
          // onChangeText={(text) => setFullname(text)}
        />
        <MobileTextField
          type={1}
          placeholderContent={"Mobile Number"}
          placeholder={"xxx - xxx - xxx"}
          //   onChangeText={onchangeMobile}
          //   text={mobileNumber}
          keyboardType="phone-pad"
        />
        <MobileTextField
          placeholderContent={"Email ID"}
          placeholder={"Enter Email ID"}
          type={null}
          maxLength={200}
          rightIcon={images.Edit}
          // rightIconclick={emailEditclick}
          // text={email}
          // onChangeText={(text) => setEmail(text)}
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
        <TextField
          placeholderContent={"Recepient Address Line 1"}
          placeholder={"Appartment Number & Name          "}
          // text={fullName}
          // onChangeText={(text) => setFullname(text)}
        />
        <TextField
          placeholderContent={" Address Line 2"}
          placeholder={"Street Number/Name    "}
          // text={fullName}
          // onChangeText={(text) => setFullname(text)}
        />
        <TextField
          placeholderContent={"City"}
          placeholder={" City Name    "}
          // text={fullName}
          // onChangeText={(text) => setFullname(text)}
        />
        <DateButton
          // onPress={onChangePayment}
          // value={paymentType}
          text={"Select Emirates"}
          type={2}
          placeholderContent={"Emirates"}
        />
        <TextField
          placeholderContent={"Country"}
          placeholder={" United Arab Emirates    "}
          // text={fullName}
          // onChangeText={(text) => setFullname(text)}
        />
        <TextField
          placeholderContent={"PO Box #"}
          placeholder={" Optional    "}
          // text={fullName}
          // onChangeText={(text) => setFullname(text)}
        />
        <ExpenseCategory
          placeholderContent={"SWIFT Code"}
          placeholder={"Search with SWIFT code"}
          type={categoryData.type}
          text={categoryData.value}
          color={"#317159"}
          bgColor={"#DCF2EA"}
          onItemSelected={onCategorySelected}
          onClose={onCloseCategory}
          hasImage={true}
        />
        <TextField
          placeholderContent={"Bank Name "}
          placeholder={" Bank Name    "}
          // text={fullName}
          // onChangeText={(text) => setFullname(text)}
        />

        <View
          style={{
            padding: 10,
            borderColor: COLORS.inner_line,
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 18,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 6,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: "bold",
                fontFamily: "Poppins-Regular",
                color: "#323F4B",
              }}
            >
              Save recipient?{" "}
            </Text>
            <TouchableOpacity
              // onPress={onChangePersonalCheckInBtn}
              style={{
                alignItems: "flex-end",
              }}
            >
              {true ? (
                <Image
                  resizeMode={"stretch"}
                  style={{ width: 25, height: 25 }}
                  source={images.Checkin}
                />
              ) : (
                <Image
                  resizeMode={"stretch"}
                  style={{ width: 25, height: 25 }}
                  source={images.CheckOut}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ width: width * 0.65 }}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 15,
                fontWeight: "400",
                fontFamily: "Poppins-Regular",
                color: COLORS.secondary,
              }}
            >
              Please select this if you want to save this recipient for future
              transactions.
            </Text>
          </View>
        </View>

        {/* <Notes
          placeholderContent={"Notes"}
          placeholder={"Type any relevant comment to this request"}
        /> */}
        <View style={{ alignItems: "center", elevation: 30, marginTop: 40 }}>
          <WithdrawFundsBtn
            text="CONFIRM"
            onPress={() => {
              navigation.navigate("NewRecepientAddFundsScreen");
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export { NewPaymentRecepient };
