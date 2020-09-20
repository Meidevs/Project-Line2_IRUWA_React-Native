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
                        <Text>알림 설정</Text>
                    </View>
                    <View style={styles.ContentBox}>
                        <View>
                            <Text>중요 알림</Text>
                            <Text>채팅</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={styles.ContentBox}>
                        <View>
                            <Text>기타 알림</Text>
                            <Text>키워드, 기타 알림 등</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={styles.ContentBox}>
                        <View>
                            <Text>방해금지 시간설정</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    {isEnabled == true ? (
                        <View>
                            <Text>hi</Text>
                        </View>
                    ) : (
                            <View>
                            </View>
                        )
                    }
                    <View style={styles.ContentBox}>
                        <View>
                            <Text>진동</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
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
                        <View>
                            <Text style={styles.Text}>탈퇴하기</Text>
                        </View>
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
        fontSize: 18
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
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