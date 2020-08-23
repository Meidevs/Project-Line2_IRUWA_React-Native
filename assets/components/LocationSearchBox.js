import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Modal,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const LocationSearchFunction = ({ route, visible, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);
    console.log(visible)
    useEffect(() => {
        setModalVisible(visible)
    }, [visible])

    const onChangeVisible = (visibility) => {
        setModalVisible(visibility);
        callback(visibility)
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.ModalHeader}>
                <View style={styles.HeaderContent}>
                    <TouchableOpacity style={styles.CloseBtn} onPress={() => onChangeVisible(!modalVisible)}>
                        <Icon name={'ios-close'} size={40} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ModalView}>
                <View style={styles.ModalContent}>
                    <Text style={styles.modalText}>Hello World!</Text>

                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => onChangeVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ModalView: {
        width: width,
        height: height,
        zIndex: 5,
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },

    },
    ModalHeader: {
        width: width,
        padding: 20,
        height: height * 0.06,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "white",
    },
    HeaderContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    CloseBtn : {
    },
    ModalContent: {
        flex: 1,
    }
})


export default LocationSearchFunction;