import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../../src/components/DrawerContent';
import {LocalRestaurantsStackScreen, RestaurantsStackScreen} from './stack';

// Define a bottom tab navigator type
type BottomTabParamList = {
  Tab1: undefined;
  Tab2: undefined;
};

// Define a drawer navigator type
type DrawerParamList = {
  Main: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

// Define a functional component using TypeScript
const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="BetterVet Challenge">
          {() => (
            <BottomTab.Navigator screenOptions={{headerShown: false}}>
              <BottomTab.Screen
                name="LocalRestaurantsTab"
                component={LocalRestaurantsStackScreen}
              />
              <BottomTab.Screen
                name="RestaurantsTab"
                component={RestaurantsStackScreen}
              />
            </BottomTab.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
