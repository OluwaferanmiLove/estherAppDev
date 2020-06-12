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

const {width, height} = Dimensions.get('window');

function Signup({navigation}) {
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
      <View style={styles.loginTop}>
        <View style={styles.loginTopCancel} />
        <View style={styles.loginTopText}>
          <Text style={styles.loginTopText}>Signup</Text>
        </View>
        <View style={styles.loginTopCancel}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={'position'}
        style={styles.inputBarContainer}>
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
            <InputBar placeholder={'First Name'} inputWidth={200} />
            <InputBar
              placeholder={'Last Name'}
              inputWidth={200}
              marginTop={20}
            />
          </View>
        </View>
        <View style={styles.inputsLower}>
          <InputBar
            placeholder={'Email Address'}
            keyboardType={'email-address'}
          />
          <InputBar
            placeholder={'Mobile Number'}
            marginTop={20}
            keyboardType={'numeric'}
          />
          <InputBar
            placeholder={'Preferred Password'}
            secureTextEntry={true}
            marginTop={20}
            maxLength={15}
          />
          <InputBar
            placeholder={'Comfirm Password'}
            secureTextEntry={true}
            marginTop={20}
            maxLength={15}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <Button
          buttonName={'Signup'}
          onPress={() => navigation.navigate('AdditionalInfo')}
          width={width * 0.7}
        />
      </View>
      <View style={styles.socialLoginContainer}>
        <SocialLogin purpose={'Signup'} />
      </View>
      <View style={styles.bottomDirectionContainer}>
        <View style={styles.bottomDirection}>
          <Text style={styles.directionText}>Already Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
  logoText: {
    fontSize: 25,
  },
  nameInputs: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsLower: {
    marginTop: 35,
  },
  buttonContainer: {
    marginTop: 20,
  },
  socialLoginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  bottomDirectionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width,
  },
  bottomDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    backgroundColor: '#ffffff',
    borderTopColor: '#cccccc',
    borderTopWidth: 1.5,
  },
  directionText: {
    fontSize: 15,
    color: '#aaaaaa',
  },
  signupText: {
    fontSize: 17,
    color: '#777777',
  },
});

export default Signup;
