import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import SocialIcon from './SocialIcon';
import {colors} from '../Constants/Theme';

const {width, height} = Dimensions.get('window');

function SocialLogin({purpose}) {
  return (
    <>
      <View style={styles.socialLoginTop}>
        <Text style={styles.socialLoginTopOr}>OR</Text>
        <Text style={styles.socialLoginTopSub}>{purpose} With</Text>
      </View>
      <View style={styles.socialIconContainer}>
        <View style={styles.socialIcon}>
          <SocialIcon name={'google'} size={20} backgroundColor={'#de5246'} />
          <SocialIcon name={'twitter'} size={20} backgroundColor={'#0084b4'} />
          <SocialIcon name={'facebook'} size={20} backgroundColor={'#3b5998'} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  socialLoginTop: {
    alignItems: 'center',
  },
  socialLoginTopOr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#777777',
  },
  socialLoginTopSub: {
    fontSize: 14,
    color: '#777777',
  },
  socialIconContainer: {
    marginTop: 25,
  },
  socialIcon: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});

export default SocialLogin;
