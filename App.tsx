import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocationContextProvider} from './src/services/location.context';
import Navigation from './src/navigation';

// Define a stack navigator type
type RootStackParamList = {
  Home: undefined;
  Detail: {itemId: number};
};

const Stack = createStackNavigator<RootStackParamList>();

// Define a functional component using TypeScript
const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <LocationContextProvider>
        <Navigation />
      </LocationContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
