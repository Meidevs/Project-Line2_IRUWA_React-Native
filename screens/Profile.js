import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";
import AUTHENTICATION from '../assets/dataSource/authModel';

const { width, height } = Dimensions.get('window');

async function getImageRollAsync() {
    if (Constants.platform.ios || Constants.platform.android) {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            throw new Error('CAMERA_ROLL permission not granted');
        }
    }
}

function ProfileScreen({ route, navigation }) {
    const {
        user_seq
    } = route.params;
    const [profileImage, setProfileImage] = useState({ uri: null });
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>개인정보수정</Text>
                </View>
            ),
            headerRight: () => (
                <View></View>
            ),
        })
    }, []);

    useEffect(() => {
        const GET_PROFILE_IMAGE = async () => {
            getImageRollAsync();
            var PROFILE_IMAGE = await AUTHENTICATION.GET_USER_PROFILE(user_seq);
            if (PROFILE_IMAGE.flags == 0) {
                setProfileImage({ uri: PROFILE_IMAGE.message });
            }
            setIsLoad(true);
        }
        GET_PROFILE_IMAGE();
    }, [route])

    const IMAGE_PICKER = async () => {
        try {
            // Image Picker 
            let IMAGE_INFOs = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [400, 400],
                allowsEditing: true,
                quality: 1,
            });
            console.log(IMAGE_INFOs)

            //Resize Image to Send Server.
            var resizedImage = await ImageManipulator.manipulateAsync(
                IMAGE_INFOs.uri,
                [{ resize: { width: 400, height: 400 } }],
                { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
            );

            //Save User Profile Image to Local.
            var formData = new FormData();
            formData.append('image', {
                uri: resizedImage.uri,
                type: 'image/jpeg',
                name: 'image',
            });
            // Send User Profile Image to Server
            var SAVE_RESULT = await AUTHENTICATION.SAVE_PROFILE_IMAGE(formData);
            console.log('SAVE_RESULT', SAVE_RESULT)
            if (!IMAGE_INFOs.cancelled) {
                if (SAVE_RESULT.flags == 1) {
                    setProfileImage({
                        uri: resizedImage.uri
                    })
                }
            }
        } catch (err) {
            console.log('Image Error', err);
        }
    }
    if (isLoaded) {
        return (
            <SafeAreaView style={styles.Container}>
                <ScrollView>
                    <View style={styles.ProfileImageBox}>
                        <Image style={styles.ProfileImage}
                            source={profileImage.uri == null ? require('../assets/images/defaultProfile.png') : { uri: profileImage.uri }}
                            resizeMode={'cover'}
                            borderRadius={80}
                        />
                        <View style={styles.ProfileImageBtn}>
                            <TouchableOpacity onPress={() => IMAGE_PICKER()} style={styles.ProfileBtn}>
                                <Image source={require('../assets/images/photo_ico.png')}
                                    style={{ width: 23, height: 20, marginRight: 10 }} />
                                <Text style={styles.ProfileTxt}>
                                    프로필 이미지 변경
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.SettingBox}>
                        <View style={styles.MyinfoSettingTitle}>
                            <Image source={require('../assets/images/profile_info_ico.png')}
                                style={{ width: 20, height: 20, marginRight: 10 }}
                            />
                            <Text style={styles.TitleStyle}>사용자 정보</Text>
                        </View>
                        <View style={styles.ProfileSettings}>
                            <Text style={styles.ProfileSettingTxt}>이름 변경</Text>
                            <Image source={require('../assets/images/right_arrow_ico.png')}
                                style={{ width: 15, height: 15, }}
                            />
                        </View>
                        <View style={styles.ProfileSettings}>
                            <Text style={styles.ProfileSettingTxt}>전화번호 수정</Text>
                            <Image source={require('../assets/images/right_arrow_ico.png')}
                                style={{ width: 15, height: 15, }}
                            />
                        </View>
                    </View>
                    <View style={styles.SettingBox}>
                        <View style={styles.MyinfoSettingTitle}>
                            <Image source={require('../assets/images/company.png')}
                                style={{ width: 20, height: 20, marginRight: 10 }}
                            />
                            <Text style={styles.TitleStyle}>업체 정보</Text>
                        </View>
                        <View style={styles.ProfileSettings}>
                            <Text style={styles.ProfileSettingTxt}>업체명 변경</Text>
                            <Image source={require('../assets/images/right_arrow_ico.png')}
                                style={{ width: 15, height: 15, }}
                            />
                        </View>
                        <View style={styles.ProfileSettings}>
                            <Text style={styles.ProfileSettingTxt}>영업 지역 변경</Text>
                            <Image source={require('../assets/images/right_arrow_ico.png')}
                                style={{ width: 15, height: 15, }}
                            />
                        </View>
                        <View style={styles.ProfileSettings}>
                            <Text style={styles.ProfileSettingTxt}>업체 전화번호 변경</Text>
                            <Image source={require('../assets/images/right_arrow_ico.png')}
                                style={{ width: 15, height: 15, }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    } else {
        return null;
    }
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
    RightHeader: {
        padding: 10,
    },
    SettingHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    ProfileImageBox: {
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ProfileImage: {
        width: 150,
        height: 150,
        borderRadius: 150,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ProfileImageBtn: {
        width: width,
        padding: 25,
    },
    ProfileBtn: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#cecece',
        borderWidth: 1,
        borderRadius: 10,
    },
    ProfileTxt: {
        fontSize: 15,
        fontWeight: '600',
        color: '#070707'
    },
    SettingBox: {
        width: width,
        marginTop: 12,
        paddingRight: 25,
        paddingLeft: 25,
        flexDirection: 'column',
    },
    MyinfoSettingTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 25
    },
    TitleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000000',
        letterSpacing: -0.3,
    },
    ProfileSettings: {
        borderRadius: 10,
        borderColor: '#ebebeb',
        borderWidth: 1,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 30,
        paddingBottom: 30,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ProfileSettingTxt: {
        fontSize: 13,
        fontWeight: '800',
        color: '#000000'
    }
})

export default ProfileScreen;