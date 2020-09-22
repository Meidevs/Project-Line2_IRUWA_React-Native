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
    SafeAreaView, Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
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
            return {
                ...state.params.filter((data) => {
                    if (data.roomCode == action.params.roomCode) {
                        return data.messages.push(action.params.messages)
                    } else {
                        action.params.roomInfo.messages.push(action.params.message);
                        return {
                            ...state.params.push(action.params.roomInfo)
                        }
                    }
                })
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
    const [isSocket, setSocket] = useState(false);
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
            let isCancelled = true;
            if (isCancelled) {
                const SET_USER = async () => {
                    var USER_INFO = await AUTHENTICATION.GET_USER_INFOs();
                    socket = GLOBAL.GET_SOCKET_IO();
                    socket.emit('GetRoomList', USER_INFO.user_seq);
                    setCurrentUser(USER_INFO.user_seq);
                    setSocket(true)
                }
                SET_USER();
            }
            return () => isCancelled = false;
        }, [])
    );

    useEffect(() => {
        if (isSocket) {
            socket.on('GetRoomList', message => {
                dispatch({ type: 'initial', params: message });
            })
        }
        return () => setSocket(false)
    }, [isSocket]);

    useEffect(() => {
        if (isSocket) {
            socket.on('receiveMessage', message => {
                console.log('receiveMessage', message)
            })
        }
    }, [isSocket]);

    
    return (
        <SafeAreaView style={styles.Container}>
            <ChatListUp data={state} user={currentUser} navigation={navigation} />
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