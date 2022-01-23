import React, {
  useContext,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BackHandler,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import base64 from "react-native-base64";
import ImagePicker from "react-native-image-crop-picker";
import PagerView from "react-native-pager-view";
import { DatePickerModal } from "react-native-paper-dates";
import { moderateScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonText,
  Card,
  CreateAccount,
  Emirates,
  Error,
  Footer,
  Header,
  HeaderText,
  HeaderTitleText,
  OtpComponent,
  PersonalDetails,
  Progress,
} from "../../components"; // Reusable  Compoents
import { COLORS, FONTS, images, SIZES, strings } from "../../constants";
import json from "../../onBoardingStructure/personal_Details.json";
import {
  authOtp,
  authOtpValidation,
  authPersonalDetails,
  authMobileOtpValidation,
  authUsernameedit,
  updateUserdetails,
  setCardPin,
  getCard,
  getDateToString,
  isResponseisValid,
  Loader,
  numaricValdation,
  onboardingEmiratesIdentity,
  registerSSEUserOnBoard,
  createAccount,
  specialCharaterValidation,
  SSE_URL,
  stringValdation,
  onBoardingOwnerUserAddress,
  triggerSSEForCreateAccount,
} from "../../Utilities"; //Api Call and Common field validations
import { Appcontext } from "../../Setup/Appcontext";

const actionSheetRef = createRef();

const UserOnboarding = ({ navigation, route }) => {
  const dispatch = useDispatch();

  var user_email = useSelector(
    (state) => state?.LoginReducer?.UserInfo?.result?.user_personal_info?.email
  );
  var user_token = useSelector(
    (state) => state?.LoginReducer?.SucessData?.result?.token
  );
  var org_id = useSelector(
    (state) => state?.LoginReducer?.SucessData?.result?.organization_id
  );
  var user_id = useSelector(
    (state) => state?.LoginReducer?.SucessData?.result?.user_id
  );
  const user_role = useSelector(
    (state) => state?.LoginReducer?.UserInfo?.result?.user_personal_info?.roles
  );
  const user_addressobj = useSelector(
    (state) => state?.UseronboardingReducer?.addressData
  );
  let user_fullname = useSelector(
    (state) => state?.UseronboardingReducer?.userFullname
  );

  if (!user_fullname) {
    user_fullname = useSelector((state) => {
      state?.LoginReducer?.UserInfo?.result?.user_personal_info?.full_name;
    });
  }
  let user_mobilenumber = useSelector((state) => {
    state?.UseronboardingReducer?.userMobilenumber;
  });
  if (!user_mobilenumber) {
    user_mobilenumber = useSelector((state) => {
      state?.LoginReducer?.UserInfo?.result?.user_personal_info?.mobile_number;
    });
  }
  const emirateValue = useSelector(
    (state) => state?.UseronboardingReducer?.userEmiratevalue
  );

  const { homeClick } = useContext(Appcontext);
  const pagerViewRef = useRef(null);
  const [pageNo, setPageNo] = useState(route.params.pageNo);
  const emiratesList = strings.dropdownEmirates;
  const [loader, setLoader] = useState(false);

  //Step 1 Personal Fields
  const [fullName, setFullName] = useState(user_fullname);
  const [mobileNumber, setMobileNumber] = useState(user_mobilenumber);
  const [addressLine1, setAddressLine1] = useState(
    user_addressobj?.address_line_1
  );
  const [addressLine2, setAddressLine2] = useState(
    user_addressobj?.address_line_2
  );
  const [selectEmiratevalue, setSelectEmiratevalue] = useState(emirateValue);
  const [city, setCity] = useState(user_addressobj?.city);
  const [country] = useState("United Arab Emirates");
  const [postalCode, setPostalCode] = useState(user_addressobj?.postal_code);
  //Step 2 Otp details
  const [otpModal, setOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpPlaceholderText, setOtpPlaceholderText] = useState([
    ".",
    ".",
    ".",
    ".",
  ]);
  const [passVisble, setPassVisble] = useState(true);
  const [colorChange, setcolorChange] = useState(false);
  const [seconds, setSeconds] = React.useState(30);
  const [otpType, setOtpType] = useState("");
  //Step 3 Emirates Fields
  const [editFullname, setEditFullname] = useState(false);
  const [emiratesIdno, setEmiratesIdno] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [datetype, setDatetype] = useState(0);

  //Toast Handling(Error Messages ,File Upload Messages)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(0);

  //Create Card field Details
  const [pin, setPin] = useState("");
  const [reenterpin, setReenterpin] = useState("");
  const [card, setCard] = useState(false);

  //Create Account field
  const [accountCreatePopup, setAccountCreatePopup] = useState(false);
  const [accountCreationsteps, setAccountCreationsteps] = useState([
    {
      title: "Validating ID",
      data: "ID_VALIDATED",
      lastEventId: "0",
      isCurrent: false,
    },
    {
      title: "Approving User",
      data: "USER_APPROVED",
      lastEventId: "1",
      isCurrent: false,
    },
    {
      title: "Creating Account",
      data: "ACCOUNT_CREATED",
      lastEventId: "2",
      isCurrent: false,
    },
    {
      title: "Creating Card",
      data: "CARD_CREATED",
      lastEventId: "3",
      isCurrent: false,
    },
  ]);
  //Disable Android back Handling
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  // STEPS
  // { title: "Validating ID", letter: "1", isCurrent: false },
  // { title: "Approving User", letter: "2", isCurrent: false },
  // { title: "Creating Account", letter: "3", isCurrent: false },
  // { title: "Creating Card", letter: "4", isCurrent: false },

  // EVENTS
  // {"data": "ID_VALIDATED", "lastEventId": "0", "type": "message"}
  // {"data": "USER_APPROVED", "lastEventId": "1", "type": "message"},
  // {"data": "ACCOUNT_CREATED", "lastEventId": "2", "type": "message"},
  // {"data": "CARD_CREATED", "lastEventId": "3", "type": "message"}
  const updateUI = (event) => {
    console.log("event: ", event?.lastEventId);
    if (event) {
      const accountCreationStepsUpdated = accountCreationsteps.map((step) => {
        if (Number(event?.lastEventId) == Number(step.lastEventId)) {
          step.isCurrent = true;
        }
        return step;
      });
      console.log(
        "before accountCreationStepsUpdated = ",
        accountCreationStepsUpdated
      );
      setAccountCreationsteps(accountCreationStepsUpdated);
      console.log(
        "after accountCreationStepsUpdated = ",
        accountCreationStepsUpdated
      );
    }
  };

  const sseCompleteCallback = () => {
    console.log("SSE Complete Callback");
    try {
      pleaseWaitclick();
    } catch (error) {
      console.error("sseCompleteCallback, catch = ", error);
      handleToast(0, strings.apierror);
    }
  };

  //This useEffect mainly used for update state after rendering
  useEffect(() => {
    pagerViewRef.current.setPage(pageNo);
    if (otpType === "recreatepin") {
      setReenterpin(otpPlaceholderText.join("").toString());
    }
    setOtpCode(otpPlaceholderText.join("").toString());
    resendDuration();
  }, [otpPlaceholderText, seconds, pageNo, fullName]);

  //Otp page Resend Duration Calculation
  const resendDuration = () => {
    if (otpModal == true) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds("0");
      }
    } else {
      setSeconds(30);
    }
  };

  //Toast Handing (All type of Sucess & Failure messages )
  const handleToast = (type, message) => {
    console.log("Toast type:", type, "message", message);
    setShowToast(true);
    setToastMessage(message);
    setToastType(type);
  };

  //Personal Details & Emirates Form Validation
  const buttonPress = () => {
    console.log("pageNo", pageNo);
    if (pageNo == 0) {
      personalDetailsFormValidation();
    } else if (pageNo == 1) {
      emiratesFormValidation();
    } else if (pageNo == 2) {
      homeClick();
    }
  };

  const personalDetailsFormValidation = () => {
    if (fullName.length === 0) {
      handleToast(0, "Invalid entry please enter full name");
    } else if (mobileNumber.length === 0) {
      handleToast(0, "please enter mobile");
    } else if (mobileNumber.length < 9) {
      handleToast(0, "Invalid mobile number please verify and update");
    } else if (addressLine1.length === 0) {
      handleToast(0, "please enter addressline 1");
    } else if (addressLine2.length === 0) {
      handleToast(0, "please enter addressline 2");
    } else if (city.length === 0) {
      handleToast(0, "Invalid city name please verify and update");
    } else if (selectEmiratevalue === "Select Emirate") {
      handleToast(0, "please Select Emirate");
    } else if (country.length === 0) {
      handleToast(0, "please enter country");
    } else {
      setLoader(true);
      generateAndValidateOTP();
    }
  };

  const emiratesFormValidation = () => {
    if (emiratesIdno.length == 0) {
      handleToast(0, "please enter emiratesID");
    } else if (issueDate === "MM - DD - YYYY") {
      handleToast(0, "please Select issueDate");
    } else if (expiryDate === "MM - DD - YYYY") {
      handleToast(0, "please Select Expirydate");
    } else if (frontImage === "") {
      handleToast(0, "please upload front Document");
    } else if (backImage === "") {
      handleToast(0, "please upload back Document");
    } else {
      if (editFullname === true) {
        //If Edit Full Name
        nameUpdateApicall();
      } else {
        //Only Emirate API call
        emiratesApicall();
      }
    }
  };

  //Personal Details Full Name Update API call & Edit Name Update api call
  const nameUpdateApicall = async () => {
    setLoader(true);
    setEditFullname(!editFullname);
    const body = {
      user_id: user_id,
      email: user_email,
      full_name: fullName,
      role: user_role,
    };
    try {
      const editFullnameResponse = await updateUserdetails(body);
      if (isResponseisValid(editFullnameResponse)) {
        const nameObj = editFullnameResponse.data;
        setFullName(nameObj.result.full_name);
        emiratesApicall();
        setEditFullname(false);
        setLoader(false);
      } else {
        //Something Went Wrong in Full Name Edit API
        console.log("nameUpdateApicall, error = ", error);
        handleToast(0, editFullnameResponse.data);
        setLoader(false);
      }
    } catch (error) {
      //Something Went Wrong in Full Name Edit API
      console.error("nameUpdateApicall, catch = ", error);
      handleToast(0, strings.apierror);
      setLoader(false);
    }
  };

  const generateAndValidateOTP = () => {
    otpGenrateApicall();
  };

  //Personal Details Full Name Update API call & Edit Name Update api call
  const userUpdateApicall = async () => {
    setEditFullname(!editFullname);
    const body = {
      user_id: user_id,
      email: user_email,
      full_name: fullName,
      mobile_number: mobileNumber,
      role: user_role,
    };
    try {
      const updateUserResponse = await updateUserdetails(body);
      if (isResponseisValid(updateUserResponse)) {
        const updateUserData = updateUserResponse.data;
        setFullName(updateUserData.result.full_name);
        updatePersonalAddressApiCall();
        setEditFullname(false);
        setLoader(false);
      } else {
        //Something Went Wrong in Full Name Edit API
        console.log("userUpdateApicall, error = ", error);
        handleToast(0, updateUserResponse.data);
        setLoader(false);
      }
    } catch (error) {
      //Something Went Wrong in Full Name Edit API
      console.error("userUpdateApicall, catch = ", error);
      handleToast(0, strings.apierror);
      setLoader(false);
    }
  };

  //Personal Details API call
  const updatePersonalAddressApiCall = async () => {
    const body = {
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city: city,
      postal_code: postalCode,
      country: country,
    };
    try {
      const personalResponse = await onBoardingOwnerUserAddress(body, user_id);
      console.log("updatePersonalAddressApiCall :", personalResponse.data);
      if (isResponseisValid(personalResponse)) {
        setLoader(false);
        if (json.list.length === pageNo + 1) {
        } else {
          setPageNo(pageNo + 1);
        }
      } else {
        setLoader(false);
        handleToast(0, personalResponse.data);
      }
    } catch (error) {
      console.error("updatePersonalAddressApiCall - error: ", error);
      setLoader(false);
      handleToast(0, strings.apierror);
    }
  };
  //Otp Genrate API call
  const otpGenrateApicall = async () => {
    const body = {
      mobile_number: mobileNumber,
      type: "MOBILE",
    };
    try {
      const otpResponse = await authOtp(body);
      if (isResponseisValid(otpResponse)) {
        setOtpModal(true);
        setLoader(false);
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        //Fail Response for OTP
        setLoader(false);
        handleToast(0, otpResponse.data);
      }
    } catch (error) {
      console.error("otpGenrateApicall, catch = ", error);
      handleToast(0, strings.apierror);
    }
  };
  //Otp page Resend button Click API call
  const otpResendApicall = async () => {
    const body = {
      email: user_email,
      type: "EMAIL",
    };
    try {
      const otpResendResponse = await authOtp(body);
      if (isResponseisValid(otpResendResponse)) {
        setOtpModal(true);
        setSeconds(30);
        alert("Otp resend Successfully");
      } else {
        //Fail Response for OTP
        handleToast(0, otpResendResponse.data);
      }
    } catch (error) {
      console.error("otpResendApicall, catch = ", error);
      handleToast(0, strings.apierror);
    }
  };
  //Given Otp Validation Api call
  const otpValidationApicall = async () => {
    const body = {
      mobile_number: mobileNumber,
      otp: otpCode,
    };
    try {
      const otpValidationresponse = await authMobileOtpValidation(body);
      if (isResponseisValid(otpValidationresponse)) {
        setOtpModal(false);
        setOtpPlaceholderText([".", ".", ".", "."]);
        setcolorChange(false);
        userUpdateApicall();
      } else {
        //Something Went Wrong in otp Validate API
        console.log("otpValidationApicall, error = ", error);
        handleToast(0, otpValidationresponse.data);
      }
    } catch (error) {
      //Something Went Wrong in otp Validate API
      console.error("otpValidationApicall, catch = ", error);
      setLoader(false);
      handleToast(0, e);
    }
  };
  //form 2 - Update Emirated API call
  const emiratesApicall = async () => {
    setLoader(true);
    var body = {
      document_id: emiratesIdno,
      document_type: strings.Emirates,
      issue_date: issueDate,
      expiry_date: expiryDate,
    };

    try {
      let userDocument = new FormData();
      userDocument.append("file1", {
        uri: Platform.OS === "android" ? frontImage : "file://" + frontImage,
        name: "test",
        type: "image/jpeg",
      });
      userDocument.append("file2", {
        uri: Platform.OS === "android" ? backImage : "file://" + backImage,
        name: "test",
        type: "image/jpeg",
      });
      userDocument.append("documentDetails", JSON.stringify(body));

      const emiratesResponse = await onboardingEmiratesIdentity(
        userDocument,
        user_id
      );
      if (isResponseisValid(emiratesResponse)) {
        setLoader(false);
        setAccountCreatePopup(true);
        triggerSSEForCreateAccount(user_id, updateUI, sseCompleteCallback);
      } else {
        setLoader(false);
        //Somenthing Went Wrong in Emirates API
        console.log("emiratesApicall -  error", emiratesResponse);
        handleToast(0, emiratesResponse.data);
      }
    } catch (error) {
      setLoader(false);
      //Something Went wrong in emirates API
      console.error("emiratesApicall -  catch", error);
      handleToast(0, strings.apierror);
    }
  };
  // Card details API call
  const getCarddetailsApicall = async () => {
    try {
      console.log(
        "getCarddetailsApicall : user_id",
        user_id,
        "user_token",
        user_token,
        "org_id",
        org_id
      );
      const cardResponse = await getCard(user_id);
      if (isResponseisValid(cardResponse)) {
        console.log(
          "getCarddetailsApicall resonse: user_id",
          user_id,
          "user_token",
          user_token,
          "org_id",
          org_id
        );
        console.log("pageNo", pageNo);
        if (json.list.length === pageNo + 1) {
        } else {
          setPageNo(pageNo + 1);
        }
        setAccountCreatePopup(false);
        console.log("pageNo", pageNo);
        //handleToast(3, cardResponse.data);
      } else {
        console.error("getCard, error = ", cardResponse);
        handleToast(0, cardResponse.data);
      }
    } catch (error) {
      console.error("getCard, catch = ", error);
      handleToast(0, strings.apierror);
    }
  };

  //Given OTP Code from OTP popup
  const onChangeOtptext = (v) => {
    var num = [...otpPlaceholderText];
    for (let i = 0; i <= 3; i++) {
      if (num[i] == ".") {
        num[i] = v;
        break;
      } else if (i >= 2) {
        setcolorChange(true);
      } else {
        setcolorChange(false);
      }
    }
    setOtpPlaceholderText(num);
  };
  //OTP page - eye icon click (Show/hide)
  const showHideClick = (val) => {
    setPassVisble(!val);
  };
  //While click delete icon on OTP page
  const clearOtp = () => {
    setcolorChange(false);
    var num = [...otpPlaceholderText];
    for (let i = 3; i >= 0; i--) {
      if (num[i] !== ".") {
        num[i] = ".";
        break;
      }
    }
    setOtpPlaceholderText(num);
  };
  //if we click back button on emirates page that time we have clear the otp modal datas
  const buttonBackPress = () => {
    otpClearData();
    setPageNo(pageNo - 1);
  };
  //if we click close icon on otp modal page
  const otpClearData = () => {
    setOtpCode("");
    setOtpPlaceholderText([".", ".", ".", "."]);
    setcolorChange(false);
    setPassVisble(false);
  };

  //This OTP type for we are use same component for OTP and Card pin setup . so only we update the otp type while click Createcard pin
  const cardPinclick = () => {
    setOtpType("createpin");
    setOtpModal(true);
  };

  // OTP & Card Pin setup handling function
  const otpConformButtonclick = (val) => {
    if (val == "close") {
      setOtpModal(false);
      otpClearData();
    } else {
      otpConformCodeclick();
    }
  };
  //While Click conformation button check button click event is OTP or Card pin setup
  const otpConformCodeclick = () => {
    if (otpType === "createpin") {
      setPin(otpPlaceholderText.join("").toString());
      //Card pin setup
      setOtpType("recreatepin");
      otpClearData();
    } else if (otpType === "recreatepin") {
      if (pin === reenterpin) {
        setOtpModal(false);
        cardCreationapicall();
        otpClearData();
      } else {
        alert("Re enter does not match with card pin");
      }
      //Card reenter pin
    } else {
      //Otp call
      otpValidationApicall();
    }
  };
  //Card Creation API call
  const cardCreationapicall = async () => {
    const body = {
      card_id: "2130",
      pin: reenterpin,
    };
    try {
      const cardpinresponse = await setCardPin(user_id, body);
      if (cardpinresponse.status === 200 || cardpinresponse.status === 201) {
        setCard(true);
        handleToast(3, "Card Pin set Sucessfully");
      } else {
        setCard(true);
        handleToast(0, "Card Pin set api failure try again");
      }
    } catch (error) {
      console.error("cardCreationapicall, catch = ", error);
      setCard(true);
      handleToast(0, "Card Pin set api failure try again");
    }
  };

  const showEmiratespopup = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      actionSheetRef.current?.show();
    }, 100);
  };

  //This function use for user clicks the otp before 30secs Validation
  const otpResendClick = () => {
    setOtpPlaceholderText([".", ".", ".", "."]);
    setcolorChange(false);
    if (seconds === "0") {
      otpResendApicall();
    } else {
      alert(`Please wait for ${seconds} s`);
    }
  };

  //Document Uploading from device Gallery
  const pickBackImage = (type) => {
    ImagePicker.openPicker({
      cropping: false,
    }).then((image) => {
      if (type === "front") {
        setFrontImage(image.path);
      } else {
        setBackImage(image.path);
      }
      // this.setState({
      //   backImg: {
      //     uri: image.path,
      //     width: image.width,
      //     height: image.height,
      //     mime: image.mime,
      //   }
      // })
    });
  };
  //Choose Date Picker
  const datePickeropen = (v) => {
    setDatetype(v);
    setOpenDatePicker(true);
  };
  //Select Emirates Dropdown
  const selectEmirate = (data) => {
    if (data === "Close") {
      actionSheetRef.current?.hide();
    } else {
      // dispatch(userEmiratevalue(data));
      setSelectEmiratevalue(data);
      actionSheetRef.current?.hide();
    }
  };
  //Please Wait Click on Create Account page
  const pleaseWaitclick = () => {
    if (json.list.length === pageNo + 1) {
    } else {
      setPageNo(pageNo + 1);
    }
    setAccountCreatePopup(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.component}>
        <Header>
          <View style={{ width: 120, height: 70, paddingBottom: 5 }}>
            <Progress
              onCLick={() => {}}
              percentage={((pageNo + 1) / json.list.length) * 100}>
              <Text style={{ ...FONTS.body5 }}>
                {pageNo + 1} of {json.list.length}
              </Text>
            </Progress>
          </View>
          <View
            style={{
              height: 70,
              justifyContent: "center",
              alignItems: "flex-end",
            }}>
            <HeaderTitleText text={json.list[pageNo].title} />
            <HeaderText text={json.list[pageNo].next} />
          </View>
        </Header>
        <ActionSheet ref={actionSheetRef}>
          {emiratesList.map((data, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => selectEmirate(data)}
                style={{
                  marginHorizontal: SIZES.padding2 * 3,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.pl,
                }}>
                <Text
                  style={
                    data === "Close" ? styles.actionSheet : styles.actionSheet1
                  }>
                  {data}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ActionSheet>
        <Loader loading={loader} />
        <Error
          dissMiss={() => setShowToast(false)}
          visible={showToast}
          height={moderateScale(SIZES.height / 1.28)}
          type={toastType}
          tittle={toastMessage}
        />
        <CreateAccount
          accountShow={accountCreatePopup}
          data={accountCreationsteps}
          click={pleaseWaitclick}
        />

        <OtpComponent
          arr={otpPlaceholderText}
          visiblity={otpModal}
          sumNumber={onChangeOtptext}
          popItem={clearOtp}
          icon={passVisble}
          time={otpType === "mobile" ? seconds : null}
          show={showHideClick}
          color={colorChange}
          btntext={"Confirm Security Pin"}
          title={
            otpType === "recreatepin"
              ? "Re -enter Security Code"
              : "Input Security Code"
          }
          des={
            otpType === "createpin"
              ? `Set a new security pin for your card ending with ${"2130"}`
              : otpType === "recreatepin"
              ? `Please confirm the security pin for your card ending with ${"2130"}`
              : `Enter the 4-digit code Zyyp just sent to ${user_email}`
          }
          closeModal={otpConformButtonclick}
          resendClick={otpResendClick}
        />
        <DatePickerModal
          mode={"single"}
          visible={openDatePicker}
          disableStatusBar={true}
          onDismiss={() => setOpenDatePicker(false)}
          onConfirm={(dt) => {
            let date = getDateToString(dt.date);
            setOpenDatePicker(false);
            if (datetype == 0) {
              setIssueDate(date);
            } else {
              setExpiryDate(date);
            }
          }}
          date={new Date()}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.base * 2,
          }}>
          <PagerView
            ref={pagerViewRef}
            style={{ flex: 1 }}
            // FIXME
            initialPage={pageNo}
            scrollEnabled={false}>
            <View key="1" style={{ paddingBottom: 20 }}>
              <PersonalDetails
                fullName={fullName}
                mobileNumber={mobileNumber}
                addressLine1={addressLine1}
                addressLine2={addressLine2}
                cityName={city}
                emirateValue={selectEmiratevalue}
                boxNo={postalCode}
                onChangefullname={(text) => setFullName(text.trimLeft())}
                onchangeMobile={(text) =>
                  setMobileNumber(numaricValdation(text))
                }
                onChangeaddressLine1={(text) =>
                  setAddressLine1(specialCharaterValidation(text))
                }
                onchangeAddress2={(text) =>
                  setAddressLine2(specialCharaterValidation(text))
                }
                onchangeCity={(text) => setCity(stringValdation(text))}
                onChangeBox={(text) => setPostalCode(numaricValdation(text))}
                emiratesClick={showEmiratespopup}
                emailText={user_email}
              />
            </View>
            <View key="2">
              <Emirates
                Name={fullName}
                editName={(text) => setFullName(text)}
                item={json.list[1]}
                editPress={() => setEditFullname(!editFullname)}
                onCancelPress={() => setEditFullname(!editFullname)}
                editable={editFullname}
                onMobileChange={emiratesIdno}
                onChangeid={(text) => setEmiratesIdno(numaricValdation(text))}
                uploadClick={pickBackImage}
                datePicker={datePickeropen}
                issueDate={issueDate}
                expirydate={expiryDate}
                frontImg={frontImage}
                backImg={backImage}
              />
            </View>
            <View key="3">
              <Card
                pincard={card}
                navigation={navigation}
                pinclick={cardPinclick}
              />
            </View>
          </PagerView>
        </View>
      </View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        {pageNo == 0 ? (
          <Button
            icon={images.Next}
            type={1}
            onPress={buttonPress}
            color={COLORS.primary}>
            <ButtonText color={COLORS.white} text={strings.bt_Proceed} />
          </Button>
        ) : (
          <Footer>
            <Button onPress={buttonBackPress} type={3} color={COLORS.white}>
              <ButtonText color={COLORS.primary} text={strings.bt_Back} />
            </Button>
            <Button
              icon={images.Next}
              onPress={buttonPress}
              type={2}
              color={COLORS.primary}>
              <ButtonText color={COLORS.white} text={strings.bt_Next} />
            </Button>
          </Footer>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  component: {
    flex: 1,
    backgroundColor: COLORS.white,
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
export function userEmiratevalue(data) {
  return {
    type: "userEmiratevalue",
    payload: data,
  };
}

export default UserOnboarding;
