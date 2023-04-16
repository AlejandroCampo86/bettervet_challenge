import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, Text} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';

interface Restaurant {
  place_id: string;
  rating: number;
  photos: {photo_reference: string}[];
  name: string;
  formatted_address?: string;
  vicinity?: string;
}

interface Props {
  restaurants: Restaurant[];
}

export default function RestaurantsList({restaurants}: Props) {
  const navigation = useNavigation();

  const handleRestaurantPress = (restaurant: Restaurant) => {
    if (restaurant) {
      navigation.navigate('RestaurantDetails', {restaurant});
    }
  };

  if (!restaurants || restaurants.length === 0) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.errorMessage}>Oops, no restaurants found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      {restaurants
        .sort((a, b) => b.rating - a.rating) // Sort restaurants by highest rating
        .slice(0, 10) // Get the first 10 items
        .map(restaurant => (
          <TouchableOpacity
            key={restaurant.place_id}
            onPress={() => handleRestaurantPress(restaurant)}>
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
              <View style={styles.cardInfoContainer}>
                <Text style={styles.cardRating}>
                  Rating: {restaurant.rating}
                </Text>
                <Text style={styles.cardAddress}>
                  Address: {restaurant.formatted_address || restaurant.vicinity}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
  },
  card: {
    color: 'black',
    borderRadius: 20,
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
  errorMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    alignSelf: 'center',
    marginVertical: 20,
  },
});
