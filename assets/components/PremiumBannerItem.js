import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PremiumBannerItem = ({ item, index, navigation }) => {
    return (
        <View style={styles.ImageView}>
            <TouchableOpacity style={styles.ImageBox}>
                <ImageBackground source={{ uri: item.uri[0] }} style={styles.ImageSlider}>
                    <Text>{item.item_name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ImageView: {
        width: width,
        height: height * 0.26,
    },
    ImageBox: {
        margin: 15,
        borderRadius: 15,
        width: width * 0.9,
        height: height * 0.23,
        backgroundColor : 'rgba(0, 0, 0, 0.8)',
    },
    ImageSlider: {
        width: width * 0.9,
        height: height * 0.20,
        alignSelf: 'center',
    }
})

export default PremiumBannerItem;