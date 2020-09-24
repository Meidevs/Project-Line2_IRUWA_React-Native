import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    VirtualizedList,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import AUTHENTICATION from '../../dataSource/authModel';
const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    const items = data[index];
    if (data[index] != undefined) {
        return {
            items_seq: items.items_seq,
            item_name: items.item_name,
            sender_seq: items.sender_seq,
            sender_name: items.sender_name,
            receiver_seq: items.receiver_seq,
            receiver_name: items.receiver_name,
            reg_date: items.reg_date,
            cmp_seq: items.cmp_seq,
            cmp_name: items.cmp_name,
            receiver_profile: items.receiver_profile,
            sender_profile: items.sender_profile,
            messages : items.messages,
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, user, navigation }) => {
    const setNavigationParams = (data) => {
        var Tmp;
        if (data.sender_seq != user) {
            Tmp = data.sender_seq;
            data.sender_seq = user
            data.receiver_seq = Tmp;
        }
        navigation.navigate('Chat', {
            items_seq: data.items_seq,
            item_name: data.item_name,
            sender_seq: data.sender_seq,
            sender_name: data.sender_name,
            receiver_seq: data.receiver_seq,
            receiver_name: data.receiver_name,
            cmp_seq: data.cmp_seq,
            cmp_name: data.cmp_name,
            roomCode: data.roomCode
        })
    }

    var MESSAGE_LENGTH = data.messages.length;
    if (user === data.sender_seq) {
        return (
            <View>
                <TouchableOpacity
                    style={styles.ListBox}
                    onPress={() => setNavigationParams(data)}
                >
                    <View style={styles.LeftArea}>
                        <Image source={data.receiver_profile} style={styles.ImageAround} />
                    </View>
                    <View style={styles.RightArea}>
                        <View style={styles.UserInfo}>
                            <Text style={styles.NameSpace}>{data.cmp_name}</Text>
                        </View>
                        <View style={styles.LatestMessage}>
                            <Text style={styles.MessageArea}>{data.messages[MESSAGE_LENGTH - 1].message}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View >
        )
    } else {
        return (
            <View>
                <TouchableOpacity
                    style={styles.ListBox}
                    onPress={() => setNavigationParams(data)}
                >
                    <View style={styles.LeftArea}>
                        <Image source={data.sender_profile} style={styles.ImageAround} />
                    </View>
                    <View style={styles.RightArea}>
                        <View style={styles.UserInfo}>
                            <Text style={styles.NameSpace}>{data.sender_name}</Text>
                        </View>
                        <View style={styles.LatestMessage}>
                            <Text style={styles.MessageArea}>{data.messages[MESSAGE_LENGTH - 1].message}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}

const ChatListUp = ({ data, user, navigation }) => {
    const [items, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        let isCancelled = true;
        const GET_USER_PROFILE = async () => {
            var newArray = data.params;
            for (var i = 0; i < newArray.length; i++) {
                var sender_profile = await AUTHENTICATION.GET_USER_PROFILE(newArray[i].sender_seq);
                if (sender_profile.flags == 0) {
                    newArray[i].sender_profile = { uri: sender_profile.message }
                } else {
                    newArray[i].sender_profile = require('../../images/defaultProfile.png')
                }
                var receiver_profile = await AUTHENTICATION.GET_USER_PROFILE(newArray[i].receiver_seq);
                if (receiver_profile.flags == 0) {
                    newArray[i].receiver_profile = { uri: receiver_profile.message }
                } else {
                    newArray[i].receiver_profile = require('../../images/defaultProfile.png')
                }
            }
            if (isCancelled) {
                setData(newArray);
                setIsLoaded(true);
            }
        }
        GET_USER_PROFILE();
        return () => isCancelled = false;
    }, [data]);

    if (isLoaded) {
        return (
            <View>
                <VirtualizedList
                    data={items}
                    initialNumToRender={10}
                    renderItem={({ item }) => <Item data={item} user={user} navigation={navigation} />}
                    keyExtractor={item => item.items_seq.toString()}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            </View>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    ListBox: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: 1,
        padding: 15,
        borderTopWidth : 0.5,
        borderBottomWidth : 0.5,
        borderColor : 'rgba(235, 235, 235, 1)'
    },
    LeftArea: {
        flex: 1,
        alignItems : 'center',
        justifyContent: 'center'
    },
    ImageAround : {
        width : width * 0.1,
        height : width * 0.1,
        borderRadius : 100,
    },
    RightArea: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    UserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    NameSpace : {
        fontSize : 18,
        fontWeight : '700',
    },
    MessageArea : {
        fontSize : 16,
        fontWeight : '600'
    },
    LatestMessage: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default ChatListUp;