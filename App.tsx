import React from 'react';
import AppNavigator from './navigations/AppNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContextProvider} from './store/app-context';

export default function App() {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </AppContextProvider>
  );
}
