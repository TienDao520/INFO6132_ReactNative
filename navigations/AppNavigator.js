import React from 'react';
import {View, Text, Platform, StyleSheet, Pressable, Alert} from 'react-native';
//yarn add @react-navigation/native
import {NavigationContainer} from '@react-navigation/native';
//yarn add @react-navigation/native-stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppTitle from './AppTitle';

import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import ListScreen from '../screens/ListScreen';
import CreateListScreen from '../screens/CreateListScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
