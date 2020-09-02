import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import FullScreenSlider from './FullScreenSlider'

const { width, height } = Dimensions.get('window');

const PremiumBannerItem = ({ item, navigation }) => {
    console.log('items!', item)
    return (
        <View>
            <TouchableOpacity>
                <Image source={{ uri: item.uri }} style={styles.ImageView} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ImageView: {
        width: width,
        height: 350,
        resizeMode: 'cover'
    },
})

export default PremiumBannerItem;