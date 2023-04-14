import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../../src/components/DrawerContent';
import {LocalRestaurantsStackScreen, RestaurantsStackScreen} from './stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon from 'react-native-vector-icons/FontAwesome' for icons

// Define a bottom tab navigator type
type BottomTabParamList = {
  LocalRestaurantsTab: undefined;
  RestaurantsTab: undefined;
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
            <BottomTab.Navigator
              screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({color, size}) => {
                  // Define icons for each tab based on route name
                  let iconName;
                  if (route.name === 'LocalRestaurantsTab') {
                    iconName = 'cutlery';
                  } else if (route.name === 'RestaurantsTab') {
                    iconName = 'glass';
                  }
                  // Return the icon component
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}>
              <BottomTab.Screen
                name="LocalRestaurantsTab"
                component={LocalRestaurantsStackScreen}
                options={{tabBarLabel: 'Local Restaurants'}} // Update tab label
              />
              <BottomTab.Screen
                name="RestaurantsTab"
                component={RestaurantsStackScreen}
                options={{tabBarLabel: 'Restaurants'}} // Update tab label
              />
            </BottomTab.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
