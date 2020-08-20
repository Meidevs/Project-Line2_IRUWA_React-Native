import React, { useState, useEffect, useCallback } from 'react'
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

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

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
            uri : items.uri
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, navigation }) => {
    var time_gap = TimeGap(data.reg_date);
    return (
        <TouchableOpacity style={styles.ContentBox} onPress={() => navigation.navigate('Detail', {
            items_seq: data.items_seq,
            cmp_seq: data.cmp_seq
        })}>
            <View style={styles.LeftArea}>
                <Image source={{ uri : data.uri[0]}} style={styles.ImageContent}/>
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
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const GET_MAIN_INFOs = async () => {
                setIsError(false);
                setIsLoading(true);
                try {
                    const data = await AUTHENTICATION.GET_USER_LOCATION();
                    const ITEMS = await DATA_SOURCE.GET_ITEMS(user_location);
                    setData(ITEMS.content);
                    setUserLocation(data.user_location);
                } catch (err) {
                    setIsError(true)
                }
                setIsLoading(false);
            }
            GET_MAIN_INFOs();
        }, [user_location])
    );

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <TouchableOpacity style={styles.HeaderTitle} onPress={() => navigation.navigate('Location')}>
                        <Text>{user_location}</Text>
                        <Icon name={'ios-arrow-dropdown-circle'} size={24} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={styles.RightHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Icon name="ios-search" size={28} color={'#000000'} style={{ padding: 10, }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Alarm')}>
                        <Icon name="ios-notifications-outline" size={32} color={'#000000'} style={{ padding: 10, }} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [user_location]);

    return (
        <SafeAreaView style={styles.Container}>
            <VirtualizedList
                data={data}
                initialNumToRender={10}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item, index) => index}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)'
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
        alignItems: 'flex-start'
    },
    HeaderTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageContent : {
        resizeMode : 'contain',
        width : 100,
        height : 100,
    }
})

export default MainScreen;