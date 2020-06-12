import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TopBar from '../../Components/TopBar';
import {colors} from '../../Constants/Theme';
import {pastRequests, profileData} from '../../MockData/Mockdata';
import Button from '../../Components/Button';

const {width, height} = Dimensions.get('window');

function Profile({navigation}) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  return (
    <View style={[styles.main, {backgroundColor: colors.bgColor}]}>
      <TopBar
        title={'My Profile'}
        rightText={'Logout'}
        onPressRight={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.profileImage} />
        <Text style={styles.profileName}>
          {profileData.firstName} {profileData.lastName}
        </Text>
        <View style={styles.profileInfo}>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.infoAdd}>{profileData.email}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Mobile</Text>
            <Text style={styles.infoAdd}>{profileData.mobile}</Text>
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.infoTitle}>Address</Text>
            <Text style={styles.infoAdd}>{profileData.address}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Family</Text>
            <Text style={styles.infoAdd}>{profileData.family}</Text>
          </View>
          <View style={styles.lastInfo}>
            <Text style={styles.infoTitle}>Request Sent</Text>
            <Text style={styles.infoAdd}>{profileData.requestSent}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonName={'Edit Profile'}
          onPress={() => navigation.navigate('EditProfile')}
          width={width * 0.7}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    marginTop: 15,
    alignItems: 'center',
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    backgroundColor: '#b2b2b2',
  },
  profileName: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  profileInfo: {
    width: width * 0.9,
    borderWidth: 1.5,
    marginTop: 50,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderBottomWidth: 1.5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoAdd: {
    fontSize: 18,
    marginLeft: 10,
  },
  addressInfo: {
    justifyContent: 'center',
    width: '100%',
    height: 80,
    borderBottomWidth: 1.5,
  },
  lastInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  buttonContainer: {
    marginTop: 50,
  },
});

export default Profile;
