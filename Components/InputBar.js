import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

function InputBar({
  placeholder,
  maxLength,
  ref,
  secureTextEntry,
  marginTop,
  keyboardType,
  inputWidth = width * 0.8,
  onChangeText,
  barColor = {borderColor: '', backgroundColor: ''},
  value,
}) {
  return (
    <View style={[styles.inputBar, barColor, {marginTop, width: inputWidth}]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        maxLength={maxLength}
        ref={ref}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBar: {
    width: width * 0.8,
    height: 53,
    borderWidth: 1.5,
    borderColor: '#777777',
    borderRadius: 6,
  },
  input: {
    textAlign: 'left',
    fontSize: 18,
    paddingLeft: 15,
  },
});

export default InputBar;
