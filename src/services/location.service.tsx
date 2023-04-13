import Geolocation from '@react-native-community/geolocation';

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
