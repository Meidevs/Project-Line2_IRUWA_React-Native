import React, { createRef, useState, useEffect, useRef, useReducer } from 'react';
import {
    FlatList,
    View,
    Image,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    Dimensions,
} from 'react-native';
// import Indicator from './Indicator';
// import ChildItem from './ChildItem';
const { width, height } = Dimensions.get('window');

const FlatListSlider = ({ data }) => {
    const [imgUri, setImageUri] = useState([]);
    const [fromData, setFromData] = useState({
        index: 0,
        images: []
    });
    const defaultProps = {
        data: [],
        imageKey: 'image',
        local: false,
        width: Math.round(Dimensions.get('window').width),
        height: 230,
        separatorWidth: 0,
        loop: true,
        indicator: true,
        indicatorStyle: {},
        indicatorContainerStyle: {},
        indicatorActiveColor: '#3498db',
        indicatorInActiveColor: '#bdc3c7',
        indicatorActiveWidth: 6,
        animation: true,
        autoscroll: true,
        timer: 3000,
        onPress: {},
        contentContainerStyle: {},
    }
    useEffect(() => {
        setFromData({ images: data })
    }, [data])

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.Slide}>
                <Image source={{ uri: item }} style={styles.SildeImages} />
            </View>
        )
    }
    const onViewableItemsChanged = useRef((viewableItems) => {
        if (viewableItems.length > 0) {
            let currentIndex = viewableItems[0].index;
            if (
                currentIndex % defaultProps.data.length === defaultProps.data.length - 1 &&
                defaultProps.loop
            ) {
                setFromData({
                    index: currentIndex,
                    images: [...images, ...defaultProps.data],
                });
            } else {
                setFromData({ index: currentIndex });
            }
        }
    });
    const viewabilityConfig = useRef({
        viewAreaPercentThreshold: 50,
    });

    return (
        <View>
            <FlatList
                horizontal={true}
                pagingEnabled={true}
                decelerationRate="fast"
                bounces={false}
                data={fromData.images}
                showsHorizontalScrollIndicator={false}
                renderItem={_renderItem}
                keyExtractor={index => JSON.stringify(index)}
                windowSize={1}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                removeClippedSubviews={true}
                onViewableItemsChanged={(info) => console.log(info)}
                viewabilityConfig={viewabilityConfig.current}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Slide: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SildeImages: {
        resizeMode: 'cover',
        width: width,
        height: 400,
    },
})

export default FlatListSlider;
