import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

const ContentCard = ({ data }) => {
    return (
        <View style={styles.CardBox}>
            <View style={styles.CardHeader}>
                <View style={styles.HeaderStarter}>
                    <Text style={styles.StarterTxt}>알려드려요!</Text>
                </View>
                <View style={styles.HeaderTitle}>
                    <Text style={styles.HeaderTxt}>{data.item_title}</Text>
                </View>
                <View style={styles.HeaderInfo}>
                    <Text style={styles.HeaderInfoTxt}>{data.cmp_category_name}</Text>
                    <Text style={styles.HeaderInfoTxt}>{data.item_reg}</Text>
                </View>
            </View>
            <View style={styles.CardContent}>
                <Text>{JSON.parse(data.item_content)}</Text>
            </View>
            <View style={styles.CardSubInfo}>
                <Text>조회 {data.view_count}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CardBox: {
        margin : 10,
        marginBottom : 25,
        width : width * 0.9,
        borderWidth : 2,
        borderRadius : 10,
        borderColor : 'rgba(245, 245, 245, 1)'
    },
    CardHeader : {
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'flex-start'
    },
    HeaderStarter : {
        paddingTop : 25,
        paddingLeft : 25,
        paddingBottom : 20,
    },
    StarterTxt : {
        color : 'rgba(63, 200, 205, 1)',
        fontSize : 14,
        fontWeight : 'bold'
    },
    HeaderTitle : {
        paddingLeft : 25,
    },
    HeaderTxt : {
        color : 'rgba(0, 0, 0, 1)',
        fontSize : 24,
        fontWeight : 'bold'
    },
    HeaderInfo : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : width * 0.9,
        padding : 25,
    },
    HeaderInfoTxt : {
        color : 'rgba(169, 169, 169, 1)',
        fontSize : 14,
        fontWeight : '700'
    },
    CardContent : {
        paddingRight: 25,
        paddingLeft: 25,
    },
    CardSubInfo : {
        paddingTop : 10,
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom : 25,
    }
});

export default ContentCard;