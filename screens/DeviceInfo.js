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

  const {ReactDeviceInfo} = NativeModules;

// await or then catch
ReactDeviceInfo.getPhoneID()
.then((res: string) => {
  setId('ID: ' + res);
  console.log(res);
})
.catch((err: any) => {
  console.error(err);
});
  const 
  return <Text>Device Info</Text>;
};

export default DeviceInfo;
