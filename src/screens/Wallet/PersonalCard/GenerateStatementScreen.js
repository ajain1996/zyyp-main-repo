import React, { useState } from "react";
import { RadioButton } from "react-native-paper";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { WithdrawFundsBtn } from "../WithDrawlFundsScreen";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomTextComponent from "../../../components/CustomTextComponent";
import { COLORS } from "../../../utils/colors";
import { CompanyWalletTransactionHeader } from "../CompanyWalletTransactionScreen";

export default GeneratStatementScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("first");
  const [clear3, setClear3] = useState(false);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  return (
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
    >
      <CompanyWalletTransactionHeader
        navigation={navigation}
        text="Generate Statement"
      />

      <View style={{ marginTop: 20 }} />
      <View style={{ marginHorizontal: 17 }}>
        <CustomTextComponent
          text={"Time Period"}
          fs={17}
          color={"#85949F"}
          fw="bold"
        />
      </View>
      <View style={{ marginHorizontal: 10, marginTop: 15 }}>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton color={"#7B35E7"} value="Current month" />
            <CustomTextComponent
              text={"Current month"}
              fs={16}
              color={"#343C44"}
              fw="400"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton color={"#7B35E7"} value="Last month" />
            <CustomTextComponent
              text={"Last month"}
              fs={16}
              color={"#343C44"}
              fw="400"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton color={"#7B35E7"} value="Current financial year" />
            <CustomTextComponent
              text={"Current financial year"}
              fs={16}
              color={"#343C44"}
              fw="400"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton color={"#7B35E7"} value="Previous financial year" />
            <CustomTextComponent
              text={"Previous financial year"}
              fs={16}
              color={"#343C44"}
              fw="400"
            />
          </View>
        </RadioButton.Group>

        <View style={{ marginBottom: 20 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          <View
            style={{
              borderStyle: "dashed",
              borderWidth: 0.7,
              paddingHorizontal: 1,
              borderColor: "#CBD2D9",
              borderRadius: 30,
              flex: 1,
            }}
          ></View>

          <View style={{ alignItems: "center", marginHorizontal: 8 }}>
            <CustomTextComponent
              text={"Or"}
              fs={14}
              color={"#85949f"}
              fw="400"
            />
          </View>
          <View
            style={{
              borderStyle: "dashed",
              borderWidth: 0.7,
              paddingHorizontal: 1,
              borderColor: "#CBD2D9",
              borderRadius: 30,
              flex: 1,
            }}
          ></View>
        </View>
        <RadioButton.Group>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <RadioButton color={"#7B35E7"} value="Custom date range" />
            <CustomTextComponent
              text={"Custom date range"}
              fs={16}
              color={"#343C44"}
              fw="400"
            />
          </View>
        </RadioButton.Group>
      </View>

      <View style={{ marginHorizontal: 17 }}>
        <>
          <CustomTextComponent
            text={"Start Date"}
            fs={13}
            color={COLORS.BLACK}
            fw="500"
          />
          <View style={{ marginTop: 8 }} />
          <CustomDatePicker
            placeholderText="MM-DD-YYYY"
            minimumDate="24-Dec-1900"
            maximumDate="24-Dec-2200"
            initialDate={StartDate}
            dropDownValue={StartDate}
            clear={clear3}
            bigField="true"
            onDateSelected={function (date) {
              setStartDate(moment(date).format("DD-MMM-YYYY"));
            }}
          />
        </>
        <Text />

        <>
          <CustomTextComponent
            text={"To Date"}
            fs={13}
            color={COLORS.BLACK}
            fw="500"
          />
          <View style={{ marginTop: 8 }} />
          <CustomDatePicker
            heading="MM-DD-YYYY"
            placeholderText="MM-DD-YYYY"
            minimumDate="24-Dec-1900"
            maximumDate="24-Dec-2200"
            initialDate={EndDate}
            dropDownValue={EndDate}
            clear={clear3}
            bigField="true"
            onDateSelected={function (date) {
              setEndDate(moment(date).format("DD-MMM-YYYY"));
            }}
          />
        </>
        <View style={{ marginVertical: 25 }}>
          <CustomTextComponent
            text={"*Max range is 12 months period"}
            fs={13}
            color={"#85949F"}
            fw="500"
          />
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('BlockReplaceScreen')}>
        <View style={styles.ButtonStyle}>
          <Text style={{fontSize: 15, color: '#ffff'}}>GENERATE STATEMENT</Text>
          <Image
            source={require('../assets/images/Tick.png')}
            style={styles.ImageStyle}
          />
        </View>
      </TouchableOpacity> */}
      <View style={{ alignItems: "center", elevation: 30, marginTop: 'auto', marginBottom: 20 }}>
        <WithdrawFundsBtn
          text="GENERATE STATEMENT"
          onPress={() => {
            navigation.navigate("StatementInputCodeScreen");
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD2D9",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 50,
    borderRadius: 5,
    margin: 10,
  },

  ButtonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#7B35E7",
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#000",
    height: 50,
    borderRadius: 10,
    margin: 30,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,

    resizeMode: "stretch",
    alignItems: "center",
  },
});
