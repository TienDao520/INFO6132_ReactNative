import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {removeItem} from '../redux/rootReducer';
import {useSelector, useDispatch} from 'react-redux';

import auth from '@react-native-firebase/auth';

const ListScreen = props => {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const onPressCreateFunction = () => {
    navigation.navigate('CreateListScreen');
  };

  const onPressDeviceInfoFunction = () => {
    navigation.navigate('DeviceInfo');
  };

  const onPressLogOutFunction = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('SignInScreen');
  };

  var listItems = useSelector(state => {
    return state.usedList;
  });

  var allowanceRemaining = useSelector(state => {
    return state.userMaxAllowance;
  });
  console.log('listItems', listItems);
  var sum = listItems.reduce((accumulator, object) => {
    return accumulator + object.fuelUsed;
  }, 0);
  var remainingPrice = (allowanceRemaining - sum).toString();

  const removeTheItem = ({item}) => {
    dispatch(removeItem({item}));
  };

  const renderItem = ({item}) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemMetaContainer}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          Fuel Type: {item.fuelType}
        </Text>
        <Text style={styles.itemTitle} numberOfLines={1}>
          Fuel Price: {item.fuelPrice}
        </Text>
      </View>
      <View style={styles.listItemMetaContainer}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          Fuel Used: {item.fuelUsed}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(removeItem(item));
          }}>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={onPressCreateFunction}
          style={styles.createBtn}>
          <Text>Create List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressDeviceInfoFunction}
          style={styles.createBtn}>
          <Text>Show Device Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressLogOutFunction}
          style={styles.createBtn}>
          <Text>Log out</Text>
        </TouchableOpacity>
        <Text>User Allowance Remaining:{remainingPrice}</Text>
        {listItems.length !== 0 ? (
          <FlatList
            data={listItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text style={{fontSize: 20}}>Your list is empty now</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    height: '100%',
  },
  listItemContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#dfdfdf',
    alignItems: 'flex-start',
  },
  listItemMetaContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
  },
  createBtn: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
export default ListScreen;
