import { HeaderBackButton } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import TermA from '../assets/components/Terms/TermA';
import TermB from '../assets/components/Terms/TermB';
import TermC from '../assets/components/Terms/TermC';
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

function UserTypeScreen({ route, navigation }) {
    const [pageCount, setPageCount] = useState(0);
    const [isTermA, setIsTermA] = useState(false);
    const [isTermB, setIsTermB] = useState(false);
    const [isTermC, setIsTermC] = useState(false);
    const [confirmA, setConfirmA] = useState(false);
    const [confirmB, setConfirmB] = useState(false);
    const [confirmC, setConfirmC] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [status, SelectionStatus] = useState(0);
    const [recommendation, setRecommendation] = useState(null);
    const [user_id, setUserID] = useState(null);
    const [user_pw, setPassword] = useState(null);
    const [password_again, setPassword_Again] = useState(null);
    const [password_boolean, setPassword_Boolean] = useState(false);
    const [user_name, setUserName] = useState(null);
    const [user_phone, setUserPhone] = useState(null);
    const [user_email, setUserEmail] = useState(null);
    const [email_duplication, setEmailDuplicate] = useState(true);
    const [user_location, setUserLocation] = useState(null);
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
        navigation.setOptions({
            headerLeft: () => {
                console.log(pageCount)
                return (
                    pageCount > 0 ? (
                        <HeaderBackButton
                            tintColor={'#ffffff'}
                            onPress={() => PrevPage()}
                        />
                    ) : (
                            <HeaderBackButton
                                tintColor={'#ffffff'}
                                onPress={() => navigation.goBack()}
                            />
                        )
                )
            },
            headerTitle: () => (
                <View>
                    <Text></Text>
                </View>
            ),
            headerStyle: {
                backgroundColor: '#15bac1',
                elevation: 0,
            }
        })
    }, [pageCount]);
    useEffect(() => {
        (async () => {
            if (Constants.platform.ios || Constants.platform.android) {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access location was denied');
                } else {
                    var position = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Highest
                    });
                    var response = await ROADAPI.GET_CURRENT_LOCATION(position);
                    setUserLocation(response);
                }
            }
        })();
        (async () => {
            if (Constants.platform.ios || Constants.platform.android) {
                let { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('CAMERA_ROLL permission not granted');
                }
            }
        })();
    }, []);

    const callbackA = (ChildFrom) => {
        setIsTermA(ChildFrom)
    }
    const callbackB = (ChildFrom) => {
        setIsTermB(ChildFrom)
    }
    const callbackC = (ChildFrom) => {
        setIsTermC(ChildFrom)
    }
    const SetUserPassword = async (data) => {
        try {
            var PASSWORD = await PASSWORD_CHECK(data);
            setPassword(PASSWORD.text);
            setPassword_Boolean(PASSWORD.response)
        } catch (err) {
            console.log(err)
        }
    }

    const NextPage = () => {
        switch (pageCount) {
            case 0:
                if (confirmA & confirmB & confirmC) {
                    setPageCount(pageCount => pageCount + 1);
                } else {
                    alert('약관에 동의해 주세요.')
                }
                break;
            case 1:
                setPageCount(pageCount => pageCount + 1);
                break;

            case 2:
                if (user_id != null & user_pw != null & password_again != null) {
                    if (user_pw == password_again) {
                        setPageCount(pageCount => pageCount + 1);
                    }
                } else {
                    alert('아이디와 비밀번호를 확인해 주세요.')
                }
                break;

            case 3:
                if (user_name != null & user_phone != null & user_email != null) {
                    if (email_duplication == false) {
                        setPageCount(pageCount => pageCount + 1);
                    } else {
                        alert('이메일을 확인해 주세요.')
                    }
                } else {
                    alert('정보를 입력해 주세요.')
                }
                break;

            case 4:
                if (user_name != null & user_phone != null & user_email != null) {
                    setPageCount(pageCount => pageCount + 1);
                } else {
                    alert('정보를 입력해 주세요.')
                }
                break;
            case 5:
                if (user_name != null & user_phone != null & user_email != null) {
                    setPageCount(pageCount => pageCount + 1);
                } else {
                    alert('정보를 입력해 주세요.')
                }
                break;
        }
    }
    const PrevPage = () => {
        setPageCount(pageCount => pageCount - 1);
    }
    const DuplicationCheck = async () => {
        if (user_email != null) {
            var DUPLICATION = await AUTHENTICATION.EMAIL_DUPLICATION(user_email);
            if (DUPLICATION.flags == 0) {
                setEmailDuplicate(false);
                alert(DUPLICATION.message);
            } else {
                alert(DUPLICATION.message);
            }
        }
    }

    const componentJSX_A = () => {
        switch (pageCount) {
            case 0:
                return (
                    <View>
                        <View style={styles.AgreementTerms}>
                            <TouchableOpacity style={styles.Terms} onPress={() => setIsTermA(true)}>
                                <Text>개인정보 처리방침</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={confirmA == true ? styles.ConfirmBtn : styles.NonConfirmBtn} onPress={() => setConfirmA(!confirmA)}>
                                <Text style={confirmA == true ? styles.ConfirmTxt : styles.NonConfirmTxt}>동의</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.AgreementTerms}>
                            <TouchableOpacity style={styles.Terms} onPress={() => setIsTermB(true)}>
                                <Text>이루와 회원 이용 약관</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={confirmB == true ? styles.ConfirmBtn : styles.NonConfirmBtn} onPress={() => setConfirmB(!confirmB)}>
                                <Text style={confirmB == true ? styles.ConfirmTxt : styles.NonConfirmTxt}>동의</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.AgreementTerms}>
                            <TouchableOpacity style={styles.Terms} onPress={() => setIsTermC(true)}>
                                <Text>표준 위치기반서비스 이용약관</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={confirmC == true ? styles.ConfirmBtn : styles.NonConfirmBtn} onPress={() => setConfirmC(!confirmC)}>
                                <Text style={confirmC == true ? styles.ConfirmTxt : styles.NonConfirmTxt}>동의</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                )
            case 1:
                return (
                    <View style={styles.UserSelectForm}>
                        <View style={styles.UserSelectTitle}>
                            <Text style={styles.TitleTxt}>사용자 유형을 선택해 주세요.</Text>
                        </View>
                        <View style={styles.UserSelection}>
                            <TouchableOpacity style={status == 0 ? styles.UserTypeBtn : styles.NonUserTypeBtn} onPress={() => SelectionStatus(0)}>
                                <Text style={status == 0 ? styles.BtnTxt : styles.NonBtnTxt}>개인 사용자</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={status == 1 ? styles.UserTypeBtn : styles.NonUserTypeBtn} onPress={() => SelectionStatus(1)}>
                                <Text style={status == 1 ? styles.BtnTxt : styles.NonBtnTxt}>업체 사용자</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.UserSelectTitle}>
                            <Text style={styles.TitleTxt}>추천인 코드를 입력해 주세요.</Text>
                        </View>
                        <View style={styles.UserSelection}>
                            <TextInput
                                value={recommendation}
                                placeholder={'추천인 코드를 입력해 주세요.'}
                                onChangeText={text => setRecommendation(text)}
                            />
                        </View>
                    </View>
                )
            case 2:
                return (
                    <View>
                        <View style={styles.TextInputForm}>
                            <TextInput
                                value={user_id}
                                placeholder={'아이디를 입력해주세요.'}
                                onChangeText={text => setUserID(text)}
                            />

                        </View>
                        <View style={styles.TextInputForm}>
                            <TextInput
                                value={user_pw}
                                placeholder={'비밀번호를 입력해주세요.'}
                                secureTextEntry={true}
                                onChangeText={text => SetUserPassword(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.ExplanationText}>{password_boolean == false ? '영문(대,소문자), 특수문자, 숫자를 조합하여 8자 이상 입력해주세요.' : ''}</Text>
                        </View>
                        <View style={styles.TextInputForm}>
                            <TextInput
                                value={password_again}
                                placeholder={'비밀번호를 다시 입력해주세요.'}
                                secureTextEntry={true}
                                onChangeText={text => setPassword_Again(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.ExplanationText}>{user_pw == password_again ? '' : '비밀번호가 일치하지 않습니다.'}</Text>
                        </View>
                    </View>
                )
            case 3:
                return (
                    <View>
                        <View style={styles.TextInputForm}>
                            <TextInput
                                value={user_name}
                                placeholder={'이름을 입력해주세요.'}
                                onChangeText={text => setUserName(text)}
                            />

                        </View>
                        <View style={styles.TextInputForm_B}>
                            <TextInput
                                value={user_email}
                                placeholder={'메일을 입력해 주세요.'}
                                secureTextEntry={true}
                                onChangeText={text => setUserEmail(text)}
                            />
                            <TouchableOpacity style={styles.AddressBtn} onPress={() => DuplicationCheck()}>
                                <Text style={styles.AddrBtnTxt}>확인</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.TextInputForm}>
                            <TextInput
                                value={user_phone}
                                placeholder={'전화번호를 입력해 주세요.'}
                                secureTextEntry={true}
                                onChangeText={text => setUserPhone(text)}
                            />
                        </View>
                        <View style={styles.TextInputForm}>
                            <Text>{user_location}</Text>
                        </View>
                    </View>
                )
            case 4:
                return (
                    <View>
                        <View style={styles.TextInputForm}>
                            <TextInput
                                value={cmp_name}
                                placeholder={'업체 명을 입력해주세요.'}
                                onChangeText={text => setCompanyName(text)}
                            />

                        </View>
                        <View style={styles.TextInputForm}>
                            <TextInput
                                value={cmp_phone}
                                placeholder={'업체 전화번호를 입력해주세요.'}
                                onChangeText={text => setCompanyPhone(text)}
                            />
                        </View>
                        <View style={styles.TextInputForm_B}>
                            <Text>{cmp_location}</Text>
                            <TouchableOpacity style={styles.AddressBtn} onPress={() => setModalVisible(true)}>
                                <Text style={styles.AddrBtnTxt}>주소 검색</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            case 5:
                return (
                    <View>
                        <View style={styles.TextInputForm_B}>
                            <Image source={{ uri: cmp_certificates.uri }}
                                resizeMode={'contain'}
                                style={styles.Registration}
                            />
                            <TouchableOpacity style={styles.AddressBtn} onPress={() => REGISTRATION_PICKER()}>
                                <Text>사업자 등록증</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.TextInputForm_C}>
                            <CategoryPicker callback={ReturnCategory} />
                        </View>
                    </View>
                )
        }
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
        var data = new Object();
        var formData = new FormData();
        data.status = status;
        data.recommendation = recommendation;
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
        if (status == 1) {
            formData.append('image', {
                uri: cmp_certificates.uri,
                type: 'image/jpeg',
                name: 'image',
            })
        }
        formData.append('data', JSON.stringify(data));
        var response = await AUTHENTICATION.REGISTER(formData);
        if (response.flags == 0) {
            alert(response.message);
            navigation.popToTop('Main');
        } else {
            alert(response.message);
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
        <View style={styles.Container}>
            <View style={styles.RegisterCard}>
                <View style={styles.RegisterCardIcon}>
                    <Image source={require('../assets/images/agreement_terms_ico.png')}
                        style={{ width: 30, height: 30, }}
                    />
                </View>
                {
                    componentJSX_A()
                }
                {
                    status == 0 & pageCount == 3 ? (
                        <TouchableOpacity style={styles.NextBtn} onPress={() => Register()}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.3, color: '#ffffff' }}>완료</Text>
                        </TouchableOpacity>
                    ) : status == 1 & pageCount == 5 ? (
                        <TouchableOpacity style={styles.NextBtn} onPress={() => Register()}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.3, color: '#ffffff' }}>완료</Text>
                        </TouchableOpacity>
                    ) : (
                                <TouchableOpacity style={styles.NextBtn} onPress={() => NextPage()}>
                                    <Image source={require('../assets/images/long_right_arrow_ico.png')}
                                        style={{ width: 55, height: 27.5 }}
                                    />
                                </TouchableOpacity>
                            )
                }
            </View >
            <TermA visible={isTermA} callback={callbackA} />
            <TermB visible={isTermB} callback={callbackB} />
            <TermC visible={isTermC} callback={callbackC} />
            <CmpAddressSearchBox visible={modalVisible} location={ReturnLocation} callback={ReturnVisible} />
        </View >
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#15bac1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    RegisterCard: {
        width: width * 0.9,
        height: height * 0.5,
        paddingTop: 60,
        paddingBottom: 60,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        elevation: 2,
        shadowOffset: {
            height: 1,
        }
    },
    AgreementTerms: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Terms: {
        padding: 15,
        borderRadius: 10,
        borderColor: '#17C8CF',
        borderWidth: 1,
        marginRight: 15,
    },
    ConfirmBtn: {
        borderRadius: 10,
        padding: 15,
        borderColor: '#15bac1',
        borderWidth: 1,
        backgroundColor: '#15bac1'
    },
    NonConfirmBtn: {
        borderRadius: 10,
        padding: 15,
        borderColor: '#15bac1',
        borderWidth: 1,
    },
    ConfirmTxt: {
        fontSize: 13,
        fontWeight: '700',
        color: '#ffffff'
    },
    NonConfirmTxt: {
        fontSize: 13,
        fontWeight: '700',
        color: '#15bac1'
    },
    UserSelectForm: {
        flex: 1,
    },
    UserSelectTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    TitleTxt: {
        fontSize: 15,
        color: '#2f2f2f',
        fontWeight: 'bold'
    },
    UserSelection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UserTypeBtn: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#15bac1',
        margin: 10,
    },
    NonUserTypeBtn: {
        borderRadius: 10,
        padding: 20,
        borderColor: '#15bac1',
        borderWidth: 1,
        margin: 10,
    },
    BtnTxt: {
        fontSize: 13,
        fontWeight: '800',
        color: '#ffffff'
    },
    NonBtnTxt: {
        fontSize: 13,
        fontWeight: '800',
        color: '#15bac1'
    },
    RegisterCardIcon: {
        position: 'absolute',
        top: -30,
        padding: 10,
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowOffset: {
            height: 2,
        },
        alignItems: 'center',
        justifyContent: 'center'
    },
    NextBtn: {
        position: 'absolute',
        bottom: -30,
        padding: 10,
        width: 120,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#15bac1',
        elevation: 2,
        shadowOffset: {
            height: 2,
        },
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextInputForm: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ebebeb'
    },
    TextInputForm_B: {
        width: width * 0.6,
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ebebeb'
    },
    TextInputForm_C: {
        width: width * 0.6,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ebebeb',
        borderRadius: 10,
    },
    AddressBtn: {
        padding: 10,
        borderRadius: 10,
        borderColor: '#15bac1',
        borderWidth: 1,
        marginLeft: 10,
    },
    AddrBtnTxt: {
        fontSize: 12,
        fontWeight: '800',
        color: '#15bac1'
    },
    Registration: {
        width: 80,
        height: 120,
    },
    ExplanationText: {
        fontSize: 10,
        color: '#15bac1'
    },
    CategorySelect: {
        flex: 1,
        width: 300,
        height: 150,
    }
})
export default UserTypeScreen;