import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {removeItem} from '../redux/rootReducer';
import {useSelector, useDispatch} from 'react-redux';

const DeviceInfo = props => {
  const [id, setId] = useState('Press the button to get The ID');
  const [deviceType, setDeviceType] = useState(
    'Press the button to get The DeviceType',
  );
  const [deviceName, setDeviceName] = useState(
    'Press the button to get The deviceName',
  );
  const [deviceHardware, setDeviceHardware] = useState(
    'Press the button to get The deviceHardware',
  );
  const [sysVersion, setSysVersion] = useState(
    'Press the button to get The sysVersion',
  );
  const [deviceLang, setDeviceLang] = useState(
    'Press the button to get The deviceLang',
  );
  const [versionCode, setVersionCode] = useState(
    'Press the button to get The versionCode',
  );
  const [versionName, setVersionName] = useState(
    'Press the button to get The versionName',
  );
  console.log({NativeModules}); // the interfaces shoudl be get from here

  const {ReactDeviceInfoMethod} = NativeModules;

  // // await or then catch
  // ReactDeviceInfo.getPhoneID()
  // .then((res: string) => {
  //   setId('ID: ' + res);
  //   console.log(res);
  // })
  // .catch((err: any) => {
  //   console.error(err);
  // });

  // await or then catch
  ReactDeviceInfoMethod.getPhoneID()
    .then(res => {
      setId(res[0]);
      setDeviceType(res[1]);
      setDeviceName(res[2]);
      setDeviceHardware(res[3]);
      setSysVersion(res[4]);
      setDeviceLang(res[5]);
      setVersionCode(res[6]);
      setVersionName(res[7]);

      console.log('ID: ', res);
    })
    .catch(err => {
      console.error(err);
    });

  return (
    <View>
      <Text>Device Info</Text>
      <Text>Unique Device ID: {id}</Text>
      <Text>Device Type / Manufacturer: {deviceType}</Text>
      <Text>Device Name: {deviceName}</Text>
      <Text>Device Model: {deviceHardware}</Text>
      <Text>System Version: {sysVersion}</Text>
      <Text>Device Locale Language: {deviceLang}</Text>
      <Text>Build Number: {versionCode}</Text>
      <Text>Bundle ID: {versionName}</Text>
    </View>
  );
};

export default DeviceInfo;
