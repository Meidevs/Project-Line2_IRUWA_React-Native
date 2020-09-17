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
    const user_seq = route.params.user_seq;
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>등록 목록</Text>
                </View>
            ),
        })
    }, []);

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                
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
    },
    ImageSelectorBox: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    ImageSelector: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 100,
        backgroundColor: 'rgba(220, 220, 220, 1)',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    IconBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        elevation: 2,
        borderRadius: 30,
        padding: 5,
    },
    SettingBox: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    MyinfoSettingTitle : {
        padding : 15,
    },
    TitleStyle : {
        fontWeight : '800',
        fontSize : 13,
        color : 'rgba(70, 70, 70, 1)',
    },
    SettingContent : {
        paddingLeft : 15,
        paddingTop : 10,
        paddingBottom : 10
    }
})

export default InviteScreen;