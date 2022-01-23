//Intro Slider Header Page
import React,{useContext} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import {strings, styles} from '../../constants'; // --- themes
import { Appcontext } from '../../Setup/Appcontext';

const Header = ({index, finalIndex}) => {
  const { introClick } = useContext(Appcontext)
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerText}>{strings.cp_Tittle}</Text>
      <TouchableOpacity onPress={() => introClick()}>
        {index != finalIndex ? (
          <Text adjustsFontSizeToFit style={styles.skipText}>
            {strings.bt_Skip}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
