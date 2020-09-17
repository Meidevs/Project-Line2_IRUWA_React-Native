import React, { useEffect, useState } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import AUTHENTICATION from '../assets/dataSource/authModel';

import ProfileSetter from '../assets/components/ProfileSetter';

const { width, height } = Dimensions.get('window');

function MyinfoScreen({ route, navigation }) {
    const [hasComp, isUserHasComp] = useState(false);
    const [infos, setInformations] = useState(null);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>내 정보</Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.SettingHeader} onPress={() => navigation.navigate('Settings')}>
                    <Icon name={'ios-settings'} size={28} />
                </TouchableOpacity>
            )
        })
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const USER_CMP_CHECK = async () => {
                var USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
                if (USER_INFOs.cmp_exist == 'Y')
                    isUserHasComp(true);

                setInformations(USER_INFOs);
            }
            USER_CMP_CHECK()
        }, [])
    );

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.ProfileBox}>
                    <ProfileSetter hasComp={hasComp} user={infos} />
                    <View style={styles.ProfileSettings}>
                        <TouchableOpacity style={styles.ProfilleSetBtn} onPress={() => navigation.navigate('Profile')}>
                            <Text>  개인정보수정  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ContentBox}>
                    <TouchableOpacity style={styles.BtnContent} onPress={() => navigation.navigate('ItemList')}>
                        <View style={styles.IconBox}>
                            <Icon name={'ios-list-box'} size={36} />
                        </View>
                        <Text>등록 목록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnContent}>
                        <View style={styles.IconBox}>
                            <Icon name={'ios-heart'} size={36} />
                        </View>
                        <Text>관심 목록</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.MyinfoContent}>
                    <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('Add')}>
                        <View style={styles.IconArea}>
                            <Icon name={'ios-create'} size={36} />
                        </View>
                        <View style={styles.SettingList}>
                            <Text>업체 글쓰기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('Invite')}>
                        <View style={styles.IconArea}>
                            <Icon name={'ios-mail'} size={36} />
                        </View>
                        <View style={styles.SettingList}>
                            <Text>친구 초대</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('Notification')}>
                        <View style={styles.IconArea}>
                            <Icon name={'ios-notifications-outline'} size={36} />
                        </View>
                        <View style={styles.SettingList}>
                            <Text>공지 사항</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('CustomerService')}>
                        <View style={styles.IconArea}>
                            <Icon name={'ios-information-circle'} size={36} />
                        </View>
                        <View style={styles.SettingList}>
                            <Text>고객 센터</Text>
                        </View>
                    </TouchableOpacity>
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
    ScrollView: {
    },
    ProfileBox: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.8,
        borderColor: 'rgba(238, 238, 238, 1)'
    },
    ProfileSettings: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    ProfilleSetBtn: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(180, 180, 180, 1)'
    },
    ContentBox: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnContent: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 50,
        marginLeft: 50,
    },
    IconBox: {
        backgroundColor: 'rgba(225, 225, 225, 1)',
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    MyinfoContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    ContentArea: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: width * 0.15,
        width: width,
        borderWidth: 0.8,
        borderColor: 'rgba(238, 238, 238, 1)'
    },
    IconArea: {
        padding: 10,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SettingList: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MyinfoScreen;