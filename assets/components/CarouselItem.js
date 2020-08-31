import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import FullScreenSlider from './FullScreenSlider'

const { width, height } = Dimensions.get('window');

const CarouselItem = ({ item, data, navigation }) => {
    const [modalisible, setModalVisible] = useState(false);
    const ReturnVisible = (ChildFrom) => {
        setModalVisible(ChildFrom)
    }
    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: item }} style={styles.ImageView} />
            </TouchableOpacity>
            <FullScreenSlider data={data} visible={modalisible} callback={ReturnVisible}/>
        </View>


    )
}

const styles = StyleSheet.create({
    ImageView: {
        width: width,
        height: 350,
        resizeMode: 'cover'
    },
})

export default CarouselItem;