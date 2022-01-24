import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Zyyp_Intro, Zyyp_SignUp } from "./src/pages";
import AppNavigation from "./src/navigation/AppNavigation";

const AuthStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="Zyyp_Intro">
        <AuthStack.Screen
          name="Zyyp_Intro"
          component={Zyyp_Intro}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Zyyp_SignUp"
          component={Zyyp_SignUp}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
