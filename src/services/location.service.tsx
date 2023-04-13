import Geolocation from '@react-native-community/geolocation';
import camelize from 'camelize';

export const fetchLocalRestaurants = () => {
  return new Promise((resolve, reject) => {
    // Fetch the user's current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        // Make API request to fetch restaurants based on user's location
        fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=AIzaSyC_U3QoJx6cviFt-IDRqvU01pBP0Ck4f2M`,
        )
          .then(response => response.json())
          .then(data => {
            const resRestaurants = data.results;
            resolve(resRestaurants); // Resolve the Promise with the data
          })
          .catch(error => {
            console.error(error);
            reject(error); // Reject the Promise with the error
          });
      },
      error => {
        console.error(error);
        reject(error); // Reject the Promise with the error
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  });
};

export const fetchRestaurantsByLocation = location => {
  console.log('location from fetch ', location);
  return new Promise((resolve, reject) => {
    // Make API request to fetch restaurants based on the location
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&type=restaurant&key=AIzaSyC_U3QoJx6cviFt-IDRqvU01pBP0Ck4f2M`,
    ) // Replace YOUR_API_KEY with your actual Google Maps API key
      .then(res => res.json()) // Resolve the response to JSON
      .then(data => {
        console.log('result ', data);
        const formattedResponse = camelize(data);
        console.log('formatted result', formattedResponse);
        const {geometry = {}} = formattedResponse.results[0];
        const {lat, lng} = geometry.location;

        resolve({lat, lng, viewport: geometry.viewport}); // Resolve the Promise with the data
      })
      .catch(error => {
        console.error(error);
        reject(error); // Reject the Promise with the error
      });
  });
};

// export const locationTransform = result => {
//   console.log(' result', result);
//   const formattedResponse = camelize(result);
//   console.log('formatted result', formattedResponse);
//   const {geometry = {}} = formattedResponse.results[0];
//   const {lat, lng} = geometry.location;

//   return {lat, lng, viewport: geometry.viewport};
// };