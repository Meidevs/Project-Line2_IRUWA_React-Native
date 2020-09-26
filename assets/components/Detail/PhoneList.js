import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Linking
} from 'react-native';
const { width, height } = Dimensions.get('window');

const PhoneList = ({ data, list }) => {
    if (list.length > 0) {
        return (
            <View style={styles.ADSBox}>
                <View style={styles.TitleBox}>
                    <View style={styles.TitleBorder}>
                        <Text style={styles.ItemTitleTxtStyle}>{data.cmp_name}의 연락처</Text>
                    </View>
                </View>
                {
                    list.map((data) => {
                        return (
                            <View style={styles.ContentBox}>
                                <View style={styles.LeftArea}>
                                    <Text style={styles.PositionTxt}>{data.position}</Text>
                                    <View style={styles.NameSpace}>
                                        <Image source={require('../../images/profile_info_ico.png')} 
                                        style={{width : 14, height : 14, marginRight : 5,}}/>
                                        <Text style={styles.NameTxt}>{data.name}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.IconBox} onPress={() => Linking.canOpenURL(data.phone)}>
                                    <Image source={require('../../images/phone_ico.png')} />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View >
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    ADSBox: {
    },
    TitleBox: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    ItemTitleTxtStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000'
    },
    ContentBox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    LeftArea: {
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    NameSpace : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    PositionTxt: {
        fontSize: 10,
        fontWeight: '600',
        color: '#a2a2a2'
    },
    NameTxt: {
        fontSize: 13,
        fontWeight: '800',
        color: '#000000'
    },
    IconBox: {
        margin: 20,
        borderRadius: 30,
        width: 30,
        height: 30,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PhoneList;