import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
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

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    if (data[index]) {
        return {
            id: data[index].id,
            title: data[index].title,
            location: data[index].location,
            reg_date: data[index].reg_date,
            cmp_code: data[index].cmp_code
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, navigation }) => {
    return (
        <TouchableOpacity style={styles.ContentBox} onPress={() => navigation.navigate('Detail', {
            item_code: data.id,
            cmp_code: data.cmp_code
        })}>
            <View style={styles.LeftArea}>
                <Text>Image Area</Text>
            </View>
            <View style={styles.RightArea}>
                <Text>{data.title}</Text>
                <Text>{data.location}</Text>
                <Text>{data.reg_date}</Text>
            </View>
        </TouchableOpacity>
    );
}

const DATA_SET_ARRANGE = (LOCATIONS, ITEMS_LIST) => {
    var rawArray = new Array();
    var items_list = ITEMS_LIST;
    var locations = LOCATIONS;
    for (var i = 0; i < items_list.length; i++) {
        for (var j = 0; j < locations.length; j++) {
            if (items_list[i].locationid == locations[j].locationid && locations[j].status == 1) {
                rawArray.push(items_list[i]);
            }
        }
    }
    return { items_list: rawArray, locations: locations }
}

function MainScreen({ route, navigation }) {
    const [data, setData] = useState([]);
    const [user_location, setUserLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const GET_USER_LOCATION = async () => {
                setIsError(false);
                setIsLoading(true);
                try {
                    const data = await AUTHENTICATION.GET_USER_LOCATION();
                    console.log(data)
                    setUserLocation(data.user_location);
                } catch (err) {
                    setIsError(true)
                }
                setIsLoading(false);
            }
            GET_USER_LOCATION();
        }, [user_location])
    );

    const ITEM_INFOs = useCallback(async () => {
        const data = await DATA_SOURCE.GET_ITEMS(user_location);
        setData(data)
    }, [user_location]);

    useEffect(() => {
        ITEM_INFOs()
    }, [ITEM_INFOs]);

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
            {/* <VirtualizedList
                data={data.length == undefined ? [] : data}
                initialNumToRender={data.length}
                renderItem={({ item }) => <Item key={item.id} data={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            /> */}
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
    }
})

export default MainScreen;