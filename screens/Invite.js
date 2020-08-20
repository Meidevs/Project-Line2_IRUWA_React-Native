import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

function InviteScreen({ route, navigation }) {

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

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.IntroBox}>
                    <Text>이루와에 친구를 초대하세요! 고객님이 초대한 친구가 가입하면 두 사람 모두 쿠폰을 1개를 받아요. 친구 세 명을 초대할 때마다 스타벅스 커피 1잔 쿠폰을 드려요. (인당 최대 30장)</Text>
                </View>
                <View style={styles.InviteBox}>
                    <TouchableOpacity style={styles.BtnContent}>
                        <Text style={styles.BtnTxtStyle}>카카오톡으로 초대하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnContent}>
                        <Text style={styles.BtnTxtStyle}>URL 링크로 초대하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.CurrentCouponTitle}>
                    <Text style={styles.CouponTitleTxt}>현재 받은 쿠폰</Text>
                </View>
                <View style={styles.CurrentCouponList}>
                    <View>
                        <View>
                            <Icon name={'ios-card'} size={40} />
                        </View>
                        <Text>쿠폰 1</Text>
                    </View>
                    <View>
                        <View>
                            <Icon name={'ios-card'} size={40} />
                        </View>
                        <Text>쿠폰 2</Text>
                    </View>
                    <View>
                        <View>
                            <Icon name={'ios-card'} size={40} />
                        </View>
                        <Text>대기중</Text>
                    </View>
                </View>
                <View style={styles.CheckCouponBox}>
                    <TouchableOpacity style={styles.BtnContent}>
                        <Text style={styles.BtnTxtStyle}>내 쿠폰함 가기</Text>
                    </TouchableOpacity>
                    <View style={styles.CheckCouponText}>
                        <Text>지금까지 쿠폰 0개를 받았어요</Text>
                        <Text>(최대 30개까지 받을 수 있어요!)</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    SettingHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    IntroBox: {
        padding: 15,
        marginBottom: 10,
    },
    InviteBox: {
        height: height * 0.2,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        paddingRight: 15,
        paddingLeft: 15,
    },
    BtnContent: {
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        padding: 20,
    },
    BtnTxtStyle: {
        alignSelf: 'center'
    },
    CurrentCouponTitle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,
    },
    CouponTitleTxt: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    CurrentCouponList: {
        height: height * 0.10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    CheckCouponBox : {
        height: height * 0.15,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        paddingRight: 15,
        paddingLeft: 15,
    },
    CheckCouponText : {
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default InviteScreen;