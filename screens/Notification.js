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
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

function NotificationScreen({ route, navigation }) {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>공지사항</Text>
                </View>
            ),
        })
    }, []);

    const GET_NOTIFICATIONS = useCallback(async () => {
        // const data = await DATA_SOURCE.GetNotifications();
        var Notis = [
            {id : 'A_1', notification: '[공지]검색기능 오류로 인하여 서비스 이용에 불편을 드려죄송합니다.', reg_date: '2020-07-11' },
            {id : 'A_2',  notification: '[공지]채팅방 진입 오류로 인하여 서비스 이용에 불편을 드려 죄송합니다.', reg_date: '2020-07-09' },
            {id : 'A_3',  notification: '[공지]정부 지원 농산물 꾸러미 판매를 제한합니다.', reg_date: '2020-07-08' },
        ]
        setNotifications(Notis);
    }, [])

    useEffect(() => {
        GET_NOTIFICATIONS();
    }, [GET_NOTIFICATIONS])

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                {
                    notifications.map((data) => {
                        return (
                            <TouchableOpacity style={styles.NotiList} onPress={() => navigation.navigate('Main')}>
                                <View style={styles.RegiDate}>
                                    <Text>{data.reg_date}</Text>
                                </View>
                                <View>
                                    <Text>{data.notification}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
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
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    NotiList : {
        height : 80,
        width : width,
        padding : 15,
        borderBottomWidth : 1,
        borderColor : 'rgba(220, 220, 220, 1)',
        justifyContent : 'center',
    },
    RegiDate : {
        paddingBottom : 5,
    }
})

export default NotificationScreen;