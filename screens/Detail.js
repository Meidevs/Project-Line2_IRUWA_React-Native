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
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import TimeGap from '../assets/components/TimeGap';
import Carousel from '../assets/components/Carousel';
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
    })
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
        item_title: null,
        item_image_url: [],
        cmp_seq : null,
        cmp_name: null,
        cmp_location: null,
        cmp_category_name: null,
        item_content: null,
        reg_date: null,
        pick_status: false,
        time_avg: null,
        view_coount: null,
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const items_seq = route.params.items_seq;
    const cmp_seq = route.params.cmp_seq;
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
                    item_image_url: data.uri,
                    item_title: data.item_name,
                    item_content: data.item_content,
                    item_reg: time_avg,
                    cmp_seq : ITEM_INFOs.CMP_INFOs.cmp_seq,
                    cmp_name: ITEM_INFOs.CMP_INFOs.cmp_name,
                    cmp_location: ITEM_INFOs.CMP_INFOs.cmp_location,
                    cmp_category_name: ITEM_INFOs.CMP_INFOs.category_name,
                    pick_status: ITEM_INFOs.PICK_STATUS,
                    time_avg: ITEM_INFOs.TIME_AVG,
                    view_count: ITEM_INFOs.VIEW_COUNT,
                })
                setOtherItem(ITEM_INFOs.NonSELECTED);
                setIsLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
        GET_ITEM_INFOs()
    }, []);

    const ComponentExp = useCallback(() => {
        if (isLoaded) {
            return (
                <View>
                    <Text>{itemInfos.item_content}</Text>
                </View>
            )
        }
    },[isLoaded]);

    useEffect(() => {
        ComponentExp();
    }, [ComponentExp])

    return (
        <SafeAreaView style={styles.Container}>
            <StatusBar />
            <Animated.View
                style={[styles.HeaderStyle, {
                    backgroundColor: yColor,
                    borderBottomWidth: 1,
                    borderColor: ybColor
                }]}>
                <View style={styles.HeaderBackBtn}>
                    <Icon name='ios-arrow-back' size={30} color={yiColor} onPress={() => navigation.navigate('Main')} />
                </View>
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
                    [{ nativeEvent: { contentOffset: { y: scrollY }}}],
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
                    <View style={styles.SellerContent}>
                        <View style={styles.SellerBox}>
                            <Text>Image</Text>
                            <View style={styles.SellerTxtBox}>
                                <Text>{itemInfos.cmp_name}</Text>
                                <Text>{itemInfos.cmp_location}</Text>
                            </View>
                        </View>
                        <View style={styles.SellerInfoBox}>
                            <Text>{itemInfos.time_avg}</Text>
                        </View>
                    </View>
                    <View style={styles.ItemBox}>
                        <View style={styles.TitleBox}>
                            <View>
                                <Text style={styles.ItemTitleTxtStyle}>{itemInfos.item_title}</Text>
                            </View>
                            <View style={styles.ItemSimpleInfo}>
                                <Text>{itemInfos.cmp_category_name}</Text>
                                <Text>{itemInfos.item_reg}</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                {
                                    ComponentExp()
                                }
                            </View>
                        </View>
                        <View>
                            <Text>조회 {itemInfos.view_count}</Text>
                        </View>
                    </View>
                    <View style={styles.ItemBox}>
                        <View style={styles.TitleBox}>
                            <View style={styles.TitleBorder}>
                                <Text style={styles.ItemTitleTxtStyle}>{itemInfos.cmp_name}의 광고 목록</Text>
                            </View>
                        </View>
                        <View style={styles.ADSBox}>
                            {
                                itemsArray.map((data, index) => {
                                    return (
                                        <TouchableOpacity 
                                        style={styles.ADSContent} 
                                        key={data.items_seq}
                                        onPress={() => navigation.replace('Detail', {
                                            cmp_seq : itemInfos.cmp_seq,
                                            items_seq : data.items_seq
                                        })}
                                        >
                                            <View style={styles.ImageArea}>
                                                <Image source={{ uri: data.uri[0] }} style={styles.ItemsImages} />
                                            </View>
                                            <View style={styles.NameArea}>
                                                <Text>{data.item_name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <View style={styles.ContentBtn}>
                <TouchableOpacity style={styles.PickContent}>
                    <Icon name={'ios-heart-empty'} size={30} />
                </TouchableOpacity>
                <View style={styles.ChatContent}>
                    <TouchableOpacity style={styles.ChatBtn} onPress={() => navigation.navigate('ChatDetail')}>
                        <Text style={styles.ChatTxtStyle}>채팅으로 거래하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    HeaderStyle: {
        height: height * 0.06,
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        width: width,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    HeaderBackBtn: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    HeaderTitle: {
        flex: 5,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    HeaderTitleTxtStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    ScrollView: {
    },

    ContentBox: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: height * 0.07,
        paddingRight: 10,
        paddingLeft: 10,
    },
    SellerContent: {
        width: width * 0.9,
        height: height * 0.10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)'
    },
    SellerBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    SellerTxtBox: {
        flexDirection: 'column',
        padding: 15
    },
    SellerInfoBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    ItemBox: {
        width: width * 0.9,
        justifyContent: 'flex-start',
    },
    TitleBox: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    ItemTitleTxtStyle: {
        fontSize: 24,
        fontWeight: '900',
        color: 'rgba(50, 50, 50, 1)'
    },
    ItemSimpleInfo: {
        marginTop: 5,
        flexDirection: 'row',
    },
    ContentBtn: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        padding: 10,
        height: height * 0.07,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderTopWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)'
    },
    PickContent: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)'
    },
    ChatContent: {
        flex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ChatBtn: {
        flex: 1,
        marginRight: 30,
        height: height * 0.05,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 138, 60, 1)',
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
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
    ADSBox: {
        height: width,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ADSContent: {
        padding: 5,
        height: width * 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageArea: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    NameArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ItemsImages: {
        margin: 5,
        width: width * 0.30,
        height: width * 0.30,
        borderRadius: 5,
        resizeMode: 'cover'
    }
})

export default DetailScreen;