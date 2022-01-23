// //Internet Hangling 2g,3g or 4g ,wifi
import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { View, SafeAreaView, StyleSheet, Text, Alert } from "react-native";
import { NetWorkError } from "../components";
import { SIZES } from "../constants";
import { moderateScale } from "react-native-size-matters";
export const NetworkContext = React.createContext({ isConnected: true });

export class NetworkProvider extends React.PureComponent {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      this.setState(
        {
          isConnected: state.isConnected,
        },
        () => {
          if (this.state.isConnected) {
          }
        }
      );
      if (state.isConnected != true) {
      }
    });
  }

  handleConnectivityChange = (isConnected) => {
    if (isConnected) {
      this.setState({ isConnected }, () => {});
    } else {
      this.setState({ isConnected });
    }
  };

  OnPress() {
    if (this.state.isConnected === true) {
    } else {
      Alert.alert("ZYYP", "Please check your internet Connection");
    }
  }

  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.state.isConnected === true ? (
          this.props.children
        ) : (
          <NetWorkError
            dissMiss={() => this.OnPress}
            visible={true}
            height={SIZES.height / 1.12}
            des={"Please check your internet connectivity and try again."}
            tittle={"No Internet"}
          />
        )}
      </NetworkContext.Provider>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
