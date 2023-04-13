import React, {useEffect, useState, createContext} from 'react';
import {fetchLocalRestaurants} from './location.service';
import Geolocation from '@react-native-community/geolocation';
import camelize from 'camelize';

export const LocationContext = createContext();

export const LocationContextProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('Buenos Aires');
  const [fetchedData, setFetchedData] = useState({});
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const onSearch = async searchKeyword => {
    setIsLoading(true);
    console.log('keyword is ', searchKeyword);
    setKeyword(searchKeyword);
    await fetchDataByKeyword(searchKeyword.toLowerCase());
  };

  const fetchDataByKeyword = (value: any) => {
    console.log('keyword', value);
    return new Promise(() => {
      // Make API request to fetch restaurants based on the keyword
      fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&type=restaurant&key=AIzaSyC_U3QoJx6cviFt-IDRqvU01pBP0Ck4f2M`,
      ) // Replace YOUR_API_KEY with your actual Google Maps API key
        .then(res => res.json()) // Resolve the response to JSON
        .then(data => {
          console.log('data fetched ', data);
          setFetchedData(data);
          //Set restaurants by keyword
          console.log('restaurant fetched ', data.results[0]);
          setRestaurants(data.results);
          //Set location coordinates
          const formattedResponse = camelize(data);
          const {geometry = {}} = formattedResponse.results[0];
          const {lat, lng} = geometry.location;
          setLocation({lat, lng, viewport: geometry.viewport});
        })
        .catch(e => {
          console.error(e);
        });
    });
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
