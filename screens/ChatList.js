import React, { useEffect, useState, useReducer } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ChatListUp from '../assets/components/ChatList/ChatListUp';
import AUTHENTICATION from '../assets/dataSource/authModel';
import GLOBAL from '../assets/dataSource/globalModel';
const { width, height } = Dimensions.get('window');

const initialValue = {
    params: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'initial':
            return {
                params: action.params
            }

        case 'update':
            var result = state.params.findIndex(data => data.roomCode == action.params.roomInfo.roomCode);
            if (result == -1) {
                return {
                    ...state.params,
                    params: [action.params.roomInfo]
                }
            } else {
                return {
                    params: state.params.filter(data => {
                        if (data.roomCode == action.params.messages.roomCode) {
                            return data.messages.push(action.params.messages)
                        }
                    }),
                    ...state.params,
                }
            }

        case 'default':
            return {
                params: state.params
            }
    }
}
let socket;
function ChatListScreen({ route, navigation }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoaded, setIsLoad] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialValue);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <View></View>,
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>채팅 리스트</Text>
                </View>
            ),
            headerRight: () =>
                <View></View>
        })
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            let isCancelled = true;
            const INITIAL = async () => {
                try {
                    var USER_INFO = await AUTHENTICATION.GET_USER_INFOs();
                    socket = GLOBAL.GET_SOCKET_IO();
                    socket.emit('GetRoomList', USER_INFO.user_seq);
                    if (isCancelled)
                        setCurrentUser(USER_INFO.user_seq);
                } catch (err) {
                    console.log(err);
                }
            }
            INITIAL();
            return () => isCancelled = false;
        }, [])
    );
    useEffect(() => {
        let isCancelled = true;
        socket = GLOBAL.GET_SOCKET_IO();
        socket.on('GetRoomList', message => {
            if (isCancelled)
                dispatch({ type: 'initial', params: message });
        });
        return () => isCancelled = false;
    }, []);

    useEffect(() => {
        let isCancelled = true;
        socket = GLOBAL.GET_SOCKET_IO();
        socket.on('receiveMessage', message => {
            if (isCancelled)
                dispatch({ type: 'update', params: message });
        })
        return () => isCancelled = false;
    }, []);

    return (
        <SafeAreaView style={styles.Container}>
            <ChatListUp data={state} user={currentUser} navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 15
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