import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '@rneui/themed';
import MapViewComponent from '../components/mapView';
import RestaurantsList from '../components/restaurantsList';
import SearchBarComponent from '../components/searchBar';

const RestaurantsComponent: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.location}>
          Look for Restaurants in your area or search for a location
        </Text>
        <SearchBarComponent />
      </View>
      <MapViewComponent />
      <RestaurantsList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2962ff',
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  location: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default RestaurantsComponent;
