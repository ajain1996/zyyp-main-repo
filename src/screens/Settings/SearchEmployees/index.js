import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { AuthHeader, SemiBoldText, SmallText } from "../../../components";
import { COLORS, SIZES, FONTS, VECTOR, images } from "../../../constants";
import { getUserlist, isResponseisValid } from "../../../Utilities";

const SearchEmployees = ({ navigation, route }) => {
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const userDetails = useSelector((state) => state?.LoginReducer?.SucessData);

  useEffect(() => {
    getExistinguserListApicall();
  }, []);

  //User List aApi call
  const getExistinguserListApicall = async () => {
    try {
      const userListResponse = await getUserlist();
      if (isResponseisValid(userListResponse)) {
        const userId = userDetails?.result?.user_id;
        console.log("user list", userListResponse.data.result);
        console.log("user admin", userId);
        var removeAdminInList = userListResponse.data.result.filter(data => data.user_id !== route.params.admin_userid)
        var removeOwnerInList = removeAdminInList.filter(data => data.user_id !== userId)
        console.log("user admin", removeOwnerInList);

        setSearchList(removeOwnerInList);
        setList(removeOwnerInList);
      } else {
      }
    } catch (e) {
      console.log("user list");
    }
  };
  const selectExisitingAdmin = (item) => {
  
    navigation.goBack();
    route.params.selectEmaildata({
      isApiCallSuccess:true,
      message: item,
    });
  };
  const SearchItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => selectExisitingAdmin(item)}
        activeOpacity={0.7}
        style={{
          padding: SIZES.padding,
          borderRadius: SIZES.radius / 4,
          margin: SIZES.base,
          backgroundColor: "rgba(255, 255, 255, 1)",
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <SmallText
          text={
            item?.full_name !== ""
              ? item.full_name
              : "Employee Name Not yet Updated"
          }
        />
      </TouchableOpacity>
    );
  };
  const searchListitem = (text) => {
    setSearchValue(text);
    const newData = searchList.filter((item) => {
      const itemData = item.full_name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log("newData", newData);
    setList(newData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ alignItems: "center" }}>
        <AuthHeader
          tittle={"Employees"}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          backPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.mdt,
          marginBottom: SIZES.padding * 3,
        }}
      />
      <View
        style={{
          height: 50,
          borderWidth: 0.5,
          borderColor: COLORS.pl,
          borderRadius: SIZES.radius / 3,
          marginHorizontal: SIZES.base,
          bottom: SIZES.padding2,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {VECTOR.Search}
        <TextInput
          placeholder={"Search employee Name"}
          value={searchValue}
          autoCapitalize="none"
          style={{ ...FONTS.body5 ,width:"93%"}}
          onChangeText={searchListitem}
        ></TextInput>
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => <SearchItem item={item} />}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SemiBoldText
                text={"No Employees Found"}
                color={COLORS.secondary2}
              ></SemiBoldText>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SearchEmployees;
