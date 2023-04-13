import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar} from '@rneui/themed';
import MapView, {Marker} from 'react-native-maps';
import {LocationContext} from '../services/location.context';

const MapScreen: React.FC = () => {
  const navigation = useNavigation();
  const {search, keyword, location, isLoading} = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  const {lat, lng, viewport} = location || {}; // Use empty object as fallback

  useEffect(() => {
    if (location && viewport) {
      const northeastLat = viewport.northeast.lat;
      const southwestLat = viewport.southwest.lat;

      setLatDelta(northeastLat - southwestLat);
    }
  }, [location, viewport]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>BetterVet Challenge</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <Text style={styles.location}>Look for Restaurants in your area</Text>
        </TouchableOpacity>

        <Text style={styles.location}>or</Text>

        <View style={styles.searchBar}>
          <SearchBar
            platform="android"
            placeholder="Enter a location"
            onChangeText={text => {
              setSearchKeyword(text);
            }}
            value={searchKeyword}
            onSubmitEditing={() => {
              search(searchKeyword);
            }}
          />
        </View>

        {/* <Text style={styles.location}>{location && location}</Text> */}
      </View>
      <View style={styles.mapContainer}>
        {!isLoading ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: latDelta,
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
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  searchBar: {
    width: '90%',
    elevation: 1, // Add elevation to provide a shadow effect
    alignSelf: 'center',
    borderRadius: 15,
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
