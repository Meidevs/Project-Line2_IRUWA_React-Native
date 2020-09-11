import React, { useEffect, useState, useCallback, useContext } from 'react';
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
import io from 'socket.io-client';
import AUTHENTICATION from '../assets/dataSource/authModel';
import DateFunction from '../assets/components/DateFunction';
import Directory from '../assets/components/Directory';
import GLOBAL from '../assets/dataSource/globalModel';
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');
let socket;
const ChatScreen = ({ route, navigation }) => {
    const {
        items_seq,
        item_name,
        sender_seq,
        sender_name,
        receiver_seq,
        receiver_name,
        cmp_seq,
        cmp_name,
        roomCode
    } = route.params;
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const [chattings, setChattings] = useState([]);
    const [chatIsLoaded, isChatLoaded] = useState(false);
    const [initialLoaded, setInitialValue] = useState(false);

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
                                {cmp_name}님과의 채팅
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50 }}>
                        <View style={{ borderRadius: 5, backgroundColor: 'rgba(180, 180, 180, 1)', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Image</Text>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'rgba(70, 70, 70, 1)', fontSize: 16, fontWeight: 'bold' }}>{item_name}</Text>
                        </View>
                    </View>
                </View>
            ),
            headerStyle: {
                height: 110,
            }
        })
    }, [route]);

    useEffect(() => {
        const INITIAL_SETTINGS = async () => {
            try {
                await Directory.CheckRootDirectory();
                setInitialValue(true);
            } catch (err) {
                console.log(err);
            }
        }
        INITIAL_SETTINGS();
    }, [route]);

    useEffect(() => {
        const connectionConfig = {
            jsonp: false,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 5000,
            transports: ['websocket']/// you need to explicitly tell it to use websockets
        };
        socket = io('http://192.168.0.40:8888');
    }, []);

    useEffect(() => {
        socket.on('message', (message, err) => {
            console.log('Chat ', message)
            if (err)
                alert(err)
        });
    }, []);

    const sendMessage = async () => {
        if (message) {
            var dateTime = await DateFunction();
            var sendMessage = message;
            var form = {
                sender_seq: sender_seq,
                sender_name: sender_name,
                receiver_seq: receiver_seq,
                receiver_name: receiver_name,
                items_seq: items_seq,
                item_name: item_name,
                cmp_seq: cmp_seq,
                cmp_name: cmp_name,
                roomCode: roomCode,
                message: sendMessage,
                reg_date: dateTime,
            }
            socket.emit('goMessage', form)
            await Directory.UpdateChatTitle(form)
            await Directory.UpdateDirectory(form);
            setMessage(null);
        }
    }

    // const componentJSX_Chat = () => {
    //     if (chatIsLoaded)
    //         return (
    //             chattings.map((data, index) => {
    //                 if (data.sender_seq == sender_seq) {
    //                     return (
    //                         <View>
    //                             <View style={styles.DateSeparator}>
    //                                 <View style={{ borderWidth: 1, width: width * 0.3, borderColor: 'rgba(180, 180, 180, 1)' }} />
    //                                 <Text style={{ padding: 10, color: 'rgba(70, 70, 70, 1)' }}>2020년 08월 06일</Text>
    //                                 <View style={{ borderWidth: 1, width: width * 0.3, borderColor: 'rgba(180, 180, 180, 1)' }} />
    //                             </View>
    //                             <View style={styles.SenderBox}>
    //                                 <View style={{ height: 50, width: 50, backgroundColor: 'rgba(180, 180, 180, 1)', borderRadius: 100, }}>

    //                                 </View>
    //                                 <View style={{ borderRadius: 10, backgroundColor: 'rgba(238, 238, 238, 1)', padding: 10, }}>
    //                                     <Text style={{ fontSize: 16, }}>{JSON.parse(data).message}</Text>
    //                                 </View>
    //                                 <View style={{ flexDirection: 'column', justifyContent: 'flex-end', height: 40, paddingLeft: 10, }}>
    //                                     <Text style={{ fontSize: 12, }}>{JSON.parse(data).reg_date}</Text>
    //                                 </View>
    //                             </View>
    //                         </View>
    //                     )
    //                 } else {
    //                     return (
    //                         <View>
    //                             <View style={styles.ReceiverBox}>
    //                                 <View style={{ flexDirection: 'column', justifyContent: 'flex-end', height: 40, paddingLeft: 10, marginRight: 10, }}>
    //                                     <Text style={{ fontSize: 12, }}>{JSON.parse(data).reg_date}</Text>
    //                                 </View>
    //                                 <View style={{ borderRadius: 10, backgroundColor: 'rgba(238, 238, 238, 1)', padding: 10, }}>
    //                                     <Text style={{ fontSize: 16, }}>{JSON.parse(data).message}</Text>
    //                                 </View>
    //                             </View>
    //                         </View>
    //                     )
    //                 }
    //             })
    //         )
    // }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                {/* {
                    componentJSX_Chat()
                } */}
            </ScrollView>
            <View style={styles.MessageInputBox}>
                <View style={styles.InputBox}>
                    <TextInput
                        value={message}
                        placeholder={'메세지를 입력해주세요'}
                        placeholderTextColor='#B4B4B4'
                        onChangeText={(text) => setMessage(text)}

                    />
                    {messages.map(data => {
                        return (
                            <View>
                                <Text>{data.text}</Text>
                            </View>
                        )
                    })}
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

export default ChatScreen;