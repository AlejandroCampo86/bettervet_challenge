import React, {useContext} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {Card} from '@rneui/base';
import {LocationContext} from '../services/location.context';

export default function RestaurantsList() {
  const {restaurants} = useContext(LocationContext);
  return (
    <ScrollView style={styles.cardContainer}>
      {restaurants
        .sort((a: {rating: number}, b: {rating: number}) => b.rating - a.rating) // Sort restaurants by highest rating
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
              <Text style={styles.cardRating}>Rating: {restaurant.rating}</Text>
              <Text style={styles.cardAddress}>
                Address: {restaurant.formatted_address}
              </Text>
            </View>
          </Card>
        ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    backgroundColor: '#e8e8e8',
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
});
