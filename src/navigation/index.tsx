import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import {LocalRestaurantsStackScreen, RestaurantsStackScreen} from './stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import AboutScreenComponent from '../screens/AboutScreen';

type BottomTabParamList = {
  LocalRestaurantsTab: undefined;
  RestaurantsTab: undefined;
};

type DrawerParamList = {
  BetterVetChallenge: undefined;
  AboutScreenComponent: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

// Custom component for the Drawer Menu
const CustomHeader = () => {
  const navigation = useNavigation();
  const handleMenuToggle = () => {
    navigation.toggleDrawer();
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.menuIconContainer}
        onPress={handleMenuToggle}>
        <Icon name="bars" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/better_vet_logo.jpg')}
          style={styles.logo}
        />
      </View>
      <View style={styles.emptyContainer} />
    </View>
  );
};

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="BetterVetChallenge"
          options={{header: () => <CustomHeader />}}>
          {() => (
            <BottomTab.Navigator
              screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({color, size}) => {
                  let iconName;
                  if (route.name === 'LocalRestaurantsTab') {
                    iconName = 'cutlery';
                  } else if (route.name === 'RestaurantsTab') {
                    iconName = 'glass';
                  }
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}>
              <BottomTab.Screen
                name="RestaurantsTab"
                component={RestaurantsStackScreen}
                options={{tabBarLabel: 'Restaurants'}}
              />
              <BottomTab.Screen
                name="LocalRestaurantsTab"
                component={LocalRestaurantsStackScreen}
                options={{tabBarLabel: 'Local Restaurants'}}
              />
            </BottomTab.Navigator>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="AboutScreenComponent"
          component={AboutScreenComponent}
          options={{header: () => <CustomHeader />}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  menuIconContainer: {
    //borderWidth: 1,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  emptyContainer: {
    width: 60,
  },
});
