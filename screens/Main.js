import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    VirtualizedList,
    SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import AUTHENTICATION from '../assets/dataSource/authModel';
import TimeGap from '../assets/components/TimeGap';
import PremiumBanner from '../assets/components/PremiumBanner';
import GLOBAL from '../assets/dataSource/globalModel';
import CHATTING from '../assets/dataSource/chatModel';

const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    const items = data[index];
    if (data[index] != undefined) {
        return {
            items_seq: items.items_seq,
            item_name: items.item_name,
            cmp_location: items.cmp_location,
            reg_date: items.reg_date,
            cmp_seq: items.cmp_seq,
            uri: items.uri
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, user, navigation }) => {
    var time_gap = TimeGap(data.reg_date);
    return (
        <TouchableOpacity style={styles.ContentBox} onPress={() => navigation.navigate('Detail', {
            items_seq: data.items_seq,
            cmp_seq: data.cmp_seq,
            user_seq : user
        })}>
            <View style={styles.LeftArea}>
                <Image source={{ uri: data.uri[0] }} style={styles.ImageContent} />
            </View>
            <View style={styles.RightArea}>
                <Text>{data.item_name}</Text>
                <Text>{data.cmp_location}</Text>
                <Text>{time_gap}</Text>
            </View>
        </TouchableOpacity>
    );
}

function MainScreen({ route, navigation }) {
    const [data, setData] = useState([]);
    const [user_location, setUserLocation] = useState('');
    const [user_seq, setUserSeq] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(true);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <View></View>,
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <Text style={styles.HeaderTitleTxt}>IRUWA</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.RightHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Icon name="ios-search" size={28} color={'#000000'} style={{ padding: 10, }} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [user_location]);

    useFocusEffect(
        React.useCallback(() => {
            const GET_MAIN_INFOs = async () => {
                setIsError(false);
                setIsLoading(true);
                try {
                    const data = await AUTHENTICATION.GET_USER_INFOs();
                    const ITEMS = await DATA_SOURCE.GET_ITEMS(user_location);
                    setData(ITEMS.content);
                    setUserLocation(data.user_location);
                    setUserSeq(data.user_seq);
                } catch (err) {
                    setIsError(true);
                }
                setIsLoading(false);
            }
            GET_MAIN_INFOs();
        }, [user_location])
    );

    useEffect( () => {
        const SET_GLOBAL_SOCKET = async () => {
            var USER_INFOs = await CHATTING.USER_INFO();
            GLOBAL.SET_SOCKET_IO();
            GLOBAL.CONNECT_TO_SOCKET_IO(USER_INFOs.user_seq)
        }
        SET_GLOBAL_SOCKET();
    }, [])
    return (
        <SafeAreaView style={styles.Container}>
            <View>
                <TouchableOpacity style={styles.HeaderTitle} onPress={() => navigation.navigate('Location')} activeOpacity={0.6}>
                    <View style={styles.LocationBtn}>
                        <Text style={styles.CurrentLocationTxt}>{user_location}</Text>
                        <Icon name={'ios-arrow-dropdown-circle'} size={24} />
                    </View>
                </TouchableOpacity>
            </View>
            <PremiumBanner data={user_location} navigation={navigation} />
            <VirtualizedList
                data={data}
                initialNumToRender={10}
                renderItem={({ item }) => <Item data={item} user={user_seq} navigation={navigation} />}
                keyExtractor={(item, index) => JSON.stringify(index)}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    ContentBox: {
        height: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: 1,
        padding: 15,
    },
    LeftArea: {
        flex: 1,
        justifyContent: 'center'
    },
    RightArea: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    HeaderTitleBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    HeaderTitleTxt: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    HeaderTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width,
        height: width * 0.15,
    },
    LocationBtn : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        padding : 15,
    },
    CurrentLocationTxt : {
        fontSize : 18,
        fontWeight : '800',
        marginRight : 10,
    },
    ImageContent: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    }
})

export default MainScreen;