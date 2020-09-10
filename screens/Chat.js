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
import { useFocusEffect } from '@react-navigation/native';
import TimeGap from '../assets/components/TimeGap';
import AUTHENTICATION from '../assets/dataSource/authModel';
import GLOBAL from '../assets/dataSource/globalModel';
import Directory from '../assets/components/Directory';
const { width, height } = Dimensions.get('window');

function ChatScreen({ route, navigation }) {
    const [receiveMessage, setReceiveMessage] = useState([]);
    const [count, setUnreadCount] = useState([]);
    const [logs, setMessageLogs] = useState([]);
    console.log('receiveMessage', receiveMessage)
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
        const INITIAL_SETTINGS = async () => {
            try {
                await Directory.CheckRootDirectory();
                // await Directory.ReadTitleDirectory();
                // await Directory.ReadChatDirectory();
                // await Directory.DeleteTitle();
                // await Directory.DeleteChat();
                var EXISTENCE = await Directory.ReadTitleDirectory();
                if (!EXISTENCE)
                    console.log('TITLE DIRECTORY가 없습니다.')
                var EXISTENCE = await Directory.ReadChatDirectory();
                if (!EXISTENCE)
                    console.log('CHAT DIRECTORY가 없습니다.')
            } catch (err) {
                console.log(err);
            }
        }
        INITIAL_SETTINGS();
    }, []);

    useEffect(() => {
        const SET_MESSAGE_LOGS = async () => {
            var TITLE_LIST = await Directory.ReadDirectoryTitles();
            var rawArr = new Array();
            if (TITLE_LIST && TITLE_LIST.length > 0) {
                TITLE_LIST.map((data) => {
                    var index = 0;
                    var rawObj = new Object();
                    for (var i = 0; i < logs.length; i++) {
                        if (data == logs[i].roomCode) {
                            index = index + 1;
                            rawObj = {
                                title: logs[i].roomCode,
                                newCount: index
                            }
                        }
                    }
                    rawArr.push(rawObj)
                    setUnreadCount(rawArr);
                })
            }
        }
        SET_MESSAGE_LOGS();
    }, [logs]);

    useFocusEffect(
        React.useCallback(() => {
            const UPDATE_DIRECTORY = async () => {
                var USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
                GLOBAL.FIND_MESSAGE_LOGS(USER_INFOs.user_seq);
                GLOBAL.RECEIVE_MESSAGE_LOGS().then(async (list) => {
                    if (list.length > 0) {
                        for (var j = 0; j < list.length; j++) {
                            await Directory.UpdateChatTitle(list[j]);
                            await Directory.UpdateDirectory(list[j]);
                        }
                        setMessageLogs(list);
                    }
                });
            }
            UPDATE_DIRECTORY();
        }, [])
    )

    useEffect(() => {
        const SET_HISTORY = async () => {
            var TITLE_LIST = await Directory.ReadDirectoryTitles();
            if (TITLE_LIST && TITLE_LIST.length > 0) {
                var rawArr = new Array();
                for (var i = 0; i < TITLE_LIST.length; i++) {
                    var ChatHistory = await Directory.ReadChatHistory(TITLE_LIST[i]);
                    var TitleHistory = await Directory.ReadTitleHistory(TITLE_LIST[i]);
                    var Chattings = ChatHistory.split('/&/');
                    var len = parseInt(Chattings.length);
                    var lastMessage = JSON.parse(Chattings[len - 1]);
                    rawArr.push({ roomCode: TITLE_LIST[i], title: JSON.parse(TitleHistory), chat: lastMessage });
                }
                setReceiveMessage(rawArr)
            }
        }
        SET_HISTORY();
    }, [logs])

    const componentJSX_CHATLIST = () => {
        return (
            receiveMessage.map((data) => {
                var time_gap = TimeGap(data.title);
                return (
                    <TouchableOpacity
                        key={data.roomCode}
                        style={styles.ChatBox}
                        onPress={() => navigation.navigate('ChatDetail')}
                    >
                        <View style={styles.ChatItem}>
                            <View style={styles.ProfileContent}>
                                <Text>Profile Image</Text>
                            </View>
                            <View style={styles.ChatContent}>
                                <View style={styles.UserInfo}>
                                    <Text style={styles.UserTitle}>{data.title.sender_name}</Text>
                                    <Text style={styles.TimeCal}>{time_gap}</Text>
                                </View>
                                <View>
                                    <Text>{data.chat.message}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.ItemContent}>
                            <Text>Item Image</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        )
    }


    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                {
                    componentJSX_CHATLIST()
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

export default ChatScreen;