import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import NOTIFICATIONS from '../assets/dataSource/notiModel';

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
            headerRight: () =>
                <View></View>
        })
    }, []);

    // useEffect's GET_NOTIFICATIONS function requests official notification to the server;
    // After receiving the notification, the function creates a toggle function by setting the "visible" variable;
    useEffect(() => {
        const GET_NOTIFICATIONS = async () => {
            var NOTIS = await NOTIFICATIONS.GET_NOTIFICATIONS();
            for (var i = 0; i < NOTIS.length; i++) {
                NOTIS[i].visible = false;
            }
            setNotifications(NOTIS);
        };
        GET_NOTIFICATIONS();
    }, []);

    // The OpenContent function works when the user presses the notification;
    // It shows/hides a detail of notifications;
    const OpenContent = (num) => {
        notifications[num].visible = !notifications[num].visible;
        setNotifications([
            ...notifications,
        ]);
    }

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                {
                    notifications.map((data, index) => {
                        if (index % 2 == 0) {
                            return (
                                <View style={styles.NotificationBox_a} key={index.toString()}>
                                    <TouchableOpacity
                                        style={styles.TitleBtn}
                                        onPress={() => OpenContent(index)}
                                    >
                                        <View style={styles.TitleIconBox}>
                                            <View style={styles.IconAround}>
                                                <Image source={require('../assets/images/notice_box_ico.png')} />
                                            </View>
                                        </View>
                                        <View style={styles.TitleContent}>
                                            <View style={styles.DateArea}>
                                                <Text style={styles.DateTxt}>{data.reg_date}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.TitleTxt}>{data.title}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        data.visible == true ?
                                            <View style={styles.ContentBox}>
                                                <Text>{data.content}</Text>
                                            </View>
                                            :
                                            null
                                    }
                                </View>
                            )
                        } else {
                            return (
                                <View style={styles.NotificationBox_b} key={index.toString()}>
                                    <TouchableOpacity
                                        style={styles.TitleBtn}
                                        onPress={() => OpenContent(index)}
                                    >
                                        <View style={styles.TitleIconBox}>
                                            <View style={styles.IconAround}>
                                                <Image source={require('../assets/images/notice_box_ico.png')} />
                                            </View>
                                        </View>
                                        <View style={styles.TitleContent}>
                                            <View style={styles.DateArea}>
                                                <Text style={styles.DateTxt}>{data.reg_date}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.TitleTxt}>{data.title}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        data.visible == true ?
                                            <View style={styles.ContentBox}>
                                                <Text>{data.content}</Text>
                                            </View>
                                            :
                                            null
                                    }
                                </View>
                            )
                        }
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000000'
    },
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    NotificationBox_a: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 25,
        paddingLeft: 25,
        borderColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    NotificationBox_b: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 25,
        paddingLeft: 25,
        borderColor: '#f2f2f2',
        borderBottomWidth: 1,
        backgroundColor : '#fafafa'
    },
    TitleBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 15,
    },
    TitleIconBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight: 15,
    },
    IconAround: {
        width: 45,
        height: 45,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    DateArea: {
        marginBottom: 10,
    },
    DateTxt: {
        fontSize: 13,
        fontWeight: '600',
        color: '#a2a2a2',
        letterSpacing: -0.26
    },
    TitleTxt: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: -0.26
    },
    ContentBox: {
        padding: 25,
    }
})

export default NotificationScreen;