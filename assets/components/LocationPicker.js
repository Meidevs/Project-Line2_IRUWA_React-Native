import React, { Component, useState, useEffect } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import DATA_SOURCE from '../dataSource/dataModel';
const { width, height } = Dimensions.get('window');

const LocationPicker = ({ navigation, locations, callback }) => {
    const [position, setLocation] = useState(locations);

    const onChangeRefresh = async (data) => {
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].locationid == data) {
                locations[i].status = 1;
            } else {
                locations[i].status = 0;
            }
        }
        callback(locations)
        setLocation(data)
        await DATA_SOURCE.UpdateLocationStatus(locations);

    }
    return (
        <View>
            <Picker
                selectedValue={position}
                mode='dropdown'
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => onChangeRefresh(itemValue)
                }
            >
                {locations.map(data => (
                    <Picker.Item key={data.locationid} label={data.location} value={data.locationid} />
                ))}
            </Picker>
        </View >
    )
}

export default LocationPicker;