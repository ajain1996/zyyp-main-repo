import React, { useEffect, useState, useMemo, useReducer } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileSetting } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Image, View } from "react-native";

import UpdateTradeLicense from "../screens/Settings/UpdateSettings/UpdateTradeLicense";
import UpdateTransferAuthority from "../screens/Settings/UpdateSettings/UpdateTransferAuthority";
import UpdateShareHolders from "../screens/Settings/UpdateSettings/UpdateShareHolders";
import {
  ProfileView,
  EditMobile,
  EditAddress,
  EditEmirates,
  EditEmail,
  Admin,
  ReplacementAdmin,
  AdminEditEmail,
  CurrentPassword,
  NewPassword,
  SearchEmployees,
  Expense,
  Payment,
  Wallet,
  Insights,
  NewAdmin,
  Dashboard,
  ExpenseSearch,
} from "../screens"; // App Modules
import { COLORS, images } from "../constants";
import MyProfileView from "../screens/Settings/ProfileView";
import EditShareHolder from "../screens/OnBoarding/EditShareHolder";
import { ExpenseRequest } from "../screens/Expense/ExpenseRequest";
import ExpenseDetails from "../screens/Expense/ExpenseDetails";
import PersonalCardMainScreen from "../screens/Wallet/PersonalCard/PersonalCardMainScreen";
import CompanyWalletMainScreen from "../screens/Wallet/CompanyWalletMainScreen";
import CompanyWalletTransactionScreen from "../screens/Wallet/CompanyWalletTransactionScreen";
import AddFundsScreen from "../screens/Wallet/AddFundsScreen";
import WithDrawlFundsScreen from "../screens/Wallet/WithDrawlFundsScreen";
import ConfirmTransferScreen from "../screens/Wallet/ConfirmTransferScreen";
import StampedStatementScreen from "../screens/Wallet/statements/StampedStatementScreen";
import StatementInputCodeScreen from "../screens/Wallet/statements/StatementInputCodeScreen";
import InputSecurityCodeScreen from "../screens/Wallet/addfunds/InputSecurityCodeScreen";
import PersonalWalletMainScreen from "../screens/Wallet/PersonalWallet/PersonalWalletMainScreen";
import PWRequestNewCardScreen from "../screens/Wallet/PersonalWallet/PWRequestNewCardScreen";
import PersonalCardSettingsScreen from "../screens/Wallet/PersonalCard/PersonalCardSettingsScreen";
import CardBlockReplace from "../screens/Wallet/PersonalCard/CardBlockReplace";
import GenerateStatementScreen from "../screens/Wallet/PersonalCard/GenerateStatementScreen";
import WalletCompanyPaymentScreen from "../screens/Wallet/PersonalWallet/Wallet_payment/WalletCompanyPaymentScreen";
import NewReciepentPaymentScreen from "../screens/Wallet/NewReciepentPaymentScreen";
import MakePaymentScreen from "../screens/Wallet/MakePaymentScreen";
import { NewPaymentRecepient } from "../screens/Payment/NewPaymentRecepient";
import NewRecepientAddFundsScreen from "../screens/Wallet/statements/NewRecepientAddFundsScreen";
import IncidentLandingPage from "../screens/Insights/IncidentLandingPage";

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();
const ExpenseStack = createNativeStackNavigator();
const PaymentStack = createNativeStackNavigator();
const WalletStack = createNativeStackNavigator();
const InsightsStack = createNativeStackNavigator();

const TabScreen = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Expense"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "DashBoard") {
            iconName = focused ? images.home : images.home;
          } else if (route.name === "Expense") {
            iconName = focused ? images.activeExpense : images.expense;
          } else if (route.name === "Make Payment") {
            iconName = focused ? images.payment : images.payment;
          } else if (route.name === "Wallet") {
            iconName = focused ? images.wallet : images.wallet;
          } else if (route.name === "Insights") {
            iconName = focused ? images.insights : images.insights;
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                bposition: "absolute",
                bottom: 0, // space from bottombar
                height: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={iconName} />
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.mdt,
      })}
    >
      <Tab.Screen
        name="DashBoard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Expense"
        component={ExpenseScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Make Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const DashboardScreen = ({}) => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name={"Settings"}
        component={ProfileSetting}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="UpdateTradeLicense"
        component={UpdateTradeLicense}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="UpdateShareHolders"
        component={UpdateShareHolders}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="UpdateTransferAuthority"
        component={UpdateTransferAuthority}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="MyProfileView"
        component={MyProfileView}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="profileview"
        component={ProfileView}
        options={{ headerShown: false }}
      />

      <DashboardStack.Screen
        name="EditMobile"
        component={EditMobile}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="EditAddress"
        component={EditAddress}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="EditEmirates"
        component={EditEmirates}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="EditEmail"
        component={EditEmail}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="EditShareHolder"
        component={EditShareHolder}
        options={{ headerShown: true }}
      />
      <DashboardStack.Screen
        name="Admin"
        component={Admin}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="NewAdmin"
        component={NewAdmin}
        options={{ headerShown: false }}
      />

      <DashboardStack.Screen
        name="ReplacementAdmin"
        component={ReplacementAdmin}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="SearchEmployees"
        component={SearchEmployees}
        options={{ headerShown: false }}
      />

      <DashboardStack.Screen
        name="AdminEditEmail"
        component={AdminEditEmail}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="CurrentPassword"
        component={CurrentPassword}
        options={{ headerShown: false }}
      />
      <DashboardStack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ headerShown: false }}
      />
    </DashboardStack.Navigator>
  );
};

const ExpenseScreen = ({}) => {
  return (
    <ExpenseStack.Navigator initialRouteName={"Settings"}>
      <ExpenseStack.Screen
        name={"Expenses"}
        component={Expense}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"ExpenseRequest"}
        component={ExpenseRequest}
        options={{
          title: "New Expense Request",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "400",
            fontFamily: "Poppins-Regular",
          },
        }}
      />
      <ExpenseStack.Screen
        name={"ExpenseDetails"}
        component={ExpenseDetails}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"ExpenseSearch"}
        component={ExpenseSearch}
        options={{ headerShown: false }}
      />
    </ExpenseStack.Navigator>
  );
};

const PaymentScreen = ({}) => {
  return (
    <PaymentStack.Navigator>
      <ExpenseStack.Screen
        name={"MakePaymentScreen"}
        component={MakePaymentScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"NewReciepentPaymentScreen"}
        component={NewReciepentPaymentScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"AddFundsScreen"}
        component={AddFundsScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"StatementInputCodeScreen"}
        component={StatementInputCodeScreen}
        options={{ headerShown: false }}
      />
        <ExpenseStack.Screen
        name={"ConfirmTransferScreen"}
        component={ConfirmTransferScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"NewPaymentRecepient"}
        component={NewPaymentRecepient}
        options={{ headerShown: false }}
      />
       <ExpenseStack.Screen
        name={"NewRecepientAddFundsScreen"}
        component={NewRecepientAddFundsScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"WalletCompanyPaymentScreen"}
        component={WalletCompanyPaymentScreen}
        options={{ headerShown: false }}
      />
    </PaymentStack.Navigator>
  );
};

const WalletScreen = ({}) => {
  return (
    <WalletStack.Navigator>
      {/* <ExpenseStack.Screen
        name={"Wallet"}
        component={Wallet}
        options={{ headerShown: false }}
      /> */}
      <ExpenseStack.Screen
        name={"CompanyWalletMainScreen"}
        component={CompanyWalletMainScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"AddFundsScreen"}
        component={AddFundsScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"WithDrawlFundsScreen"}
        component={WithDrawlFundsScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"PersonalCardMainScreen"}
        component={PersonalCardMainScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"CompanyWalletTransactionScreen"}
        component={CompanyWalletTransactionScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"ConfirmTransferScreen"}
        component={ConfirmTransferScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"StampedStatementScreen"}
        component={StampedStatementScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"StatementInputCodeScreen"}
        component={StatementInputCodeScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"InputSecurityCodeScreen"}
        component={InputSecurityCodeScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"PersonalWalletMainScreen"}
        component={PersonalWalletMainScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"PWRequestNewCardScreen"}
        component={PWRequestNewCardScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"PersonalCardSettingsScreen"}
        component={PersonalCardSettingsScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"CardBlockReplace"}
        component={CardBlockReplace}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"GeneratStatementScreen"}
        component={GenerateStatementScreen}
        options={{ headerShown: false }}
      />
      <ExpenseStack.Screen
        name={"WalletCompanyPaymentScreen"}
        component={WalletCompanyPaymentScreen}
        options={{ headerShown: false }}
      /> 
    </WalletStack.Navigator>
  );
};

const InsightsScreen = ({}) => {
  return (
    <InsightsStack.Navigator>
      <ExpenseStack.Screen
        name={"IncidentLandingPage"}
        component={IncidentLandingPage}
        options={{ headerShown: false }}
      />
      {/* <ExpenseStack.Screen
        name={"Insights"}
        component={Insights}
        options={{ headerShown: false }}
      /> */}
    </InsightsStack.Navigator>
  );
};
export { TabScreen };
