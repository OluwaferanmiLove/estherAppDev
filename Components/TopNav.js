import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function TopNav({
  data = [{title: '', onPress: () => {}, backgroundColor: ''}],
}) {
  return (
    <View style={styles.topNav}>
      {data.map((item, index) => {
        let color = item.backgroundColor === '#007aff' ? '#ffffff' : '#007aff';
        return (
          <TouchableOpacity key={`child-${index}`} onPress={item.onPress}>
            <View
              style={[
                styles.topNavChild,
                {
                  width: (width * 0.9) / data.length,
                  backgroundColor: item.backgroundColor,
                },
              ]}>
              <Text style={[styles.topNavText, {color: color}]}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
    borderWidth: 1.5,
    borderColor: '#007aff',
    borderRadius: 6,
    height: 40,
    overflow: 'hidden',
  },
  topNavChild: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: (width * 0.9) / 2,
  },
  topNavText: {
    fontSize: 16,
  },
});

export default TopNav;
