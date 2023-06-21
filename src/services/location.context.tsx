import React, {useEffect, useState, createContext} from 'react';
import {fetchLocalRestaurants} from './location.service';
import Geolocation from '@react-native-community/geolocation';
import camelize from 'camelize';

export type LocationContextType = {
  isLoading: boolean;
  localRestaurants: any[];
  restaurants: any[];
  search: (searchKeyword: string) => void;
  keyword: string;
  error: any;
  userLocation: any;
  location: any;
};

type UserLocationType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type LocationType = {
  lat: number;
  lng: number;
  viewport: any;
};

export const LocationContext = createContext<LocationContextType | null>(null);

export const LocationContextProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('Buenos Aires');
  const [location, setLocation] = useState<LocationType | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocationType | null>(
    null,
  );
  const [restaurants, setRestaurants] = useState([]);
  const [localRestaurants, setLocalRestaurants] = useState([]);

  //set keyword
  const onSearch = async (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    await fetchDataByKeyword(searchKeyword.toLowerCase());
  };

  //fetch places by keyword
  const fetchDataByKeyword = (value: any) => {
    console.log('keyword', value);
    return new Promise(() => {
      // Make API request to fetch restaurants based on the keyword
      fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&type=restaurant&fields=name,formatted_address,rating,opening_hours,geometry,photos,place_id,reviews&key=AIzaSyC_U3QoJx6cviFt-IDRqvU01pBP0Ck4f2M`,
      )
        .then(res => res.json()) // Resolve the response to JSON
        .then(data => {
          console.log('data fetched ', data);

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
        const position: any = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            pos => {
              resolve(pos);
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
      const localRes = await fetchLocalRestaurants();
      //console.log('restaurants from context ', localRestaurants);
      setLocalRestaurants(localRes);
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
        error: null,
        isLoading,
        localRestaurants,
        restaurants,
        search: onSearch,
        keyword,
        userLocation,
        location,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
