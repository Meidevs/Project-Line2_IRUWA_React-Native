import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    VirtualizedList,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';

import DATA_SOURCE from '../assets/dataSource/dataModel';
import AUTHENTICATION from '../assets/dataSource/authModel';
import TimeGap from '../assets/components/TimeGap';
import PremiumBanner from '../assets/components/PremiumBanner';
import PreminumFrontAds from '../assets/components/PreminumFrontAds';
import GLOBAL from '../assets/dataSource/globalModel';

const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    const items = data[index];
    if (data[index] != undefined) {
        return {
            items_seq: items.items_seq,
            item_name: items.item_name,
            cmp_location: items.cmp_location,
            cmp_name: items.cmp_name,
            reg_date: items.reg_date,
            cmp_seq: items.cmp_seq,
            uri: items.uri,
            ads_type: items.ads_type,
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, user, navigation }) => {
    var time_gap = TimeGap(data.reg_date);
    var titleString = data.item_name.length > 20 ? data.item_name.substring(0, 19) + "..." : data.item_name;
    return (
        <View>
            <TouchableOpacity style={styles.ContentBox} onPress={() => navigation.navigate('Detail', {
                items_seq: data.items_seq,
                cmp_seq: data.cmp_seq,
                user_seq: user
            })}>
                <View style={styles.LeftArea}>
                    <Image source={{ uri: data.uri[0] }} style={styles.ImageContent} />
                </View>
                <View style={styles.RightArea}>
                    <Text style={styles.ItemName}>{titleString}</Text>
                    <Text style={styles.CmpLocation}>{data.cmp_name}</Text>
                    <Text style={styles.CmpLocation}>{data.cmp_location}</Text>
                    <Text style={styles.Time_Gap}>{time_gap}</Text>
                </View>
                {
                    data.ads_type == 1 ? (
                        <View style={styles.AdsType}>
                            <Image
                                source={require('../assets/images/category_ico_premium_green.png')}
                                style={{ width: 18, height: 18 }}
                            />
                        </View>
                    ) : (
                            null
                        )
                }
            </TouchableOpacity>
        </View>
    );
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function MainScreen({ route, navigation }) {
    const headerHeight = useHeaderHeight();
    const [data, setData] = useState([]);
    const [user_location, setUserLocation] = useState(null);
    const [user_seq, setUserSeq] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    // 
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <View></View>,
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <Text style={[styles.HeaderTitleTxt]}>IRUWA</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.RightHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Image
                            source={require('../assets/images/search_ico_white.png')}
                            style={{ width: 23, height: 23, }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerStyle: {
                backgroundColor: '#ffffff'
            }
        })
    }, [user_location]);

    // The useFocusEffect function works when this user sees this screen;
    // The GET_USER_INFOs function requests user_seq and user_location;
    useFocusEffect(
        React.useCallback(() => {
            let isCancelled = true;
            const GET_MAIN_INFOs = async () => {
                try {
                    const data = await AUTHENTICATION.GET_USER_INFOs();
                    if (isCancelled) {
                        setUserLocation(data.user_location);
                        setUserSeq(data.user_seq);
                    }
                } catch (err) {
                    alert(err)
                }
            }
            setIsLoad(true)
            GET_MAIN_INFOs();
            return () => isCancelled = false;
        }, [])
    );

    // The onRefresh function works when the user drags the view down;
    // In this case, the GET_ITEM requests new item lists at the REST endpoint;
    // It literally refreshes a list of items;
    const onRefresh = async () => {
        setRefreshing(true);
        const ITEMS = await DATA_SOURCE.GET_ITEMS(user_location);
        setData(ITEMS.content);
        wait(2000).then(() => setRefreshing(false));
    };

    // The GET_ITEMS function requests new list of items at the REST End-point;
    useEffect(() => {
        let isCancelled = true;
        const SET_DATAS = async () => {
            if (isCancelled) {
                if (user_location != null) {
                    const ITEMS = await DATA_SOURCE.GET_ITEMS(user_location);
                    setData(ITEMS.content);
                }
            }
        }
        SET_DATAS();
        return () => isCancelled = false;
    }, [user_location])

    // The SET_SOCKET_IO function make a initial connection to the socket.io;
    // The CONNECT_TO_SOCKET_IO function sends user_seq at the server to store user information;
    useEffect(() => {
        GLOBAL.SET_SOCKET_IO();
        GLOBAL.CONNECT_TO_SOCKET_IO(user_seq);
    }, [user_seq]);

    if (isLoad) {
        return (
            <SafeAreaView style={styles.Container}>
                <StatusBar
                    barStyle="dark-content"
                    // dark-content, light-content and default
                    hidden={false}
                    //To hide statusBar
                    backgroundColor="rgba(0, 0, 0, 0)"
                    //Background color of statusBar
                    translucent={false}
                    //allowing light, but not detailed shapes
                    networkActivityIndicatorVisible={true}
                />
                <ImageBackground source={require('../assets/images/MainBackground.png')}
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: width,
                        height: width * 0.7,
                    }}
                >
                    <View style={styles.MainBackground} />
                </ImageBackground>
                <View>
                    <TouchableOpacity
                        style={[styles.HeaderTitle, { marginTop: headerHeight }]}
                        onPress={() => navigation.navigate('Location')}
                        activeOpacity={0.6}
                    >
                        <View style={styles.LocationBtn}>
                            <Text style={styles.CurrentLocationTxt}>{user_location}</Text>
                            <View style={styles.SearchBtn}>
                                <Image
                                    source={require('../assets/images/search_ico_white.png')}
                                    style={{ width: 15, height: 15 }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <VirtualizedList
                    data={data}
                    initialNumToRender={4}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListHeaderComponent={() => {
                        // PremiumBanner is Swiper ads at the top of the list view
                        return <PremiumBanner data={user_location} navigation={navigation} />
                    }}
                    renderItem={({ item }) => <Item data={item} location={user_location} user={user_seq} navigation={navigation} />}
                    keyExtractor={(item, index) => JSON.stringify(index)}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />

                {/* PremiumFrontAds are ads that pop up right after the screen is rendered */}
                <PreminumFrontAds data={user_location} />
            </SafeAreaView>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    MainBackground: {
        position: 'absolute',
        top: 0,
        width: width,
        height: width * 0.7,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    ContentBox: {
        marginTop: 1,
        margin: 20,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        elevation: 0.5,
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
    ItemName: {
        flex: 1,
        flexShrink: 1,
        fontWeight: '800',
        color: '#000000'
    },
    CmpLocation: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        color: '#000000'
    },
    Time_Gap: {
        flex: 1,
        fontSize: 10,
        fontWeight: '600',
        color: '#a2a2a2',
        letterSpacing: -0.2,
    },
    AdsType: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    HeaderTitleBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    HeaderTitleTxt: {
        fontSize: 15,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    HeaderTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width,
        height: width * 0.15,
    },
    LocationBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 15,
    },
    CurrentLocationTxt: {
        fontSize: 25,
        fontWeight: '800',
        color: '#ffffff',
    },
    DropDownBtn: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SearchBtn: {
        width: 30,
        height: 30,
        padding: 8,
        marginLeft: 5,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(21, 186, 193, 0.45)'
    },
    ImageContent: {
        resizeMode: 'contain',
        borderRadius: 100,
        width: 80,
        height: 80,
    }
})

export default MainScreen;