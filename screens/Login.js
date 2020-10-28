import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    Animated,
    Keyboard,
    Platform
} from 'react-native';
import { CommonActions, StackActions } from '@react-navigation/native';
import registerForPushNotificationsAsync from '../assets/components/Login/getDeviceToken';
import AUTHENTICATION from '../assets/dataSource/authModel';
const { width, height } = Dimensions.get('window');

function LoginScreen({ navigation }) {
    const keyboardHeight = useRef(new Animated.Value(0)).current;
    const [user_id, setUserid] = useState('');
    const [user_pw, setUserpw] = useState('');
    const [expoToken, setToken] = useState('');
    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitle: null,
        })
    }, []);
    useEffect(() => {
        const SET_DEVICE_TOKEN = async () => {
            var token = await registerForPushNotificationsAsync();
            if(!token) return alert('앱 설치간에 문제가 발생했습니다. 앱을 재설치 해주세요.')
            setToken(token);
        }
        SET_DEVICE_TOKEN();

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', (event) => {
                keyboardDidShow(event)
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', (event) => keyboardDidHide(event) // or some other action
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const keyboardDidShow = (e) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                useNativeDriver: false,
                duration: e.duration,
                toValue: e.endCoordinates.height,
            }),
        ]).start();
    }
    const keyboardDidHide = (e) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                useNativeDriver: false,
                duration: e.duration,
                toValue: 0,
            }),
        ]).start();
    }

    const Login = async () => {
        const response = await AUTHENTICATION.LOGIN(user_id, user_pw, expoToken);
        if (response.flags == 0) {
            await AUTHENTICATION.USER_APPSTATE('active', expoToken.data);
            navigation.dispatch(
                CommonActions.reset({
                index : 1,
                routes : [
                    {name : 'Main'},
                ]
            }))
            
        } else {
            alert(response.message);
        }
    }
    const spaceRemover = (str) => {
        return str.replace(/\s/g, '');
        
    }

    const lowerCase = (str) => {
        return str.toLowerCase();
    }
    return (
        <Animated.View
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={[styles.Container, { bottom: keyboardHeight }]}>
            <StatusBar
                barStyle="dark-content"
                // dark-content, light-content and default
                hidden={false}
                //To hide statusBar
                backgroundColor="rgba(0, 0, 0, 0)"
                //Background color of statusBar
                translucent={true}
                //allowing light, but not detailed shapes
                networkActivityIndicatorVisible={true}
            />
            <View style={{ flex: 1 }}>
                <View style={styles.HeaderStyle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/back_button.png')} />
                    </TouchableOpacity>
                    <View style={{ marginTop: height * 0.05, }}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>로그인</Text>
                    </View>
                </View>
                <View style={styles.MainContainer}>
                    <View style={styles.MainForm}>
                        <View style={styles.MainTitle}>
                            <Text style={styles.TitleTxt}>아이디</Text>
                        </View>
                        <View style={styles.InputForm}>
                            <TextInput
                                value={user_id}
                                placeholderTextColor={'rgba(140, 140, 140, 1)'}
                                placeholder={'아이디를 입력해주세요'}
                                style={styles.Input}
                                onChangeText={(text) => {
                                    setUserid(lowerCase(spaceRemover(text)));
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.MainForm}>
                        <View style={styles.MainTitle}>
                            <Text style={styles.TitleTxt}>비밀번호</Text>
                        </View>
                        <View style={styles.InputForm}>
                            <TextInput
                                placeholderTextColor={'rgba(140, 140, 140, 1)'}
                                value={user_pw}
                                placeholder={'비밀번호를 입력해주세요'}
                                style={styles.Input}
                                onChangeText={text => setUserpw(text)}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.SearchUserArea} onPress={() => navigation.navigate('FindUser')}>
                <Text style={styles.SearchUserTxt}>아이디 비밀번호 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.LoginBtnForm} onPress={() => Login()}>
                <Text style={styles.LoginBtnTxt}>로그인</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: width,
        height: height,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    HeaderStyle: {
        flex: 1,
        padding: 25,
        marginTop: 25,
        flexDirection: 'column',
    },
    FindUser: {
    },
    SearchUserArea: {
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    SearchUserTxt: {
        color: 'rgba(205, 205, 205, 1)',
        fontWeight: '700',
        fontSize: 15,
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    MainForm: {
        width: width,
    },
    MainTitle: {
        marginTop: 15,
        paddingLeft: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    TitleTxt: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    InputForm: {
        marginRight: 25,
        marginLeft: 25,
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(235, 235, 235, 1)',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Input: {
        flex: 1,
    },
    LoginBtnForm: {
        width: width,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15BAC1'
    },
    LoginBtnTxt: {
        color: '#ffffff',
        fontSize: 15,
    },
})

export default LoginScreen;