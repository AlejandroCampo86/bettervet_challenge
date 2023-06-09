import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const AboutScreenComponent = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>ABOUT THE RESTAURANT APP</Text>
      <Text style={styles.text}>
        Hey there! Welcome to the About Screen. I wanted to tell you about some
        of the tools I used and a little bit about the process.
        {'\n\n'}
        Restaurant App Challenge was made using a wide range of dependencies
        with the goal of achieving an efficient and attractive app for the user.
        {'\n\n'}
        The App was built and tested using a Windows Operative System and
        Android Phone. Since the Guidelines of the challenge specified not using
        EXPO it was impossible to test on IOS environment. Please test it on
        Android.
        {'\n\n'}
        Regarding navigation, I used libraries like @react-navigation/drawer and
        @react-navigation/bottom-tabs to give it a simple and dynamic flow.
        {'\n\n'}
        One of the main challenges was implementing the geolocation
        functionalities, the use of the Maps API and the permissions. To achieve
        this I use dependencies react-native-community/geolocation,
        react-native-maps and react-native-permissions. I think I managed to
        integrate these functionalities and the result is smooth and intuitive.
        {'\n\n'}
        Regarding the design components I decided to use the React Native
        Elements library for the search bar and some texts,
        react-native-vector-icons to add icons. These libraries made my job a
        lot easier and allowed me to achieve a polished design.
        {'\n\n'}I did my best to design a stunning app that met the requirements
        of the BetterVet Challenge. Despite the challenges, I thoroughly enjoyed
        building this App and I feel proud of the final result. I hope you enjoy
        it too.
        {'\n\n'}
        ALEJANDRO CAMPO
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    paddingBottom: 60,
  },
});

export default AboutScreenComponent;
