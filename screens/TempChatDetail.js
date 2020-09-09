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

import DateFunction from '../assets/components/DateFunction';
import Directory from '../assets/components/Directory';
import GLOBAL from '../assets/dataSource/globalModel';
import CHATTING from '../assets/dataSource/chatModel';
import Icon from 'react-native-vector-icons/AntDesign';
import { useScreens } from 'react-native-screens';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

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
    const [inputMessage, setMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const [chattings, setChattings] = useState([]);
    const [chatIsLoaded, isChatLoaded] = useState(false);
    const [initialLoaded, setInitialValue] = useState(false);
    const cmp_seq = route.params.cmp_seq;
    const items_seq = route.params.items_seq;
    const user_seq = route.params.user_seq;


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

    useEffect(() => {
        const INITIAL_SETTINGS = async () => {
            try {
                var CMP_INFOs = await CHATTING.CMP_INFO(cmp_seq);
                var ITEMS_INFOs = await CHATTING.ITEM_INFO(items_seq);

                setInfos({
                    user_seq: user_seq,
                    cmp_seq: cmp_seq,
                    items_seq: items_seq,
                    cmp_name: CMP_INFOs.cmp_name,
                    host_seq: CMP_INFOs.host_seq,
                    host_name: CMP_INFOs.host_name,
                    item_name: ITEMS_INFOs.item_name,
                });
                await Directory.CheckRootDirectory();
                setInitialValue(true);
            } catch (err) {
                console.log(err);
            }
        }
        INITIAL_SETTINGS();
    }, [route]);

    const READ_LOCAL_DIRECTORY = useCallback(async () => {
        if (initialLoaded) {
            var RAW_CHAT_HISTORY = await Directory.ReadDirectory(receiveMessage);
            if (RAW_CHAT_HISTORY != undefined) {
                var rawArray = RAW_CHAT_HISTORY.split('/&/');
                setChattings(rawArray);
                isChatLoaded(true);
            }
        }
    }, [receiveMessage]);

    useEffect(() => {
        READ_LOCAL_DIRECTORY()
    }, [READ_LOCAL_DIRECTORY]);


    GLOBAL.RECEIVE_SOCKET_MESSAGE().then(async (message) => {
        if (message) {
            setReceiveMessage(message)
        }
    });

    const sendMessage = async () => {
        var dateTime = await DateFunction();
        var sendMessage = inputMessage;
        var form = {
            sender_seq: user_seq,
            receiver_seq: infos.host_seq,
            cmp_seq: cmp_seq,
            items_seq: items_seq,
            message: sendMessage,
            reg_date: dateTime,
        }
        await GLOBAL.SEND_SOCKET_MESSAGE(form);
        await Directory.UpdateDirectory(form);
        setMessage(null);
    }

    const componentJSX_Chat = () => {
        if (chatIsLoaded)
            console.log('chattings', chattings)
        // return (
        //     chattings.map((data, index) => {
        //         if (data.sender_seq == infos.user_seq) {
        //             return (
        //                 <View>
        //                     <View style={styles.DateSeparator}>
        //                         <View style={{ borderWidth: 1, width: width * 0.3, borderColor: 'rgba(180, 180, 180, 1)' }} />
        //                         <Text style={{ padding: 10, color: 'rgba(70, 70, 70, 1)' }}>2020년 08월 06일</Text>
        //                         <View style={{ borderWidth: 1, width: width * 0.3, borderColor: 'rgba(180, 180, 180, 1)' }} />
        //                     </View>
        //                     <View style={styles.SenderBox}>
        //                         <View style={{ height: 50, width: 50, backgroundColor: 'rgba(180, 180, 180, 1)', borderRadius: 100, }}>

        //                         </View>
        //                         <View style={{ borderRadius: 10, backgroundColor: 'rgba(238, 238, 238, 1)', padding: 10, }}>
        //                             <Text style={{ fontSize: 16, }}>{JSON.parse(data).message}</Text>
        //                         </View>
        //                         <View style={{ flexDirection: 'column', justifyContent: 'flex-end', height: 40, paddingLeft: 10, }}>
        //                             <Text style={{ fontSize: 12, }}>{JSON.parse(data).reg_date}</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //             )
        //         } else {
        //             return (
        //                 <View>
        //                     <View style={styles.ReceiverBox}>
        //                         <View style={{ flexDirection: 'column', justifyContent: 'flex-end', height: 40, paddingLeft: 10, marginRight: 10, }}>
        //                             <Text style={{ fontSize: 12, }}>{JSON.parse(data).reg_date}</Text>
        //                         </View>
        //                         <View style={{ borderRadius: 10, backgroundColor: 'rgba(238, 238, 238, 1)', padding: 10, }}>
        //                             <Text style={{ fontSize: 16, }}>{JSON.parse(data).message}</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //             )
        //         }
        //     })
        // )
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                {
                    componentJSX_Chat()
                }
            </ScrollView>
            <View style={styles.MessageInputBox}>
                <View style={styles.InputBox}>
                    <TextInput
                        value={inputMessage}
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