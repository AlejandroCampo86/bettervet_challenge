// Import necessary modules and components
import React, {useContext, useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, Text, Animated} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LocationContext} from '../services/location.context';
import RestaurantsList from '../components/restaurantsList';

// Define the restaurant screen component
const LocalRestaurantsComponent: React.FC = () => {
  const {localRestaurants, userLocation} = useContext(LocationContext);
  const slideAnim = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Animated.View
          style={[
            styles.subContainer,
            {
              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            },
          ]}>
          <View style={styles.searchContainer}>
            <Text style={styles.location}>
              These are the Restaurants in your area
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={userLocation}>
              {localRestaurants.map(restaurant => (
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
        </Animated.View>
        <View style={styles.listContainer}>
          <RestaurantsList restaurants={localRestaurants} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  mapContainer: {
    padding: 5,
    flex: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  map: {
    flex: 1,
    padding: 5,
    borderRadius: 15,
  },
  subContainer: {
    height: 450,
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

export default LocalRestaurantsComponent;
