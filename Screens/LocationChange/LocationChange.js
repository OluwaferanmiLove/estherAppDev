import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {colors} from '../../Constants/Theme';
import InputBar from '../../Components/InputBar';
import GooglePlaceInput from '../../Components/GooglePlaceInput';
import Button from '../../Components/Button';
import {MapStyle} from '../../Constants/MapStyle';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {width, height} = Dimensions.get('window');
const cardHeight = height * 0.43;
const logoHeight = 100;

function LocationChange({navigation}) {
  const [mapData, setMapData] = React.useState(null);

  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  const map = React.useRef();

  const requestPermission = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
              getCurrentPosition(),
            );
            break;
          case RESULTS.GRANTED:
            getCurrentPosition();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.025,
        };
        dispatch({type: 'LOCATION', payload: region});
        setMapData(region);
      },
      (error) => console.warn(error.code, error.message),
      {timout: 1000, maximumAge: 1000, enableHighAccuracy: true},
    );
  };

  React.useEffect(() => {
    requestPermission();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={'position'}
      style={[styles.main, {backgroundColor: colors.bgColor}]}>
      <StatusBar
        translucent={true}
        backgroundColor={`${colors.bgColor}00`}
        barStyle={'dark-content'}
      />
      <MapView
        ref={map}
        style={styles.mapMain}
        // customMapStyle={MapStyle}
        showsTraffic={true}
        showsPointsOfInterest={true}
        showsUserLocation={true}
        showsBuildings={true}
        showsIndoors={true}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}>
        <Marker
          coordinate={{
            latitude: location ? location.latitude : 0,
            longitude: location ? location.longitude : 0,
          }}
        />
      </MapView>
      <View style={styles.locationCard}>
        <View style={styles.logo}>
          <Text>Logo</Text>
        </View>
        <View style={styles.locationTop}>
          <Text style={styles.locationTopName}>Blessing Lilly</Text>
          <Text style={styles.addressTop}>Your current location is</Text>
          <Text style={styles.address}>7320 Baltimore Avenue, Baltimore,</Text>
          {/* <Text style={styles.address}>MD 20740</Text> */}
        </View>
        <View style={styles.locationInput}>
          {/* <InputBar
            placeholder={'Enter new location to change'}
            inputWidth={width * 0.9}
          /> */}
          <GooglePlaceInput />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonName={'Proceed'}
            onPress={() => navigation.navigate('AppTab')}
            width={width * 0.7}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  mapMain: {
    height,
    width,
  },
  logo: {
    width: logoHeight,
    height: logoHeight,
    borderRadius: logoHeight / 2,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: cardHeight - logoHeight / 2,
  },
  locationCard: {
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#ffffff',
    width,
    height: cardHeight,
    top: height - cardHeight,
    marginBottom: 10,
  },
  locationTop: {
    alignItems: 'center',
    marginTop: 23,
  },
  locationTopName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#777777',
    marginTop: 30,
  },
  addressTop: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  address: {
    marginTop: 3,
    fontSize: 16,
    color: '#777777',
  },
  locationInput: {
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default LocationChange;
