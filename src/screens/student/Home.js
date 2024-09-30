import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { theme } from '../../theme'
import {
  ComputerDesktopIcon,
  CpuChipIcon,
  PhoneIcon,
  PlusCircleIcon,
  SignalIcon,
  WifiIcon,
} from "react-native-heroicons/outline";

import * as React from 'react';

import { useNavigation } from "@react-navigation/native";


const Home = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={theme.maincolor}
        barStyle={"light-content"}
        hidden={false}
      />

      <View style={{ backgroundColor: theme.maincolor, width: wp(100), height: hp(8), justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row', paddingHorizontal: wp(8) }} >
        <Text style={{ color: 'white', fontSize: wp(5), fontWeight:500 }} >Classes</Text>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('CreateClass')}>
          <PlusCircleIcon size={wp(10)} color="#fff" />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        scrollEventThrottle={1}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: '#fff', height: hp(100) }}
      >

        <TouchableOpacity
          className="flex flex-row items-center p-4 bg-[#01808c2e] m-4 mb-0 rounded-2xl border-[#01808c7a] border-2"
          onPress={() => navigation.navigate('MarkAttendance')}
        >
          <CpuChipIcon size={wp(10)} color="#01808cb9" />
          <Text
            className="ml-2 text-lg font-medium text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            VLSI
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          className="flex flex-row items-center p-4 bg-[#01808c2e] m-4 mb-0 rounded-2xl border-[#01808c7a] border-2"
          onPress={() => navigation.navigate('MarkAttendance')}
        >
          <WifiIcon size={wp(10)} color="#01808cb9" />
          <Text
            className="ml-2 text-lg font-medium text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Computer Networks
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          className="flex flex-row items-center p-4 bg-[#01808c2e] m-4 mb-0 rounded-2xl border-[#01808c7a] border-2"
          onPress={() => navigation.navigate('MarkAttendance')}
        >
          <SignalIcon size={wp(10)} color="#01808cb9" />
          <Text
            className="ml-2 text-lg font-medium text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Digital Communication
          </Text>
        </TouchableOpacity>



      </ScrollView>


    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})