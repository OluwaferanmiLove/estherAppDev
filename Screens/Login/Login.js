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
import {colors} from '../../Constants/Theme';
import InputBar from '../../Components/InputBar';
import Button from '../../Components/Button';
import SocialLogin from '../../Components/SocialLogin';

const {width, height} = Dimensions.get('window');

function Login({navigation}) {
  return (
    <KeyboardAvoidingView
      style={[styles.main, {backgroundColor: colors.bgColor}]}>
      <StatusBar
        translucent={true}
        backgroundColor={`${colors.bgColor}00`}
        barStyle={'dark-content'}
      />
      <View style={styles.loginTop}>
        <Text style={styles.loginTopText}>Login</Text>
        <Text style={styles.appName}>The Esther App</Text>
      </View>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
      </View>
      <View style={styles.inputBarContainer}>
        <InputBar placeholder={'Email Address'} />
        <InputBar
          placeholder={'Password'}
          secureTextEntry={true}
          marginTop={20}
          maxLength={15}
        />
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ForgotPassword')}>
          <View style={styles.formQus}>
            <Text style={styles.formQusText}>Forgot Password</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonName={'Login'}
          onPress={() => navigation.navigate('LocationChange')}
          width={width * 0.7}
        />
      </View>
      <View style={styles.socialLoginContainer}>
        <SocialLogin purpose={'Login'} />
      </View>
      <View style={styles.bottomDirectionContainer}>
        <View style={styles.bottomDirection}>
          <Text style={styles.directionText}>Don't Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
  },
  loginTop: {
    alignItems: 'center',
    marginTop: 23,
  },
  loginTopText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#777777',
  },
  appName: {
    marginTop: 50,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#777777',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 75,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 25,
  },
  inputBarContainer: {
    marginTop: 45,
  },
  formQus: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  formQusText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#777777',
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

export default Login;
