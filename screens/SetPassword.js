import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import AUTHENTICATION from '../assets/dataSource/authModel';
import PasswordMatch from '../assets/components/PasswordMatch';
const { width, height } = Dimensions.get('window');

function SearchUser({ route, navigation }) {
    const [prevPassword, setPrevPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [againPassword, setAgainPassword] = useState(null);
    const [password_boolean, setPassword_Boolean] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>비밀번호변경</Text>
                </View>
            ),
            headerRight: () => (
                <View></View>
            ),
        })
    }, []);

    // The SetUserPassword function receives a new password and sends it to the PasswordMatch function;
    // It returns text (string), response (boolean);
    const SetUserPassword = (data) => {
        var PASSWORD = PasswordMatch(data);
        setNewPassword(PASSWORD.text);
        setPassword_Boolean(PASSWORD.response)
    }

    // The UPDATE_PASSWORD function checks the password_boolean is true or not;
    // password_boolean is true means that the passowrd is enough to use;
    // newPassword is same as againPassword means that double check of password;
    // Finally, the function checks null value;
    const UPDATE_PASSWORD = async () => {
        if (password_boolean) {
            if (newPassword == againPassword) {
                if (prevPassword != null & newPassword != null & againPassword != null) {
                    var RESULT = await AUTHENTICATION.UPDATE_PASSWORD(prevPassword, newPassword);
                    alert(RESULT.message)
                }
            } else {
                alert('비밀번호가 일치하지 않습니다.')
            }
        } else {
            alert('영문 대소문자, 특수문자, 숫자를 조합하여 입력해 주세요.')
        }
    }

    return (
        <View style={styles.Container}>
            <View style={styles.ContentCard}>
                <View style={styles.ContentBorder}>
                    <View style={styles.ItemCard}>
                        <Text style={styles.ItemTxt}>기존 비밀번호</Text>
                        <View style={styles.ItemInput}>
                            <TextInput
                                value={prevPassword}
                                placeholder={'기존 비밀번호를 입력해 주세요.'}
                                secureTextEntry={true}
                                onChangeText={text => setPrevPassword(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.ItemCard}>
                        <Text style={styles.ItemTxt}>변경할 비밀번호</Text>
                        <View style={styles.ItemInput}>
                            <TextInput
                                value={newPassword}
                                placeholder={'변경할 비밀번호를 입력해 주세요.'}
                                secureTextEntry={true}
                                onChangeText={text => SetUserPassword(text)}
                            />
                        </View>
                        <Text style={styles.ExplanationText}>{password_boolean == false ? '영문(대,소문자), 특수문자, 숫자를 조합하여 8자 이상 입력해주세요.' : ''}</Text>
                    </View>
                    <View style={styles.ItemCard}>
                        <Text style={styles.ItemTxt}>변경할 비밀번호 확인</Text>
                        <View style={styles.ItemInput}>
                            <TextInput
                                value={againPassword}
                                placeholder={'변경할 비밀번호를 다시 입력해 주세요.'}
                                secureTextEntry={true}
                                onChangeText={text => setAgainPassword(text)}
                            />
                        </View>
                        <Text style={styles.ExplanationText}>{newPassword == againPassword ? '' : '비밀번호가 일치하지 않습니다.'}</Text>

                    </View>
                    <View style={styles.BtnCard}>
                        <TouchableOpacity style={styles.BtnStyle} onPress={() => UPDATE_PASSWORD()}>
                            <Text style={styles.BtnTxt}>변경</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContentCard: {
        width: width * 0.8,
        height: height * 0.7,
    },
    ContentBorder: {
        flex: 1,
        borderRadius: 10,
        borderColor: '#ebebeb',
        borderWidth: 1,
        padding: 15,
    },
    ItemCard: {
        flex: 1,
        justifyContent: 'center'
    },
    ItemTxt: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: -0.3,
    },
    ItemInput: {
        padding: 10,
        borderRadius: 10,
        borderColor: '#ebebeb',
        borderWidth: 1,
        marginTop: 10,
    },
    ExplanationText: {
        marginTop: 5,
        fontSize: 13,
        color: '#15bac1',
        fontWeight: '600',
    },
    BtnCard: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnStyle: {
        flexDirection: 'row',
        backgroundColor: '#15bac1',
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 40,
        paddingLeft: 40,
        borderRadius: 10,
    },
    BtnTxt: {
        fontSize: 15,
        fontWeight: '800',
        color: '#ffffff'
    }
})

export default SearchUser;