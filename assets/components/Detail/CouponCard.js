import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground
} from 'react-native';
const { width, height } = Dimensions.get('window');

const ContentCard = ({ data }) => {
    if (data.length > 0) {
        return (
            <ImageBackground
                style={styles.CardBox}
                borderRadius={20}
                resizeMode={'cover'}
                source={require('../../images/Coupon.png')}
            >
                <View style={styles.EventTitle}>
                    <Text style={styles.TitleTxt}>이벤트</Text>
                </View>
                <View style={styles.CouponContent} >
                    <Text style={styles.ContentTxt}>{data[0].coupon_content}</Text>
                </View>
                <View style={styles.CouponDueDate} >
                    <Text style={styles.DueDateTxt}>{data[0].coupon_due_date.substring(0,10)}까지</Text>
                </View>
            </ImageBackground>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    CardBox: {
        margin: 10,
        width: width * 0.9,
        height: width * 0.8,
    },
    EventTitle: {
        paddingTop : 35,
        padding : 15,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    TitleTxt : {
        fontWeight : '700',
        fontSize : 18,
        color : 'rgba(255, 255, 255, 1)'
    },
    CouponContent : {
        paddingBottom : 15,
        justifyContent : 'center',
        alignItems : 'center'
    },
    ContentTxt : {
        fontWeight : 'bold',
        fontSize : 30,
        color : 'rgba(255, 255, 255, 1)'
    },
    CouponDueDate : {
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    DueDateTxt : {
        fontSize : 18,
        color : 'rgba(255, 255, 255, 0.6)'
    }
});

export default ContentCard;