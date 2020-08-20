import React, { useEffect, useState } from 'react';
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

async function GetFetchUrl() {
    const DATA_SET = await DATA_SOURCE.GetItemList();
    console.log(DATA_SET)
    return DATA_SET;
}

function AlarmScreen({ route, navigation }) {
    const [alarms, setAlarm] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const ITEMS = await GetFetchUrl();
            setAlarm(ITEMS.ITEMS_LIST);
        }
        fetchData();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>알람</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.RightHeader}>
                    <TouchableOpacity>
                        <Icon name="ios-trash" size={28} color={'#000000'} style={{ padding: 10, }} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, []);

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.AlarmBox}>
                    <View style={styles.AlarmTitle}>
                        <Text style={styles.AlarmTitleTxtStyle}>활동알림</Text>
                    </View>
                    <View style={styles.AlarmList}>
                        {
                            alarms.map((data, index) => {
                                return (
                                    <View style={styles.ItemList}>
                                        <View style={styles.AlarmIcon}>
                                            <Text>{data.id}</Text>
                                        </View>
                                        <View style={styles.AlarmContent}>
                                            <Text>{data.title}{data.title}{data.title}{data.title}{data.title}{data.title}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
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
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)',
    },
    ScrollView: {
    },
    AlarmBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    AlarmTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        borderBottomWidth: 2,
        borderColor: 'rgba(50, 50, 50, 1)',
        height: 50,
    },
    AlarmTitleTxtStyle: {
        fontSize: width * 0.05,
        fontWeight: 'bold'
    },
    AlarmList: {
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: 'rgba(206, 206, 206, 1)',
        padding: 10,
    },
    ItemList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    AlarmIcon : {
        padding : 10,
        height : width * 0.15,
        width : width * 0.15,
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
    },
    AlarmContent : {
        padding : 10,
        width : width * 0.75,
    }
})

export default AlarmScreen;