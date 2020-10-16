import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Animated,
    Alert,
} from 'react-native';

import DATA_SOURCE from '../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

function CouponScreen({ route, navigation }) {
    const {
        items_seq,
        item_name,
        item_content,
        coupon_content,
        coupon_due_date
    } = route.params;
    const [couponContent, setCouponContent] = useState(coupon_content);
    const [couponDueDate, setCouponDueDate] = useState(coupon_due_date);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>쿠폰 등록</Text>
                </View>
            ),
            headerRight: () =>
                <View style={styles.RightHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>삭제</Text>
                </View>
        })
    }, []);

    const setCouponText = (data) => {
        var stringlen = new Blob([data]).size;
        if (stringlen > 45) {
            var stringLength = data.length;
            data = data.substring(0, stringLength - 2);
        }
        setCouponContent(data);
    }

    const checkCouponCondition = async () => {
        var period;
        if (!couponDueDate | !couponContent) return Alert.alert(
            '알림',
            '쿠폰 내용을 입력해 주세요.',
            [
                { text: "확인" }
            ]
        )
        if (couponDueDate.includes('주')) {
            var str = couponDueDate.replace(/[^0-9]/g, '');
            period = parseInt(str) * 7;
        } else if (couponDueDate.includes('개월')) {
            var str = couponDueDate.replace(/[^0-9]/g, '');
            period = parseInt(str) * 30;
        } else if (couponDueDate.includes('년')) {
            var str = couponDueDate.replace(/[^0-9]/g, '');
            period = parseInt(str) * 365;
        } else {
            var str = couponDueDate.replace(/[^0-9]/g, '');
            period = parseInt(str);
        }
        Alert.alert(
            "쿠폰 내용을 확인해 주세요.",
            "쿠폰 내용 : " + couponContent + '\n쿠폰 적용 기간 : ' + period + '일',
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "확인",
                    onPress: () => saveCoupon(couponContent, period)
                }
            ]
        )
    }

    const saveCoupon = async (coupon_content, coupon_due_date) => {
        await DATA_SOURCE.SET_COUPON(items_seq, coupon_content, coupon_due_date);
    }

    return (
        <Animated.View style={[styles.Container, { bottom: Platform.OS == 'ios' ? keyboardHeight : null }]}>
            <View style={styles.SearchCard}>
                <View style={styles.SearchContent}>
                    <View style={styles.Section}>
                        <View style={styles.InnerSection}>
                            <Text style={styles.TitleTxt}>쿠폰 내용</Text>
                            <Text style={styles.SubTitleTxt}>쿠폰 내용을 입력해 주세요</Text>
                        </View>
                    </View>
                    <View style={styles.Section}>
                        <View style={styles.TextInput}>
                            <TextInput
                                value={couponContent}
                                placeholder={'쿠폰 내용을 입력해 주세요. (20자 이내)'}
                                onChangeText={text => setCouponText(text)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.SearchContent}>
                    <View style={styles.Section}>
                        <View style={styles.InnerSection}>
                            <Text style={styles.TitleTxt}>쿠폰 적용 기간</Text>
                            <Text style={styles.SubTitleTxt}>쿠폰 적용 기간을 입력해 주세요</Text>
                        </View>
                    </View>
                    <View style={styles.Section}>
                        <View style={styles.TextInput}>
                            <TextInput
                                value={couponDueDate}
                                placeholder={'기간을 입력해 주세요. (ex) 10일'}
                                onChangeText={text => setCouponDueDate(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.SearchBtn}>
                        <TouchableOpacity style={styles.BtnStyle} onPress={() => checkCouponCondition()}>
                            <Text style={styles.BtnTxt}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
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
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchCard: {
        width: width * 0.8,
        height: height * 0.6,
        paddingRight: 25,
        paddingLeft: 25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb'
    },
    Logo: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchContent: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 15,
    },
    Section: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    SearchBtn: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    InnerSection: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    TextInput: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnStyle: {
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 25,
        paddingLeft: 25,
        backgroundColor: '#15bac1'
    },
    TitleTxt: {
        fontSize: 17,
        fontWeight: '800',
        color: '#000000',
        letterSpacing: -0.3,
        marginBottom: 5,
    },
    SubTitleTxt: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: -0.16,
    },
    BtnTxt: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700'
    }
})

export default CouponScreen;