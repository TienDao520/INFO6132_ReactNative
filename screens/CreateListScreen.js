import React, {useState} from 'react';
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
  NativeModules,
} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {addItem} from '../redux/rootReducer';
import {useSelector, useDispatch} from 'react-redux';

const CreateListScreen = props => {
  const [selectedType, setSelectedType] = useState('');
  // const [selectedPrice, setSelectedPrice] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [quantity, setQuantity] = useState('');

  const {navigation} = props;

  const dispatch = useDispatch();

  const data = useSelector(state => state.fuelStore);
  const handleCreate = () => {
    const selectedPrice = data.find(
      item => item.fuelType === selectedType,
    ).price;

    const inputData = {
      id: Date.now().toString(),
      fuelType: selectedType,
      fuelPrice: selectedPrice,
      fuelUsed: quantity * selectedPrice,
    };
    dispatch(addItem(inputData));
    navigation.navigate('ListScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>CreateListScreen</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="fuelType"
          valueField="fuelType"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={selectedType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedType(item.fuelType.toString());
            // setSelectedPrice(item.value.toString());
            setIsFocus(false);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter litres/ change unit here"
          value={quantity}
          onChangeText={enteredValue => setQuantity(enteredValue)}
        />
        <Button style={styles.button} title="Create" onPress={handleCreate} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    height: '100%',
  },
  button: {
    backgroundColor: '#ccc',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default CreateListScreen;
