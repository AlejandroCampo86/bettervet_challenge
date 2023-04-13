import React, {useEffect, useState, createContext} from 'react';
import {
  fetchLocalRestaurants,
  fetchRestaurantsByLocation,
  getUserRegion,
  locationTransform,
} from './location.service';
import Geolocation from '@react-native-community/geolocation';

export const LocationContext = createContext();

export const LocationContextProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('Buenos Aires');
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const onSearch = searchKeyword => {
    setIsLoading(true);
    console.log('keyword is ', searchKeyword);
    setKeyword(searchKeyword);
  };

  const getUserLocation = () => {
    const fetchData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            position => {
              resolve(position);
            },
            error => {
              reject(error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        });

        const {latitude, longitude} = position.coords;
        // Set the initial region for the map
        setUserLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  };

  const getLocalRestaurants = async () => {
    try {
      const localRestaurants = await fetchLocalRestaurants();
      //console.log('restaurants from context ', localRestaurants);
      setRestaurants(localRestaurants);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    fetchRestaurantsByLocation(keyword.toLowerCase())
      .then(locationTransform)
      .then(result => {
        console.log('location result');
        setError(null);
        setIsLoading(false);
        setLocation(result);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    getLocalRestaurants();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        restaurants,
        search: onSearch,
        keyword,
        error,
        userLocation,
        location,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
