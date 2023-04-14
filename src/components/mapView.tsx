import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LocationContext} from '../services/location.context';

export default function MapViewComponent() {
  const {location, restaurants} = useContext(LocationContext);
  const [latDelta, setLatDelta] = useState(0);
  const {lat, lng, viewport} = location || {}; // Use empty object as fallback
  useEffect(() => {
    if (location && viewport) {
      const northeastLat = viewport.northeast.lat;
      const southwestLat = viewport.southwest.lat;

      setLatDelta(northeastLat - southwestLat);
    }
  }, [location, viewport]);

  return (
    <View style={styles.mapContainer}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: latDelta,
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
