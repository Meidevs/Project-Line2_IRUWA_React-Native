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
const { width, height } = Dimensions.get('window');

const FlatListSlider = ({ data }) => {
    const [fromData, setFromData] = useState({
        index: 0,
        images: []
    });
    const [visibility, modalVisible] = useState(false);

    useEffect(() => {
        setFromData({ images: data })
    }, [data])

    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.Slide} onPress={() => modalVisible(true)}>
                <Image source={{ uri: item }} style={styles.SildeImages} />
            </TouchableOpacity>
        )
    }
    const ReturnVisible = (ReturnValue) => {
        modalVisible(ReturnValue)
    }
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
        resizeMode : 'cover'
    },
    SildeImages: {
        resizeMode: 'cover',
        width: width,
        height: 400,
    },
})

export default FlatListSlider;
