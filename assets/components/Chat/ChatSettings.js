import React, { useState, useEffect } from 'react';
import {
    View,
    Modal,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
import AUTHENTICATION from '../../dataSource/authModel';
import GLOBAL from '../../dataSource/globalModel';
let socket;
const ChatSettings = ({ user_seq, receiver_seq, roomCode, visible, callback, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(visible)
    }, [visible]);

    const _handleDismiss = () => {
        callback(!modalVisible)
    }

    const LeaveRoom = () => {
        var data = {
            sender_seq: user_seq,
            roomCode: roomCode,
        }
        socket = GLOBAL.GET_SOCKET_IO();
        socket.emit('leave', data);
        callback(!modalVisible);
        navigation.goBack();
    }

    const SET_BANNED_USER = async () => {
        var RESULT = await AUTHENTICATION.SET_BANNED_USER(receiver_seq);
        if (RESULT) {
            LeaveRoom()
        }
    }
    return (
        <Modal
            animated
            animationType="fade"
            visible={modalVisible}
            transparent
        >
            <View style={styles.ContentArea}>
                <TouchableOpacity style={styles.BtnStyle} onPress={() => SET_BANNED_USER()}>
                    <Text style={styles.BtnTxt}>사용자 차단</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BtnStyle} onPress={() => LeaveRoom()}>
                    <Text style={styles.BtnTxt}>채팅방 나가기</Text>
                </TouchableOpacity>
            </View>
            <View
                style={styles.Overlay}
                onTouchStart={() => _handleDismiss()}
            >
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    Overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    ContentArea: {
        marginTop: 50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        shadowOffset: {
            height: 1,
        },
        elevation: 1,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderColor: '#ebebeb',
    },
    BtnStyle: {
        padding: 15,
        alignSelf: 'flex-end'
    },
    BtnTxt: {
        fontSize: 14,
        fontWeight: '800',
        color: '#000000',
    }
})


export default ChatSettings;