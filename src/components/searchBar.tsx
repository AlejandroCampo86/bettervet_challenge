import {View, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';
import React, {useState, useEffect, useContext} from 'react';
import {LocationContext} from '../services/location.context';

export default function SearchBarComponent() {
  const {search, keyword} = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    search(keyword);
  }, []);

  return (
    <View style={styles.searchBar}>
      <SearchBar
        platform="android"
        placeholder="Enter a location"
        onChangeText={text => {
          setSearchKeyword(text);
        }}
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  searchBar: {
    width: '90%',
    elevation: 1,
    alignSelf: 'center',
    borderRadius: 15,
  },
  searchBarContainer: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 0,
    paddingHorizontal: 0,
    elevation: 1,
    alignSelf: 'center',
  },
  searchBarInputContainer: {
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 0,
    paddingHorizontal: 10,
  },
});
