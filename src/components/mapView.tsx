import React, {useContext, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LocationContext} from '../services/location.context';

export default function MapViewComponent() {
  const {location, restaurants} = useContext(LocationContext);
  const mapRef = useRef(null);

  useEffect(() => {
    if (location && restaurants.length > 0 && mapRef.current) {
      const markers = restaurants.slice(0, 10).map(restaurant => ({
        latitude: restaurant.geometry.location.lat,
        longitude: restaurant.geometry.location.lng,
      }));
      mapRef.current.fitToCoordinates(markers, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  }, [location, restaurants]);

  return (
    <View style={styles.mapContainer}>
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {/* Render restaurant markers on the map */}
          {restaurants.slice(0, 10).map(restaurant => (
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
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
