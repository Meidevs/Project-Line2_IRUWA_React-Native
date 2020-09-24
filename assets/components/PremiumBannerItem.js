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

const PremiumBannerItem = ({ item, navigation }) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.ImageBtn}
                onPress={() => navigation.navigate('Detail', {
                    cmp_seq: item.cmp_seq,
                    items_seq: item.items_seq,
                })}>
                <ImageBackground source={{ uri: item.uri[0] }} imageStyle={{ borderRadius: 25, resizeMode: 'cover' }} style={styles.ImageSlider}>
                    <View style={styles.ImageArea}>
                        <View style={styles.PremiumIntro}>
                            <Text style={styles.IntroTxt}>프리미엄 광고</Text>
                        </View>
                        <View style={styles.PremiumTitle}>
                            <Text style={styles.TitleTxt}>{item.item_name}</Text>
                        </View>
                        <View style={styles.PremiumContent}>
                            <Text style={styles.ContentTxt}>
                                {
                                    JSON.parse(item.item_content).length > 18 ?
                                        JSON.parse(item.item_content).substring(0, 18) + '...' :
                                        JSON.parse(item.item_content)
                                }</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ImageBtn: {
        borderRadius: 15,
        padding: 10,
        width: width,
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageSlider: {
        width: width * 0.9,
        height: height * 0.23,
    },
    ImageArea: {
        flex: 1,
        borderRadius: 25,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(40, 40, 40, 0.6)'
    },
    PremiumIntro: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    IntroTxt : {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
    },
    PremiumTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleTxt: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    PremiumContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ContentTxt: {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default PremiumBannerItem;