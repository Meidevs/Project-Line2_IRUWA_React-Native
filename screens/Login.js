import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AUTHENTICATION from '../assets/dataSource/authModel';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');

function LoginScreen({ navigation }) {
    const [user_id, setUserid] = useState('');
    const [user_pw, setUserpw] = useState('');
    const [remember, setRemember] = useState(false);

    const toggleRememberMe = () => {
        setRemember(!remember);
    }

    const saveUser = async () => {
        try {
            const jsonValue = JSON.stringify(user_id);
            await AsyncStorage.setItem('@my_Key', jsonValue.substring(1, jsonValue.length - 1));
        } catch (err) {
            console.log(err)
        }
    }

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem('@my_Key');
        } catch (err) {
            console.log(err);
        }
    }

    const getRememberUser = useCallback(async () => {
        try {
            const user_id = await AsyncStorage.getItem('@my_Key');
            user_id == null ? setRemember(false) : setRemember(true);
            if (user_id == null) {
                setUserid('');
            } else {
                setUserid(user_id)
            }
        } catch (err) {
            console.log(err)
        }
    }, []);

    useEffect(() => {
        getRememberUser();
    }, [getRememberUser]);

    const Login = async () => {
        if (remember == true) {
            saveUser();
        } else {
            removeUser();
        }
        const response = await AUTHENTICATION.LOGIN(user_id, user_pw);
        switch (response.flags) {
            case 0:
                alert(response.message);
                navigation.replace('Main');
                break;
            case 1:
                alert(response.message);
                break
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.Container}>
            <StatusBar
                barStyle="dark-content"
                // dark-content, light-content and default
                hidden={false}
                //To hide statusBar
                backgroundColor="#00BCD4"
                //Background color of statusBar
                translucent={false}
                //allowing light, but not detailed shapes
                networkActivityIndicatorVisible={true}
            />
            <View style={styles.LogoContainer}>
                {/* <Image source={require('../assets/images/logo/logo.png')} style={styles.LogoImage} /> */}
            </View>
            <View style={styles.MainContainer}>
                <View style={styles.UserInputForm}>
                    <View style={styles.UserEmail}>
                        <TextInput
                            value={user_id}
                            placeholder={'이메일 아이디'}
                            onChangeText={text => setUserid(text)}
                        />
                    </View>
                    <View style={styles.UserPassword}>
                        <TextInput
                            value={user_pw}
                            placeholder={'비밀번호'}
                            onChangeText={text => setUserpw(text)}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.UserCheckForm}>
                        <TouchableOpacity style={styles.CheckBox} onPress={() => toggleRememberMe()}>
                            <View style={remember == false ? styles.NonCheckImageBox : styles.CheckImageBox}>
                                {
                                    remember == false ? <Icon name={'ios-arrow-down'} size={20} color={'#C9C9C9'} />
                                        : <Icon name={'ios-arrow-down'} size={20} color={'#4f79d5'} />
                                }
                            </View>
                            <Text>
                                아이디 기억하기
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.SearchBox} onPress={() => navigation.navigate('SearchUser')}>
                            <Text style={styles.SearchUserPasswordTxt}>아이디 비밀번호 찾기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.ButtonContainer}>
                <View style={styles.ButtonForm}>
                    <TouchableOpacity style={styles.LoginBtn} onPress={() => Login()}>
                        <Text style={styles.LoginBtnTxt}>로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.LoginBtn} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.LoginBtnTxt}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
    LogoContainer: {
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    LogoImage: {
        width: width * 0.6,
        height: width * 0.4,
        resizeMode: 'contain'
    },
    MainContainer: {
        flex: 1.3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UserInputForm: {
        width: width * 0.9,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UserEmail: {
        width: width * 0.9,
        height: width * 0.2,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF'
    },
    UserPassword: {
        width: width * 0.9,
        height: width * 0.2,
        borderWidth: 2,
        borderTopWidth: 1,
        borderTopColor: '#F3F3F3',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF'
    },
    UserCheckForm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.9,
        paddingTop: 10,
    },
    CheckBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    SearchBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    CheckImageBox: {
        width: width * 0.06,
        height: width * 0.06,
        padding: 3,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#4f79d5',
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    NonCheckImageBox: {
        width: width * 0.06,
        height: width * 0.06,
        padding: 3,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchUserPasswordTxt: {
        color: '#929292'
    },
    ButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonForm: {
        flex: 1,
        width: width * 0.9,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    LoginBtn: {
        width: width * 0.9,
        height: width * 0.15,
        backgroundColor: '#4F79D5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    RegisterForm: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginBtnTxt: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    AskRegiTxt: {
        color: '#929292'
    },
    RegiBtnTxt: {
        color: '#4F79D5',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#4F79D5'
    }
})

export default LoginScreen;