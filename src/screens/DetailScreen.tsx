// Import necessary modules and components
import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LocationContext} from '../services/location.context';

// Define the restaurant screen component
const RestaurantScreen: React.FC = () => {
  const {restaurants, userLocation} = useContext(LocationContext);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={userLocation}>
        {/* Render restaurant markers on the map */}
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.place_id}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            title={restaurant.name}
            description={restaurant.vicinity}
          />
        ))}
      </MapView>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default RestaurantScreen;
