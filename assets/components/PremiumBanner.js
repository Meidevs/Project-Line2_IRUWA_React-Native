import React, { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import DATA_SOURCE from '../dataSource/dataModel';
const PremiumBanner = ({ navigation }) => {
    
    useEffect(() => {
        const PREMIUM_ITEMS = async () => {
            await DATA_SOURCE.GET_PREMIUM_ITEMS();
        }
    }, []);

    return (
        <View style={styles.CardView}>
            <Text>hi</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    CardView : {
        margin : 15,
        padding : 10,
    }
})

export default PremiumBanner;
