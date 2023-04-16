import React, {useContext, useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import {Text} from '@rneui/themed';
import MapViewComponent from '../components/mapView';
import RestaurantsList from '../components/restaurantsList';
import SearchBarComponent from '../components/searchBar';
import {LocationContext} from '../services/location.context';

const RestaurantsComponent: React.FC = () => {
  const {restaurants} = useContext(LocationContext);
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
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
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
              Look for restaurants in a specific location
            </Text>
            <SearchBarComponent />
          </View>
          <MapViewComponent />
        </Animated.View>
        <View style={styles.listContainer}>
          <RestaurantsList restaurants={restaurants} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    zIndex: 999,
  },
  scrollViewContainer: {
    flexGrow: 1,
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

export default RestaurantsComponent;
