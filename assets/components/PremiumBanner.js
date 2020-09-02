import React, { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
import PremiumBannerItem from './PremiumBannerItem';
import DATA_SOURCE from '../dataSource/dataModel';

const PremiumBanner = ({ data, navigation }) => {
    const [items, setPremiumItems] = useState([]);
    console.log(items)
    useFocusEffect(
        React.useCallback(() => {
            const PREMIUM_ITEMS = async () => {
                var PREMIUM_LIST = await DATA_SOURCE.GET_PREMIUM_ITEMS(data);
                setPremiumItems(PREMIUM_LIST.data);
            }
            PREMIUM_ITEMS();
        }, [data])
    );
    return (
        <View>
            <FlatList
                data={items}
                style={styles.CardView}
                keyExtractor={(item, index) => 'key' + index.toString()}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment='center'
                scrollEventThrottle={16}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <PremiumBannerItem item={item} />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    CardView: {
        alignSelf: 'center',
        margin: 15,
        padding: 10,
        borderRadius: 20,
        width: width * 0.8,
        height: height * 0.2,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    }
})

export default PremiumBanner;
