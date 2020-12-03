import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    AsyncStorage,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import ROADAPI from '../assets/dataSource/roadAPI';
import AUTHENTICATION from '../assets/dataSource/authModel';
import AddressSearchBox from '../assets/components/AddressSearchBox';

import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const prevLocationExistence = async (location) => {
    var preArray = new Array();
    const allKeys = await AsyncStorage.getAllKeys();
    var prevKeys = allKeys.filter(item => item != "@my_Key");
    const prevLocations = await AsyncStorage.multiGet(prevKeys);
    for (var i = 0; i < prevLocations.length; i++) {
        preArray.push(JSON.parse(prevLocations[i][1]).location_name);
    }
    return preArray.includes(location);
}
function LocationScreen({ route, navigation }) {
    const [keys, setAllKeys] = useState([]);
    const [location, setLocation] = useState(null);
    const [prevLocate, setPrevLocate] = useState([[]]);
    const [currentLocation, setUserLocation] = useState(null);
    const [isLoaded, setIsLoading] = useState(false);
    const [visible, setModalVisible] = useState(false);

    // useEffect uses getCurrentPositionAsync function that is supported by EXPO library;
    // The getCurrentPositionAsync function returns latitude & longitude;
    // useEffect's GET_CURRENT_LOCATION function requests reversGeocoding through the Kakao Map API by passing the current location (lat, lon);
    useEffect(() => {
        let isCancelled = true;
        const GET_CURRENT_LOCATION = async () => {
            let position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest
            });
            var response = await ROADAPI.GET_CURRENT_LOCATION(position);

            if (isCancelled) {
                setUserLocation(response);
                setIsLoading(true);
            }
        };
        GET_CURRENT_LOCATION();
        return () => isCancelled = false;
    }, [currentLocation]);

    // AsyncStorage uses device's memory to save data;
    // useEffect's GET_ALL_KEYS function requests all stored keys except "@my_Key";
    useEffect(() => {
        const GET_ALL_KEYS = async () => {
            const allKeys = await AsyncStorage.getAllKeys();
            var filtered = allKeys.filter(key => key != "@my_Key");
            setAllKeys(filtered);
        };
        GET_ALL_KEYS();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <View style={styles.HeaderStyle}>
                    <TouchableOpacity style={styles.HeaderContent} onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../assets/images/close_button.png')}
                            style={{ width: 18, height: 18 }}
                        />
                    </TouchableOpacity>
                </View>,
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <Text style={styles.HeaderTitleTxt}>주소검색</Text>
                </View>
            ),
            headerRight: () => <View></View>,
            headerStyle: {
                height: 70,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            }
        })
    }, []);

    // useEffect's READ_PREVIOUS_LOCATION function requests multiple data and creates a list of previous locations;
    useEffect(() => {
        let isCancelled = true;
        const READ_PREVIOUSE_LOCATION = async () => {
            try {
                const prevLocations = await AsyncStorage.multiGet(keys);
                if (isCancelled) {
                    setPrevLocate(prevLocations);
                }
            } catch (err) {
                console.log(err);
            }
        };
        READ_PREVIOUSE_LOCATION();

        return () => isCancelled = false;
    }, [keys]);

    // The UPDATE_CURRENT_LOCATION function is used to update previous location to current location;
    // The UPDATE_USER_LOCATION function sends currentLocation value to the server to update current location;
    // If the return is true, the UPDATE_CURRENT_LOCATION function creates object that has key id & location name;
    // The prevLocationExistence function receives currentLocation value and compare with previous location lists;
    // And, if there are currentLocation, it doesn't store currentLocation value in AsyncStorage;
    // Finally, the currentLocation is stored in AsyncStorage;
    const UPDATE_CURRENT_LOCATION = async () => {
        try {
            if (!currentLocation) return alert('주소가 없습니다.')
            var UPDATE_RESULT = await AUTHENTICATION.UPDATE_USER_LOCATION(currentLocation);
            if (UPDATE_RESULT) {
                var object = {
                    id: keys.length + 1,
                    location_name: currentLocation,
                }
                var existence = await prevLocationExistence(currentLocation);
                if (!existence) {
                    var key = '@my_prev_location_' + (keys.length + 1);
                    setAllKeys([...keys, key]);
                    await AsyncStorage.setItem(key, JSON.stringify(object));
                }
                navigation.goBack();
            }
        } catch (err) {
            console.log(err);
        }
    };

    // The LocateCallback function updates the user's current location by receiving the generated location text and sending it to the server;
    // If the return is true, the UPDATE_CURRENT_LOCATION function creates object that has key id & location name;
    // The prevLocationExistence function receives currentLocation value and compare with previous location lists;
    // And, if there are currentLocation, it doesn't store currentLocation value in AsyncStorage;
    // Finally, the currentLocation is stored in AsyncStorage;
    const LocateCallback = async (Location) => {
        try {
            var UPDATE_RESULT = await AUTHENTICATION.UPDATE_USER_LOCATION(Location);
            if (UPDATE_RESULT) {
                var object = {
                    id: keys.length + 1,
                    location_name: Location,
                }
                setUserLocation(Location);
                var existence = await prevLocationExistence(Location);
                if (!existence) {
                    var key = '@my_prev_location_' + (keys.length + 1);
                    setAllKeys([...keys, key]);
                    await AsyncStorage.setItem(key, JSON.stringify(object));
                }
                navigation.goBack();
            }
        } catch (err) {
            console.log(err);
        }
    };

    // The DELETE_PREV_LOCATION function receives index, the index is used to find specific item from AsyncStorage, it uses index to create "@my_prev_location" key and filters/updates the previous locations matching the key;
    //Also, if removes key in AsyncStorage;
    const DELETE_PREV_LOCATION = async (index) => {
        try {
            var keyString = "@my_prev_location_" + (index + 1);
            setAllKeys([...keys.filter(data => data != keyString)])
            await AsyncStorage.removeItem(keyString);
        } catch (err) {
            console.log(err)
        }
    };

    // The ClearAll function removes all keys in AsyncStorage;
    const ClearAll = async () => {
        await AsyncStorage.multiRemove(keys);
        setAllKeys([])
    };
    // The callback function is passed to childComponent as a parameter and receives parameters from childComponent;
    // The variable sent from childComponent are true/false;
    const Callback = (ChildFrom) => {
        setModalVisible(ChildFrom)
    }

    return (
        <SafeAreaView style={styles.Container}>
            <StatusBar />
            <ScrollView
                style={styles.ScrollViewArea}
                overScrollMode={'never'}
                scrollEventThrottle={26}
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
                                placeholder={'예) 이루와동'}
                                placeholderTextColor='#B4B4B4'
                                onChangeText={(text) => setLocation(text)}
                                style={{ flex: 1, }}
                            />
                            <TouchableOpacity style={styles.SearchInputBtn} onPress={() => setModalVisible(true)}>
                                <Image
                                    source={require('../assets/images/search_ico.png')}
                                    style={{ width: 23, height: 23 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.CurrentLocate}>
                        <TouchableOpacity style={styles.CLBtn} onPress={() => UPDATE_CURRENT_LOCATION()}>
                            <Text>현위치 검색</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.LocationList}>
                    <View style={styles.PrevSearch}>
                        <View style={styles.PrevSearchTitle}>
                            <Image
                                source={require('../assets/images/address_ico.png')}
                                style={{ width: 22, height: 20 }}
                            />
                            <Text style={styles.PrevSearchText}>최근 주소</Text>
                        </View>
                        <TouchableOpacity onPress={() => ClearAll()}>
                            <Text>전체 삭제</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        prevLocate.map((data, index) => {
                            if (data[0] != undefined) {
                                return (
                                    <View
                                        key={index.toString()}
                                        style={index % 2 == 0 ? styles.Locations_a : styles.Locations_b}
                                    >
                                        <TouchableOpacity key={JSON.stringify(index)} style={styles.ContentCenter} onPress={() => LocateCallback(JSON.parse(data[1]).location_name)}>
                                            <Text style={{ textAlignVertical: 'center' }}>
                                                {JSON.parse(data[1]).location_name}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.ContentCenter} onPress={() => DELETE_PREV_LOCATION(index)}>
                                            <Text style={styles.DeleteTxt}>주소 삭제</Text>
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
            </ScrollView>
            <AddressSearchBox data={location} visible={visible} location={LocateCallback} callback={Callback} />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)',
    },
    HeaderStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    HeaderContent: {
        padding: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    HeaderTitleBox: {
        padding: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    HeaderTitleTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center'
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
        flex: 1,
        height: 50,
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(213, 213, 213, 1)',
        backgroundColor: 'rgba(242, 242, 242, 1)',
    },
    SearchInputBtn: {
        height: 50,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        width: width,
        borderTopWidth: 1,
        paddingTop: 20,
        borderColor: 'rgba(235, 235, 235, 1)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    PrevSearch: {
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    PrevSearchTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PrevSearchText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    Locations_a: {
        height: 80,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(230, 230, 230, 1)',
    },
    Locations_b: {
        height: 80,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(230, 230, 230, 1)',
        backgroundColor: 'rgba(250, 250, 250, 1)',
    },
    ContentCenter: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    DeleteTxt: {
        fontSize: 14,
        color: 'rgba(140, 140, 140, 1)'
    }
})

export default LocationScreen;