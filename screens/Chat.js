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
import * as FileSystem from 'expo-file-system';
import io from 'socket.io-client';
import DATA_SOURCE from '../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

function ChatScreen({ route, navigation }) {
    const [chatlist, setChatList] = useState([]);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>채팅</Text>
                </View>
            ),
        })
    }, []);

    const CHAT_LIST = useCallback(async () => {
        const socket = io('http://localhost:8888/api');
        var fileDirectory = await FileSystem.documentDirectory;
        var fileUri = await FileSystem.documentDirectory + 'user_seq_1';
        // await FileSystem.makeDirectoryAsync(fileDirectory + 'user_seq_1', {
        //     intermediates : false
        // });
        // await FileSystem.writeAsStringAsync(fileUri, "Hello World asdas", { encoding : FileSystem.EncodingType.UTF8})
        var Directory = await FileSystem.readDirectoryAsync(fileDirectory);
        console.log('Directory', Directory);
        var readFile = await FileSystem.readAsStringAsync(fileUri);
        console.log('File', readFile);
        
    }, []);

    useEffect(() => {
        CHAT_LIST()
    }, [CHAT_LIST]);

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                {
                    chatlist.map((data) => {
                        return (
                            <TouchableOpacity style={styles.ChatBox} onPress={() => navigation.navigate('ChatDetail')}>
                                <View style={styles.ChatItem}>
                                    <View style={styles.ProfileContent}>
                                        <Text>Profile Image</Text>
                                    </View>
                                    <View style={styles.ChatContent}>
                                        <View style={styles.UserInfo}>
                                            <Text style={styles.UserTitle}>{data.user_name}</Text>
                                            <Text style={styles.LocationTitle}>{data.location.length > 10 ? data.location.substring(0, 10) + '...' : data.location}</Text>
                                        </View>
                                        <View>
                                            <Text>네 감사합니다</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.ItemContent}>
                                    <Text>Item Image</Text>
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
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    ChatBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)',
    },
    ChatItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ProfileContent: {
        padding: 5,
        width: width * 0.12,
        height: width * 0.12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },
    ChatContent: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ItemContent: {
        padding: 10,
        borderRadius: 10,
        width: width * 0.10,
        height: width * 0.10,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'pink'
    },
    UserInfo : {
        flexDirection : 'row',

    },
    UserTitle : {
        paddingRight : 5,
        fontSize : 15,
        fontWeight : '800',
    },
    LocationTitle : {
        color : 'rgba(140, 140, 140, 1)',
        fontSize : 14,
        fontWeight : '600'
    }
})

export default ChatScreen;