import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../Constants/Theme';

const {width, height} = Dimensions.get('window');

function SocialIcon({backgroundColor, name, size, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.socialLoginIcon, {backgroundColor}]}>
        <Icon name={`logo-${name}`} size={size} color={'#ffffff'} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  socialLoginIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 5,
    marginHorizontal: 15,
  },
});

export default SocialIcon;
