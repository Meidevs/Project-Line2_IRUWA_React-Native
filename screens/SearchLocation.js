import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

function SearchLocationScreen({ route, navigation }) {
    console.log('Route', route)
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={styles.HeaderLeftBox}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name={'ios-arrow-round-back'} size={36} />
                    </TouchableOpacity>
                </View>
            ),
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <View style={styles.SearchTitle}>
                        <Icon name={'ios-search'} size={24} />
                        <TextInput style={styles.SearchInput} placeholder={'지역명 (동, 읍, 면)으로 검색'} />
                    </View>
                    <TouchableOpacity style={styles.SearchBtn}>
                        <Text style={styles.SearchBtnTxt}>현재 위치로 검색</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerStyle: {
                height: height * 0.13,
                elevation: 0,
            }
        })
    }, []);
    const GET_LOCATIONS_NEARBY = useCallback(async () => {
        const data = await DATA_SOURCE.GetLocationList();
        var locations = [
            { name: '서울 구로구 구로제3동' },
            { name: '서울 금천구 가산동' },
            { name: '서울 관악구 조원동' },
            { name: '서울 구로구 가리봉동' },
            { name: '서울 금천구 독산제3동' },
            { name: '서울 영등포구 대림제2동' },
        ]
        setLocations(locations);
    })

    useEffect(() => {
        GET_LOCATIONS_NEARBY()
    }, [GET_LOCATIONS_NEARBY])
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.TitleContent}>
                    <View>
                        <Text>근처 동네</Text>
                    </View>
                    {
                        locations.map((data) => {
                            return (
                                <View>
                                    <Text>{data.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    HeaderLeftBox: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    HeaderTitleBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    SearchTitle: {
        flex: 1,
        marginBottom: 15,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: 'rgba(215, 215, 215, 1)'
    },
    SearchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
    },
    SearchBtn: {
        flex: 1,
        borderRadius: 15,
        width: width * 0.8,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 138, 60, 1)',
        elevation: 2,
    },
    SearchBtnTxt: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 1)'
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 10,
    },
    TitleContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
})

export default SearchLocationScreen;