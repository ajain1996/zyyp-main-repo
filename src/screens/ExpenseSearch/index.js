import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useDispatch, connect, useSelector } from "react-redux";

import { AuthHeader, SmallText, SemiBoldText } from "../../components";
import { images, COLORS, SIZES } from "../../constants";

const ExpenseSearch = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const listData = route?.params?.data;
  const searchType = route?.params?.type;

  console.log("Data :", listData);
  console.log("searchType :", searchType);

  const [data, setData] = useState(listData);
  const [searchData, setSearch] = useState(listData);
  const [type, setType] = useState(searchType);

  //Project List

  const searchListItem = (text) => {
    
    const newData = searchData.filter((item) => {
      if (searchType === 5) {
        const itemData = item.project_name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      } else if (searchType === 6) {
        const itemData = item.requestId.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      } else if (searchType == 7) {
        const itemData = item.requester_name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }
    });
    console.log("newData", newData);
    setData(newData);
  };
  const onDataClick = (item) => {
   
    const selectData = data?.map((data, index) => {
      return {
        ...data,
        isProjectSelected:
          data.id == item.id ? !data.isProjectSelected : data.isProjectSelected,
      };
    });
    console.log("onDataClick",selectData)
    const filter = selectData?.filter((data,index) => data.isProjectSelected == true);
    dispatch(projectRecent(filter[0]));
    // setData(countList);
    navigation.goBack();
    route.params.searchPageData({
      isApiCallSuccess: true,
      // item: filter[0],
      type: route?.params?.type,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: COLORS.secondary1 }}>
        <AuthHeader
          tittle={`Search ${route?.params?.title}`}
          left_icon={images.back}
          title_color={COLORS.secondary2}
          nav={navigation}
          backPress={() => navigation.goBack()}
        />
        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: COLORS.mdt,
            paddingBottom: SIZES.padding,
          }}
        />
        <View style={{ margin: SIZES.padding2 * 2 }}>
          <Searchbar
            style={{
              borderWidth: 1,
              borderColor: COLORS.pl,
              borderRadius: SIZES.radius / 3,
            }}
            autoFocus={true}
            onChangeText={(text) => {
              searchListItem(text);
            }}
            placeholder={`Search ${route?.params?.title}`}
          />
          <FlatList
            data={data}
            keyExtractor={(index) => index.toString()}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => onDataClick(item.item)}
                  style={{
                    backgroundColor: item.item.isProjectSelected
                      ? COLORS.primary1
                      : COLORS.white,
                    marginVertical: SIZES.base,
                    padding: SIZES.padding2,
                    borderRadius: SIZES.radius / 4,
                  }}
                >
                  <SmallText
                    text={
                      type === 5
                        ? item.item.project_name
                        : type == 6
                        ? item.item.requestId
                        : item.item.requester_name
                    }
                    color={COLORS.secondary2}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    LoginReducer: state.LoginReducer,
  };
};
export default connect(mapStateToProps)(ExpenseSearch);


export function projectRecent(data) {
  return {
    type: "projectRecent",
    payload: data,
  };
}