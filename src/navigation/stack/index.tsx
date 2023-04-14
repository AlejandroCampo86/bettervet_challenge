import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantsComponent from '../../../src/screens/RestaurantsComponent';
import LocalRestaurantsComponent from '../../../src/screens/LocalRestaurantsComponent';

// Define a stack navigator type
type RootStackParamList = {
  Home: undefined;
  Detail: {itemId: number};
};

const localRestaurantsStack = createStackNavigator<RootStackParamList>();
const restaurantsStack = createStackNavigator<RootStackParamList>();

// Define the LocalRestaurantsStack as a separate component
export const LocalRestaurantsStackScreen: React.FC = () => {
  return (
    <localRestaurantsStack.Navigator screenOptions={{headerShown: false}}>
      <localRestaurantsStack.Screen
        name="LocalRestaurants"
        component={RestaurantsComponent}
      />
    </localRestaurantsStack.Navigator>
  );
};

// Define the RestaurantsStack as a separate component
export const RestaurantsStackScreen: React.FC = () => {
  return (
    <restaurantsStack.Navigator screenOptions={{headerShown: false}}>
      <restaurantsStack.Screen
        name="Detail"
        component={LocalRestaurantsComponent}
      />
    </restaurantsStack.Navigator>
  );
};
