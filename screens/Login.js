import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    Dimensions,
    Animated,
    Keyboard, Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AUTHENTICATION from '../assets/dataSource/authModel';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

function LoginScreen({ navigation }) {
    const keyboardHeight = useRef(new Animated.Value(0)).current;
    const [user_id, setUserid] = useState('');
    const [user_pw, setUserpw] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitle: null,
        })
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', (event) => {
                keyboardDidShow(event)
            } // or some other action
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
        const response = await AUTHENTICATION.LOGIN(user_id, user_pw);
        switch (response.flags) {
            case 0:
                navigation.replace('Main');
                break;
            case 1:
                alert(response.message);
                break
        }
    }

    return (
        <View
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.Container}>
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
            <Animated.View style={{ flex : 1, bottom: Platform.OS == 'ios' ? keyboardHeight : keyboardHeight, }}>
                <View style={styles.HeaderStyle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name={'arrowleft'} size={32} />
                    </TouchableOpacity>
                    <View style={{ marginTop: height * 0.05 }}>
                        <Text style={{ fontSize: 44, fontWeight: 'bold' }}>로그인</Text>
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
                                onChangeText={text => setUserid(text)}
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
            </Animated.View>
            <View style={styles.BtnContainer}>
                <TouchableOpacity style={styles.LoginBtnForm} onPress={() => Login()}>
                    <Text style={styles.LoginBtnTxt}>로그인</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width : width,
        height : height,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    HeaderStyle: {
        flex : 1,
        padding: 25,
        marginTop: 25,
        flexDirection: 'column',
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems : 'center'
    },
    MainForm: {
        width: width,
    },
    MainTitle: {
        paddingLeft: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    TitleTxt: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    InputForm: {
        margin: 25,
        padding: 10,
        height: height * 0.08,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(235, 235, 235, 1)',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Input: {
        flex: 1,
    },
    BtnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    LoginBtnForm: {
        width: width,
        height: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(21, 186, 193, 1)'
    },
    LoginBtnTxt: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 18,
        fontWeight: '700',
    },
})

export default LoginScreen;