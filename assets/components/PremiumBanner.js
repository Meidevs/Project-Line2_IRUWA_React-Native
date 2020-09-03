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
let flatList;
function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0, scrolled = 0;

    setInterval(() => {
        scrolled++;
        if (scrolled < numberOfData) scrollValue = scrollValue + width;

        else {
            scrollValue = 0;
            scrolled = 0;
        }
        this.flatList.scrollToOffset({ animated: true, offset : scrollValue });
    }, 3000)
}

const PremiumBanner = ({ data, navigation }) => {
    const [items, setPremiumItems] = useState();
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    useFocusEffect(
        React.useCallback(() => {
            const PREMIUM_ITEMS = async () => {
                var PREMIUM_LIST = await DATA_SOURCE.GET_PREMIUM_ITEMS(data);
                setPremiumItems(PREMIUM_LIST.data);
                infiniteScroll(PREMIUM_LIST.data)
            }
            PREMIUM_ITEMS();
        }, [data])
    );

    if (items && items.length > 0) {
        return (
            <View>
                <FlatList data={items}
                    ref={(flatList) => { this.flatList = flatList }}
                    keyExtractor={(item, index) => 'key' + index.toString()}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment='center'
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return <PremiumBannerItem item={item} index={index} />
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
