import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantsComponent from '../../../src/screens/RestaurantsComponent';
import LocalRestaurantsComponent from '../../../src/screens/LocalRestaurantsComponent';
import RestaurantDetails from '../../screens/RestaurantDetails';

export type RootStackParamList = {
  RestaurantDetails: {};
  LocalRestaurantsComponent: undefined;
  RestaurantsComponent: undefined;
};

const localRestaurantsStack = createStackNavigator<RootStackParamList>();
const restaurantsStack = createStackNavigator<RootStackParamList>();

export const LocalRestaurantsStackScreen: React.FC = () => {
  return (
    <localRestaurantsStack.Navigator screenOptions={{headerShown: false}}>
      <localRestaurantsStack.Screen
        name="LocalRestaurantsComponent"
        component={LocalRestaurantsComponent}
      />
      <localRestaurantsStack.Screen
        name="RestaurantDetails"
        children={(props: any) => <RestaurantDetails {...props} />}
      />
    </localRestaurantsStack.Navigator>
  );
};

export const RestaurantsStackScreen: React.FC = () => {
  return (
    <restaurantsStack.Navigator screenOptions={{headerShown: false}}>
      <restaurantsStack.Screen
        name="RestaurantsComponent"
        component={RestaurantsComponent}
      />
      <localRestaurantsStack.Screen
        name="LocalRestaurantsComponent"
        component={LocalRestaurantsComponent}
      />
      <restaurantsStack.Screen
        name="RestaurantDetails"
        children={(props: any) => <RestaurantDetails {...props} />}
      />
    </restaurantsStack.Navigator>
  );
};
