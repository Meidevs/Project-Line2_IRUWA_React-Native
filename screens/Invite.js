import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView,
    Share,
    Platform,
} from 'react-native';

import { Buffer } from "buffer";
import AUTHENTICATION from '../assets/dataSource/authModel';

const { width, height } = Dimensions.get('window');

function InviteScreen({ route, navigation }) {
    const [coupons, setCoupons] = useState([1, 2, 3]);
    const [emailString, setEmailBase64] = useState(null);
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>초대하기</Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.SettingHeader}>
                </TouchableOpacity>
            )
        })
    }, []);

    useEffect(() => {
        const GET_USER_INFO = async () => {
            var user_info = await AUTHENTICATION.GET_USER_INFOs();
            var user_coupon = await AUTHENTICATION.GET_COUPONS();
            var stringToBase64 = await Buffer(user_info.user_email);
            var s = stringToBase64.toString('base64');
            setEmailBase64(s);
            setUserName(user_info.user_name)
        }
        GET_USER_INFO();
    }, [])

    const onShare = async () => {
        try {
            if (Platform.OS == 'android') {
                await Share.share({
                    title: userName + '님께서 초대 메세지를 보냈습니다',
                    message: `https://play.google.com/store/apps/details?id=com.Line2.test \n초대 코드 : ` + emailString,
                });
            } else {
                await Share.share({
                    title: userName + '님께서 초대 메세지를 보냈습니다',
                    url: 'https://play.google.com/store/apps/details?id=com.Line2.test \n',
                    message : '초대 코드 : ' + emailString,
                });
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.IntroBox}>
                    <View style={styles.IntroTitle}>
                        <Image source={require('../assets/images/invite_ico.png')}
                            style={{ width: 20, height: 14, marginRight: 10 }}
                        />
                        <Text style={styles.IntroTxt}>이루와에 친구를 초대하세요!</Text>
                    </View>
                    <Text style={styles.IntroContent}>
                        고객님이 초대한 친구가 가입하면 두 사람 모두 쿠폰을 1개를 받아요. 친구 세 명을 초대할 때마다 스타벅스 커피 1잔 쿠폰을 드려요! (인당 최대 30장)
                    </Text>
                </View>
                <View style={styles.InviteBox}>
                    <TouchableOpacity style={styles.KakaoBtnContent} onPress={() => alert('앗! 죄송합니다. 아직 준비중입니다.')}>
                        <Image source={require('../assets/images/kakao_ico.png')}
                            style={{ marginRight: 15 }}
                        />
                        <Text style={styles.BtnTxtStyle}>카카오톡으로 초대하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.UrlBtnContent} onPress={() => onShare()}>
                        <Image source={require('../assets/images/share_ico.png')}
                            style={{ width: 18, height: 20, marginRight: 15 }}
                        />
                        <Text style={styles.BtnTxtStyle}>URL 링크로 초대하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.SectionBorder}>
                    <View
                        style={{ borderWidth: 0.5, borderColor: '#f2f2f2', width: width * 0.8 }}
                    />
                </View>
                <View style={styles.CurrentCouponTitle}>
                    <Image source={require('../assets/images/invite_ico.png')}
                        style={{ width: 20, height: 14, marginRight: 10 }}
                    />
                    <Text style={styles.CouponTitleTxt}>나의 쿠폰</Text>
                </View>
                <View style={styles.CheckCouponBox}>
                    <Text style={styles.CouponTxt}>지금까지 쿠폰 0개를 받았어요</Text>
                    <Text style={styles.CouponTxt}>(최대 30개까지 받을 수 있어요!)</Text>
                </View>
                {
                    coupons.map((data, index) => {
                        return (
                            <View style={styles.CouponArea} key={index.toString()}>
                                <View style={styles.LeftArea}>
                                    <Image source={require('../assets/images/thumbnail.png')}
                                        style={{ marginRight: 15 }}
                                    />
                                    <Text style={styles.CouponTxt_a}>스타벅스 쿠폰</Text>
                                </View>
                                <View style={styles.RightArea}>
                                    <Text style={styles.DateTxt}>2020.09.01까지</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <TouchableOpacity style={styles.goToCoupon} onPress={() => alert('앗! 죄송합니다. 아직 준비중입니다.')}>
                <Text style={styles.goToCouponTxt}>내 쿠폰함 가기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    SettingHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    IntroBox: {
        margin: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    IntroTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
    },
    IntroTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        letterSpacing: -0.3,
    },
    IntroContent: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: -0.26,
        lineHeight: 25,
    },
    InviteBox: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        paddingRight: 25,
        paddingLeft: 25,
    },
    KakaoBtnContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffde0a',
        marginBottom: 20
    },
    UrlBtnContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#cecece'
    },
    BtnTxtStyle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#070707'
    },
    SectionBorder: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
        marginBottom: 45
    },
    CurrentCouponTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 25,
    },
    CouponTitleTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        letterSpacing: -0.3
    },
    CheckCouponBox: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-start',
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 25
    },
    CouponTxt: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
        lineHeight: 25,
        letterSpacing: -0.26
    },
    CouponArea: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 25,
        paddingLeft: 25,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#f2f2f2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    LeftArea: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    CouponTxt_a: {
        fontSize: 13,
        fontWeight: '800',
        color: '#000000',
        letterSpacing: -0.26
    },
    RightArea: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    DateTxt: {
        fontSize: 10,
        fontWeight: '600',
        color: '#a2a2a2',
        letterSpacing: -0.2
    },
    goToCoupon: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    goToCouponTxt: {
        fontSize: 15,
        fontWeight: '800',
        color: '#ffffff'
    }
})

export default InviteScreen;