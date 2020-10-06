import React, { useState, useEffect } from 'react';
import {
    View,
    Modal,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';

const ModalBox = ({ visible, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(visible)
    }, [visible])

    const setModealStatus = () => {
        setModalVisible(false)
        callback(false)
    }

    return (
        <Modal
            animated
            animationType="fade"
            visible={modalVisible}
        >
            <View >
                <TouchableOpacity style={styles.BackBtn} onPress={() => setModealStatus(false)}>
                    <Image source={require('../../images/close_button.png')} 
                        style={{width : 15, height : 15,}}
                    />
                </TouchableOpacity>
            </View>
            <SafeAreaView>
                <ScrollView>

                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    BackBtn : {
        margin : 25,
    }
})


export default ModalBox;