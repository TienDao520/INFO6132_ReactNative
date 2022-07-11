import React from 'react';
import AppNavigator from './navigations/AppNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialData = {
  fuelStore: [
    {fuelType: 'Petrol', price: '30'},
    {fuelType: 'Diesel', price: '40'},
    {fuelType: 'BatteryCharge', price: '10'},
  ],
  usedList: [],
  userMaxAllowance: 3000,
};
export default function App() {
  // const storeData = async initialData => {
  //   try {
  //     await AsyncStorage.setItem('fuel_List', initialData);
  //   } catch (e) {
  //     // saving error
  //   }
  // };
  // storeData(initialData);

  AsyncStorage.setItem('fuelList', JSON.stringify(initialData)).then(() =>
    console.log('data init successful'),
  );

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
