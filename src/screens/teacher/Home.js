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
} from "react-native-heroicons/outline";

import * as React from 'react';
import RNFS from 'react-native-fs';

import { useNavigation } from "@react-navigation/native";



const folderName = 'StudentsDataFolder';
const folderPath = `${RNFS.DownloadDirectoryPath}/${folderName}`;
const filePath = `${folderPath}/studentsData.json`;

const Home = () => {

  const [jsonData, setJsonData] = React.useState({});



  React.useEffect(() => {
    const readDataFromFile = async () => {
      try {
        const content = await RNFS.readFile(filePath, 'utf8');
        //   setFileContent(content); // Update state with file content

        const data = JSON.parse(content);

        setJsonData(data);
        //   console.log('File read successfully!', content);
        console.log('File read successfully! state fri', jsonData);
      } catch (error) {
        console.log('Error reading file:', error);
      }
    };

    readDataFromFile();

  }, []);



  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={theme.maincolor}
        barStyle={"light-content"}
        hidden={false}
      />

      <View style={{ backgroundColor: theme.maincolor, width: wp(100), height: hp(8), justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row', paddingHorizontal: wp(8) }} >
        <Text style={{ color: 'white', fontSize: wp(5), fontWeight: 500 }} >Classes</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('CreateClass')}>
          <PlusCircleIcon size={wp(8)} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEventThrottle={1}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: '#fff', height: hp(100) }}
      >

        <TouchableOpacity
          className="flex flex-row items-center p-4 bg-[#01808c2e] m-4 mb-0 rounded-2xl border-[#01808c7a] border-2"
          onPress={() => navigation.navigate('Sheet', jsonData)}
        >
          <CpuChipIcon size={wp(8)} color="#01808cb9" />
          <Text
            className="ml-2 text-[15px] font-medium text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {jsonData.className}
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          className="flex flex-row items-center p-4 bg-[#01808c2e] m-4 mb-0 rounded-2xl border-[#01808c7a] border-2"
          onPress={() => navigation.navigate('Sheet')}
        >
          <PhoneIcon size={wp(8)} color="#01808cb9" />
          <Text
            className="ml-2 text-[15px] font-medium text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Analog Communication (2026 BATCH)
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          className="flex flex-row items-center p-4 bg-[#01808c2e] m-4 mb-0 rounded-2xl border-[#01808c7a] border-2"
          onPress={() => navigation.navigate('Sheet')}
        >
          <ComputerDesktopIcon size={wp(8)} color="#01808cb9" />
          <Text
            className="ml-2 text-[15px] font-medium text-gray-600 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Operating System (2026 BATCH)
          </Text>
        </TouchableOpacity>



      </ScrollView>


    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})