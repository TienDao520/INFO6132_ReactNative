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
        <Button title="Create" onPress={handleCreate} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});
export default CreateListScreen;
