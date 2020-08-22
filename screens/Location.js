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
    const [keys, setAllKeys] = useState([]);
    const [yPosition, setYposition] = useState(null);
    const [location, setLocation] = useState(null);
    const [prevLocate, setPrevLocate] = useState([[]]);
    const [currentLocation, setUserLocation] = useState('');
    const [isLoaded, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        }, []);
    });
    useEffect(() => {
        const GET_ALL_KEYS = async () => {
            const allKeys = await AsyncStorage.getAllKeys();
            var filtered = allKeys.filter(key => key != "@my_Key");
            setAllKeys(filtered);
        }
        GET_ALL_KEYS();
    }, []);

    useEffect(() => {
        const GET_CURRENT_LOCATION = async () => {
            let position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest
            });
            var response = await ROADAPI.GET_CURRENT_LOCATION(position);
            setUserLocation(response);
        };
        GET_CURRENT_LOCATION();
    }, []);

    useEffect(() => {
        const READ_PREVIOUSE_LOCATION = async () => {
            const prevLocations = await AsyncStorage.multiGet(keys);
            setPrevLocate(prevLocations);
            setIsLoading(true)
        };
        READ_PREVIOUSE_LOCATION();
    }, [keys])

    const UPDATE_CURRENT_LOCATION = async () => {
        console.log(currentLocation)
        var UPDATE_RESULT = await AUTHENTICATION.UPDATE_USER_LOCATION(currentLocation);
        if (UPDATE_RESULT) {
            var object = {
                id: keys.length + 1,
                location_name: currentLocation,
            }
            var key = '@my_prev_location_' + (keys.length + 1);
            await AsyncStorage.setItem(key, JSON.stringify(object));
            navigation.popToTop('Main');
        }
    }

    const DELETE_PREV_LOCATION = async (index) => {
        try {
            var keyString = "@my_prev_location_" + (index + 1);
            setAllKeys([...keys.filter(data => data != keyString)])
            await AsyncStorage.removeItem(keyString);
        } catch (err) {
            console.log(err)
        }
    }

    const SEARCH_LOCATIONS = async () => {
        var address = location;
        var SEARCH_RESULT = await ROADAPI.SEARCH_ADDRESS(address);
        console.log(SEARCH_RESULT.meta)
        if (SEARCH_RESULT.meta.is_end == true)
        navigation.navigate('SearchLocation', {
            search_locations : SEARCH_RESULT
        })
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
                                value={location}
                                placeholder={'예) 배민동'}
                                placeholderTextColor='#B4B4B4'
                                onChangeText={(text) => setLocation(text)}
                            />
                        </View>
                        <TouchableOpacity style={styles.SearchInputBtn} onPress={() => SEARCH_LOCATIONS()}>
                            <Icon name={'ios-search'} size={32} />
                        </TouchableOpacity>
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
                            if (data[0] != undefined) {
                                return (
                                    <View style={styles.Locations}>
                                        <TouchableOpacity key={JSON.stringify(index)} style={styles.ContentCenter}>
                                            <Text style={{ textAlignVertical: 'center' }}>
                                                {JSON.parse(data[1]).location_name}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.ContentCenter} onPress={() => DELETE_PREV_LOCATION(index)}>
                                            <Icon name={'ios-close'} size={32} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            } else {
                                <View>
                                </View>
                            }
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
        height: 80,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(230, 230, 230, 1)',
    },
    ContentCenter: {
        justifyContent: 'center',
        alignContent: 'center'
    }
})

export default LocationScreen;