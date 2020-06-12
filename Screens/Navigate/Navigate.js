import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {colors} from '../../Constants/Theme';
import MapViewDirections from 'react-native-maps-directions';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';

const {width, height} = Dimensions.get('window');

function Navigate({navigation}) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const destinationCoords = useSelector((state) => state.destinationCoords);

  const map = React.useRef();

  return (
    <KeyboardAvoidingView
      behavior={height}
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
        {/* <Marker
          coordinate={{
            latitude: location ? location.latitude : 0,
            longitude: location ? location.longitude : 0,
          }}
        /> */}
        <MapViewDirections
          origin={{latitude: location.latitude, longitude: location.longitude}}
          destination={destinationCoords}
          apikey={'AIzaSyAaGepK96IlHQmOvBGs1J_whg1wDQRPitQ'}
        />
      </MapView>
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
});

export default Navigate;
