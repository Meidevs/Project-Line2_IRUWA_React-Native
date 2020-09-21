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
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import AUTHENTICATION from '../assets/dataSource/authModel';
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

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <View></View>,
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <Text style={styles.HeaderTitleTxt}>채팅 리스트</Text>
                </View>
            ),
            headerRight: () =>
                <View>

                </View>
        })
    }, []);

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
    HeaderTitleBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    HeaderTitleTxt: {
        fontWeight: 'bold',
        fontSize: 18
    },
    Container: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
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