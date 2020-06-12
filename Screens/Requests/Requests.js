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
import TopNav from '../../Components/TopNav';
import {pastRequests, currentRequest} from '../../MockData/Mockdata';

const {width, height} = Dimensions.get('window');

function Requests({navigation}) {
  const [tab, setTab] = React.useState('currentRequest');

  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  const SearchList = ({item, address, distance, title, tag, postedOn}) => {
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
    let date = postedOn;
    return (
      <View style={{alignItems: 'center'}}>
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
                <Text style={styles.distanceText}>{distance}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch({type: 'CURRENTREQUEST', payload: item});
                  navigation.navigate('ViewRequest');
                }}>
                <View style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View Request</Text>
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

  return (
    <View style={[styles.main, {backgroundColor: colors.bgColor}]}>
      <TopBar title={'My Requests'} onPressRight={() => navigation.goBack()} />
      <View style={styles.topNavMain}>
        <TopNav
          data={[
            {
              title: 'Current Request',
              onPress: () => {
                setTab('currentRequest');
              },
              backgroundColor: tab === 'currentRequest' ? '#007aff' : '#ffffff',
            },
            {
              title: ' Past Requests',
              onPress: () => {
                setTab('pastRequests');
              },
              backgroundColor: tab === 'pastRequests' ? '#007aff' : '#ffffff',
            },
          ]}
        />
      </View>
      <View style={styles.content}>
        {tab === 'currentRequest' ? (
          <FlatList
            scrollEnabled={true}
            data={currentRequest}
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
                postedOn={item.postedOn}
              />
            )}
          />
        ) : (
          <FlatList
            scrollEnabled={true}
            data={pastRequests}
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
                postedOn={item.postedOn}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  topNavMain: {
    marginTop: 15,
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
  content: {
    marginTop: 15,
  },
});

export default Requests;
