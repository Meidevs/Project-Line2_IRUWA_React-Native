import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar,
    ActivityIndicator,
    Platform,
    Linking
} from 'react-native';

import Constants from "expo-constants";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import DATA_SOURCE from '../assets/dataSource/dataModel';
import CHATTING from '../assets/dataSource/chatModel';
import TimeGap from '../assets/components/TimeGap';
import Carousel from '../assets/components/Carousel';
import ContentCard from '../assets/components/Detail/ContentCard';
import CouponCard from '../assets/components/Detail/CouponCard';
import KeyGenerator from '../assets/components/KeyGenerator';
import AdvertisementList from '../assets/components/Detail/AdvertisementList';
import PhoneList from '../assets/components/Detail/PhoneList';
const { width, height } = Dimensions.get('window');

const _getHeaderBackgroundColor = (scrollY) => {
    const variable = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: ['rgba(255,255,255,0.0)', 'rgba(255,255,255,1.0)'],
        extrapolate: 'clamp',
        useNativeDriver: false
    });
    return variable;
}

const _getHeaderBorderColor = (scrollY) => {
    const variable = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: ['rgba(238, 238, 238, 0.0)', 'rgba(238, 238, 238, 1)'],
        extrapolate: 'clamp',
        useNativeDriver: false
    });
    return variable;
}

const scrollHandle = (event) => {
    var yPosition = event.nativeEvent.contentOffset.y;
    return yPosition;
}

const iconColorHandle = (event) => {
    const yiColor = [
        'rgba(255, 255, 255, 1)',
        'rgba(245, 245, 245, 1)',
        'rgba(235, 235, 235, 1)',
        'rgba(225, 225, 225, 1)',
        'rgba(215, 215, 215, 1)',
        'rgba(205, 205, 205, 1)',
        'rgba(195, 195, 195, 1)',
        'rgba(185, 185, 185, 1)',
        'rgba(175, 175, 175, 1)',
        'rgba(165, 165, 165, 1)',
        'rgba(155, 155, 155, 1)',
        'rgba(145, 145, 145, 1)',
        'rgba(135, 135, 135, 1)',
        'rgba(125, 125, 125, 1)',
        'rgba(115, 115, 115, 1)',
        'rgba(105, 105, 105, 1)',
        'rgba(95, 95, 95, 1)',
        'rgba(85, 85, 85, 1)',
        'rgba(75, 75, 75, 1)',
        'rgba(65, 65, 65, 1)',
        'rgba(55, 55, 55, 1)',
        'rgba(45, 45, 45, 1)',
        'rgba(35, 35, 35, 1)',
        'rgba(25, 25, 25, 1)',
        'rgba(15, 15, 15, 1)',
        'rgba(0, 0, 0, 1.0)',
    ];
    var yP = event.nativeEvent.contentOffset.y
    var iconColor;
    if (yP < 11) {
        iconColor = yiColor[0];
    } else if (yP >= 11 && yP < 22) {
        iconColor = yiColor[1];
    } else if (yP >= 22 && yP < 34) {
        iconColor = yiColor[2];
    } else if (yP >= 34 && yP < 46) {
        iconColor = yiColor[3];
    } else if (yP >= 46 && yP < 57) {
        iconColor = yiColor[4];
    } else if (yP >= 57 && yP < 68) {
        iconColor = yiColor[5];
    } else if (yP >= 68 && yP < 80) {
        iconColor = yiColor[6];
    } else if (yP >= 80 && yP < 91) {
        iconColor = yiColor[7];
    } else if (yP >= 91 && yP < 102) {
        iconColor = yiColor[8];
    } else if (yP >= 102 && yP < 113) {
        iconColor = yiColor[9];
    } else if (yP >= 113 && yP < 124) {
        iconColor = yiColor[10];
    } else if (yP >= 124 && yP < 136) {
        iconColor = yiColor[11];
    } else if (yP >= 136 && yP < 147) {
        iconColor = yiColor[12];
    } else if (yP >= 147 && yP < 158) {
        iconColor = yiColor[13];
    } else if (yP >= 158 && yP < 170) {
        iconColor = yiColor[14];
    } else if (yP >= 170 && yP < 181) {
        iconColor = yiColor[15];
    } else if (yP >= 181 && yP < 192) {
        iconColor = yiColor[16];
    } else if (yP >= 192 && yP < 203) {
        iconColor = yiColor[17];
    } else if (yP >= 203 && yP < 215) {
        iconColor = yiColor[18];
    } else if (yP >= 215 && yP < 226) {
        iconColor = yiColor[19];
    } else if (yP >= 226 && yP < 237) {
        iconColor = yiColor[20];
    } else if (yP >= 237 && yP < 249) {
        iconColor = yiColor[21];
    } else if (yP >= 249 && yP < 260) {
        iconColor = yiColor[22];
    } else if (yP >= 260 && yP < 271) {
        iconColor = yiColor[23];
    } else if (yP >= 271 && yP < 282) {
        iconColor = yiColor[24];
    } else if (yP >= 282 && yP < 293) {
        iconColor = yiColor[25];
    } else {
        iconColor = yiColor[26];
    }
    return iconColor;
}
function DetailScreen({ route, navigation }) {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [yColor, setColor] = useState(null);
    const [ybColor, setBorderColor] = useState(null);
    const [yiColor, setIconColor] = useState('rgba(255,255,255, 1)');
    const [yPosition, setYposition] = useState(null);
    const [itemsArray, setOtherItem] = useState([]);
    const [itemInfos, setItemInfos] = useState({
        user_profile: null,
        item_title: null,
        item_image_url: [],
        cmp_seq: null,
        cmp_name: null,
        cmp_location: null,
        cmp_category_name: null,
        cmp_lon: null,
        cmp_lat: null,
        item_content: null,
        reg_date: null,
        pick_status: false,
        time_avg: null,
        view_coount: null,
    });
    const [coupon, setCoupon] = useState([]);
    const [phoneList, setPhoneList] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const items_seq = route.params.items_seq;
    const cmp_seq = route.params.cmp_seq;
    const user_seq = route.params.user_seq;

    useEffect(() => {
        const Color = _getHeaderBackgroundColor(scrollY);
        const BorderColor = _getHeaderBorderColor(scrollY);
        setBorderColor(BorderColor)
        setColor(Color)
    }, [])


    useEffect(() => {
        const GET_ITEM_INFOs = async () => {
            try {
                var ITEM_INFOs = await DATA_SOURCE.GET_ITEM_DETAIL(items_seq, cmp_seq);
                var data = ITEM_INFOs.SELECTED[0];
                var time_avg = TimeGap(data.reg_date);
                setItemInfos({
                    user_seq: user_seq,
                    user_profile: ITEM_INFOs.CMP_INFOs.profile_uri,
                    items_seq: data.items_seq,
                    item_image_url: data.uri,
                    item_title: data.item_name,
                    item_content: data.item_content,
                    ads_type: data.ads_type,
                    item_reg: time_avg,
                    cmp_seq: ITEM_INFOs.CMP_INFOs.cmp_seq,
                    cmp_name: ITEM_INFOs.CMP_INFOs.cmp_name,
                    cmp_location: ITEM_INFOs.CMP_INFOs.cmp_location,
                    cmp_category_name: ITEM_INFOs.CMP_INFOs.category_name,
                    cmp_lon: ITEM_INFOs.CMP_INFOs.cmp_lon,
                    cmp_lat: ITEM_INFOs.CMP_INFOs.cmp_lat,
                    pick_status: ITEM_INFOs.PICK_STATUS,
                    time_avg: ITEM_INFOs.TIME_AVG,
                    view_count: ITEM_INFOs.VIEW_COUNT,
                })
                setCoupon(ITEM_INFOs.COUPON);
                setPhoneList(ITEM_INFOs.PHONE_LIST);
                setOtherItem(ITEM_INFOs.NonSELECTED);
                setIsLoad(true);
            } catch (err) {
                console.log(err);
            }
        }
        GET_ITEM_INFOs()
    }, []);

    const goToNavigation = () => {
        Linking.openURL(`https://kakaonavi-wguide.kakao.com/drive.html?ak=13da3914377346b0b8f74f5309b49dad&ctype=1&lt=${itemInfos.cmp_lat}&ln=${itemInfos.cmp_lon}`);
    }

    const setNavigationParams = async () => {
        var cmp_seq = itemInfos.cmp_seq;
        var items_seq = itemInfos.items_seq;
        var user_seq = itemInfos.user_seq;
        var USER_INFOs = await CHATTING.USER_INFO(user_seq);
        var CMP_INFOs = await CHATTING.CMP_INFO(cmp_seq);
        var ITEMS_INFOs = await CHATTING.ITEM_INFO(items_seq);
        var roomCode = 'RoomU' + user_seq + 'C' + cmp_seq + 'I' + items_seq;
        const keyString = await KeyGenerator(roomCode);
        navigation.navigate('ChatInitial', {
            item_uri: itemInfos.item_image_url[0],
            items_seq: ITEMS_INFOs.items_seq,
            item_name: ITEMS_INFOs.item_name,
            sender_seq: USER_INFOs.user_seq,
            sender_name: USER_INFOs.user_name,
            receiver_seq: CMP_INFOs.host_seq,
            receiver_name: CMP_INFOs.host_name,
            cmp_seq: CMP_INFOs.cmp_seq,
            cmp_name: CMP_INFOs.cmp_name,
            roomCode: keyString
        })
    }
    const InterestList = async () => {
        var RESULT = await DATA_SOURCE.UPDATE_ITEM_PICK(items_seq);
        if (RESULT.flags !== 2) {
            setItemInfos({
                ...itemInfos,
                pick_status: !itemInfos.pick_status
            })
            alert(RESULT.message);
        } else {
            alert(RESULT.message);
        }
    }
    const NavigationBack = () => {
        setIsLoad(false);
        navigation.goBack();
    }
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
                <Animated.View
                    style={[styles.HeaderStyle, {
                        backgroundColor: yColor,
                        borderBottomWidth: 1,
                        borderColor: ybColor,
                    }]}>
                    <TouchableOpacity style={styles.HeaderBackBtn} onPress={() => NavigationBack()} >
                        <Image source={require('../assets/images/back_button.png')} />
                    </TouchableOpacity>
                    <View style={styles.HeaderTitle}>
                        <Text style={styles.HeaderTitleTxtStyle}>
                            {yPosition > 300 ?
                                itemInfos.item_title != null ?
                                    itemInfos.item_title : null
                                : null}
                        </Text>
                    </View>
                </Animated.View>
                <Animated.ScrollView style={styles.ScrollView}
                    overScrollMode={'never'}
                    scrollEventThrottle={26}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        {
                            useNativeDriver: false,
                            listener: event => {
                                setYposition(scrollHandle(event)),
                                    setIconColor(iconColorHandle(event))
                            }
                        }
                    )}>
                    <Carousel
                        data={itemInfos.item_image_url}
                        navigation={navigation}
                    />
                    <View style={styles.ContentBox}>
                        <View style={styles.ProfileContent}>
                            <View style={styles.ProfileImageArea}>
                                {
                                    itemInfos.user_profile == null ? (
                                        <Image source={require('../assets/images/defaultProfile.png')}
                                            borderRadius={70}
                                            resizeMode={'contain'}
                                            style={{ width: 45, height: 45, marginRight: 15, }}
                                        />
                                    ) : (
                                            <Image source={{ uri: itemInfos.user_profile }}
                                                borderRadius={70}
                                                resizeMode={'contain'}
                                                style={{ width: 45, height: 45, marginRight: 15, }}
                                            />
                                        )
                                }
                                <Text style={styles.CmpNameTxt}>{itemInfos.cmp_name}</Text>
                            </View>
                            <View style={styles.ProfileInfoBox}>
                                <TouchableOpacity
                                    style={styles.PickContent}
                                    onPress={() => InterestList()}
                                >
                                    {
                                        itemInfos.pick_status == true ?
                                            (
                                                <Image source={require('../assets/images/like_ico_selected.png')} />
                                            ) : (
                                                <Image source={require('../assets/images/like_ico_default.png')} />
                                            )
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.CmpInfo}>
                            <View style={styles.CmpAddress}>
                                <Text style={styles.AddresForm}>주소.</Text>
                                <Text style={styles.AddressTxt}>{itemInfos.cmp_location}</Text>
                            </View>
                        </View>
                        <ContentCard data={itemInfos} />
                        <CouponCard data={coupon} />
                        <View style={styles.ItemBox}>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: '#000000'
                            }}>{itemInfos.cmp_name}의 위치</Text>
                        </View>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: itemInfos.cmp_lat,
                                longitude: itemInfos.cmp_lon,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                            style={{ width: width * 0.8, height: width * 0.8, marginBottom: 25, marginTop: 25, }}
                        >
                            <Marker
                                key={itemInfos.cmp_seq.toString()}
                                coordinate={{ latitude: itemInfos.cmp_lat, longitude: itemInfos.cmp_lon }}
                            />
                        </MapView>
                        <View style={styles.ItemBox}>
                            <AdvertisementList data={itemInfos} list={itemsArray} navigation={navigation} />
                        </View>
                        <View style={styles.ItemBox}>
                            <PhoneList data={itemInfos} list={phoneList} />
                        </View>
                    </View>
                </Animated.ScrollView>
                <View style={styles.ContentBtn}>
                    <TouchableOpacity
                        style={styles.ChatBtn}
                        onPress={() => setNavigationParams()}
                    >
                        <Text style={styles.ChatTxtStyle}>채팅</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.NavigationBtn}
                        onPress={() => goToNavigation()}
                    >
                        <Text style={styles.ChatTxtStyle}>길안내</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        )
    } else {
        return (
            <View style={styles.Loading}>
                <ActivityIndicator
                    animating={true} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    HeaderStyle: {
        position: 'absolute',
        zIndex: 1,
        width: width,
        marginTop: Platform.OS == 'ios' ? Constants.statusBarHeight : null,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    HeaderBackBtn: {
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    HeaderTitle: {
        padding: 15,
    },
    HeaderTitleTxtStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    ScrollView: {
    },
    ContentBox: {
        width: width,
        flexDirection: 'column',
        alignItems: 'center',
    },
    ProfileContent: {
        margin: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ProfileImageArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CmpNameTxt: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#000000'
    },
    ProfileInfoBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    PickContent: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)'
    },
    CmpInfo: {
        width: width,
    },
    CmpAddress: {
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    AddresForm: {
        fontSize: 13,
        fontWeight: '600',
        color: '#a2a2a2',
        marginRight: 10,
    },
    AddressTxt: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
    },
    ItemBox: {
        width: width * 0.9,
        justifyContent: 'flex-start',
    },
    ItemSimpleInfo: {
        marginTop: 5,
        flexDirection: 'row',
    },
    ContentBtn: {
        width: width,
        flexDirection: 'row',
        backgroundColor: '#15bac1',
    },
    ChatBtn: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NavigationBtn: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        borderColor: '#ffffff'
    },
    ChatTxtStyle: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: '700'
    },
    TitleBorder: {
        borderTopWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)',
        paddingTop: 20,
        paddingBottom: 20,
    },

});

export default DetailScreen;