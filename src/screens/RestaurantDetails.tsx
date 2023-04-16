import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';

type Restaurant = {
  place_id: string;
  photos: {photo_reference: string}[];
  name: string;
  rating: number;
  formatted_address: string;
};

type Review = {
  author_name: string;
  text: string;
};

type RestaurantDetailsProps = {
  route: RouteProp<{params: {restaurant: Restaurant}}, 'params'>;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({route}) => {
  const {restaurant} = route.params;
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Fetch place details using the place_id
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${restaurant.place_id}&fields=reviews&key=AIzaSyC_U3QoJx6cviFt-IDRqvU01pBP0Ck4f2M`,
        );
        const data = await response.json();

        // Set reviews from the result
        setReviews(data.result.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaceDetails();
  }, [restaurant.place_id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {restaurant.photos && restaurant.photos.length > 0 && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyC_U3QoJx6cviFt-IDRqvU01pBP0Ck4f2M`,
          }}
          style={styles.cardImage}
        />
      )}
      <Text style={styles.cardTitle}>{restaurant.name}</Text>
      <Text style={styles.cardRating}>Rating: {restaurant.rating}</Text>
      <Text style={styles.cardAddress}>
        Address: {restaurant.formatted_address}
      </Text>
      {/* reviews */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Reviews:</Text>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewAuthor}>{review.author_name}</Text>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardTitle: {
    color: '#2962ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardAddress: {
    color: '#2962ff',
    fontSize: 16,
    marginVertical: 5,
  },
  cardRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 5,
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2962ff',
    marginBottom: 10,
  },
  reviewContainer: {
    marginBottom: 10,
  },
  reviewAuthor: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default RestaurantDetails;
