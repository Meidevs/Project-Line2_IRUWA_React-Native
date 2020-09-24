import React, { useEffect, useState, useCallback, useContext, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView,
    Animated, 
    Platform
} from 'react-native';
import AUTHENTICATION from '../assets/dataSource/authModel';
import DateFunction from '../assets/components/DateFunction';
import GLOBAL from '../assets/dataSource/globalModel';

const { width, height } = Dimensions.get('window');
let socket;
const ChatInitialScreen = ({ route, navigation }) => {
    const {
        item_uri,
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
    console.log(
        item_uri,
        items_seq,
        item_name,
        sender_seq,
        sender_name,
        receiver_seq,
        receiver_name,
        cmp_seq,
        cmp_name,
        roomCode)
    const [message, setMessageText] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState([]);
    const [initialLoaded, setInitialValue] = useState(false);
    const [profile, setChatUserProfile] = useState({ uri: null });
    const scrollComponent = useRef(null)
    useEffect(() => {
        let isCancelled = true;

        const USER_PROFILE = async () => {
            var USER_PROFILE = await AUTHENTICATION.GET_USER_PROFILE(receiver_seq);
            if (USER_PROFILE.flags == 0) {
                setChatUserProfile({ uri: USER_PROFILE.message })
            }
        }
        const GET_MAIN_INFOs = () => {
            socket = GLOBAL.GET_SOCKET_IO();
            socket.emit('CreateRoom', {
                roomCode: roomCode,
                item_uri : item_uri,
                items_seq: items_seq,
                item_name: item_name,
                cmp_seq: cmp_seq,
                cmp_name: cmp_name,
                sender_seq: sender_seq,
                sender_name: sender_name,
                receiver_seq: receiver_seq,
                receiver_name: receiver_name
            });
        }
        setInitialValue(true);
        USER_PROFILE()
        GET_MAIN_INFOs();
        return () => isCancelled = false;

    }, [route]);

    useEffect(() => {
        let isCancelled = true;
        socket.on('receiveMessage', (message) => {
            var newData = [...receiveMessage, message.messages];
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
                roomCode: roomCode,
                message: sendMessage,
                reg_date: dateTime,
            }
            socket.emit('sendMessage', form)
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
            <Animated.View style={styles.MainHeader}>
                <View style={styles.HeaderBox}>
                    <TouchableOpacity style={styles.HeaderBackBtn} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/back_button.png')} />
                    </TouchableOpacity>
                    <View style={styles.HeaderTitleBox}>
                        <Text style={styles.HeaderTitleTxt}>{receiver_name}님과의 채팅</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.RightHeader}
                        onPress={() => navigation.navigate('Search')}>
                        <Image
                            source={require('../assets/images/more_button.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.RoomHeader}>
                    <View style={styles.RoomInfo}>
                        <View style={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={{ uri: item_uri }}
                                resizeMode={'cover'}
                                borderRadius={45}
                                style={{ width: 45, height: 45 }}
                            />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.RoomTxt}>{item_name}</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
            <Animated.ScrollView style={styles.MessageArea}>
                {
                    componentJSX_Chat()
                }
            </Animated.ScrollView>
            <Animated.View style={styles.MessageInputBox}>
                <View style={styles.InputBox}>
                    <TextInput
                        value={message}
                        placeholder={'메세지를 입력해주세요'}
                        placeholderTextColor='#B4B4B4'
                        onChangeText={(text) => setMessageText(text)}
                        style={styles.InputStyle}
                    />
                    <TouchableOpacity style={styles.SendBtn} onPress={() => sendMessage()}>
                        <Image source={require('../assets/images/Group408.png')} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ebebeb'
    },
    MainHeader: {
        backgroundColor: '#ffffff',
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.1 },
        shadowOpacity: 0.8,
        shadowRadius: 0.2,
    },
    HeaderBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    HeaderBackBtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    HeaderTitleBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    HeaderTitleTxt: {
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold'
    },
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    RoomHeader: {
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    RoomInfo: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    RoomTxt: {
        fontSize: 15,
        fontWeight: '800',
        fontWeight: 'bold',
        letterSpacing: -0.3,
        color: '#000000',
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

export default ChatInitialScreen;