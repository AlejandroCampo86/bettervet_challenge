import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

const DrawerContent: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* "Local Restaurants" row */}
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => {
          navigation.navigate('LocalRestaurants');
        }}>
        <Text style={styles.rowText}>Local Restaurants</Text>
      </TouchableOpacity>

      {/* "Search for a Location" row */}
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => {
          navigation.navigate('SearchLocation');
        }}>
        <Text style={styles.rowText}>Search for a Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  rowContainer: {
    paddingVertical: 10,
  },
  rowText: {
    fontSize: 18,
    color: 'black',
  },
});

export default DrawerContent;
