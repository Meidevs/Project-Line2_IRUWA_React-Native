import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView, Platform
} from 'react-native';
import AUTHENTICATION from '../assets/dataSource/authModel';
import DateFunction from '../assets/components/DateFunction';
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
    const [message, setMessageText] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState([]);
    const [initialLoaded, setInitialValue] = useState(false);
    const [profile, setChatUserProfile] = useState({ uri: null });
    useEffect(() => {
        const USER_PROFILE = async () => {
            var USER_PROFILE = await AUTHENTICATION.GET_USER_PROFILE(receiver_seq);
            if (USER_PROFILE.flags == 0) {
                setChatUserProfile({ uri: USER_PROFILE.message })
            }
        }
        const GET_MAIN_INFOs = async () => {
            socket = GLOBAL.GET_SOCKET_IO();
        }
        setInitialValue(true);
        USER_PROFILE()
        GET_MAIN_INFOs();
    }, [route]);

    useEffect(() => {
        let isCancelled = true;
        socket.on('receiveMessage', (message) => {
            console.log(message)
            var newData = [...receiveMessage, message];
            if (isCancelled) {
                setReceiveMessage(newData);
            }
        });

        return () => isCancelled = false;
    }, [receiveMessage]);

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
            setMessageText(null);
        }
    }

    const componentJSX_Chat = () => {
        if (receiveMessage.length > 0)
            return (
                receiveMessage.map((data, index) => {
                    var currentTime;
                    if (Platform.OS == 'ios') {
                        var newTime = new Date(data.reg_date).toLocaleTimeString().substring(0, 7);
                        var setAMPM = newTime.substring(0, 3);
                        var am_pm = parseInt(setAMPM) >= 12;
                        if (am_pm) {
                            currentTime = newTime;
                        } else {
                            currentTime = newTime;
                        }
                    } else {
                        var newTime = new Date(data.reg_date).toLocaleTimeString().substring(0, 5);
                        var setAMPM = newTime.substring(0, 3);
                        var am_pm = parseInt(setAMPM) >= 12;
                        if (am_pm) {
                            currentTime = '오후 ' + newTime;
                        } else {
                            currentTime = '오전 ' + newTime;
                        }
                    }

                    if (data.sender_seq == receiver_seq) {
                        return (
                            <View
                                style={styles.ChattingBox}
                                key={index.toString()}
                            >
                                <View style={styles.ReceiverBox}>
                                    <View style={styles.UserProfile}>
                                        {
                                            profile.uri == null ? (
                                                <Image source={require('../assets/images/defaultProfile.png')} resizeMode={'cover'}
                                                    style={{ height: 50, width: 50, borderRadius: 100 }}
                                                />
                                            ) : (
                                                    <Image source={{ uri: profile.uri }}
                                                        resizeMode={'cover'}
                                                        style={{ height: 50, width: 50, borderRadius: 100 }}
                                                    />
                                                )
                                        }
                                    </View>
                                    <View style={styles.ReceiverMessages}>
                                        <View style={styles.TalkBubble}>
                                            <View style={styles.TalkBubbleSquare}>
                                                <Text style={styles.ReceiverTxt}>{data.message}</Text>
                                            </View>
                                            <View style={styles.TalkBubbleTriangle} />
                                            <Text style={styles.DateTime}>{currentTime}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        )
                    } else {
                        return (
                            <View
                                style={styles.ChattingBox}
                                key={index.toString()}
                            >
                                <View style={styles.SenderBox}>
                                    <View style={styles.SenderMessages}>
                                        <View style={styles.TalkBubble}>
                                            <View style={styles.TalkBubbleSquare_R}>
                                                <Text style={styles.SenderTxt}>{data.message}</Text>
                                            </View>
                                            <View style={styles.TalkBubbleTriangle_R} />
                                            <Text style={styles.DateTime_R}>{currentTime}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                })
            )
    }
    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.HeaderStyle}>
                <View style={styles.TitleBackBtn}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name={'arrowleft'} size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.TitleHeader}>
                    <View style={styles.Title}>
                        <Text style={styles.TitleHeaderTxtStyle}>
                            {receiver_name}님과의 채팅
                            </Text>
                    </View>
                    <View style={styles.RoomInfo}>
                        <View style={{ borderRadius: 5, backgroundColor: 'rgba(180, 180, 180, 1)', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Image</Text>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'rgba(70, 70, 70, 1)', fontSize: 16, fontWeight: 'bold' }}>{item_name}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.MessageArea}>
                {
                    componentJSX_Chat()
                }
            </ScrollView>
            <View style={styles.MessageInputBox}>
                <View style={styles.InputBox}>
                    <TextInput
                        value={message}
                        placeholder={'메세지를 입력해주세요'}
                        placeholderTextColor='#B4B4B4'
                        onChangeText={(text) => setMessageText(text)}
                        style={styles.InputStyle}
                    />
                    <TouchableOpacity style={styles.SendBtn} onPress={() => sendMessage()}>
                        <Icon name={'caretright'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(235, 235, 235, 1)'
    },
    HeaderStyle: {
        width: width,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    TitleBackBtn: {
        padding: 10,
    },
    TitleHeader: {
        flex: 1,
        padding: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    Title: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    RoomInfo: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    MessageInputBox: {
        width: width,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    InputBox: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderWidth: 0.8,
        borderColor: 'rgba(210, 210, 210, 1)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    InputStyle: {
        flex: 1,
    },
    ChattingBox: {
        width: width,
    },
    ReceiverBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    UserProfile: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ReceiverMessages: {
        flex: 8,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ReceiverTxt: {
        fontWeight: '600',
        fontSize: 14,
        color: 'rgba(87, 91, 110, 1)'
    },
    DateTime: {
        marginTop: 5,
        fontSize: 10,
        fontWeight: '600',
        color: 'rgba(191, 191, 191, 1)',
        alignSelf: 'flex-end',
    },
    TalkBubble: {
        backgroundColor: 'transparent'
    },
    TalkBubbleSquare: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    TalkBubbleTriangle: {
        position: 'absolute',
        left: -7,
        top: 6,
        width: 0,
        height: 0,
        borderTopColor: 'transparent',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderRightColor: 'rgba(255, 255, 255, 1)',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent'
    },
    SenderBox: {
        flex: 1,
        margin: 15,
        height: 70,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    SenderMessages: {
        flex: 8,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    TalkBubbleSquare_R: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(21, 186, 192, 1)',
    },
    TalkBubbleTriangle_R: {
        position: 'absolute',
        top: 6,
        right: -7,
        width: 0,
        height: 0,
        borderTopColor: 'transparent',
        borderTopWidth: 10,
        borderLeftWidth: 10,
        borderLeftColor: 'rgba(21, 186, 192, 1)',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent'
    },
    DateTime_R: {
        marginTop: 5,
        fontSize: 10,
        fontWeight: '600',
        color: 'rgba(191, 191, 191, 1)',
        alignSelf: 'flex-start',
    },
    SenderTxt: {
        fontWeight: '600',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 1)'
    },
})

export default ChatScreen;