import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";

import CategoryPicker from '../assets/components/Category/CategoryPicker';
import CmpAddressSearchBox from '../assets/components/CmpAddressSearchBox';
import AUTHENTICATION from '../assets/dataSource/authModel';
import ROADAPI from '../assets/dataSource/roadAPI';
import PASSWORD_CHECK from '../assets/components/PasswordMatch';

const { width, height } = Dimensions.get('window');

async function getImageRollAsync() {
    if (Constants.platform.ios || Constants.platform.android) {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            throw new Error('CAMERA_ROLL permission not granted');
        }
    }
}

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
    const [cmp_detail_location, setCompanyDLocation] = useState('');
    const [lat, setCompanyLat] = useState('');
    const [lon, setCompanyLon] = useState('');
    const [cmp_certificates, setImage] = useState({
        id: null,
        uri: null
    });
    const [category_seq, setCompanyCate] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION, Permissions.NOTIFICATIONS);
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            } else {
                var position = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Highest
                });
                var response = await ROADAPI.GET_CURRENT_LOCATION(position);
                setUserLocation(response);
            }

        })();
        getImageRollAsync();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <Text style={styles.HeaderTitleTxt}>회원가입</Text>
                </View>
            ),
            headerRight: () => <View></View>
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

    const REGISTRATION_PICKER = async () => {
        try {
            let IMAGE_INFOs = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });
            var resizedImage = await ImageManipulator.manipulateAsync(
                IMAGE_INFOs.uri,
                [{ resize: { width: 630, height: 891 } }],
                { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
            );

            if (!IMAGE_INFOs.cancelled) {
                setImage(
                    {
                        id: 'images',
                        uri: resizedImage.uri
                    }
                )
            }
        } catch (err) {
            console.log('Image Error', err);
        }
    }

    const Register = async () => {
        if (user_pw == password_again) {
            var data = new Object();
            var formData = new FormData();

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
            data.cmp_detail_location = cmp_detail_location;
            data.lat = lat;
            data.lon = lon;
            data.cmp_certificates = 'Y';
            formData.append('data', JSON.stringify(data));
            formData.append('image', {
                uri: cmp_certificates.uri,
                type: 'image/jpeg',
                name: 'image',
            })
            var response = await AUTHENTICATION.REGISTER(formData);
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
    const ReturnCategory = (ChildFrom) => {
        setCompanyCate(ChildFrom)
    }

    const ReturnVisible = (ChildFrom) => {
        setModalVisible(ChildFrom)
    }

    const ReturnLocation = (ChildFrom) => {
        setCompanyDLocation(ChildFrom[0]);
        setCompanyLocation(ChildFrom[1]);
        setCompanyLat(ChildFrom[2]);
        setCompanyLon(ChildFrom[3]);
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
                        <View style={styles.ContentInput_sub}>
                            <View style={styles.TextAndBtn}>
                                <Text>{user_location}</Text>
                            </View>
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
                                        <View style={styles.ContentInput_sub}>
                                            <View style={styles.TextAndBtn}>
                                                <Text>{cmp_location}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.AddressBtn} onPress={() => setModalVisible(true)}>
                                                <Text>주소 검색</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.ContentBox}>
                                        <View style={styles.ContentText}>
                                            <Text style={styles.ContentTextStyle}>사업자</Text>
                                            <Text style={styles.ContentTextStyle}>등록증</Text>
                                        </View>
                                        <View style={styles.ContentInput_sub}>
                                            <View style={styles.TextAndBtn}>
                                                <Image source={{ uri: cmp_certificates.uri }}
                                                    resizeMode={'contain'}
                                                    style={styles.Registration}
                                                />
                                            </View>
                                            <TouchableOpacity style={styles.AddressBtn} onPress={() => REGISTRATION_PICKER()}>
                                                <Text>등록</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.ContentBox}>
                                        <View style={styles.ContentText}>
                                            <Text style={styles.ContentTextStyle}>카테고리</Text>
                                        </View>
                                        <View style={styles.ContentInput}>
                                            <CategoryPicker callback={ReturnCategory} />
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
            <CmpAddressSearchBox visible={modalVisible} location={ReturnLocation} callback={ReturnVisible} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    HeaderTitleBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    HeaderTitleTxt: {
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold'
    },
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        backgroundColor: '#15bac1'
    },
    SelectText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#15bac1',
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
        flex: 3,
        borderWidth: 1,
        borderColor: '#ebebeb',
        borderRadius: 5,
        padding: 5,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    ContentInput_sub: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#ebebeb',
        borderRadius: 5,
        padding: 5,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ContentTextStyle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#15bac1',
    },
    RegisterBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: width * 0.1,
        backgroundColor: '#15bac1'
    },
    RegisterBtnStyle: {
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: '800',
        fontSize: 18,
    },
    TextAndBtn: {
        flex: 3,
        padding: 5,
    },
    AddressBtn: {
        flex: 1,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ebebeb',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Registration: {
        aspectRatio: 0.707
    }
})

export default RegisterScreen;