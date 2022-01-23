import React, { useState } from "react";
import {
  TextField,
  DateButton,
  AuthHeader,
  ButtonText,
  UploadDotButton,
  Button,
  Error,
} from "../../../components";
import {
  numaricValdation,
  getDateToString,
  updateEmirates,
  isResponseisValid,
  Loader,
  isPlatformFileValidation,
  checkUndefined
} from "../../../Utilities";
import ImagePicker from "react-native-image-crop-picker";
import { DatePickerModal } from "react-native-paper-dates";
import { scale, verticalScale } from "react-native-size-matters";
import {
  COLORS,
  SIZES,
  images,
  strings,
  formValidations,
  documents,
  onSucess,
} from "../../../constants";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import image from "../../../constants/image";

const EditEmirates = ({ navigation, route }) => {
  const userDetails = useSelector((state) => state?.LoginReducer?.UserData);
  console.log("userDetails", userDetails);
  const documentInfo = userDetails?.result?.id_document;

  const [emiratesid, setEmirateid] = useState(checkUndefined(documentInfo?.document_id));
  const [issuedate, setIssuedate] = useState(checkUndefined(documentInfo?.issue_date));
  const [expirydate, setExpirydate] = useState(checkUndefined(documentInfo?.expiry_date));
  const [frontdocument, setFrontdocument] = useState("");
  const [backdocument, setBackdocument] = useState("");

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [datepickertype, setDatepickertype] = useState(false);
  const [errorPopup, setErrorpopup] = useState(false);
  const [errorType, setErrortype] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [loader, setLoader] = useState(false);

  //Handle Date picker (Issue/Expiry date)
  const datePickeropen = (v) => {
    setDatepickertype(v);
    setOpenDatePicker(true);
  };

  //Choose front document & Back document from Device default
  const uploadClick = (type) => {
    ImagePicker.openPicker({
      cropping: false,
    }).then((image) => {
      if (type === "front") {
        setFrontdocument(image.path);
      } else {
        setBackdocument(image.path);
      }
    });
  };

  //Submit Button CLick and Emirates form validation
  const emirateSubmitclick = () => {
    if (emiratesid.length === 0) {
      popupContent(formValidations.emirateId, 0);
    } else if (issuedate.length === 0) {
      popupContent(formValidations.issueDate, 0);
    } else if (expirydate.length === 0) {
      popupContent(formValidations.expiryDate, 0);
    } else if (frontdocument == "") {
      popupContent(formValidations.documentFront, 0);
    } else if (backdocument == "") {
      popupContent(formValidations.documentBack, 0);
    } else {
      //Api call
      updateEmirateApicall();
    }
  };
  //After form Validation Emirates API call
  const updateEmirateApicall = async () => {
    setLoader(true);
    var body = {
      document_id: emiratesid,
      document_type: documents.emiratesDocument,
      issue_date: issuedate,
      expiry_date: expirydate,
    };
    const userId = userDetails?.result?.user_personal_info?.user_id;
    try {
      let ob = new FormData();
      ob.append("file1", {
        uri: isPlatformFileValidation(frontdocument),
        name: "test",
        type: "image/jpeg",
      });
      ob.append("file2", {
        uri: isPlatformFileValidation(backdocument),
        name: "test",
        type: "image/jpeg",
      });
      ob.append("documentDetails", JSON.stringify(body));
      console.log("ob", ob);
      const onsucessResposne = await updateEmirates(ob, userId);
      console.log("onsucessResposne", onsucessResposne.data);

      if (isResponseisValid(onsucessResposne)) {
        setLoader(true);
        navigation.goBack();
        route.params.refreshData({
          isApiCallSuccess: true,
          message: onsucessResposne.data.result,
        });
      } else {
        setLoader(true);
        popupContent(onsucessResposne.data, 0);
      }
    } catch (e) {
      setLoader(true);
      popupContent(strings.apierror, 0);
    }
  };

  const popupContent = (message, type) => {
    setErrorpopup(true);
    setAlertMessage(message);
    setErrortype(type);
  };
  const onDismiss = () => {
    setErrorpopup(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
        keyboardDismissMode="interactive"
      >
        <View style={{ alignItems: "center" }}>
          <AuthHeader
            tittle={"Edit Emirates ID"}
            left_icon={images.back}
            title_color={COLORS.secondary2}
            nav={navigation}
            backPress={() => navigation.navigate("profileview")}
          />
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.mdt,
            backgroundColor: "pink",
          }}
        />
        <Error
          visible={errorPopup}
          dissMiss={onDismiss}
          tittle={alertMessage}
          type={errorType}
        />
        <Loader loading={loader} />
        <DatePickerModal
          mode={"single"}
          visible={openDatePicker}
          disableStatusBar={true}
          onDismiss={() => setOpenDatePicker(false)}
          onConfirm={(dt) => {
            let date = getDateToString(dt.date);
            setOpenDatePicker(false);
            if (datepickertype == 0) {
              setIssuedate(date);
            } else {
              setExpirydate(date);
            }
          }}
          date={new Date()}
        />

        <View style={styles.compoentView}>
          <TextField
            placeholderContent={"ID No"}
            placeholder={"784 - XXXX - XXXXXXX - X"}
            text={emiratesid}
            onChangeText={(text) => setEmirateid(numaricValdation(text))}
          />
          <DateButton
            type={1}
            text={"MM - DD - YYYY"}
            placeholderContent={"Issue Date"}
            onPress={() => datePickeropen(0)}
            value={issuedate}
          />
          <DateButton
            type={1}
            text={"MM - DD - YYYY"}
            placeholderContent={"Expiry Date"}
            onPress={() => datePickeropen(1)}
            value={expirydate}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {frontdocument === "" ? (
            <UploadDotButton
              text={"Front of document"}
              onPress={() => uploadClick("front")}
            />
          ) : (
            <View
              style={{
                height: verticalScale(80),
                borderRadius: 8,
                borderStyle: "dashed",
                borderWidth: 2,
                marginVertical: 20,
                borderColor: COLORS.pl,
              }}
            >
              <Image
                source={{ uri: frontdocument }}
                style={{
                  width: scale(SIZES.width * 0.35),
                  height: verticalScale(80),
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  resizeMode: "cover",
                }}
              />
            </View>
          )}
          {backdocument == "" ? (
            <UploadDotButton
              text={"Back of document"}
              onPress={() => uploadClick("back")}
            />
          ) : (
            <View
              style={{
                height: verticalScale(80),
                borderRadius: 8,
                borderStyle: "dashed",
                borderWidth: 2,
                marginVertical: 20,
                borderColor: COLORS.pl,
              }}
            >
              <Image
                source={{ uri: backdocument }}
                style={{
                  width: scale(SIZES.width * 0.35),
                  height: verticalScale(80),
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  resizeMode: "cover",
                }}
              />
            </View>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {frontdocument === "" ? (
            <View
              style={{
                height: verticalScale(80),
                alignItems: "center",
                justifyContent: "center",
                width: scale(SIZES.width * 0.35),
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setFrontdocument("")}
              style={{
                height: verticalScale(80),
                alignItems: "center",
                justifyContent: "center",
                width: scale(SIZES.width * 0.35),
              }}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={image.CloseBtn}
              />
            </TouchableOpacity>
          )}
          {backdocument === "" ? (
            <View
              style={{
                height: verticalScale(80),
                alignItems: "center",
                justifyContent: "center",
                width: scale(SIZES.width * 0.35),
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setBackdocument("")}
              style={{
                height: verticalScale(80),
                alignItems: "center",
                justifyContent: "center",
                width: scale(SIZES.width * 0.35),
              }}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={image.CloseBtn}
              />
            </TouchableOpacity>
          )}
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
          onPress={emirateSubmitclick}
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
  compoentView: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding * 2,
  },
});
export default EditEmirates;
