import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

function CouponScreen({ route, navigation }) {
    const {
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
        if (data.length > 20) {
            data.substring(0,20);
        }
        setCouponContent(data)
    }

    const checkCouponDueDate = () => {

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
                                onChangeText={text => checkCouponDueDate(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.SearchBtn}>
                        <TouchableOpacity style={styles.BtnStyle} onPress={() => setCoupon()}>
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
        fontSize: 18
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