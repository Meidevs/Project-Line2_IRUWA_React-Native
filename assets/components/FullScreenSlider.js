import React, { createRef, useState, useEffect, useRef, useReducer } from 'react';
import {
    FlatList,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

const FullScreenSilder = ({ data, visible, callback }) => {
    const [fromData, setFromData] = useState({
        index: 0,
        images: []
    });
    const [visibility, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(visible);
        setFromData({ images: data })
    }, [visible]);

    const ReturnVisible = (ReturnValue) => {
        callback(ReturnValue)
    }

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.FullScreen}>
                <Image source={{ uri: item }} style={styles.SildeImages} />
            </View>
        )
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibility}>
            <TouchableOpacity style={styles.HeaderBox} onPress={() => ReturnVisible(false)}>
                <Image source={require('../images/back_button_white.png')} />
            </TouchableOpacity>
            <FlatList
                horizontal={true}
                pagingEnabled={true}
                decelerationRate="fast"
                bounces={false}
                data={fromData.images}
                showsHorizontalScrollIndicator={false}
                renderItem={_renderItem}
                keyExtractor={(item) => JSON.stringify(item)}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    HeaderBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 5,
        padding: 15,
    },
    FullScreen: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SildeImages: {
        width: width,
        height: height,
        resizeMode: 'contain'
    }
})

export default FullScreenSilder;
