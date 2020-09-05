import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';

import CHECK_ROOTDIRECTORY from '../assets/components/CheckDirectory';
import CREATE_LOGS_DIRECTORY from '../assets/components/CreateLogsDirectory';
import DateFunction from '../assets/components/DateFunction';
import UPDATE_LOGS_DIRECTORY from '../assets/components/UpdateLogs';
import io from 'socket.io-client';
import CHATTING from '../assets/dataSource/chatModel';
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const ChatDetailScreen = ({ route, navigation }) => {
    const [infos, setInfos] = useState({
        user_seq: null,
        user_name: null,
        cmp_seq: null,
        cmp_name: null,
        host_seq: null,
        host_name: null,
        items_seq: null,
        item_name: null,
    });
    const [message, setMessage] = useState(null);
    const cmp_seq = route.params.cmp_seq;
    const items_seq = route.params.items_seq;

    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitle: () => (
                <View>
                    <View style={styles.TitleHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name={'arrowleft'} size={24} />
                        </TouchableOpacity>
                        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.TitleHeaderTxtStyle}>
                                {infos.cmp_name}님과의 채팅
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50 }}>
                        <View style={{ borderRadius: 5, backgroundColor: 'rgba(180, 180, 180, 1)', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Image</Text>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'rgba(70, 70, 70, 1)', fontSize: 16, fontWeight: 'bold' }}>{infos.item_name}</Text>
                        </View>
                    </View>
                </View>
            ),
            headerStyle: {
                height: 110,
            }
        })
    }, [infos]);

    // const Chatting = useCallback(async () => {

    // }, [])

    // useEffect(() => {
    //     Chatting();
    // }, [Chatting]);

    useEffect(() => {
        const INFOs = async () => {
            try {
                var USER_INFOs = await CHATTING.USER_INFO();
                var CMP_INFOs = await CHATTING.CMP_INFO(cmp_seq);
                var ITEMS_INFOs = await CHATTING.ITEM_INFO(items_seq);
                setInfos({
                    user_seq: USER_INFOs.user_seq,
                    user_name: USER_INFOs.user_name,
                    cmp_seq: CMP_INFOs.cmp_seq,
                    cmp_name: CMP_INFOs.cmp_name,
                    host_seq: CMP_INFOs.host_seq,
                    host_name: CMP_INFOs.host_name,
                    items_seq: ITEMS_INFOs.items_seq,
                    item_name: ITEMS_INFOs.item_name,
                });
            } catch (err) {
                console.log(err);
            }
        }
        const CHAT_DIRECTORY = async () => {
            try {
                await CHECK_ROOTDIRECTORY();
            } catch (err) {
                console.log(err)
            }
        }
        INFOs();
        CHAT_DIRECTORY();
    }, [route]);


    const sendMessage = async () => {

        var dateTime = await DateFunction();
        console.log(dateTime)
        var sendMessage = message;

        const connectionConfig = {
            jsonp: false,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 5000,
            transports: ['websocket']/// you need to explicitly tell it to use websockets
        };
        var socket = io('http://192.168.0.40:8888', connectionConfig);
        var form = {
            sender: {
                sender_seq: infos.user_seq,
                sender_name: infos.user_name,
            },
            receiver: {
                receiver_seq: infos.host_seq,
                receiver_name: infos.host_name,
            },
            item : {
                items_seq : infos.items_seq,
            },
            message: sendMessage,
            reg_date : dateTime,
        }
        socket.emit('sendMessage', form);
        socket.on('receiveMessage', async receiveMessage => {
            var roomCode = 'RoomU' + infos.user_seq + 'H' + infos.host_seq + 'C' + infos.cmp_seq + 'I' + infos.items_seq;
            var resReturn = await CREATE_LOGS_DIRECTORY(roomCode);
            if (resReturn) {
                await UPDATE_LOGS_DIRECTORY(roomCode, receiveMessage)
            } else {
                alert('메세지 전송에 실패하였습니다.');
            }
        });
        setMessage(null);
    }

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.DateSeparator}>
                    <View style={{ borderWidth: 1, width: width * 0.3, borderColor: 'rgba(180, 180, 180, 1)' }} />
                    <Text style={{ padding: 10, color: 'rgba(70, 70, 70, 1)' }}>2020년 08월 06일</Text>
                    <View style={{ borderWidth: 1, width: width * 0.3, borderColor: 'rgba(180, 180, 180, 1)' }} />
                </View>
                <View style={styles.SenderBox}>
                    <View style={{ height: 50, width: 50, backgroundColor: 'rgba(180, 180, 180, 1)', borderRadius: 100, }}>

                    </View>
                    <View style={{ borderRadius: 10, backgroundColor: 'rgba(238, 238, 238, 1)', padding: 10, }}>
                        <Text style={{ fontSize: 16, }}>지금 바로 가면 되나요?</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-end', height: 40, paddingLeft: 10, }}>
                        <Text style={{ fontSize: 12, }}>11:20 오후</Text>
                    </View>
                </View>
                <View style={styles.ReceiverBox}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-end', height: 40, paddingLeft: 10, marginRight: 10, }}>
                        <Text style={{ fontSize: 12, }}>11:21 오후</Text>
                    </View>
                    <View style={{ borderRadius: 10, backgroundColor: 'rgba(238, 238, 238, 1)', padding: 10, }}>
                        <Text style={{ fontSize: 16, }}>네, 바로 이용 가능합니다.</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.MessageInputBox}>
                <View style={styles.InputBox}>
                    <TextInput
                        value={message}
                        placeholder={'메세지를 입력해주세요'}
                        placeholderTextColor='#B4B4B4'
                        onChangeText={(text) => setMessage(text)}

                    />
                </View>
                <TouchableOpacity style={styles.SendBtn} onPress={() => sendMessage()}>
                    <Icon name={'caretright'} size={28} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    DateSeparator: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    MessageInputBox: {
        height: 60,
        width: width,
        borderTopWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'rgba(180, 180, 180, 1)',
    },
    InputBox: {
        flex: 10,
        margin: 5,
        paddingLeft: 10,
        borderWidth: 0.8,
        borderColor: 'rgba(180, 180, 180, 1)',
        borderRadius: 10,
        justifyContent: 'center',
    },
    SendBtn: {
        flex: 1,
        margin: 5,

    },
    SenderBox: {
        margin: 15,
        height: 70,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    ReceiverBox: {
        margin: 15,
        height: 70,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})

export default ChatDetailScreen;