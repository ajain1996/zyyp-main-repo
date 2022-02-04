import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { PieChart, BarChart } from 'react-native-svg-charts'
import CustomTextComponent from '../../components/CustomTextComponent';
import { COLORS } from '../../utils/colors';
import { windowWidth } from '../../utils/utils';


export default function DashboardSettingScreen({ navigation }) {

  const [selectedTab, setSelectedTab] = useState("Tab 1");
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

  const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }))

  const RenderheaderComponent = () => {
    return (
      <View>
        <View style={{ margin: 20, flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>Welcome , Prahubhu</Text>
          <View style={{}}>
            <Menu
              visible={visible}
              anchor={
                <TouchableOpacity onPress={showMenu}>
                  <Image
                    source={require("../../../assets/images/e1.png")}
                    style={{ width: 35, height: 35, marginLeft: 130 }}
                  />
                </TouchableOpacity>
              }
              style={{ marginLeft: 240, marginTop: 48 }}
              onRequestClose={hideMenu}>
              <TouchableOpacity>
                <MenuItem onPress={hideMenu}>
                  <CustomTextComponent fs={14} text="Setting" fw="400" color="#838383" />
                </MenuItem>
              </TouchableOpacity>
              <MenuDivider />
              <TouchableOpacity><MenuItem onPress={hideMenu}>
                <CustomTextComponent fs={14} text="Support" fw="400" color="#838383" />
              </MenuItem>
              </TouchableOpacity>
              <MenuDivider />
              <TouchableOpacity>
                <MenuItem onPress={hideMenu}>
                  <CustomTextComponent fs={16} text="Sign out" fw="400" color="#B50000" />
                </MenuItem>
              </TouchableOpacity>
            </Menu>
          </View>
        </View>

        <View style={{ marginLeft: 20 }}>
          <CustomTextComponent fs={18} text="Wallets" fw="700" color="#999" />
          <View style={{
            width: '95%', backgroundColor: '#FBFBFB', marginTop: 8, borderRadius: 10, flexDirection: 'column',
            elevation: 10, shadowColor: '#999', padding: 10
          }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
              <CustomTextComponent fs={17} text="Personal" fw="500" color="#999" />
              <CustomTextComponent fs={15} text="View" fw="700" color="#7B35E7" />
            </View>
            <View style={{ marginLeft: 15, flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
              <View style={{ marginTop: 10 }}>
                <CustomTextComponent fs={15} text="AED" fw="600" color="#999" />
              </View>
              <View style={{ width: 10 }} />
              <CustomTextComponent fs={30} text="321.00" fw="700" color={COLORS.BLACK} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  const SpendTransactionComponent = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{
          width: windowWidth / 2 - 25, height: 150, borderRadius: 10, flexDirection: 'column',
          elevation: 10, shadowColor: '#999', backgroundColor: '#fff',
        }}>
          <View style={{ flexDirection: 'column', margin: 10 }}>
            <CustomTextComponent fs={12} text="Jan 22 Spend" fw="600" color="#999" />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomTextComponent fs={12} text="AED" fw="600" color="#999" />
              <View style={{ width: 4 }} />
              <CustomTextComponent fs={18} text="4,321.00" fw="700" color={COLORS.BLACK} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CustomTextComponent fs={12} text="AED" fw="600" color={"#999"} />
              <View style={{ flexDirection: 'column', marginLeft: 4 }}>
                <CustomTextComponent fs={10} text="321.47" fw="700" color={COLORS.BLACK} />
                <CustomTextComponent fs={10} text="from avg" fw="700" color={COLORS.BLACK} />
              </View>
            </View>
          </View>
        </View>
        <View style={{
          width: windowWidth / 2 - 25, borderRadius: 10, elevation: 10, shadowColor: '#999', backgroundColor: '#fff',
          paddingVertical: 10
        }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <CustomTextComponent fs={14} text="Jan 22 Spend" fw="700" color={"#999"} />

            <View style={{ width: 80, height: 80, marginTop: -35 }}>
              <PieChart style={{ height: 200 }} data={pieData} />
            </View>

          </View>
        </View>
      </View>
    )
  }

  const DataComponent = () => {
    return (
      <View style={{
        flexDirection: 'row', margin: 18, backgroundColor: '#fff', justifyContent: 'space-between', height: 100,
        alignItems: 'center', borderRadius: 10, elevation: 5, shadowColor: "#999", paddingHorizontal: 15
      }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <CustomTextComponent fs={18} text="999" fw="700" color={"#000"} />
          <View style={{ height: 8 }} />
          <CustomTextComponent fs={13} text="Departments" fw="600" color={"#999"} />
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <CustomTextComponent fs={18} text="999" fw="700" color={"#000"} />
          <View style={{ height: 8 }} />
          <CustomTextComponent fs={13} text="Projects" fw="600" color={"#999"} />
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <CustomTextComponent fs={18} text="999" fw="700" color={"#000"} />
          <View style={{ height: 8 }} />
          <CustomTextComponent fs={13} text="Employees" fw="600" color={"#999"} />
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <CustomTextComponent fs={18} text="999" fw="700" color={"#000"} />
          <View style={{ height: 8 }} />
          <CustomTextComponent fs={13} text="Cards" fw="600" color={"#999"} />
        </TouchableOpacity>
      </View>
    );
  }

  const NotificationComponent = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <CustomTextComponent fs={18} text="Notification" fw="700" color={"#999"} />
        <View style={{ flexDirection: 'column', elevation: 10, shadowColor: '#999', backgroundColor: '#fff', marginTop: 10, }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center' }}>
            <BuildTabComponent images={require('../../../assets/icons/Expense2x.png')} selectedVal={selectedTab} onPress={() => {
              setSelectedTab("Tab 1")
            }} text="Tab 1" />

            <BuildTabComponent images={require('../../../assets/icons/Frame1x.png')} selectedVal={selectedTab} onPress={() => {
              setSelectedTab("Tab 2")
            }} text="Tab 2" />

            <BuildTabComponent images={require('../../../assets/icons/Reports1x.png')} selectedVal={selectedTab} onPress={() => {
              setSelectedTab("Tab 3")
            }} text="Tab 3" />

            <BuildTabComponent images={require('../../../assets/icons/Reports1x.png')} selectedVal={selectedTab} onPress={() => {
              setSelectedTab("Tab 4")
            }} text="Tab 4" />
          </View>
          <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 10 }}>
            {selectedTab === 'Tab 1' ? <View style={{ backgroundColor: '#fff' }}>
              <CustomTextComponent fs={18} text="Expense" fw="700" color={COLORS.BLACK} />
              <View style={{ height: 8 }} />
              <CustomTextComponent fs={13} text="An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review" color={COLORS.BLACK} />
              <CustomTextComponent fs={13} text="Dec 23,2021 at 09:15 pm" color={COLORS.BLACK} />
              <View style={{ marginTop: 10 }}>
                <CustomTextComponent fs={13} text="An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review" color={COLORS.BLACK} />
                <CustomTextComponent fs={13} text="Dec 23,2021 at 09:15 pm" color={COLORS.BLACK} />
                <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginTop: 8 }} />
                <TouchableOpacity style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                  <CustomTextComponent fs={16} text="View All" color={COLORS.PURPLE} />
                </TouchableOpacity>
              </View>
            </View> : <></>}

            {selectedTab === 'Tab 2' ? <View style={{ backgroundColor: '#fff' }}>
              <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
              <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
              </View>
            </View> : <></>}

            {selectedTab === 'Tab 3' ? <View style={{ backgroundColor: '#FBFBFB' }}>
              <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
              <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
              </View>
            </View> : <></>}
            {selectedTab === 'Tab 4' ? <View style={{ backgroundColor: '#FBFBFB' }}>
              <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
              <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: '#000' }}>An expense request with #EX276123 is awaiting you approval for more than 5 days , tap to review</Text>
                <Text style={{ color: '#BABCBF' }}>Dec 23,2021 at 09:15 pm</Text>
              </View>
            </View> : <></>}
          </View>
        </View>
        <Text />
      </View>

    )
  }

  const BuildTabComponent = ({ images, text, selectedVal, onPress }) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center', width: windowWidth / 4 - 10, paddingVertical: 10,
          backgroundColor: selectedVal === text ? "#fff" : '#EAF2F5',
        }}
        onPress={onPress}
      >
        <Image style={{ width: 25, height: 25 }} source={images} />
        {/* {selectedVal === text ? <View style={{ width: '100%', height: 2, backgroundColor: 'blue' }} /> : <></>} */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#f7f5fa' }}>
      <ScrollView>
        <RenderheaderComponent />
        <SpendTransactionComponent />
        <DataComponent />
        <NotificationComponent />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
})
