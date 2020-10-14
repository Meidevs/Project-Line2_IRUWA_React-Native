import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Platform,
    Keyboard,
    Animated
} from 'react-native';

import AUTHENTICATION from '../assets/dataSource/authModel';

const { width, height } = Dimensions.get('window');

function FindUserScreen({ route, navigation }) {
    const keyboardHeight = useRef(new Animated.Value(0)).current;
    const [searchEmail_a, setSearchEmail_A] = useState(null);
    const [searchEmail_b, setSearchEmail_B] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text></Text>
                </View>
            ),
            headerStyle: {
                elevation: 0,
                shadowOffset: {
                    height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
            }
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
                toValue: e.endCoordinates.height / 1.5,
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

    const SearchUserID = async () => {
        var resReturn = await AUTHENTICATION.SEND_USER_EMAIL(searchEmail_a);
        if (resReturn.flags == 0) {
            Alert.alert(
                "아이디 검색 결과",
                "회원님의 아이디는 : " + resReturn.message,
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        } else {
            Alert.alert(
                "아이디 검색 결과",
                resReturn.message,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: true }
            );
        }
    }

    const SearchUserPW = async () => {
        var resReturn = await AUTHENTICATION.FIND_USER_PASSWORD(searchEmail_b);
        if (resReturn.flags == 0) {
            Alert.alert(
                "아이디 검색 결과",
                "임시 비밀번호를 메일로 전달했습니다.",
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        } else {
            Alert.alert(
                "아이디 검색 결과",
                resReturn.message,
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        }
    }
    return (
        <Animated.View style={[styles.Container, { bottom: Platform.OS == 'ios' ? keyboardHeight : null }]}>
            <View style={styles.SearchCard}>
                <View style={styles.Logo}>
                    <Image source={require('../assets/logo.png')}
                        style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                    />
                </View>
                <View style={styles.SearchContent}>
                    <View style={styles.Section}>
                        <View style={styles.InnerSection}>
                            <Text style={styles.TitleTxt}>아이디 찾기</Text>
                            <Text style={styles.SubTitleTxt}>이메일을 입력해 주세요</Text>
                        </View>
                    </View>
                    <View style={styles.Section}>
                        <View style={styles.TextInput}>
                            <TextInput
                                value={searchEmail_a}
                                placeholder={'가입시 등록한 이메일을 입력해 주세요.'}
                                onChangeText={text => setSearchEmail_A(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.SearchBtn}>
                        <TouchableOpacity style={styles.BtnStyle} onPress={() => SearchUserID()}>
                            <Text style={styles.BtnTxt}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.SearchContent}>
                    <View style={styles.Section}>
                        <View style={styles.InnerSection}>
                            <Text style={styles.TitleTxt}>비밀번호 찾기</Text>
                            <Text style={styles.SubTitleTxt}>이메일을 입력해 주세요</Text>
                        </View>
                    </View>
                    <View style={styles.Section}>
                        <View style={styles.TextInput}>
                            <TextInput
                                value={searchEmail_b}
                                placeholder={'가입시 등록한 이메일을 입력해 주세요.'}
                                onChangeText={text => setSearchEmail_B(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.SearchBtn}>
                        <TouchableOpacity style={styles.BtnStyle} onPress={() => SearchUserPW()}>
                            <Text style={styles.BtnTxt}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchCard: {
        width: width * 0.8,
        height: height * 0.8,
        paddingRight: 25,
        paddingLeft: 25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb'
    },
    Logo: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchContent: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 15,
    },
    Section: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    SearchBtn: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    InnerSection: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    TextInput: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnStyle: {
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 25,
        paddingLeft: 25,
        backgroundColor: '#15bac1'
    },
    TitleTxt: {
        fontSize: 17,
        fontWeight: '800',
        color: '#000000',
        letterSpacing: -0.3,
        marginBottom: 5,
    },
    SubTitleTxt: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: -0.16,
    },
    BtnTxt: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700'
    }
})
export default FindUserScreen;