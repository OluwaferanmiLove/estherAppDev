import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {colors, searchColors} from '../../Constants/Theme';
import {MapStyle} from '../../Constants/MapStyle';
import ResultCard from '../../Components/ResultCard';
import {search} from '../../MockData/Mockdata';
import PickerBar from '../../Components/PickerBar';
import {requestResponse} from '../../Constants/TextConstant';

const {width, height} = Dimensions.get('window');
const modalHeight = height * 0.73;
const selectedModalHeight = height * 0.6;
const imageHeight = modalHeight * 0.4;
const requestedModalHeight = height * 0.5;

function Search({navigation}) {
  const [numAdults, setNumAdults] = React.useState(null);
  const [numChildren, setNumChildren] = React.useState(null);
  const [requested, setRequested] = React.useState(false);
  const [listView, setListView] = React.useState(false);
  const [resultModal, setResultModal] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [numSearch, setNumSearch] = React.useState(null);
  const map = React.useRef();

  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const selectedResult = useSelector((state) => state.selectedResult);

  navigator.geolocation = require('react-native-geolocation-service');

  const GooglePlaceInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder={'Search'}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        styles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            width,
          },
          textInputContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000000',
            margin: 0,
            marginTop: 0,
            marginBottom: 0,
            width: width * 0.9,
            height: 55,
          },
          textInput: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            height: 50,
            borderWidth: 1.5,
            color: '#5d5d5d',
            fontSize: 16,
          },
          listView: {
            height: height * 0.5,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          poweredContainer: {
            height: 30,
            marginTop: 20,
          },
        }}
        query={{
          key: 'AIzaSyAaGepK96IlHQmOvBGs1J_whg1wDQRPitQ',
          language: 'en',
        }}
        currentLocation={true}
        currentLocationLabel={'Your Current location'}
      />
    );
  };

  const SearchList = ({item, address, distance, title, tag}) => {
    let color;
    switch (tag) {
      case 'food':
        color = '#bc5f5f';
        break;
      case 'shelter':
        color = '#c78c3f';
        break;
      case 'clothing':
        color = '#346ebd';
        break;
      default:
        break;
    }
    return (
      <View style={{alignItems: 'center',}}>
        <View style={styles.searchListMain}>
          <View style={styles.searchListImageMain}>
            <Image
              style={styles.searchListImage}
              source={require('../../Asset/imageFood.png')}
            />
          </View>
          <View style={styles.searchListIinfoMain}>
            <View style={styles.searchListInfo}>
              <Text style={[styles.searchListInfoTitle, {color}]}>{title}</Text>
              <Text style={[styles.searchListInfoStore, {color}]}>
                Store Name
              </Text>
              <Text style={styles.searchListInfoAdd}>{address}</Text>
            </View>
            <View style={styles.distanceAndAction}>
              <View style={styles.distance}>
                <Icon name={'ios-pin'} size={30} color={color} />
                <Text style={styles.distanceText}>
                  {'  '}
                  {distance} kms.
                </Text>
              </View>
              <TouchableOpacity onPress={() => toggleResultModal(item)}>
                <View style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View Item</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.seperator} />
        </View>
      </View>
    );
  };

  const Seperator = () => {
    return (
      <View
        style={{width, marginTop: 15, marginBottom: 15, borderTopWidth: 1}}
      />
    );
  };

  const toggleResultModal = (item) => {
    if (resultModal === false) {
      dispatch({type: 'SELECTEDRESULT', payload: item});
      setResultModal(true);
    } else {
      setResultModal(false);
      setSelected(false);
    }
  };

  const selectItem = () => {
    setResultModal(false);
    setSelected(true);
  };

  const requestItem = () => {
    setResultModal(false);
    setSelected(true);
  };

  const SearchResultModal = () => {
    return (
      <Modal
        isVisible={resultModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <View style={styles.searchResultModal}>
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => toggleResultModal()}>
            <Icon name={'ios-close'} size={50} color={'#666666'} />
          </TouchableOpacity>
          <View style={styles.searchResultImageMain}>
            <Image
              style={styles.searchResultImage}
              source={require('../../Asset/imageFood.png')}
            />
          </View>
          <View style={styles.TextAndAction}>
            <View>
              <Text style={styles.modalTitle}>{selectedResult.title}</Text>
            </View>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedInfoStore}>Store Name</Text>
              <View style={styles.selectedInfoAction}>
                <View style={styles.selectedInfoTexts}>
                  <Text style={styles.selectedInfoAdd}>
                    {selectedResult.address}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.selectedAction}
                  onPress={selectItem}>
                  <Text>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.storeFrontImageMain}>
              <Image
                style={styles.storeFrontImage}
                source={require('../../Asset/imageStore.png')}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>
                You can only request one item per day.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const SelectedModal = React.memo(() => {
    return (
      <Modal
        isVisible={selected}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <View style={[styles.searchResultModal, {height: selectedModalHeight}]}>
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setSelected(false)}>
            <Icon name={'ios-close'} size={50} color={'#666666'} />
          </TouchableOpacity>
          <View style={styles.searchResultImageMain}>
            <Image
              style={styles.searchResultImage}
              source={require('../../Asset/imageFood.png')}
            />
          </View>
          <View style={styles.TextAndAction}>
            <View>
              <Text style={styles.modalTitle}>{selectedResult.title}</Text>
            </View>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedInfoStore}>Store Name</Text>
              <View style={styles.selectedInfoTexts}>
                <Text style={styles.selectedInfoAdd}>
                  {selectedResult.address}
                </Text>
              </View>
            </View>
            <View style={styles.requestMain}>
              <Text style={styles.requestTitle}>Request for</Text>
              <View style={styles.requestSelection}>
                <View style={styles.requestSelChild}>
                  <Text style={styles.requestSelTitle}>Adults</Text>
                  <PickerBar
                    data={[
                      {label: '1', value: 1},
                      {label: '2', value: 2},
                    ]}
                    selectedValue={numAdults}
                    onValueChange={(value, itemIndex) => {
                      setNumAdults(value);
                    }}
                    pickerWidth={width * 0.9 * 0.2}
                    pickerColor={{
                      backgroundColor: '#ffffff',
                      borderColor: '#000000',
                    }}
                    marginTop={10}
                    height={40}
                  />
                </View>
                <View style={styles.requestSelChild}>
                  <Text style={styles.requestSelTitle}>Children</Text>
                  <PickerBar
                    data={[
                      {label: '1', value: 1},
                      {label: '2', value: 2},
                    ]}
                    selectedValue={numChildren}
                    onValueChange={(value, itemIndex) => {
                      setNumChildren(value);
                    }}
                    pickerWidth={width * 0.9 * 0.2}
                    pickerColor={{
                      backgroundColor: '#ffffff',
                      borderColor: '#000000',
                    }}
                    marginTop={10}
                    height={40}
                  />
                </View>
                <TouchableOpacity
                  style={styles.selectedAction}
                  onPress={() => {
                    setSelected(false);
                    setRequested(true);
                  }}>
                  <Text>Request</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  });

  const RequestModal = React.memo(() => {
    return (
      <Modal
        isVisible={requested}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <View
          style={[
            styles.searchResultModal,
            {height: requestedModalHeight, justifyContent: 'center'},
          ]}>
          <View style={styles.requestTextAndAction}>
            <Text style={[styles.modalTitle, {fontSize: 26}]}>
              You Just Selected
            </Text>
            <Text style={[styles.modalTitle, {marginTop: 20}]}>
              {selectedResult.title}
            </Text>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedInfoStore}>Store Name</Text>
              <View style={styles.selectedInfoTexts}>
                <Text style={styles.selectedInfoAdd}>
                  {selectedResult.address}
                </Text>
              </View>
            </View>
            <View style={styles.requestMain}>
              <Text style={styles.requestRes}>{requestResponse}</Text>
              <TouchableOpacity
                style={styles.requestedAction}
                onPress={() => setRequested(false)}>
                <Text>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  });

  const MapCallout = ({item}) => {
    let color;
    switch (item.tag) {
      case 'food':
        color = '#bc5f5f';
        break;
      case 'shelter':
        color = '#c78c3f';
        break;
      case 'clothing':
        color = '#346ebd';
        break;
      default:
        break;
    }
    return (
      <View style={[styles.calloutMain, {backgroundColor: '#ffffff'}]}>
        <Text style={[styles.calloutTitle, {color}]}>{item.title}</Text>
        <Text style={[styles.calloutStore, {color}]}>Store Name</Text>
        <Text style={styles.calloutInfoAdd}>{item.address}</Text>
        <View style={styles.distance}>
          <Icon name={'ios-pin'} size={30} color={color} />
          <Text style={styles.distanceText}>
            {'  '}
            {item.distance} kms.
          </Text>
        </View>
      </View>
    );
  };

  React.useEffect(() => {
    let numFood = 0;
    let numShelter = 0;
    let numClothing = 0;

    for (let i = 0; i <= search.length - 1; i++) {
      if (search[i].tag === 'food') {
        numFood += 1;
      } else if (search[i].tag === 'shelter') {
        numShelter += 1;
      } else if (search[i].tag === 'clothing') {
        numClothing += 1;
      }
    }

    setNumSearch({numFood, numShelter, numClothing});
  }, []);

  return (
    <View style={[styles.main, {backgroundColor: colors.bgColor}]}>
      {listView === false ? (
        <MapView
          ref={map}
          style={styles.mapMain}
          // customMapStyle={MapStyle}
          showsTraffic={true}
          showsPointsOfInterest={true}
          showsUserLocation={true}
          showsBuildings={true}
          showsIndoors={true}
          provider={PROVIDER_GOOGLE}
          initialRegion={location}>
          {search.map((item, index) => {
            let color;
            switch (item.tag) {
              case 'food':
                color = '#bc5f5f';
                break;
              case 'shelter':
                color = '#c78c3f';
                break;
              case 'clothing':
                color = '#346ebd';
                break;
              default:
                break;
            }
            return (
              <Marker
                key={`marker${index}`}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}>
                <Icon name={'ios-pin'} size={40} color={color} />
                <Callout tooltip={true}>
                  <MapCallout item={item} />
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      ) : (
        <View style={styles.list}>
          <SearchResultModal />
          <SelectedModal />
          <RequestModal />
          <FlatList
            scrollEnabled={true}
            data={search}
            style={{width}}
            ItemSeparatorComponent={Seperator}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <SearchList
                item={item}
                title={item.title}
                address={item.address}
                distance={item.distance}
                tag={item.tag}
              />
            )}
          />
        </View>
      )}
      <View style={styles.search}>
        <View style={styles.searchBox}>
          <Text style={styles.location}>7320 Baltimore Avenue, Baltimore</Text>
        </View>
      </View>
      <View style={styles.searchCard}>
        <ResultCard
          numbers={numSearch ? numSearch.numFood : 0}
          title={'food'}
          backgroundColor={'#bc5f5f'}
        />
        <ResultCard
          numbers={numSearch ? numSearch.numClothing : 0}
          title={'Clothing'}
          backgroundColor={'#346ebd'}
        />
        <ResultCard
          numbers={numSearch ? numSearch.numShelter : 0}
          title={'Shelter'}
          backgroundColor={'#c78c3f'}
        />
      </View>
      <View style={styles.searchControl}>
        <View style={styles.mileControl}>
          <Text style={styles.mileControlText}>Within 3 miles</Text>
          <TouchableOpacity>
            <Icon name={'ios-settings'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.listToggle}>
          <TouchableOpacity onPress={() => setListView(!listView)}>
            <Icon
              name={listView ? 'md-map' : 'ios-list'}
              size={30}
              color={'#ffffff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  mapMain: {
    ...StyleSheet.absoluteFill,
  },
  list: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    marginTop: height * 0.25,
  },
  searchListMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
  },
  searchListImageMain: {
    width: '32%',
  },
  searchListImage: {
    width: width * 0.25,
    height: width * 0.28,
    resizeMode: 'cover',
  },
  searchListIinfoMain: {
    width: '68%',
  },
  searchListInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  searchListInfoStore: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchListInfoAdd: {
    fontSize: 14,
    width: '70%',
  },
  searchResultModal: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: modalHeight,
    width: width * 0.9,
  },
  modalCloseBtn: {
    position: 'absolute',
    zIndex: 2000,
    left: '90%',
  },
  searchResultImageMain: {
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    height: modalHeight * 0.4,
  },
  searchResultImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  TextAndAction: {
    marginTop: imageHeight + 15,
    width: '90%',
  },
  requestTextAndAction: {
    alignItems: 'center',
    marginTop: 15,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  selectedInfo: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  selectedInfoStore: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectedInfoAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedInfoTexts: {
    width: '70%',
  },
  selectedInfoAdd: {
    fontSize: 16,
  },
  selectedAction: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  requestedAction: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: 40,
    width: 70,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  storeFrontImageMain: {
    height: '53%',
    marginTop: 15,
    backgroundColor: 'black',
  },
  storeFrontImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    alignItems: 'center',
    marginTop: 15,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  requestMain: {
    marginTop: 30,
  },
  requestRes: {
    fontSize: 16,
    textAlign: 'center',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestSelection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  requestSelChild: {
    marginTop: 15,
  },
  requestSelTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  calloutMain: {
    width: width * 0.5,
    elevation: 10,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  calloutStore: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  calloutInfoAdd: {
    fontSize: 14,
    width: '80%',
    marginTop: 5,
    marginBottom: 5,
  },
  distanceAndAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444444',
    width: 110,
    height: 30,
    borderRadius: 5,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  search: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffffff',
    width,
    height: 105,
    elevation: 5,
    zIndex: 20000,
  },
  searchBox: {
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    height: 50,
    width: width * 0.8,
  },
  searchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
    marginTop: 10,
  },
  location: {
    paddingLeft: 10,
    fontSize: 18,
  },
  searchControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    top: height * 0.63,
  },
  mileControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 200,
    width: '50%',
    height: 45,
    elevation: 8,
  },
  mileControlText: {
    fontSize: 16,
  },
  listToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: 45,
    borderRadius: 200,
    backgroundColor: '#666666',
  },
});

export default Search;
