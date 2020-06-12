import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {colors} from '../../Constants/Theme';
import InputBar from '../../Components/InputBar';
import Button from '../../Components/Button';
import PickerBar from '../../Components/PickerBar';

const {width, height} = Dimensions.get('window');

function AdditionalInfo({navigation}) {
  const [numAdults, setNumAdults] = React.useState(null);
  const [numChildren, setNumChildren] = React.useState(null);
  const [foodAllergies, setFoodAllergies] = React.useState([null]);
  const [clothSizes, setClothSizes] = React.useState([null]);
  const [clothingKey, setClothingKey] = React.useState(1);
  const [allergiesKey, setAllergiesKey] = React.useState(1);

  const handleAddmore = (stateName, field) => {
    if (field[field.length - 1] === null) {
      ToastAndroid.show('fill the empty field first', 3000);
    } else {
      let newState = field.concat([null]);
      stateName(newState);
    }
  };

  const colorNull = {backgroundColor: '#ff000020', borderColor: '#ff0000'};
  const colorNotNull = {backgroundColor: '#ffffff', borderColor: '#000000'};

  return (
    <KeyboardAvoidingView
      style={[styles.main, {backgroundColor: colors.bgColor}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent={true}
          backgroundColor={colors.bgColor}
          barStyle={'dark-content'}
        />
        <View style={styles.loginTop}>
          <Text style={styles.loginTopText}>You need to update the</Text>
          <Text style={styles.loginTopText}>following info to continue</Text>
        </View>
        <View style={styles.inputBarContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Family Members</Text>
            <View style={styles.sectionContent}>
              <PickerBar
                data={[
                  {label: 'No of Adults', value: null},
                  {label: '1 Adult', value: 1},
                  {label: '2 Adults', value: 2},
                ]}
                selectedValue={numAdults}
                onValueChange={(value, itemIndex) => {
                  setNumAdults(value);
                }}
                pickerWidth={(width * 0.88) / 2}
                pickerColor={numAdults ? colorNotNull : colorNull}
              />
              <PickerBar
                data={[
                  {label: 'No of Children', value: null},
                  {label: '1 Child', value: 1},
                  {label: '2 Children', value: 2},
                  {label: '3 Children', value: 3},
                  {label: '4 Children', value: 4},
                  {label: '5 Children', value: 5},
                ]}
                selectedValue={numChildren}
                onValueChange={(value, itemIndex) => {
                  setNumChildren(value);
                }}
                pickerWidth={(width * 0.88) / 2}
                pickerColor={numChildren ? colorNotNull : colorNull}
              />
            </View>
          </View>
          <View key={`clothing${allergiesKey}`} style={styles.section}>
            <Text style={styles.sectionTitle}>Food Allergies</Text>
            <View style={[styles.sectionContent, {flexDirection: 'column'}]}>
              {foodAllergies.map((item, index) => {
                return (
                  <InputBar
                    key={`input-${index}`}
                    inputWidth={width * 0.9}
                    placeholder={'Enter food item'}
                    marginTop={10}
                    onChangeText={(text) => {
                      let newAlergies = foodAllergies;
                      newAlergies[index] = text;
                      setFoodAllergies(newAlergies);
                      console.log(foodAllergies);
                    }}
                    barColor={foodAllergies[index] ? colorNotNull : colorNull}
                    value={foodAllergies[index]}
                  />
                );
              })}
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={() => handleAddmore(setFoodAllergies, foodAllergies)}>
                <Text style={styles.addMoreButtonText}>ADD MORE</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View key={clothingKey} style={styles.section}>
            <Text style={styles.sectionTitle}>Clothing Sizes</Text>
            <View style={[styles.sectionContent, {flexDirection: 'column'}]}>
              {clothSizes.map((item, index) => {
                return (
                  <PickerBar
                    data={[
                      {label: 'Select Size', value: null},
                      {label: 's', value: 's'},
                      {label: 'm', value: 'm'},
                      {label: 'l', value: 'l'},
                      {label: 'xl', value: 'xl'},
                      {label: 'xxl', value: 'xxl'},
                    ]}
                    selectedValue={item}
                    key={`${index}`}
                    pickerWidth={width * 0.9}
                    marginTop={10}
                    onValueChange={(value, itemIndex) => {
                      let newClothSize = clothSizes;
                      newClothSize[index] = value;
                      setClothSizes(newClothSize);
                      console.log(clothSizes);
                      setClothingKey(clothingKey + 1);
                    }}
                    pickerColor={clothSizes[index] ? colorNotNull : colorNull}
                  />
                );
              })}
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={() => handleAddmore(setClothSizes, clothSizes)}>
                <Text style={styles.addMoreButtonText}>ADD MORE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonName={'Update'}
            onPress={() => navigation.navigate('Login')}
            width={width * 0.7}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
  },
  loginTop: {
    alignItems: 'center',
    marginTop: 23,
  },
  loginTopText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#777777',
  },
  logoText: {
    fontSize: 20,
  },
  inputBarContainer: {
    marginTop: 20,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    marginTop: 15,
  },
  addMoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 45,
    borderWidth: 1.5,
    borderRadius: 5,
    marginTop: 20,
  },
  addMoreButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formQus: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  formQusText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#777777',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default AdditionalInfo;
