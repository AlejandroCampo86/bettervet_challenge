// Import necessary modules and components
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Define the restaurant screen component
const RestaurantScreen: React.FC = () => {
  const [region, setRegion] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurants from the API based on user's location
    const fetchRestaurants = async () => {
      try {
        // Fetch the user's current location
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;

            // Set the initial region for the map
            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });

            // Make API request to fetch restaurants based on user's location
            fetch(
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=AIzaSyC_U3QoJx6cviFt-IDRqvU01pBP0Ck4f2M`,
            )
              .then(response => response.json())
              .then(data => setRestaurants(data.results))
              .catch(error => console.error(error));
          },
          error => console.error(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
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
