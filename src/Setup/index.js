//Routes of Product
import React, { useEffect, useState, useMemo, useReducer } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import Reducers from "../Redux/Reducers"; // Redux & Reducers for Data handlings
import {
  NavigationReducer,
  InitialState,
} from "../Redux/Reducers/NavigationReducer";
import { setPagestatus, getPagestatus } from "../Utilities";
import { Error } from "../components";
import {
  IntroScreens,
  AuthScreens,
  OnBoardScreens,
  LoginStackscreen,
  HomeStackscreen,
  OnBoardOwnerStack,
} from "./StackScreens";
import { TabScreen } from "./TabScreen";
import { Appcontext } from "./Appcontext";
import { COLORS } from "../constants";
import AppNavigation from "../navigation/AppNavigation";
export const store = createStore(Reducers, applyMiddleware(thunk));

const App = () => {
  const [state, dispatch] = useReducer(NavigationReducer, InitialState);
  const [toastShowopup, setToastShowopup] = useState(false); //Toast handling state
  const [toastType, setToastType] = useState(0); // Type used for is used to find what type toast we have display (Sucess /or Error type)
  const [toastMessage, setToastMessage] = useState(""); //Toast Content Hnadling

  useEffect(() => {
    setTimeout(() => {
      const val = getPagestatus("state").then((response) => {
        dispatch({ type: "RETRIVE_TOKEN", payload: "1" });
      });
    }, 500);
  }, []);

  const authContextValue = useMemo(() => ({
    introClick: () => {
      setPagestatus("state", "1");
      dispatch({ type: "INTRO_SLIDER", payload: "1" });
    },
    OwnerOnboarding: () => {
      setPagestatus("state", "2");
      dispatch({ type: "OWNERONBOARDING", payload: "2" });
    },
    sucessclick: () => {
      setPagestatus("state", "3");
      dispatch({ type: "HOMEPAGE", payload: "3" });
    },
    homeClick: () => {
      console.log("Home");
      dispatch({ type: "DASHBOARD", payload: "4" });
    },
    resetClick: (message) => {
      dispatch({ type: "LOGIN", payload: "5" });
      setToastShowopup(true)
      setToastMessage(message);
      setToastType(3)
    },
  }));

  const chooseStack = (state) => {
    console.log("State", state);
    if (state === null || state === "") {
      return <IntroScreens />;
    } else if (state === "1") {
      return <AuthScreens />;
      // return <TabScreen />;
    } else if (state === "2") {
      return <OnBoardOwnerStack />;
    } else if (state === "3") {
      return <HomeStackscreen />;
    } else if (state === "4") {
      // return <AuthScreens />;
      return <TabScreen />;
    } else if (state === "5") {
      return <LoginStackscreen />;
    } else if (state === "6") {
      return <AppNavigation />;
    } else {
      return <AuthScreens />;
    }
  };

  const onDismiss = () => {
    setToastShowopup(false);
  };

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  } else {
    return (
      <Appcontext.Provider value={authContextValue}>
        <Provider store={store}>
          <NavigationContainer>
            {chooseStack(state.userToken)}
            {/* <AppNavigation /> */}
          </NavigationContainer>
          <Error
            dissMiss={onDismiss}
            visible={toastShowopup}
            tittle={toastMessage}
            type={toastType}
          ></Error>
        </Provider>
      </Appcontext.Provider>
    );
  }
};
export default App;
