import React, { useState, useEffect, useRef } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PremiumBannerItem from './PremiumBannerItem';
import DATA_SOURCE from '../dataSource/dataModel';

const { width, height } = Dimensions.get('window');

const PremiumBanner = ({ data, navigation }) => {
    const [items, setPremiumItems] = useState();
    const componentFlat = useRef(null)
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);

    useEffect(() => {
        let isCancelled = true;
        const PREMIUM_ITEMS = async () => {
            var PREMIUM_LIST = await DATA_SOURCE.GET_PREMIUM_ITEMS(data);
            console.log(PREMIUM_LIST)
            if (isCancelled)
                setPremiumItems(PREMIUM_LIST.data);
        }
        PREMIUM_ITEMS();
        return () => isCancelled = false;
    }, [data])

    useEffect(() => {
        if (items && items.length > 0) {
            const numberOfData = items.length;
            let scrollValue = 0, scrolled = 0;
            var interval = setInterval(() => {
                scrolled++;
                if (scrolled < numberOfData) scrollValue = scrollValue + width;

                else {
                    scrollValue = 0;
                    scrolled = 0;
                }
                componentFlat.current.scrollToOffset({ animated: true, offset: scrollValue });
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [items])

    if (items && items.length > 0) {
        return (
            <View>
                <FlatList
                    data={items}
                    ref={(flatList) => componentFlat.current = flatList}
                    keyExtractor={(item, index) => 'key' + index.toString()}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment='center'
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return <PremiumBannerItem item={item} navigation={navigation} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                />
            </View>
        )
    }
    return null;
}

export default PremiumBanner;
