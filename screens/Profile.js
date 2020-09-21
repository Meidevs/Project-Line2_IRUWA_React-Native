import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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
                <TouchableOpacity style={styles.RightHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>저장</Text>
                </TouchableOpacity>
            ),
        })
    }, []);

    useEffect(() => {
        const GET_PROFILE_IMAGE = async () => {
            var PROFILE_IMAGE = await AUTHENTICATION.GET_USER_PROFILE(user_seq);
            if (PROFILE_IMAGE.flags == 0) {
                setProfileImage({uri : PROFILE_IMAGE.message});
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
            if (!IMAGE_INFOs.cancelled && SAVE_RESULT) {
                setProfileImage({
                    uri: resizedImage.uri
                })
            }
        } catch (err) {
            console.log('Image Error', err);
        }
    }
    if (isLoaded) {
        return (
            <SafeAreaView style={styles.Container}>
                <ScrollView>
                    <View style={styles.ImageSelectorBox} >
                        <ImageBackground style={styles.ImageSelector}
                            source={profileImage.uri == null ? require('../assets/images/defaultProfile.png') : { uri: profileImage.uri }}
                            resizeMode={'cover'}
                            borderRadius={80}
                        >
                            <TouchableOpacity onPress={() => IMAGE_PICKER()}>
                                <View style={styles.IconBox}>
                                    <Icon name={'camera'} size={28} />
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.SettingBox}>
                        <View style={styles.MyinfoSettingTitle}>
                            <Text style={styles.TitleStyle}>사용자 정보</Text>
                        </View>
                        <View style={styles.SettingContent}>
                            <Text>비밀번호 변경</Text>
                        </View>
                        <View style={styles.SettingContent}>
                            <Text>이메일 수정</Text>
                        </View>
                        <View style={styles.SettingContent}>
                            <Text>전화번호 수정</Text>
                        </View>
                    </View>
                    <View style={styles.SettingBox}>
                        <View style={styles.MyinfoSettingTitle}>
                            <Text style={styles.TitleStyle}>업체 정보</Text>
                        </View>
                        <View style={styles.SettingContent}>
                            <Text>영업 지점 변경</Text>
                        </View>
                        <View style={styles.SettingContent}>
                            <Text>전화번호 수정</Text>
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
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 18
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
    },
    ImageSelectorBox: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    ImageSelector: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    IconBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        elevation: 2,
        borderRadius: 30,
        padding: 5,
    },
    SettingBox: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    MyinfoSettingTitle: {
        padding: 15,
    },
    TitleStyle: {
        fontWeight: '800',
        fontSize: 13,
        color: 'rgba(70, 70, 70, 1)',
    },
    SettingContent: {
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    }
})

export default ProfileScreen;