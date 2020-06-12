import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';

function Button({buttonName, onPress, width}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.button, {width}]}>
        <Text style={styles.buttonText}>{buttonName}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderRadius: 30,
    backgroundColor: '#666666',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Button;
