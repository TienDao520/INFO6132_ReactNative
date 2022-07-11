import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  NativeModules,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initData} from '../redux/rootReducer';
import {useDispatch} from 'react-redux';

const SignInScreen = props => {
  const {navigation} = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {ReactFuelMethod} = NativeModules;

  // useEffect(() => {
  //   auth().onAuthStateChanged(user => {
  //     console.log('user: ', user);
  //     if (user != null) {
  //       console.log('The return user information: ', user);
  //       //ToDo: navigate to ListScreen
  //       // navigation.navigate('ListScreen');
  //     }
  //   });
  //   async function fetchToken() {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token !== '') {
  //       //ToDo: navigate to ListScreen
  //       // navigation.navigate('ListScreen');
  //     }
  //   }
  //   fetchToken();
  // }, [navigation]);

  const setToken = firebaseUser => {
    firebaseUser.user
      .getIdToken()
      .then(async token => {
        await AsyncStorage.setItem('token', token);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = () => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async _firebaseUser => {
        setToken(_firebaseUser);
        // const data = await AsyncStorage.getItem('fuelList');
        ReactFuelMethod.getFuelData().then(res => {
          const data = {
            fuelStore: [
              {fuelType: res[1], price: res[2]},
              {fuelType: res[3], price: res[4]},
              {fuelType: res[5], price: res[6]},
            ],
            usedList: [],
            userMaxAllowance: res[0],
          };
          console.log('Data from native', data);
          dispatch(initData(data));
          goToListScreen();
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        setIsLoading(false);
        if (errorCode === 'auth/wrong-password') {
          Alert.alert('Wrong password.');
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  const goToSignUpScreen = () => {
    navigation.navigate('SignUpScreen');
  };

  const goToListScreen = () => {
    navigation.navigate('ListScreen');
  };

  const onPressLogOutFunction = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('SignInScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/fuel-prices-logo.png')}
          />
        </View>
        <View style={styles.criteriaContainer}>
          <View>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Sign In"
              disabled={isLoading || (!email && !password)}
              onPress={handleLogin}
            />
          </View>
          <View style={styles.button}>
            <Button title="Sign Up" onPress={goToSignUpScreen} />
          </View>
          <View style={styles.button}>
            <Button title="Log Out" onPress={onPressLogOutFunction} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  criteriaContainer: {
    padding: 12,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  button: {
    marginVertical: 5,
  },
});

export default SignInScreen;
