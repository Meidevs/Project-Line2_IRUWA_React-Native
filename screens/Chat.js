import React, { useEffect, useState, useCallback } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';

import * as FileSystem from 'expo-file-system';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import CHATTING from '../assets/dataSource/chatModel';
import AUTHENTICATION from '../assets/dataSource/authModel';
import GLOBAL from '../assets/dataSource/globalModel';

const { width, height } = Dimensions.get('window');

function ChatScreen({ route, navigation }) {
    const [chatlist, setChatList] = useState([]);
    const [receiveMessage, setReceiveMessage] = useState([]);
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

    useFocusEffect(
        React.useCallback(() => {
            const INITIAL_SETTINGS = async () => {
                var USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
                GLOBAL.FIND_MESSAGE_LOGS(USER_INFOs.user_seq);
                // GLOBAL.RECEIVE_MESSAGE_LOGS().then(async (list) => {
                //     console.log(list)
                // });
            }
            INITIAL_SETTINGS();
        }, [])
    );
    GLOBAL.RECEIVE_SOCKET_MESSAGE().then(async (message) => {
        console.log('a', message)
        if (message) {
            setReceiveMessage(message)
        }
    });
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                {
                    chatlist.map((data) => {
                        return (
                            <TouchableOpacity style={styles.ChatBox} onPress={() => navigation.navigate('ChatDetail')}>
                                <View style={styles.ChatItem}>
                                    <View style={styles.ProfileContent}>
                                        <Text>Profile Image</Text>
                                    </View>
                                    <View style={styles.ChatContent}>
                                        <View style={styles.UserInfo}>
                                            <Text style={styles.UserTitle}>{data.user_name}</Text>
                                            <Text style={styles.LocationTitle}>{data.location.length > 10 ? data.location.substring(0, 10) + '...' : data.location}</Text>
                                        </View>
                                        <View>
                                            <Text>네 감사합니다</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.ItemContent}>
                                    <Text>Item Image</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
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
    LocationTitle: {
        color: 'rgba(140, 140, 140, 1)',
        fontSize: 14,
        fontWeight: '600'
    }
})

export default ChatScreen;