import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    Image,
    Switch,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import AUTHENTICATION from '../assets/dataSource/authModel';

const { width, height } = Dimensions.get('window');

function SettingsScreen({ route, navigation }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>설정</Text>
                </View>
            ),
        })
    }, []);

    const Logout = async () => {
        var LOGOUT = await AUTHENTICATION.LOGOUT();
        if (LOGOUT) {
            navigation.reset({
                index : 0,
                routes:[{name : 'BeforeLogin'}]
            });
        } else {
            alert('로그아웃에 실패하였습니다.');
        }
    }

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.MainContainer}>
                    <View style={styles.TitleBox}>
                        <Text style={styles.TitleTxt}>사용자 설정</Text>
                    </View>
                    <View style={styles.ContentBox}>
                        <View>
                            <Text>차단 사용자 관리</Text>
                        </View>
                    </View>
                    <View style={styles.ContentBox}>
                        <TouchableOpacity onPress={() => DELETE_USER()}>
                            <Text style={styles.Text}>탈퇴하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ContentBox}>
                        <TouchableOpacity onPress={() => Logout()}>
                            <Text>로그 아웃</Text>
                        </TouchableOpacity>
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
        fontSize: 15
    },
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    MainContainer: {
        borderBottomWidth: 1,
        borderColor: 'rgba(220, 220, 220, 1)',
        width: width,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    TitleBox: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'flex-start'
    },
    ContentBox: {
        width: width,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TitleTxt: {
        fontSize: 14,
        color: 'rgba(70, 70, 70, 1)'
    }
})

export default SettingsScreen;