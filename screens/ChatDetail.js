import React, { useEffect, useState, useCallback } from 'react';
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
import DATA_SOURCE from '../assets/dataSource/dataModel';
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

function ChatDetailScreen({ route, navigation }) {
    const [chatlist, setChatList] = useState([]);
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
                            <Text style={styles.TitleHeaderTxtStyle}>(주)이루와님과의 채팅</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50 }}>
                        <View style={{ borderRadius: 5, backgroundColor: 'rgba(180, 180, 180, 1)', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Image</Text>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'rgba(70, 70, 70, 1)', fontSize: 16, fontWeight: 'bold' }}>맥주 2병 무료 서비스</Text>
                        </View>
                    </View>
                </View>
            ),
            headerStyle: {
                height: 110,
            }
        })
    }, []);

    const CHAT_LIST = useCallback(async () => {
        const data = await DATA_SOURCE.GetChatList();
    }, [])

    useEffect(() => {
        CHAT_LIST()
    }, [CHAT_LIST])

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
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-end', height: 40, paddingLeft: 10, marginRight : 10, }}>
                        <Text style={{ fontSize: 12, }}>11:21 오후</Text>
                    </View>
                    <View style={{ borderRadius: 10, backgroundColor: 'rgba(238, 238, 238, 1)', padding: 10, }}>
                        <Text style={{ fontSize: 16, }}>네, 바로 이용 가능합니다.</Text>
                    </View>

                </View>
            </ScrollView>
            <View style={styles.MessageInputBox}>
                <View style={styles.InputBox}>
                    <TextInput placeholder={'메세지를 입력해주세요'} placeholderTextColor='#B4B4B4' />
                </View>
                <TouchableOpacity style={styles.SendBtn}>
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
        margin : 15,
        height: 70,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    ReceiverBox: {
        margin : 15,
        height: 70,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})

export default ChatDetailScreen;