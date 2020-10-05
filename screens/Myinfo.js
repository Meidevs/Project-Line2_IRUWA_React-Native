import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';
import AUTHENTICATION from '../assets/dataSource/authModel';
import ProfileSetter from '../assets/components/ProfileSetter';

const { width, height } = Dimensions.get('window');

function MyinfoScreen({ route, navigation }) {
    const [hasComp, isUserHasComp] = useState(false);
    const [userProfileUri, setUserProfileUri] = useState(null);
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
                <TouchableOpacity style={styles.SettingHeader} onPress={() => navigation.navigate('Settings', {
                    user_name : infos.user_name,
                })}>
                    <Image source={require('../assets/images/more_button.png')}
                        resizeMode={'contain'}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>
            )
        })
    }, [infos]);

    useFocusEffect(
        React.useCallback(() => {
            const USER_CMP_CHECK = async () => {
                var USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
                if (USER_INFOs.cmp_exist == 'Y')
                    isUserHasComp(true);
                setInformations(USER_INFOs);
            }
            USER_CMP_CHECK();
        }, [])
    );

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.ScrollView}>
                <ProfileSetter hasComp={hasComp} user={infos} navigation={navigation} />
                <View style={styles.ContentBox}>
                    {
                        hasComp == true ? (
                            <TouchableOpacity style={[styles.BtnContent, { marginRight: 7.5 }]} onPress={() => navigation.navigate('ItemList', {
                                user_seq: infos.user_seq,
                                cmp_seq: infos.cmp_seq
                            })}>
                                <View style={styles.IconBox}>
                                    <Image source={require('../assets/images/registered_list_ico.png')}
                                    />
                                </View>
                                <Text style={styles.ListTxt}>등록 목록</Text>
                            </TouchableOpacity>
                        ) : (
                                null
                            )
                    }
                    <TouchableOpacity style={[styles.BtnContent, { marginLeft: 7.5 }]} onPress={() => navigation.navigate('PickList', {
                        user_seq: infos.user_seq,
                    })}>
                        <View style={styles.IconBox}>
                            <Image source={require('../assets/images/liked_list_ico.png')}
                            />
                        </View>
                        <Text style={styles.ListTxt}>관심 목록</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.MyinfoContent}>
                    {
                        hasComp == true ? (
                            <View>
                                <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('Add')}>
                                    <View style={styles.IconText}>
                                        <View style={styles.IconArea}>
                                            <Image source={require('../assets/images/my_profile_ico1.png')} />
                                        </View>
                                        <View style={styles.SettingList}>
                                            <Text style={styles.SetListTxt}>업체 글쓰기</Text>
                                        </View>
                                    </View>
                                    <View style={styles.MovingBtn}>
                                        <Image source={require('../assets/images/right_arrow_ico.png')}
                                            style={{ width: 17, height: 17 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('Ringing',{
                                    cmp_seq : infos.cmp_seq,
                                    cmp_name : infos.cmp_name
                                })}>
                                    <View style={styles.IconText}>
                                        <View style={styles.IconArea}>
                                            <Image source={require('../assets/images/my_profile_ico5.png')} />
                                        </View>
                                        <View style={styles.SettingList}>
                                            <Text style={styles.SetListTxt}>띵동 등록</Text>
                                        </View>
                                    </View>
                                    <View style={styles.MovingBtn}>
                                        <Image source={require('../assets/images/right_arrow_ico.png')}
                                            style={{ width: 17, height: 17 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                                null
                            )
                    }
                    <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('Invite')}>

                        <View style={styles.IconText}>
                            <View style={styles.IconArea}>
                                <Image source={require('../assets/images/my_profile_ico2.png')} />
                            </View>
                            <View style={styles.SettingList}>
                                <Text style={styles.SetListTxt}>친구 초대</Text>
                            </View>
                        </View>
                        <View style={styles.MovingBtn}>
                            <Image source={require('../assets/images/right_arrow_ico.png')}
                                style={{ width: 17, height: 17 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('Notification')}>
                        <View style={styles.IconText}>
                            <View style={styles.IconArea}>
                                <Image source={require('../assets/images/my_profile_ico3.png')} />
                            </View>
                            <View style={styles.SettingList}>
                                <Text style={styles.SetListTxt}>공지 사항</Text>
                            </View>
                        </View>
                        <View style={styles.MovingBtn}>
                            <Image source={require('../assets/images/right_arrow_ico.png')}
                                style={{ width: 17, height: 17 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ContentArea} onPress={() => navigation.navigate('CustomerService')}>
                        <View style={styles.IconText}>
                            <View style={styles.IconArea}>
                                <Image source={require('../assets/images/my_profile_ico4.png')} />
                            </View>
                            <View style={styles.SettingList}>
                                <Text style={styles.SetListTxt}>고객 센터</Text>
                            </View>
                        </View>
                        <View style={styles.MovingBtn}>
                            <Image source={require('../assets/images/right_arrow_ico.png')}
                                style={{ width: 17, height: 17 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
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

    ContentBox: {
        marginRight: 25,
        marginLeft: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnContent: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 38,
        paddingLeft: 38,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ebebeb',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    IconBox: {
        backgroundColor: '#15bac1',
        borderRadius: 80,
        width: 80,
        height: 80,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ListTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000'
    },
    MyinfoContent: {
        margin: 25,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    ContentArea: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.8,
        borderRadius: 10,
        borderColor: '#ebebeb'
    },
    IconText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    IconArea: {
        marginTop: 30,
        marginBottom: 30,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SettingList: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    SetListTxt: {
        fontSize: 13,
        fontWeight: '700',
        color: '#000000'
    },
    MovingBtn: {
        marginTop: 30,
        marginBottom: 30,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MyinfoScreen;