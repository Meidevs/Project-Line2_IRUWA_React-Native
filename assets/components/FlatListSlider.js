import React, { createRef, useState, useEffect, useRef, useReducer } from 'react';
import {
    FlatList,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import ImageSlider from '../components/ImageSlider';
import FlatListIndicator from './FlatListIndicator';
const { width, height } = Dimensions.get('window');

const initialValue = {
    viewAreaCoveragePercentThreshold: 50,
}

const FlatListSlider = ({ data, navigation }) => {
    const ref = useRef(initialValue);
    console.log(ref)
    const [fromData, setFromData] = useState({
        index: 0,
        images: []
    });
    const [visibility, modalVisible] = useState(false);
    useEffect(() => {
        setFromData({ images: data })
    }, [data])
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.Slide} onPress={() => modalVisible(true)}>
                <Image source={{ uri: item }} style={styles.SildeImages} />
            </TouchableOpacity>
        )
    }
    const ReturnVisible = (ReturnValue) => {
        modalVisible(ReturnValue)
    }
    const onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems.length > 0) {
            let currentIndex = viewableItems[0].index;
            if (
                currentIndex % fromData.images.length === fromData.images.length - 1
            ) {
                setFromData({
                    index: currentIndex,
                });
            } else {
                setFromData({ index: currentIndex });
            }
        }
    };

    const viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 50,
    });
    return (
        <View>
            <FlatList
                scrollToIndex
                horizontal={true}
                pagingEnabled={true}
                decelerationRate="fast"
                bounces={false}
                data={fromData.images}
                showsHorizontalScrollIndicator={false}
                renderItem={_renderItem}
                keyExtractor={index => JSON.stringify(index)}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={ref.current}
            />
            <FlatListIndicator
                itemCount={fromData.images.length}
            />
            <ImageSlider visible={visibility} data={fromData} callback={ReturnVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    Slide: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover'
    },
    SildeImages: {
        resizeMode: 'cover',
        width: width,
        height: 400,
    },
})

export default FlatListSlider;
