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
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import {colors} from '../../Constants/Theme';
import InputBar from '../../Components/InputBar';
import Button from '../../Components/Button';
import SocialLogin from '../../Components/SocialLogin';
import PickerBar from '../../Components/PickerBar';
import {profileData} from '../../MockData/Mockdata';
import TopBar from '../../Components/TopBar';

const {width, height} = Dimensions.get('window');

function EditProfile({navigation}) {
  const [numAdults, setNumAdults] = React.useState(null);
  const [numChildren, setNumChildren] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.3,
    })
      .then((image) => {
        setImage(image);
      })
      .catch((e) => {
        console.warn(e.message);
        Alert(e.message);
        ToastAndroid.show(e.message, 5000);
      });
  };

  return (
    <View style={[styles.main, {backgroundColor: colors.bgColor}]}>
      <StatusBar
        translucent={true}
        backgroundColor={colors.bgColor}
        barStyle={'dark-content'}
      />
      <TopBar
        title={'My Profile'}
        leftText={'md-arrow-back'}
        iconSize={30}
        rightText={'Cancel'}
        onPressLeftIcon={() => navigation.goBack()}
        onPressRight={() => navigation.goBack()}
      />
      <View style={styles.inputBarContainer}>
        <View style={styles.topInputContainer}>
          <View style={styles.addPictureContainer}>
            <View style={styles.addPicture}>
              {image === null ? null : (
                <Image
                  style={{height: 180, width: 180}}
                  source={{uri: `data:${image.mime};base64,${image.data}`}}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.addPictureButton}
              onPress={handleImage}>
              <Icon name={'ios-add'} size={35} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
          <View style={styles.nameInputs}>
            <InputBar
              value={profileData.firstName}
              placeholder={'First Name'}
              inputWidth={200}
            />
            <InputBar
              value={profileData.lastName}
              placeholder={'Last Name'}
              inputWidth={200}
              marginTop={20}
            />
          </View>
        </View>
        <View style={styles.inputsLower}>
          <InputBar
            value={profileData.email}
            placeholder={'Email Address'}
            keyboardType={'email-address'}
          />
          <InputBar
            value={`${profileData.mobile}`}
            placeholder={'Mobile Number'}
            marginTop={20}
            keyboardType={'numeric'}
          />
          <InputBar
            value={profileData.address}
            placeholder={'Address'}
            marginTop={20}
            keyboardType={'numeric'}
          />
          <PickerBar
            data={[
              {label: 'No of Adults', value: null},
              {label: '1 Adult', value: 1},
              {label: '2 Adults', value: 2},
            ]}
            selectedValue={numAdults}
            onValueChange={(value, itemIndex) => {
              setNumAdults(value);
            }}
            pickerWidth={width * 0.8}
            pickerColor={{backgroundColor: '#ffffff', borderColor: '#000000'}}
            marginTop={20}
          />
          <PickerBar
            data={[
              {label: 'No of Children', value: null},
              {label: '1 Child', value: 1},
              {label: '2 Children', value: 2},
              {label: '3 Children', value: 3},
              {label: '4 Children', value: 4},
              {label: '5 Children', value: 5},
            ]}
            selectedValue={numChildren}
            onValueChange={(value, itemIndex) => {
              setNumChildren(value);
            }}
            pickerWidth={width * 0.8}
            pickerColor={{backgroundColor: '#ffffff', borderColor: '#000000'}}
            marginTop={20}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonName={'Update'}
          onPress={() => navigation.goBack()}
          width={width * 0.7}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  loginTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    marginTop: 23,
  },
  loginTopText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#777777',
  },
  loginTopCancel: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 80,
  },
  loginCancelText: {
    fontSize: 15,
  },
  appName: {
    marginTop: 50,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#777777',
  },
  inputBarContainer: {
    marginTop: 30,
  },
  topInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addPictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPicture: {
    width: 130,
    height: 130,
    borderRadius: 75,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  addPictureButton: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
    top: 80,
    left: 80,
  },
  nameInputs: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsLower: {
    marginTop: 35,
  },
  buttonContainer: {
    marginTop: 40,
  },
});

export default EditProfile;
