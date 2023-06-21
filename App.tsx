import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocationContextProvider} from './src/services/location.context';
import Navigation from './src/navigation';

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
