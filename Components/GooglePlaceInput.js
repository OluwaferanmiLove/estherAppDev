import React from 'react';
import {Dimensions, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {width, height} = Dimensions.get('window');

const GooglePlaceInput = () => {
  navigator.geolocation = require('react-native-geolocation-service');
  return (
    <GooglePlacesAutocomplete
      placeholder={'Search'}
      onPress={(data, details) => {
        console.log(data);
      }}
      minLength={2}
      autoFocus={false}
      returnKeyType={'default'}
      fetchDetails={true}
      styles={{
        container: {
          maxHeight: height * 0.13,
          width,
        },
        textInputContainer: {
          alignSelf: 'center',
          justifyContent: 'center',
          margin: 0,
          marginTop: 0,
          marginBottom: 0,
          width: width * 0.9,
        },
        textInput: {
          textAlign: 'center',
          width: width * 0.9,
          borderWidth: 1.5,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          height: 55,
          color: '#5d5d5d',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
        listView: {
          maxHeight: height * 0.12,
        },
      }}
      query={{
        key: 'AIzaSyAaGepK96IlHQmOvBGs1J_whg1wDQRPitQ',
        language: 'en',
      }}
      currentLocation={true}
      currentLocationLabel={'Current location'}
    />
  );
};

export default GooglePlaceInput;
