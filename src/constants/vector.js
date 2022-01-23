/* eslint-disable react-native/no-inline-styles */
// Vector Icons
import React from "react";
import Arrow from "react-native-vector-icons/Ionicons";
import Error from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/EvilIcons";
import Delete from "react-native-vector-icons/AntDesign";

import { COLORS, SIZES } from "../constants";

const Arrow_Iocn = (
  <Arrow
    name="chevron-back-outline"
    size={SIZES.icon}
    color={COLORS.secondary2}
  />
);
const Forward_Iocn = (
  <Arrow
    name="chevron-forward-outline"
    size={SIZES.icon1}
    color={COLORS.secondary2}
  />
);
// Vector icons
const Show = <Arrow name="eye" size={SIZES.icon1} color={COLORS.secondary2} />;
const Hide = (
  <Arrow name="eye-off" size={SIZES.icon1} color={COLORS.secondary2} />
);
const check = (
  <Arrow
    name="md-checkmark-circle-sharp"
    size={SIZES.icon1}
    color={"#52BD94"}
  />
);
const DeleteEnable = <Delete name="delete" size={SIZES.icon} color={'#E02B2B'} />;
const DeleteDisable = (
  <Delete name="delete" size={SIZES.icon} color={'#AABBC6'} />
);

const Close = <Arrow name="close" size={SIZES.icon} color={COLORS.secondary} />;
const Info_Error = (
  <Error name="error" size={SIZES.icon1} color={COLORS.error1} />
);
const Information = (
  <Arrow name="information-circle" size={SIZES.icon1} color={"#3366FF"} />
);
const Edit = <Error name="edit" size={SIZES.icon1} color={COLORS.primary} />;
{
  /* <Icon name="chevron-down" size={30} color={COLORS.black} /> */
}
const documentClose = (
  <Arrow name="close" size={SIZES.icon1} color={COLORS.white} />
);
const Search = (
  <Icon name="search" size={SIZES.icon} color={COLORS.secondary} />
);
export default {
  Arrow_Iocn,
  Forward_Iocn,
  Edit,
  Show,
  Hide,
  Close,
  Info_Error,
  Information,
  check,
  documentClose,
  Search,
  DeleteEnable,
  DeleteDisable
};
