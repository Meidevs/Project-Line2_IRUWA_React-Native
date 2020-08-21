import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    TextInput,
    Dimensions,
    AsyncStorage,
    ScrollView,
    SafeAreaView,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ROADAPI from '../assets/dataSource/roadAPI';
import AUTHENTICATION from '../assets/dataSource/authModel';

import Constants from "expo-constants";
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const scrollHandle = (event) => {
    var yPosition = event.nativeEvent.contentOffset.y;
    return yPosition;
}

function LocationScreen({ route, navigation }) {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [yPosition, setYposition] = useState(null);
    const [prevLocate, setPrevLocate] = useState([]);
    const [currentLocation, setUserLocation] = useState('');
    console.log(prevLocate);

    const READ_PREVIOUSE_LOCATION = useCallback(async () => {
        const prevLocation = await AsyncStorage.getItem('@my_prev_location');
        console.log('Before prevLocation', prevLocation);
        var prevLocationList = JSON.parse(prevLocation);
        console.log('After Parse prevLocation', prevLocationList);
        setPrevLocate(prevLocationList)
    }, []);

    const GET_CURRENT_LOCATION = useCallback(async () => {
        let position = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest
        });
        var response = await ROADAPI.GET_CURRENT_LOCATION(position);
        setUserLocation(response);
    }, []);

    useEffect(() => {
        READ_PREVIOUSE_LOCATION();
    }, [READ_PREVIOUSE_LOCATION])

    useEffect(() => {
        GET_CURRENT_LOCATION();
    }, [GET_CURRENT_LOCATION]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        }, []);
    })

    const UPDATE_CURRENT_LOCATION = async () => {
        var UPDATE_RESULT = await AUTHENTICATION.UPDATE_USER_LOCATION(response);
        if (UPDATE_RESULT) {

            await AsyncStorage.setItem('@my_Locations');
            navigation.popToTop('Main');
        }
    }
    return (
        <SafeAreaView style={styles.Container}>
            <StatusBar />
            <Animated.View style={styles.HeaderStyle} >
                <TouchableOpacity style={styles.HeaderContent} onPress={() => navigation.navigate('Main')}>
                    <Icon name={'ios-close'} size={40} />
                    {yPosition >= height * 0.06 ? (
                        <View style={styles.HeaderTitle}>
                            <Text style={styles.HeaderText}>배달 받을 주소</Text>
                        </View>
                    ) : (
                            null
                        )
                    }
                </TouchableOpacity>
            </Animated.View>
            <Animated.ScrollView
                style={styles.ScrollViewArea}
                overScrollMode={'never'}
                scrollEventThrottle={26}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: { contentOffset: { y: scrollY } }
                        }
                    ],
                    {
                        useNativeDriver: false,
                        listener: event => {
                            setYposition(scrollHandle(event))
                        }
                    }
                )}
            >
                <View style={styles.ComponentForm}>
                    <View style={styles.TitleBox}>
                        <Text style={styles.TitleText}>지역의 읍, 면, 동을</Text>
                        <Text style={styles.TitleText}>입력하세요</Text>
                    </View>
                    <View style={styles.SearchBox}>
                        <View style={styles.SearchInput}>
                            <TextInput
                                placeholder={'예) 배민동'}
                                placeholderTextColor='#B4B4B4' />
                        </View>
                        <View style={styles.SearchInputBtn}>
                            <Icon name={'ios-search'} size={32} />
                        </View>
                    </View>
                    <View style={styles.CurrentLocate}>
                        <TouchableOpacity style={styles.CLBtn} onPress={() => UPDATE_CURRENT_LOCATION()}>
                            <Icon name={'ios-locate'} size={20} />
                            <Text>현 위치로 주소 설정</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.LocationList}>
                    <View style={styles.PrevSearchTitle}>
                        <Text style={styles.PrevSearchText}>최근 주소</Text>
                    </View>
                    {
                        prevLocate.map((data, index) => {
                            return (
                                <TouchableOpacity key={JSON.stringify(index)} style={styles.Locations} >
                                    <Text style={{ textAlignVertical: 'center' }}>{data.location}</Text>
                                    <Icon name={'ios-close'} size={32} style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </Animated.ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)',
    },
    HeaderStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        width: width,
        padding: 20,
        height: height * 0.06,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    HeaderContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    HeaderTitle: {
        flex: 1,
        padding: 10,
    },
    HeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    ScrollViewArea: {
        marginTop: height * 0.06,
    },
    ComponentForm: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    TitleBox: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingRight: 20,
        paddingLeft: 20,
    },
    TitleText: {
        fontSize: 24,
        fontWeight: '800'
    },
    SearchBox: {
        paddingRight: 20,
        paddingLeft: 20,
        width: width,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    SearchInput: {
        width: width * 0.8,
        height: 50,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(200, 200, 200, 1)',
        backgroundColor: 'rgba(248, 249, 251, 1)',
    },
    SearchInputBtn: {
        width: width * 0.1,
        height: 50,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(200, 200, 200, 1)'
    },
    CurrentLocate: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 15,
        width: width,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    CLBtn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(200, 200, 200, 1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    LocationList: {
        marginTop: 15,
        paddingTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    PrevSearchTitle: {
        height: 20,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    PrevSearchText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    Locations: {
        height: 60,
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(230, 230, 230, 1)',
    }
})

export default LocationScreen;