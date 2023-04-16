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
        The Restaurant App Challenge was built using an array of powerful
        dependencies that helped me create an efficient and user friendly
        experience for users. Using technologies such as React Native combined
        with various navigation libraries like @react-navigation/drawer and
        @react-navigation/native, I did my best to design a stunning app that
        met the requirements of the BetterVet Challenge.
        {'\n\n'}
        One of the main challenges I faced during the implementation was
        integrating different functionalities like geolocation, maps, and
        permissions using dependencies such as
        react-native-community/geolocation, react-native-maps, and
        react-native-permissions. I think I was able to incorporate these
        features into the app making it a smooth and intuitive experience.
        {'\n\n'}
        Another notable dependency I used was the React Native Elements (RNE)
        library, which allowed me to create stylish and responsive UI components
        for the app. The wide range of pre-designed components and theming
        options offered by RNE made the process of designing the app enjoyable
        and efficient.
        {'\n\n'}I also utilized other popular dependencies such as
        react-native-paper for material design components,
        react-native-vector-icons for adding icons to the app, and
        @expo/vector-icons for additional icon options. These libraries provided
        me with a vast collection of pre-designed components and icons, saving
        me time and effort in building a polished and professional-looking app.
        {'\n\n'}
        Despite the challenges, I thoroughly enjoyed building this App and I
        feel proud of the final result. I hope you enjoy it too.
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
