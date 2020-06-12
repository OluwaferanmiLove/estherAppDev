import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../Constants/Theme';

const {width, height} = Dimensions.get('window');

function ResultCard({backgroundColor, onPress, numbers, title}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.socialLoginIcon, {backgroundColor}]}>
        <Text style={styles.resultsNumbers}>{numbers}</Text>
        <Text style={styles.results}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  socialLoginIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.085,
    width: width / 3.7,
    borderRadius: 13,
  },
  resultsNumbers: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  results: {
    fontSize: 14,
    color: '#ffffff',
    textTransform: 'uppercase',
  },
});

export default React.memo(ResultCard);
