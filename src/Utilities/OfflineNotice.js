import React, { PureComponent } from "react";
import NetInfo from "@react-native-community/netinfo";
import {NetWorkError} from '../components'
import {SIZES} from '../constants'

class OfflineNotice extends React.PureComponent {
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
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
  OnPress() {
    alert("Please check your internet Connectivity");
  }

  render() {
    if (!this.state.isConnected) {
      return (
        <NetWorkError
          dissMiss={() => this.OnPress()}
          visible={true}
          height={SIZES.height /1.05}
          des={"Please check your internet connectivity and try again."}
          tittle={"No Internet"}
        />
      );
    }
    return null;
  }
}



export default OfflineNotice;
