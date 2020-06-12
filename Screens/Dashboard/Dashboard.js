import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function Dashboard({navigation}) {
  return (
    <View style={styles.main}>
      <Text>DashBoard</Text>
      <TouchableHighlight onPress={() => navigation.navigate('Requests')}>
        <Text>Go to Request</Text>
      </TouchableHighlight>
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

export default Dashboard;
