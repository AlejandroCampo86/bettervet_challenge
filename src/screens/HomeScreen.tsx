import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';

const MapScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Restaurant Challenge</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <Text style={styles.location}>Look for Restaurants in your area</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  mapContainer: {
    padding: 15,
    flex: 1,
  },
  map: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
  },
  location: {
    color: 'blue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default MapScreen;
