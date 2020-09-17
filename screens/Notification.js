import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
        })
    }, []);

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
                        return (
                            <View style={styles.NotificationBox}>
                                <TouchableOpacity
                                    style={styles.TitleBtn}
                                    onPress={() => OpenContent(index)}
                                >
                                    <View style={styles.TitleIconBox}>
                                        <View style={styles.IconAround}>
                                            <Icon />
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
                    })
                }
            </ScrollView>
            <View>
                <View>
                    <Text>광고광고</Text>
                </View>
            </View>
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
    },
    NotificationBox: {
        width: width,
        borderColor: 'rgba(245, 245, 245, 1)',
        borderBottomWidth: 0.8,
    },
    TitleBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 25,
        backgroundColor : 'rgba(255, 255, 255, 1)'
    },
    TitleIconBox: {
        flex: 1,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconAround : {
        width : width * 0.12,
        height : width * 0.12,
        borderRadius : 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'rgba(235, 235, 235, 1)'
    },
    TitleContent: {
        flex: 9,
        justifyContent : 'center',
        alignItems : 'flex-start'
    },
    DateArea : {
        paddingBottom : 10,
    },
    DateTxt : {
        fontSize : 14,
        fontWeight : '600',
        color : 'rgba(165, 165, 165, 1)'
    },
    TitleTxt : {
        fontSize : 15,
        fontWeight : '700',
        color : 'rgba(0, 0, 0, 1)'
    },
    ContentBox : {
        padding : 25,
    }
})

export default NotificationScreen;