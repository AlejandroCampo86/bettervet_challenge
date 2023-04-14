import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar} from '@rneui/themed';
import MapView, {Marker} from 'react-native-maps';
import {LocationContext} from '../services/location.context';
import {Card} from '@rneui/base';
import BetterVetLogo from '../assets/better_vet_logo.jpg';

const MapScreen: React.FC = () => {
  const navigation = useNavigation();
  const {search, keyword, location, restaurants} = useContext(LocationContext);
  const {lat, lng, viewport} = location || {}; // Use empty object as fallback
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    search(keyword);
  }, []);

  useEffect(() => {
    if (location && viewport) {
      const northeastLat = viewport.northeast.lat;
      const southwestLat = viewport.southwest.lat;

      setLatDelta(northeastLat - southwestLat);
    }
  }, [location, viewport]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={BetterVetLogo} style={styles.logo} />

        <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <Text style={styles.location}>
            Look for Restaurants in your area or search for a location
          </Text>
        </TouchableOpacity>
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
      </View>
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

      {/* Render restaurant cards */}
      <ScrollView style={styles.cardContainer}>
        {restaurants
          .sort((a, b) => b.rating - a.rating) // Sort restaurants by highest rating
          .slice(0, 10) // Get the first 10 items
          .map(restaurant => (
            <Card key={restaurant.place_id} containerStyle={styles.card}>
              {/* Render restaurant photo */}
              {restaurant.photos && restaurant.photos.length > 0 && (
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyC_U3QoJx6cviFt-IDRqvU01pBP0Ck4f2M
`,
                  }}
                  style={styles.cardImage}
                />
              )}
              <Text style={styles.cardTitle}>{restaurant.name}</Text>
              <Text style={styles.cardAddress}>{restaurant.vicinity}</Text>
              <View style={styles.cardInfoContainer}>
                <Text style={styles.cardRating}>
                  Rating: {restaurant.rating}
                </Text>
                <Text style={styles.cardAddress}>
                  Address: {restaurant.formatted_address}
                </Text>
              </View>
            </Card>
          ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2962ff',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    borderColor: 'black',
    backgroundColor: '#FCF2F0',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  map: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
  },
  title: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
  },
  logo: {
    width: '90%',
    height: 100,
    resizeMode: 'contain',
  },
  location: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#2962ff',
    flexDirection: 'column',
  },
  card: {
    color: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardAddress: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 0,
  },
  cardInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default MapScreen;
