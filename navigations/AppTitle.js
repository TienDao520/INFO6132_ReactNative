import React from 'react';
import {View, Text, Platform, StyleSheet, Pressable, Alert} from 'react-native';

function AppTitle(props) {
  return (
    <View>
      <Text style={styles.headerTitle}>Fuel List</Text>
      <Text style={styles.headerTitle}>Minh Tien Dao</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
});
export default AppTitle;
