import React, { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import CarouselItem from './CarouselItem';

const Carousel = ({ data, navigation }) => {
    const scrollX = new Animated.Value(0);
    var position = Animated.divide(scrollX, width);

    if (data && data.length) {
        return (
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => 'key' + index.toString()}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment='center'
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} data={data} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {
                            useNativeDriver: false,
                        }
                    )}
                />
                <View style={styles.Indicator}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        let width = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [10, 20, 10],
                            extrapolate: 'clamp'

                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10, width: width, backgroundColor: 'rgba(180, 180, 180, 1)', margin: 8, borderRadius: 5 }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }
    return null;
}

const styles = StyleSheet.create({
    Indicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 320,
        width: width,
        zIndex: 10,
    }
})

export default Carousel;
