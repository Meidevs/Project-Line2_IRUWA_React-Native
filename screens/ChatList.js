import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';
import io from 'socket.io-client';

import { useFocusEffect } from '@react-navigation/native';
import TimeGap from '../assets/components/TimeGap';
import AUTHENTICATION from '../assets/dataSource/authModel';
import GLOBAL from '../assets/dataSource/globalModel';
import Directory from '../assets/components/Directory';
const { width, height } = Dimensions.get('window');

let socket;
function ChatListScreen({ route, navigation }) {
    const [receiveMessage, setReceiveMessage] = useState([]);
    const [count, setUnreadCount] = useState([]);
    const [logs, setMessageLogs] = useState([]);
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user_seq, setUser] = useState('');
    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>채팅</Text>
                </View>
            ),
        })
    }, []);
    useEffect(() => {
        const connectionConfig = {
            jsonp: false,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 5000,
            transports: ['websocket']/// you need to explicitly tell it to use websockets
        };
        socket = io('http://192.168.0.40:8888');
        // socket.emit('join','b79a29600a8381c6af21e1a1bf043c4b00b0201d')
    }, []);

    useEffect(() => {
        socket.on('message', (message, err) => {
            console.log('ChatList', message)

            if (err)
                alert(err)
            setMessages(messages => [...messages, message]);
        });
    }, []);

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    Container: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    ChatBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)',
    },
    ChatItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ProfileContent: {
        padding: 5,
        width: width * 0.12,
        height: width * 0.12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },
    ChatContent: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ItemContent: {
        padding: 10,
        borderRadius: 10,
        width: width * 0.10,
        height: width * 0.10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    UserInfo: {
        flexDirection: 'row',

    },
    UserTitle: {
        paddingRight: 5,
        fontSize: 15,
        fontWeight: '800',
    },
    TimeCal: {
        color: 'rgba(140, 140, 140, 1)',
        fontSize: 14,
        fontWeight: '600'
    }
})

export default ChatListScreen;