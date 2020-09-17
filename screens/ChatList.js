import React, { useEffect, useState, useCallback, useContext, useReducer } from 'react';
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
import CHATTING from '../assets/dataSource/chatModel';
import GLOBAL from '../assets/dataSource/globalModel';
const { width, height } = Dimensions.get('window');

const initialValue = {
    params: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'initial':
            return {
                ...state,
                params: action.params
            }
        // default:
        //     throw new Error();
    }
}

function ChatListScreen({ route, navigation }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialValue);
    console.log(state)
    useFocusEffect(
        React.useCallback(() => {
            const SET_USER = async () => {
                var USER_INFO = await AUTHENTICATION.GET_USER_INFOs();
                var socket = GLOBAL.GET_SOCKET_IO();
                socket.emit('prevMessage', USER_INFO.user_seq);
                setCurrentUser(USER_INFO.user_seq);
            }
            SET_USER();
        }, [])
    );


    useEffect(() => {
        var socket = GLOBAL.GET_SOCKET_IO();
        socket.on('receiveMessage', message => {
            socket.emit('prevMessage', currentUser);
        })
        socket.on('prevMessage', message => {
            dispatch({ type: 'initial', params: message });
        })
    }, []);

    const ComponentJSX = () => {
        if (state.params.length > 0) {
            return (
                state.params.map((data, index) => {
                    var MESSAGE_LENGTH = data.messages.length;
                    return (
                        <View
                            key={index.toString()}>
                            <TouchableOpacity
                                style={styles.ListBox}
                                onPress={() => setNavigationParams(data)}

                            >
                                <View style={styles.LeftArea}>
                                    {
                                        currentUser === data.sender_seq ? (
                                            <Text>판매자</Text>
                                        ) : (
                                                <Text>구매자</Text>
                                            )
                                    }
                                </View>
                                <View style={styles.RightArea}>
                                    <View style={styles.UserInfo}>
                                        <Text>{data.sender_name}</Text><Text>{data.receiver_name}</Text>
                                    </View>
                                    <View style={styles.LatestMessage}>
                                        <Text>{data.messages[MESSAGE_LENGTH - 1].message}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })
            )
        }
    }
    const setNavigationParams = (data) => {
        var Tmp;
        if (data.sender_seq != currentUser) {
            Tmp = data.sender_seq;
            data.sender_seq = currentUser
            data.receiver_seq = Tmp;
        }

        navigation.navigate('Chat', {
            items_seq: data.items_seq,
            item_name: data.item_name,
            sender_seq: data.sender_seq,
            sender_name: data.sender_name,
            receiver_seq: data.receiver_seq,
            receiver_name: data.receiver_name,
            cmp_seq: data.cmp_seq,
            cmp_name: data.cmp_name,
            roomCode: data.roomCode
        })
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                {
                    ComponentJSX()
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
    TimeCal: {
        color: 'rgba(140, 140, 140, 1)',
        fontSize: 14,
        fontWeight: '600'
    },
    ListBox: {
        width: width,
        height: height * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: 1,
        padding: 15,
    },
    LeftArea: {
        flex: 1,
        justifyContent: 'center'
    },
    RightArea: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    UserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    LatestMessage: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ChatListScreen;