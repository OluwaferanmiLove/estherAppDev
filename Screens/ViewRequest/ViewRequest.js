import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import TopBar from '../../Components/TopBar';
import {requestResponse} from '../../Constants/TextConstant';

const {width, height} = Dimensions.get('window');
const modalHeight = height * 0.73;

function ViewRequest({navigation}) {
  const [extended, setExtended] = React.useState(false);

  const dispatch = useDispatch();
  const currentRequest = useSelector((state) => state.currentRequest);
  const location = useSelector((state) => state.location);
  const selectedResult = useSelector((state) => state.selectedResult);
  console.warn(location);

  const ExtendModal = React.memo(() => {
    return (
      <Modal
        isVisible={extended}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <View style={styles.extendedModal}>
          <View style={styles.textAndAction}>
            <Text style={[styles.modalTitle, {fontSize: 26}]}>
              Your request was
            </Text>
            <Text style={[styles.modalTitle, {fontSize: 26}]}>
              extended for 1 hr
            </Text>
            <Text style={styles.holdTitle}>On hold for</Text>
            <Text style={styles.holdTime}>2hr. 55min. 45 secs.</Text>
            <Text style={styles.extendRes}>{requestResponse}</Text>
            <TouchableOpacity
              style={styles.extendAction}
              onPress={() => setExtended(false)}>
              <Text>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  });

  const handleMapNavigation = () => {
    dispatch({
      type: 'NAVIGATE',
      payload: {
        latitude: currentRequest.latitude,
        longitude: currentRequest.longitude,
      },
    });
    navigation.navigate('Navigate');
  };

  return (
    <View style={styles.main}>
      <ExtendModal />
      <TopBar
        leftText={'md-arrow-back'}
        onPressLeftIcon={() => navigation.goBack()}
        iconSize={30}
        title={currentRequest.title}
      />
      <View style={styles.searchResultImageMain}>
        <Image
          style={styles.searchResultImage}
          source={require('../../Asset/imageFood.png')}
        />
      </View>
      <View style={styles.TextAndAction}>
        <View style={styles.selectedInfo}>
          <Text style={styles.infoStore}>Store Name</Text>
          <View style={styles.infoAction}>
            <View style={styles.infoTexts}>
              <Text style={styles.infoAdd}>{currentRequest.address}</Text>
            </View>
            <TouchableOpacity
              style={styles.action}
              onPress={handleMapNavigation}>
              <Text>Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.storeFrontImageMain}>
          <Image
            style={styles.storeFrontImage}
            source={require('../../Asset/imageStore.png')}
          />
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timeInfoText}>On hold for</Text>
          <Text style={styles.timeText}>1hr. 55min. 45 secs.</Text>
          <View style={styles.timeAction}>
            <TouchableOpacity
              style={styles.timeActionBtnExt}
              onPress={() => setExtended(!extended)}>
              <Text style={styles.timeTextBtnExt}>Extend Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeActionBtnCan}>
              <Text style={styles.timeTextBtnCan}>Cancel Request</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>
            Note: you are allowed to extend request time twice by 1 hour each
            time.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  extendedModal: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.45,
    backgroundColor: '#ffffff',
    width: width * 0.9,
  },
  textAndAction: {
    alignItems: 'center',
  },
  searchResultImageMain: {
    overflow: 'hidden',
    width: '100%',
    height: height * 0.33,
  },
  searchResultImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  TextAndAction: {
    marginTop: 15,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  holdTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  holdTime: {
    fontSize: 28,
  },
  extendRes: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  extendAction: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: 40,
    width: 70,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  selectedInfo: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  infoStore: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTexts: {
    width: '70%',
  },
  infoAdd: {
    fontSize: 18,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  storeFrontImageMain: {
    height: height * 0.2,
    marginTop: 15,
    backgroundColor: 'black',
  },
  storeFrontImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  timeInfo: {
    marginTop: 15,
  },
  timeInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 25,
  },
  timeAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  timeActionBtnExt: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    height: 45,
    width: width * 0.9 * 0.48,
    borderWidth: 1.5,
    borderRadius: 5,
    elevation: 3,
  },
  timeTextBtnExt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeActionBtnCan: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444444',
    height: 45,
    width: width * 0.9 * 0.48,
    borderRadius: 5,
    elevation: 3,
  },
  timeTextBtnCan: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  info: {
    marginTop: 15,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ViewRequest;
