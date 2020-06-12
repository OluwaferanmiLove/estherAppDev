import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';

const {width, height} = Dimensions.get('window');

function PickerBar({
  onValueChange,
  marginTop,
  pickerWidth = width * 0.9,
  selectedValue,
  data = [{label: '', value: ''}],
  pickerColor = {borderColor: '', backgroundColor: ''},
  height = 53,
}) {
  return (
    <View
      style={[
        styles.pickerBar,
        pickerColor,
        {marginTop, height, width: pickerWidth, fontSize: 40},
      ]}>
      <Picker
        style={{width: pickerWidth}}
        onValueChange={onValueChange}
        itemStyle={{fontSize: 20}}
        selectedValue={selectedValue}>
        {data.map((item, index) => {
          return (
            <Picker.Item
              key={`${index}`}
              label={item.label}
              value={item.value}
            />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 18,
    width: width * 0.8,
    height: 53,
    borderWidth: 1.5,
    borderRadius: 5,
  },
});

export default React.memo(PickerBar);
