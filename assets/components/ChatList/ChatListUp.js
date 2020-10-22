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
            item_uri: items.item_uri,
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
            roomCode: items.roomCode,
            messages: items.messages,
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, user, navigation }) => {
    console.log(data)
    const setNavigationParams = (data) => {
        var Tmp_seq;
        var Tmp_name;
        if (data.sender_seq != user) {
            Tmp_seq = data.sender_seq;
            Tmp_name = data.sender_name;
            data.sender_seq = data.receiver_seq;
            data.sender_name = data.receiver_name;
            data.receiver_seq = Tmp_seq;
            data.receiver_name = Tmp_name;
        }
        navigation.navigate('Chat', {
            item_uri: data.item_uri,
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
    if (user === data.sender_seq && MESSAGE_LENGTH > 0) {
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
                            <Text style={styles.ItemNameSpace}>{data.item_name}</Text>
                        </View>
                        <View style={styles.LatestMessage}>
                            <Text style={styles.MessageArea}>{data.messages[MESSAGE_LENGTH - 1].message}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View >
        )
    } else if (user !== data.sender_seq && MESSAGE_LENGTH > 0) {
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
                            <Text style={styles.ItemNameSpace}>{data.item_name}</Text>
                        </View>
                        <View style={styles.LatestMessage}>
                            <Text style={styles.MessageArea}>{data.messages[MESSAGE_LENGTH - 1].message}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View >
        )
    } else {
        return null;
    }
}
const ChatListUp = ({ data, user, navigation }) => {
    const [items, setData] = useState([]);
    useEffect(() => {
        const GET_USER_PROFILE = async () => {
            var newArray = data.params;
            if (newArray.length > 0) {
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
            }
            setData(newArray);

        }
        GET_USER_PROFILE();
    }, [data]);
    console.log(items)
    if (items.length > 0) {
        return (
            <View>
                <VirtualizedList
                    data={items}
                    initialNumToRender={10}
                    renderItem={({ item }) => <Item data={item} user={user} navigation={navigation} />}
                    keyExtractor={item => item.roomCode.toString()}
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
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(235, 235, 235, 1)'
    },
    LeftArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageAround: {
        width: 45,
        height: 45,
        borderRadius: 100,
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
    NameSpace: {
        fontSize: 13,
        fontWeight: '700',
        color : '#000000',
        letterSpacing : -0.26,
        marginRight : 5,
    },
    ItemNameSpace : {
        fontSize : 13,
        fontWeight : '600',
        color : '#a2a2a2',
        letterSpacing : -0.26
    },
    MessageArea: {
        fontSize: 13,
        fontWeight : '600',
        color : '#000000',
        letterSpacing : -0.26
    },
    LatestMessage: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default ChatListUp;