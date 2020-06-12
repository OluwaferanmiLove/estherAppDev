import React from 'react';
import {View, Dimensions, StyleSheet, StatusBar, Text} from 'react-native';
import Button from '../../Components/Button';
import TopBar from '../../Components/TopBar';
import {colors} from '../../Constants/Theme';
import InputBar from '../../Components/InputBar';

const {width, height} = Dimensions.get('window');

function ForgotPassword({navigation}) {
  return (
    <View style={[styles.main, {backgroundColor: colors.bgColor}]}>
      <TopBar
        title={'Change Password'}
        rightText={'Cancel'}
        onPressRight={() => navigation.goBack()}
      />
      <View style={styles.inputBarContainer}>
        <InputBar
          placeholder={'Enter old password'}
          secureTextEntry={true}
          marginTop={20}
          maxLength={15}
        />
        <InputBar
          placeholder={'Enter new password'}
          secureTextEntry={true}
          marginTop={20}
          maxLength={15}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button buttonName={'Update'} width={width * 0.7} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  inputBarContainer: {
    marginTop: 45,
  },
  formQusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 50,
  },
});

export default ForgotPassword;
