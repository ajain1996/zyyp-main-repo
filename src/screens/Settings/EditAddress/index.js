import React, { useState, createRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {
  Button,
  ButtonText,
  TextField,
  AuthHeader,
  DateButton,
  Error,
} from "../../../components"; //Reusable component

import {
  updateAddress,
  isResponseisValid,
  numaricValdation,
  specialCharaterValidation,
  stringValdation,
  Loader,
  checkUndefined,
} from "../../../Utilities"; //API calls
import ActionSheet from "react-native-actions-sheet";
import {
  SIZES,
  COLORS,
  strings,
  images,
  FONTS,
  formValidations,
} from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

const actionSheetRef = createRef();

const EditAddress = ({ navigation, route }) => {
  const userDetails = useSelector((state) => state?.LoginReducer?.UserData);
  const addressInfo = userDetails?.result?.address;

  //Address form Fields states
  const [addressLine1, setAddressLine1] = useState(
    checkUndefined(addressInfo?.address_line_1)
  );
  const [addressLine2, setAddressLine2] = useState(
    checkUndefined(addressInfo?.address_line_2)
  );
  const [city, setCity] = useState(checkUndefined(addressInfo?.city));
  const [emirateId, setEmirateId] = useState(
    checkUndefined(addressInfo?.state)
  );
  const [country] = useState(strings.countryDefault);
  const [postalCode, setPostalCode] = useState(
    checkUndefined(addressInfo?.postal_code)
  );

  const [errorPopup, setErrorpopup] = useState(false);
  const [errorType, setErrortype] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectEmirates] = useState(strings.dropdownEmirates);
  const [loader, setLoader] = useState(false);

  //Address form validation using states
  const updateAdresssubmitbuttonclick = () => {
    if (addressLine1.length == 0) {
      popupContent(formValidations.addressLineone, 0);
    } else if (addressLine2.length == 0) {
      popupContent(formValidations.addressLinetwo, 0);
    } else if (city.length == 0) {
      popupContent(formValidations.city, 0);
    } else if (emirateId.length == 0) {
      popupContent(formValidations.selectEmirates, 0);
    } else {
      addressUpdatesubmitApicall();
    }
  };
  //Update Address Submit API call
  const addressUpdatesubmitApicall = async () => {
    setLoader(true);
    const body = {
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city: city,
      country: country,
      postal_code: postalCode,
      state: emirateId,
    };
    const userId = userDetails?.result?.user_personal_info?.user_id;

    console.log("userId", userId);
    try {
      const sucessResponse = await updateAddress(body, userId);
      if (isResponseisValid(sucessResponse)) {
        setLoader(false);
        navigation.goBack();
        route.params.refreshData({
          isApiCallSuccess: true,
          message: sucessResponse.data.result,
        });
      } else {
        setLoader(false);
        popupContent(sucessResponse.data, 0);
      }
    } catch (e) {
      setLoader(false);
      popupContent(strings.apierror, 0);
    }
  };

  //Select Emirates Drop Down clikc
  const emiratesDropdownclick = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      actionSheetRef.current?.show();
    }, 100);
  };
  //Chose an Emirates / Close Emirates popup handlings
  const onChooseEmirates = (data) => {
    if (data === "Close") {
      actionSheetRef.current?.hide();
    } else {
      setEmirateId(data);
      actionSheetRef.current?.hide();
    }
  };
  //Toast Handling (Sucess/Failiure)
  const popupContent = (message, type) => {
    setErrorpopup(true);
    setAlertMessage(message);
    setErrortype(type);
  };
  //Out Click Toast Close
  const onDismiss = () => {
    setErrorpopup(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={"Edit Address"}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          nav={navigation}
          backPress={() => navigation.goBack()}
        />
      </View>
      <Error
        visible={errorPopup}
        dissMiss={onDismiss}
        tittle={alertMessage}
        type={errorType}
      />
      <Loader loading={loader} />
      <ActionSheet ref={actionSheetRef}>
        {selectEmirates.map((data, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onChooseEmirates(data)}
              style={{
                marginHorizontal: SIZES.padding2 * 3,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.pl,
              }}
            >
              <Text
                style={
                  data === "Close" ? styles.actionSheet : styles.actionSheet1
                }
              >
                {data}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ActionSheet>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.mdt,
          marginBottom: SIZES.padding * 3,
        }}
      />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={styles.componetView}>
          <TextField
            placeholderContent={"Address Line 1"}
            placeholder={"Appartment Number & Name"}
            onChangeText={(text) =>
              setAddressLine1(specialCharaterValidation(text))
            }
            text={addressLine1}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
          />
          <TextField
            placeholderContent={"Address Line 2"}
            placeholder={"Street Number/Name"}
            onChangeText={(text) =>
              setAddressLine2(specialCharaterValidation(text))
            }
            text={addressLine2}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
          />
          <TextField
            placeholderContent={"City"}
            text={city}
            onChangeText={(text) => setCity(stringValdation(text))}
            placeholder={"City Name"}
          />
          <DateButton
            text={"Select Emirate"}
            icon={images.down}
            placeholderContent={"Emirate"}
            onPress={emiratesDropdownclick}
            value={emirateId}
          />
          <TextField
            placeholderContent={"Country"}
            placeholder={"United Arab Emirates"}
            text={country}
            editable={false}
          />
          <TextField
            placeholderContent={"PO Box #"}
            text={postalCode}
            onChangeText={(text) => setPostalCode(numaricValdation(text))}
            placeholder={"Optional"}
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          marginHorizontal: SIZES.padding,
          flexDirection: "row",
          height: 70,
          justifyContent: "space-between",
        }}
      >
        <Button type={3} onPress={() => navigation.navigate("profileview")}>
          <ButtonText
            color={COLORS.primary}
            text={strings.bt_Back}
          ></ButtonText>
        </Button>
        <Button
          color={COLORS.primary}
          onPress={updateAdresssubmitbuttonclick}
          icon={images.Enable_icon}
          type={2}
        >
          <ButtonText color={COLORS.white} text={"Submit"} />
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  componetView: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding * 2,
  },
  actionSheet: {
    ...FONTS.h4,
    textAlign: "center",
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding2 * 1.5,
    color: COLORS.error,
  },
  actionSheet1: {
    ...FONTS.body3,
    textAlign: "center",
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding2 * 1.5,
    color: COLORS.blue,
  },
});
export default EditAddress;
