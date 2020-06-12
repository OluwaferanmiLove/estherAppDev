import React from 'react';
import {Text, View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

function TopBar({
  leftText,
  onPressLeftIcon,
  rightText,
  onPressRight,
  iconSize,
  iconColor,
  title,
}) {
  return (
    <View style={styles.topBarMain}>
      <View style={styles.main}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={onPressLeftIcon}>
            <Icon name={leftText} size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.setupNav}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={onPressRight}>
            <Text style={styles.iconText}>{rightText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBarMain: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width,
    height: 50 + StatusBar.currentHeight,
    elevation: 5,
  },
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    width: width * 0.95,
  },
  setupNav: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  icon: {
    width: 50,
  },
  iconText: {
    fontSize: 15,
  },
});

export default TopBar;
