import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

const DrawerContent: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={require('../assets/better_vet_logo.jpg')}
          style={styles.logo}
        />

        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => {
            navigation.navigate('LocalRestaurantsComponent');
          }}>
          <Text style={styles.rowText}>Local Restaurants</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => {
            navigation.navigate('RestaurantsComponent');
          }}>
          <Text style={styles.rowText}>Search for a Location</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => {
            navigation.navigate('AboutScreenComponent');
          }}>
          <Text style={styles.rowText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Designed with love </Text>
        <Text style={styles.footerText}>by</Text>
        <Text style={styles.footerText}>Alejandro Campo </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  subContainer: {
    padding: 16,
  },
  logo: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 16,
  },
  rowContainer: {
    paddingVertical: 10,
  },
  rowText: {
    fontSize: 18,
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  footer: {
    backgroundColor: '#2962ff',
    padding: 16,
    height: 100,
    marginTop: 'auto',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DrawerContent;
