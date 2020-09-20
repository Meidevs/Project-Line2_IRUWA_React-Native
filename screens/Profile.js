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
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";
import DATA_SOURCE from '../assets/dataSource/dataModel';

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
    const [profileImage, setProfileImage] = useState(null)
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

    const IMAGE_PICKER = async () => {
        try {
            let IMAGE_INFOs = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [400, 400],
                allowsEditing: true,
                quality: 1,
            });

            var resizedImage = await ImageManipulator.manipulateAsync(
                IMAGE_INFOs.uri,
                [{ resize: { width: 400, height: 400 } }],
                { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
            );
            console.log('resizedImage', resizedImage)
            if (!IMAGE_INFOs.cancelled) {
                setProfileImage({
                    id: 'images',
                    uri: resizedImage.uri
                })
            }
        } catch (err) {
            console.log('Image Error', err);
        }
    }

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.ImageSelectorBox} >
                    <TouchableOpacity style={styles.ImageSelector} onPress={() => IMAGE_PICKER()}>
                        <View style={styles.IconBox}>
                            <Icon name={'ios-camera'} size={32} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.SettingBox}>
                    <View style={styles.MyinfoSettingTitle}>
                        <Text style={styles.TitleStyle}>사용자 정보</Text>
                    </View>
                    <View style={styles.SettingContent}>
                        <Text>영업 지점 변경</Text>
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
            </ScrollView>
        </SafeAreaView>
    )
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
    RightHeader : {
        padding : 10,
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
        backgroundColor: 'rgba(220, 220, 220, 1)',
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