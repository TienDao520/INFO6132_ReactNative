import React from 'react';
import {View, Text, Platform, StyleSheet, Pressable, Alert} from 'react-native';
//yarn add @react-navigation/native
import {NavigationContainer} from '@react-navigation/native';
//yarn add @react-navigation/native-stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';
/**
 * For navigation we need to create stack navigator instance
 * and initalize our screens as stack screen
 */

import AppTitle from './AppTitle';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import ListScreen from '../screens/ListScreen';
import CreateListScreen from '../screens/CreateListScreen';
import DeviceInfo from '../screens/DeviceInfo';

// Navigation works based on stack data structure - LIFO
const Stack = createNativeStackNavigator();

function AppNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          headerTintColor: Platform.OS === 'android' ? 'white' : 'blue',
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#92a8d1' : '',
          },
        }}>
        <Stack.Screen
          // here we need to define name for our screen here
          // each screen going to have some unique name here so router can identify which screen you need to go to
          name="SignInScreen"
          component={SignInScreen}
          options={{
            headerTitle: () => <AppTitle />,
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerTitle: () => <AppTitle />,
          }}
        />

        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{
            headerTitle: () => <AppTitle />,
          }}
        />

        <Stack.Screen
          name="CreateListScreen"
          component={CreateListScreen}
          options={{
            headerTitle: () => <AppTitle />,
          }}
        />
        <Stack.Screen
          name="DeviceInfo"
          component={DeviceInfo}
          options={{
            headerTitle: () => <AppTitle />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
