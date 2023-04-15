import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '@rneui/themed';
import MapViewComponent from '../components/mapView';
import RestaurantsList from '../components/restaurantsList';
import SearchBarComponent from '../components/searchBar';
import {LocationContext} from '../services/location.context';

const RestaurantsComponent: React.FC = () => {
  const {restaurants} = useContext(LocationContext);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.searchContainer}>
          <Text style={styles.location}>
            Look for restaurants in a specific location
          </Text>
          <SearchBarComponent />
        </View>
        <MapViewComponent />
      </View>
      <View style={styles.listContainer}>
        <RestaurantsList restaurants={restaurants} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    zIndex: 999,
  },
  subContainer: {
    flex: 2,
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    backgroundColor: '#2962ff',
    borderRadius: 20,
    zIndex: 999,
  },
  listContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //borderWidth: 1,
  },
  location: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default RestaurantsComponent;
