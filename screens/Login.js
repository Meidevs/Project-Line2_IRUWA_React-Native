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

    // LoginScreen mainly dealing with login function;
    // The useRef function lets you access DOM elements. And the initial value of keyboardHeight is 0; 
    const keyboardHeight = useRef(new Animated.Value(0)).current;
    const [user_id, setUserid] = useState('');
    const [user_pw, setUserpw] = useState('');
    const [expoToken, setToken] = useState('');

    // The navigation.setOptions function help to design header style. In this page, there is no header;
    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitle: null,
        })
    }, []);

    // The useEffect function works after React DOM is created;
    // The registerForPushNotificationAsync function is supported by EXPO library and generates EXPO Token used to send notifications;
    useEffect(() => {
        const SET_DEVICE_TOKEN = async () => {
            var token = await registerForPushNotificationsAsync();
            if (!token) return alert('앱 설치간에 문제가 발생했습니다. 앱을 재설치 해주세요.')
            setToken(token);
        }
        SET_DEVICE_TOKEN();

        // The keyboradDidShowListender/keyboardDidHideListener is a class which deal with Keyboard specifications by applying addListener to Keyboard element of React-Native;
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
    // The keyboardDidShow function receives event from the keyboardDidShowListener;
    // Then the keyboard appears in the view, the keyboardDidShow function changes the layout;
    const keyboardDidShow = (e) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                useNativeDriver: false,
                duration: e.duration,
                toValue: e.endCoordinates.height,
            }),
        ]).start();
    }
    // The keyboardDidHide function receives event from the keyboardDidHideListener;
    // Then the keyboard disappears in the view, the keyboardDidHide function changes the layout;
    const keyboardDidHide = (e) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                useNativeDriver: false,
                duration: e.duration,
                toValue: 0,
            }),
        ]).start();
    }

    // The Login function sends user_id, user_pw, expoToken to the REST End-point;
    // Also, the USER_APPSTATE function updates the user appstate to one of "active", "inactive" or "background";
    // The CommonActions.reset function removes all stacks in the navigator and creates a stack starting with "Main" after successful login;
    const Login = async () => {
        const response = await AUTHENTICATION.LOGIN(user_id, user_pw, expoToken);
        if (response.flags == 0) {
            await AUTHENTICATION.USER_APPSTATE('active', expoToken.data);
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'Main' },
                    ]
                }))

        } else {
            alert(response.message);
        }
    }
    // The spaceRemover function deletes blanks in the string;
    const spaceRemover = (str) => {
        return str.replace(/\s/g, '');

    }
    // The spaceRemover function makes a string lowercase;
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
                                secureTextEntry={false}
                                autoCapitalize={'none'}
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