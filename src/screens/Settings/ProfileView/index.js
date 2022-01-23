import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AuthHeader, Error } from "../../../components";
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  roles,
  onSucess,
} from "../../../constants";
import {
  getUserDetails,
  isResponseisValid,
  checkUndefined,
} from "../../../Utilities";

const MyProfileView = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state?.LoginReducer?.UserData);
  console.log("UserData", userDetails);
  const personalInfo = userDetails?.result?.user_personal_info;
  const addressInfo = userDetails?.result?.address;
  const documentInfo = userDetails?.result?.id_document;

  const [mobileNumber,setMobileNumber] = useState(personalInfo?.mobile_number);
  const [address, setAdress] = useState(
    `${checkUndefined(addressInfo?.address_line_1)}\n${checkUndefined(
      addressInfo?.address_line_2
    )}\n${checkUndefined(addressInfo?.city)}\n${checkUndefined(
      addressInfo?.country
    )}\n${checkUndefined(addressInfo?.state)}\n${checkUndefined(
      addressInfo?.postal_code
    )}`
  );
  const [emirates, setEmirates] = useState(documentInfo?.document_id);
  const [email] = useState(personalInfo?.email);
  const [userRole] = useState(personalInfo?.roles);
  const [errorPopup, setErrorpopup] = useState(false);
  const [errorType, setErrortype] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const ProfileCard = ({ title, nav, value, action, flag }) => (
    <TouchableOpacity
      onPress={() => itemCLick(flag, nav)}
      activeOpacity={0.7}
      style={styles.item}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ ...FONTS.body3, color: COLORS.secondary2 }}>
          {title}
        </Text>
        <Text
          onPress={() => itemCLick(flag, nav)}
          style={{ ...FONTS.body4, color: COLORS.primary }}
        >
          {action}
        </Text>
      </View>

      <Text style={{ ...FONTS.body5, color: COLORS.secondary }}>{value}</Text>
    </TouchableOpacity>
  );
  const refreshData = ({ isApiCallSuccess = false, message }) => {
    if (isApiCallSuccess) {
      popupContent(3, message ? message : onSucess.mobileUpdate);
      updateData();
    }
  };
  const updateData = async () => {
    const userId = userDetails?.result?.user_personal_info.user_id;
    try {
      const userInfoResponse = await getUserDetails(userId);
      console.log("update", userInfoResponse?.data);

      if (isResponseisValid(userInfoResponse)) {
        console.log("update", userInfoResponse?.data);

        const userInfo = userInfoResponse?.data;
        dispatch(UserData(userInfo));
        const userupdateInfo = userInfo?.result?.user_personal_info;
        const useraddressInfo = userInfo?.result?.address;
        console.log("useraddressInfo", useraddressInfo);

        setAdress(
          `${useraddressInfo?.address_line_1}\n${useraddressInfo?.address_line_2}\n${useraddressInfo.city}\n${useraddressInfo?.country}\n${useraddressInfo?.postal_code}\n${useraddressInfo.state}`
        );
        setEmirates(userInfo?.result?.id_document?.document_id);
        setMobileNumber(userupdateInfo?.mobile_number)
        
      } else {
        popupContent(0, userInfoResponse.data);
      }
    } catch (e) {
      popupContent(0, e);
    }
  };
  const itemCLick = (item, nav) => {
    console.log("flag ", item);
    if (item == "mobile") {
      nav.navigate("EditMobile", {
        refreshData: refreshData,
        mobile: mobileNumber,
      });
    } else if (item == "address") {
      nav.navigate("EditAddress", { refreshData: refreshData });
    } else if (item == "emirates") {
      nav.navigate("EditEmirates", { refreshData: refreshData });
    } else if (item == "email") {
      nav.navigate("EditEmail", { refreshData: refreshData, mail: email });
    } else {
      alert("item");
    }
  };
  const RenderFooter = () => (
    <View
      style={{
        borderColor: COLORS.secondary,
        marginHorizontal: SIZES.base * 2,
        borderBottomWidth: 0.5,
      }}
    />
  );
  const popupContent = (type, message) => {
    setErrorpopup(true);
    setAlertMessage(message);
    setErrortype(type);
  };
  const onDismiss = () => {
    setErrorpopup(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <AuthHeader
              tittle={"My Profile"}
              left_icon={images.back}
              right_icon={images.profile}
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
          <View
            style={{
              borderTopWidth: 0.5,
              borderColor: COLORS.mdt,
              paddingBottom: SIZES.padding,
            }}
          />
          <ProfileCard
            title={"Mobile number"}
            value={mobileNumber}
            action="Edit"
            flag={"mobile"}
            nav={navigation}
          />
          <ProfileCard
            title={"Address"}
            value={address}
            action="Edit"
            flag={"address"}
            nav={navigation}
          />
          <ProfileCard
            title={"Emirates ID"}
            value={emirates}
            action="Edit"
            flag={"emirates"}
            nav={navigation}
          />
          <ProfileCard
            title={"Email"}
            value={email}
            action={userRole === roles.OWNER ? "Request Edit" : null}
            flag={"email"}
            nav={navigation}
          />
          <RenderFooter />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export function UserData(data) {
  return {
    type: "UserData",
    payload: data,
  };
}

export default MyProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  item: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    margin: SIZES.padding / 2,
  },
});