import React, { useEffect, useState, useReducer } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    Platform
} from 'react-native';

import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from 'expo-permissions';
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

function AddScreen({ route, navigation }) {
    const [images, setImage] = useState([]);
    const [title, setItemTitle] = useState('');
    const [content, setItemContent] = useState('');
    const [adsType, setAdsType] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>업체 글쓰기</Text>
                </View>
            ),
            headerRight: () => (
                <View></View>
            )
        })
    }, [images, title, content, adsType]);

    useEffect(() => {
        const REQUEST_PERMISSIONS = async () => {
            await getImageRollAsync();
        }
        REQUEST_PERMISSIONS();
    }, []);

    const IMAGE_PICKER = async () => {
        try {
            if (images.length >= 10) return alert('이미지는 10개 이상 업로드 하실 수 없습니다.')
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

            if (!IMAGE_INFOs.cancelled) {
                setImage([
                    ...images,
                    {
                        id: 'images',
                        uri: resizedImage.uri
                    }
                ])
            }
        } catch (err) {
            console.log('Image Error', err);
        }
    }

    const DELETE_IMAGE = (arrayNumber) => {
        setImage([
            ...images.slice(0, arrayNumber), ...images.slice(arrayNumber + 1, images.length)
        ])
    }

    const SaveImages = async () => {

        var formData = new FormData();
        formData.append('item_name', title);
        formData.append('item_content', JSON.stringify(content));
        formData.append('ads_type', adsType);
        for (var i = 0; i < images.length; i++) {
            formData.append('image', {
                uri: images[i].uri,
                type: 'image/jpeg',
                name: images[i].id,
            })
        }
        try {
            var SAVE_RESULT = await DATA_SOURCE.SAVE_IMAGES(formData);
            if (SAVE_RESULT.flags == 0) {
                navigation.goBack();
                alert(SAVE_RESULT.message);
            } else {
                alert(SAVE_RESULT.message);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    const SelectAdsType = (num) => {
        setAdsType(num);
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.SwitchBtnForm}>
                    <View style={styles.SwitchTitle}>
                        <Text style={styles.TitleTxt}>게시물 광고 타입을 선택해 주세요.</Text>
                    </View>
                    <View style={styles.SwitchBtnArea}>
                        <TouchableOpacity onPress={() => SelectAdsType(0)} style={styles.SwitchBtnContent}>
                            <View style={styles.SwitchBtn}>
                                <View style={[styles.Circle, adsType == 0 ? {backgroundColor : '#15bac1'} : {backgroundColor : '#ffffff'}]} />
                            </View>
                            <Text style={styles.SwitchBtnTxt}>일반</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SelectAdsType(1)} style={styles.SwitchBtnContent}>
                            <View style={styles.SwitchBtn}>
                                <View style={[styles.Circle, adsType == 1 ? {backgroundColor : '#15bac1'} : {backgroundColor : '#ffffff'}]} />
                            </View>
                            <Text style={styles.SwitchBtnTxt}>프리미엄</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ItemTitleBox}>
                    <TextInput
                        value={title}
                        placeholder={'제목을 입력해 주세요.'}
                        placeholderTextColor='#B4B4B4'
                        style={styles.ItemTitleTxt}
                        onChangeText={(text) => setItemTitle(text)}
                    />
                </View>
                <View style={styles.ItemTextArea}>
                    <TextInput
                        value={content}
                        placeholder={'게시글(광고글)을 작성해 주세요.'}
                        placeholderTextColor='#B4B4B4'
                        onChangeText={(text) => setItemContent(text)}
                        multiline={true}
                        style={styles.ItemTextTxt}
                    />
                </View>
                <View style={styles.ImageList}>
                    {
                        images.map((data, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.ImageListForm}
                                    onPress={() => DELETE_IMAGE(index)}>
                                    <View style={styles.DeleteIcon}>
                                        <Image source={require('../assets/images/close_button.png')}
                                            style={{ width: 10, height: 10 }}
                                        />
                                    </View>
                                    <Image source={{ uri: data.uri }} resizeMode='cover' style={styles.ImageListForm} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={styles.ImageUploadBox}>
                    <TouchableOpacity style={styles.ImageUploadBtn} onPress={() => IMAGE_PICKER()}>
                        <Image source={require('../assets/images/photo_ico.png')}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.SaveBtnForm}>
                <TouchableOpacity style={styles.SaveBtn} onPress={() => SaveImages()}>
                    <Text style={styles.SaveTxt}>작성하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)'
    },
    ScrollView: {
        flex: 1,
    },
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    ImageUploadBox: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageUploadBtn: {
        flex: 1,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        padding: 20,
        borderWidth: 1,
        borderColor: '#4C4C4C',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageList: {
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    ItemTitleBox: {
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ebebeb',
    },
    ItemTitleTxt: {
        flex : 1,
        fontSize: 15,
    },
    ItemTextArea: {
        marginRight: 25,
        marginLeft: 25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb',
        padding: 15,
        height: 400,
        flexDirection: 'column',
    },
    ItemTextTxt: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 15,
    },
    ImageListForm: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    DeleteIcon: {
        position: 'absolute',
        zIndex: 2,
        top: 5,
        right: 5,
    },
    SwitchBtnForm: {
        margin: 25,
    },
    SwitchTitle: {
    },
    TitleTxt: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    SwitchBtnArea: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    SwitchBtnContent: {
        marginTop: 20,
        marginRight: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SwitchBtn: {
        marginRight: 13,
        borderRadius: 15,
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#ebebeb',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Circle: {
        width: 9,
        height: 9,
        borderRadius: 9,
    },
    SwitchBtnTxt: {
        fontSize: 15,
        fontWeight: '800',
        letterSpacing: -0.3,
        color: '#000000'
    },
    SaveBtnForm: {
        height: 62,
        width: width,
        backgroundColor: '#000000'
    },
    SaveBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SaveTxt: {
        fontWeight: '800',
        fontSize: 15,
        color: '#ffffff'
    }
})

export default AddScreen;