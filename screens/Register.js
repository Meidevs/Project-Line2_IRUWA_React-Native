import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    StyleSheet,
    TextInput,
    ScrollView,
    SafeAreaView,
    Platform,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryPicker from '../assets/components/CategoryPicker';
import AUTHENTICATION from '../assets/dataSource/authModel';
import ROADAPI from '../assets/dataSource/roadAPI';
import PASSWORD_CHECK from '../assets/components/PasswordMatch';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

function RegisterScreen({ route, navigation }) {
    const [isSelected, checkSelection] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [status, SelectionStatus] = useState(0);
    const [user_id, setUserID] = useState('');
    const [user_pw, setPassword] = useState('');
    const [password_again, setPassword_Again] = useState('');
    const [password_boolean, setPassword_Boolean] = useState(false);
    const [user_name, setUserName] = useState('');
    const [user_phone, setUserPhone] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_location, setUserLocation] = useState('');
    const [cmp_name, setCompanyName] = useState('');
    const [cmp_phone, setCompanyPhone] = useState('');
    const [cmp_location, setCompanyLocation] = useState('');
    const [cmp_certificates, setCompanyCerti] = useState('');
    const [category_seq, setCompanyCate] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest
            });

            var response = await ROADAPI.GET_CURRENT_LOCATION(position);
            setUserLocation(response)
        })();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text>회원가입</Text>
                </View>
            ),
        })
    }, []);

    const SetUserPassword = async (data) => {
        try {
            var PASSWORD = await PASSWORD_CHECK(data);
            setPassword(PASSWORD.text);
            setPassword_Boolean(PASSWORD.response)
        } catch (err) {
            console.log(err)
        }
    }

    const UserSelection = () => {
        if (isSelected == true) {
            SelectionStatus(1);
        } else {
            SelectionStatus(0)
        }
        checkSelection(!isSelected)
    }

    const Register = async () => {
        if (user_pw == password_again) {
            var data = new Object();
            data.status = status;
            data.user_id = user_id;
            data.user_pw = user_pw;
            data.user_name = user_name;
            data.user_phone = user_phone;
            data.user_email = user_email;
            data.user_location = user_location;
            data.category_seq = category_seq;
            data.cmp_name = cmp_name;
            data.cmp_phone = cmp_phone;
            data.cmp_location = cmp_location;
            data.cmp_certificates = cmp_certificates;
            var response = await AUTHENTICATION.REGISTER(data);
            if (response.flags == 0) {
                alert(response.message);
                navigation.popToTop('Main');
            } else {
                alert(response.message);
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }

    const SearchAddress = () => {
        setCompanyLocation('서울특별시 구로구 구로3동')
    }
    const ReturnValue = (ChildFrom) => {
        setCompanyCate(ChildFrom)
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.UserSelectBox}>
                    <TouchableOpacity style={styles.SelectContent} onPress={() => UserSelection()}>
                        <Text style={isSelected == true ? styles.SelectText : styles.NonSelectText}>개인 사용자</Text>
                        <View style={isSelected == true ? styles.SelectEffect : styles.NonSelectEffect} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SelectContent} onPress={() => UserSelection()}>
                        <Text style={isSelected == false ? styles.SelectText : styles.NonSelectText}>업체 사용자</Text>
                        <View style={isSelected == false ? styles.SelectEffect : styles.NonSelectEffect} />
                    </TouchableOpacity>
                </View>
                <View style={styles.UserInfoBox}>
                    <View style={styles.ContentBox}>
                        <View style={styles.ContentText}>
                            <Text style={styles.ContentTextStyle}>아이디</Text>
                        </View>
                        <View style={styles.ContentInput}>
                            <TextInput
                                value={user_id}
                                placeholder={'아이디를 입력해주세요'}
                                onChangeText={(text) => setUserID(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.ContentBox}>
                        <View style={styles.ContentText}>
                            <Text style={styles.ContentTextStyle}>비밀번호</Text>
                        </View>
                        <View style={styles.ContentInput}>
                            <TextInput
                                value={user_pw}
                                placeholder={'비밀번호를 입력해주세요.'}
                                secureTextEntry={true}
                                onChangeText={(text) => SetUserPassword(text)}
                            />

                        </View>
                    </View>
                    <View style={styles.Explanations}>
                        <Text style={styles.ExplanationText}>{password_boolean == false ? '영문(대,소문자), 특수문자, 숫자를 조합하여 8자 이상 입력해주세요.' : ''}</Text>
                    </View>
                    <View style={styles.ContentBox}>
                        <View style={styles.ContentText}>
                            <Text style={styles.ContentTextStyle}>비밀번호</Text>
                            <Text style={styles.ContentTextStyle}>확인</Text>
                        </View>
                        <View style={styles.ContentInput}>
                            <TextInput
                                value={password_again}
                                placeholder={'비밀번호를 다시 입력해주세요.'}
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword_Again(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.Explanations}>
                        <Text style={styles.ExplanationText}>{user_pw == password_again ? '' : '비밀번호가 일치하지 않습니다.'}</Text>
                    </View>
                    <View style={styles.ContentBox}>
                        <View style={styles.ContentText}>
                            <Text style={styles.ContentTextStyle}>이름</Text>
                        </View>
                        <View style={styles.ContentInput}>
                            <TextInput
                                value={user_name}
                                placeholder={'이름을 입력해주세요.'}
                                onChangeText={(text) => setUserName(text)}
                            />
                        </View>
                    </View>

                    <View style={styles.ContentBox}>
                        <View style={styles.ContentText}>
                            <Text style={styles.ContentTextStyle}>전화번호</Text>
                        </View>
                        <View style={styles.ContentInput}>
                            <TextInput
                                value={user_phone}
                                placeholder={'전화번호를 입력해주세요.'}
                                onChangeText={(text) => setUserPhone(text)}

                            />
                        </View>
                    </View>
                    <View style={styles.ContentBox}>
                        <View style={styles.ContentText}>
                            <Text style={styles.ContentTextStyle}>메일</Text>
                        </View>
                        <View style={styles.ContentInput}>
                            <TextInput
                                value={user_email}
                                placeholder={'메일을 입력해주세요.'}
                                onChangeText={(text) => setUserEmail(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.ContentBox}>
                        <View style={styles.ContentText}>
                            <Text style={styles.ContentTextStyle}>내 위치</Text>
                        </View>
                        <View style={styles.ContentInput}>
                            <Text>{user_location}</Text>
                        </View>
                    </View>
                    {
                        isSelected == true ?
                            (
                                null
                            ) : (
                                <View>
                                    <View style={styles.ContentBox}>
                                        <View style={styles.ContentText}>
                                            <Text style={styles.ContentTextStyle}>업체 명</Text>
                                        </View>
                                        <View style={styles.ContentInput}>
                                            <TextInput
                                                value={cmp_name}
                                                placeholder={'업체 명을 입력해주세요.'}
                                                onChangeText={(text) => setCompanyName(text)}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.ContentBox}>
                                        <View style={styles.ContentText}>
                                            <Text style={styles.ContentTextStyle}>업체</Text>
                                            <Text style={styles.ContentTextStyle}>전화번호</Text>
                                        </View>
                                        <View style={styles.ContentInput}>
                                            <TextInput
                                                value={cmp_phone}
                                                placeholder={'업체 전화번호를 입력해주세요.'}
                                                onChangeText={(text) => setCompanyPhone(text)}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.ContentBox}>
                                        <View style={styles.ContentText}>
                                            <Text style={styles.ContentTextStyle}>업체 위치</Text>
                                        </View>
                                        <TouchableOpacity style={styles.ContentInput} onPress={() => setModalVisible(true)}>
                                            <Text>{cmp_location}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.ContentBox}>
                                        <View style={styles.ContentText}>
                                            <Text style={styles.ContentTextStyle}>사업자</Text>
                                            <Text style={styles.ContentTextStyle}>등록번호</Text>
                                        </View>
                                        <View style={styles.ContentInput}>
                                            <TextInput
                                                value={cmp_certificates}
                                                placeholder={'사업자 등록번호를 입력해주세요.'}
                                                onChangeText={(text) => setCompanyCerti(text)}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.ContentBox}>
                                        <View style={styles.ContentText}>
                                            <Text style={styles.ContentTextStyle}>카테고리</Text>
                                        </View>
                                        <View style={styles.ContentInput}>
                                            <CategoryPicker callback={ReturnValue} />
                                        </View>
                                    </View>
                                </View>
                            )
                    }
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.RegisterBtn} onPress={() => Register()}>
                <Text style={styles.RegisterBtnStyle}>회원등록</Text>
            </TouchableOpacity>
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: Platform.OS === 'ios' ? 50 : 60,
    },
    UserSelectBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
    },
    SelectContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    SelectEffect: {
        marginTop: 10,
        padding: 2,
        width: width * 0.3,
        backgroundColor: '#4f79d5'
    },
    SelectText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#4f79d5',
    },
    NonSelectEffect: {
        marginTop: 10,
        padding: 2,
        width: width * 0.3,
        backgroundColor: '#C9C9C9'
    },
    NonSelectText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#C9C9C9',
    },
    UserInfoBox: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ContentBox: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Explanations: {
        alignSelf: 'flex-end'
    },
    ExplanationText: {
        fontSize: 12,
        color: 'blue'
    },
    ContentText: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContentInput: {
        borderWidth: 1,
        borderColor: 'rgba(220, 220, 220, 1)',
        borderRadius: 5,
        padding: 5,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flex: 3,
    },
    ContentTextStyle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#4f79d5',
    },
    RegisterBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: width * 0.1,
        backgroundColor: '#4f79d5'
    },
    RegisterBtnStyle: {
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: '800',
        fontSize: 18,
    }
})

export default RegisterScreen;