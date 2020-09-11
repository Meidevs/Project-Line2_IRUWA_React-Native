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
import CHATTING from '../assets/dataSource/chatModel';
import GLOBAL from '../assets/dataSource/globalModel';
import Directory from '../assets/components/Directory';
const { width, height } = Dimensions.get('window');

let socket;
function ChatListScreen({ route, navigation }) {
    const [chattings, setChattingList] = useState([{
        title: null,
        messages: [],
    }]);
    console.log('chattings', chattings)
    const [newUpdate, setNewUpdate] = useState({ history : [], info : []});
    const [isLoaded, setIsLoaded] = useState(false);
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
        socket = io('http://192.168.0.40:8888', connectionConfig);
    }, []);

    const READ_DIRECTORIES = useCallback(async () => {
        console.log('isLoaded', isLoaded)
        if (isLoaded) {
            var DIRECTORIES = await Directory.ReadTitleDirectory();
            var rawArray = new Array();
            for (var i = 0; i < DIRECTORIES.length; i++) {
                var title = await Directory.ReadTitleHistory(DIRECTORIES[i]);
                var chats = await Directory.ReadChatHistory(DIRECTORIES[i]);
                var chattingList = chats.split('/&/');
                console.log('chattingList', chattingList)
                rawArray.push({title : JSON.parse(title), messages : chattingList});
                setChattingList(rawArray);
            }
        }
    }, [isLoaded])

    useEffect(() => {
        READ_DIRECTORIES();
    }, [READ_DIRECTORIES])


    useEffect(() => {
        const SET_UPDATES = async () => {
            try {
                console.log('Length', newUpdate.history.length)
                if (newUpdate.history.length > 0 ) {
                    for (var i = 0; i < newUpdate.history.length; i++) {
                        await Directory.UpdateDirectory(newUpdate.history[i])
                    }
                    for (var i = 0; i < newUpdate.info.length; i++) {
                        await Directory.UpdateChatTitle(newUpdate.info[i])
                    }
                    setIsLoaded(true);
                }
            } catch (err) {
                console.log(err)
            }
        }
        SET_UPDATES();
    }, [newUpdate]);

    useEffect(() => {
        socket.on('returnHistory', async (message, err) => {
            if (err) {
                alert(err)
            }
            setNewUpdate(message);
        });
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const GET_MAIN_INFOs = async () => {
                setIsLoaded(false)
                await Directory.CheckRootDirectory()
                // await Directory.DeleteChat();
                // await Directory.DeleteTitle();
                // var a = await Directory.ReadTitleDirectory();
                // var b = await Directory.ReadChatDirectory();
                // console.log('a', a)
                // console.log('b', b)
                try {
                    const USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
                    socket.emit('getHistory', USER_INFOs.user_seq);
                } catch (err) {
                    console.log(err);
                }
            }

            GET_MAIN_INFOs();
        }, [])
    );
    const setNavigationParams = async (data) => {
        var cmp_seq = data.cmp_seq;
        var items_seq = data.items_seq;
        const user_seq = await AUTHENTICATION.GET_USER_INFOs();
        var USER_INFOs = await CHATTING.USER_INFO(user_seq.user_seq);
        var CMP_INFOs = await CHATTING.CMP_INFO(cmp_seq);
        var ITEMS_INFOs = await CHATTING.ITEM_INFO(items_seq);
        navigation.navigate('Chat', {
            items_seq: ITEMS_INFOs.items_seq,
            item_name: ITEMS_INFOs.item_name,
            sender_seq: USER_INFOs.user_seq,
            sender_name: USER_INFOs.user_name,
            receiver_seq: data.sender_seq,
            receiver_name: data.sender_name,
            cmp_seq: CMP_INFOs.cmp_seq,
            cmp_name: CMP_INFOs.cmp_name,
            roomCode: data.roomCode
        })
    }
    const ComponentJSX = () => {
        return (
            chattings.map((data) => {
                return (
                    <View>
                        <TouchableOpacity onPress={() => setNavigationParams(data.title)} >
                            <Text></Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
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
    }
})

export default ChatListScreen;