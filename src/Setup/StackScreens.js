import React, {  } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ZyypIntroSlider,
  Zyyp_SignUp,
  Welcome,
  Zyyp_Onboarding,
  Login,
  SignupPassword,
  Sucess,
  UserOnboarding,
  CurrentPassword,
  NewPassword,
  LoginPassword,
  Home,
  ProfileSetting,
} from "../screens"; // App Modules

const IntroStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const OnboardStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const IntroScreens = ({}) => {
  return (
    <IntroStack.Navigator initialRouteName="ZyypIntroSlider">
      <IntroStack.Screen
        name="ZyypIntroSlider"
        component={ZyypIntroSlider}
        options={{ headerShown: false }}
      />
    </IntroStack.Navigator>
  );
};

const AuthScreens = ({}) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Zyyp_SignUp"
        component={Zyyp_SignUp}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Zyyp_Onboarding"
        component={Zyyp_Onboarding}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Password"
        component={SignupPassword}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="LoginPassword"
        component={LoginPassword}
        options={{ headerShown: false }}
      />
      <OnboardStack.Screen
        name="Sucess"
        component={Sucess}
        options={{ headerShown: false }}
      />
      <OnboardStack.Screen
        name="UserOnboarding"
        component={UserOnboarding}
        options={{ headerShown: false }}
      />
      <OnboardStack.Screen
        name="CurrentPassword"
        component={CurrentPassword}
        options={{ headerShown: false }}
      />
      <OnboardStack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
const LoginStackscreen = ({}) => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="Zyyp_SignUp"
        component={Zyyp_SignUp}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Zyyp_Onboarding"
        component={Zyyp_Onboarding}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="Password"
        component={SignupPassword}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="LoginPassword"
        component={LoginPassword}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="Sucess"
        component={Sucess}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="UserOnboarding"
        component={UserOnboarding}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="CurrentPassword"
        component={CurrentPassword}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
};

const OnBoardOwnerStack = () => {
  return (
    <OnboardStack.Navigator>
      <OnboardStack.Screen
        name="Zyyp_Onboarding"
        component={Zyyp_Onboarding}
        options={{ headerShown: false }}
      />
      <OnboardStack.Screen
        name="Sucess"
        component={Sucess}
        options={{ headerShown: false }}
      />
    </OnboardStack.Navigator>
  );
};

const OnBoardScreens = ({}) => {
  return (
    <OnboardStack.Navigator>
      <OnboardStack.Screen
        name="UserOnboarding"
        component={UserOnboarding}
        options={{ headerShown: false }}
      />
      <OnboardStack.Screen
        name="Setting"
        component={ProfileSetting}
        options={{ headerShown: false }}
      />
      <OnboardStack.Screen
        name="CurrentPassword"
        component={CurrentPassword}
        options={{ headerShown: false }}
      />
      <OnboardStack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ headerShown: false }}
      />
    </OnboardStack.Navigator>
  );
};
const HomeStackscreen = () => {
  <OnboardStack.Navigator>
    <OnboardStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
  </OnboardStack.Navigator>;
};

export {
  IntroScreens,
  AuthScreens,
  OnBoardScreens,
  HomeStackscreen,
  OnBoardOwnerStack,
  LoginStackscreen,
};
