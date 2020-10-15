import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";
const { width, height } = Dimensions.get('window');

async function getImageRollAsync() {
    if (Constants.platform.ios || Constants.platform.android) {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            throw new Error('CAMERA_ROLL permission not granted');
        }
    }
}

function EditScreen({ route, navigation }) {
    const {
        item_name,
        item_content,
        items_seq,
        ads_type,
        uri,
    } = route.params;
    const [itemName, setItemName] = useState(null);
    const [itemContent, setItemContent] = useState(null);
    const [adsType, setItemAds] = useState(ads_type);
    const [itemUri, setItemUri] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>업체 글쓰기</Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.RightHeader} onPress={() => SaveImages()}>
                    <Text style={styles.TitleHeaderTxtStyle}>완료</Text>
                </TouchableOpacity>
            )
        })
    }, [items_seq, itemName, itemContent, itemUri, adsType]);

    useEffect(() => {
        const REQUEST_PERMISSIONS = async () => {
            await getImageRollAsync();
        }

        const SET_IMAGE = async () => {
            var rawArray = new Array();
            for (var i = 0; i < uri.length; i++) {
                var resizedImage = await ImageManipulator.manipulateAsync(
                    uri[i],
                    [{ resize: { width: 400, height: 400 } }],
                    { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
                );
                rawArray.push({
                    id: 'images',
                    uri: resizedImage.uri
                })
            }
            setItemUri(rawArray);
        }
        SET_IMAGE();
        REQUEST_PERMISSIONS();
    }, [uri]);

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
            if (!IMAGE_INFOs.cancelled) {
                setItemUri([
                    ...itemUri,
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
        setItemUri([
            ...itemUri.slice(0, arrayNumber), ...itemUri.slice(arrayNumber + 1, itemUri.length)
        ])
    }

    const SaveImages = async () => {

        var formData = new FormData();
        formData.append('items_seq', items_seq);
        formData.append('item_name', itemName);
        formData.append('item_content', JSON.stringify(itemContent));
        formData.append('ads_type', adsType);
        if (itemUri.length <= 0) return alert('이미지는 한가지 이상 등록해주세요.');
        
        for (var i = 0; i < itemUri.length; i++) {
            formData.append('image', {
                uri: itemUri[i].uri,
                type: 'image/jpeg',
                name: itemUri[i].id,
            })
        }
        try {
            var SAVE_RESULT = await DATA_SOURCE.UPDATE_IMAGE(formData);
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

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.ShowAdsType}>
                    <View style={styles.AdsTypeAround}>
                        {
                            adsType == 0 ? (
                                <Text>일반</Text>
                            ) : (
                                    <Text>프리미엄</Text>
                                )
                        }
                    </View>
                </View>
                <View style={styles.ContentBox}>
                    <Text style={styles.TitleTxt}>제목</Text>
                    <View style={styles.TextInputAround}>
                        <TextInput
                            value={itemName}
                            placeholderTextColor='#B4B4B4'
                            onChangeText={text => setItemName(text)}
                        />
                    </View>
                </View>
                <View style={styles.ContentBox}>
                    <Text style={styles.TitleTxt}>게시글 내용</Text>
                    <View style={styles.TextAreaAround}>
                        <TextInput
                            value={itemContent}
                            placeholderTextColor='#B4B4B4'
                            multiline={true}
                            onChangeText={text => setItemContent(text)}
                            style={styles.ItemTextTxt}
                        />
                    </View>

                </View>
                <View style={styles.ImageUploadBox}>
                    <TouchableOpacity style={styles.ImageUploadBtn} onPress={() => IMAGE_PICKER()}>
                        <Image source={require('../assets/images/photo_ico.png')} />
                        <Text>{itemUri.length}/10</Text>
                    </TouchableOpacity>
                    <View style={styles.ImageList}>
                        {
                            itemUri.map((data, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index.toString()}
                                        style={styles.ImageListForm}
                                        onPress={() => DELETE_IMAGE(index)}>
                                        <View style={styles.DeleteIcon}>
                                            <Image source={require('../assets/images/close_button.png')} />
                                        </View>
                                        <Image source={{ uri: data.uri }} resizeMode='cover' style={styles.ImageListForm} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    ScrollView: {
        width: width,
    },
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    ShowAdsType: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    AdsTypeAround: {
        borderRadius: 5,
        backgroundColor: 'rgba(245, 245, 245, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 20,
    },
    ContentBox: {
        padding: 15,
        width: width,
    },
    TitleTxt: {
        fontWeight: '700',
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 18,
    },
    TextInputAround: {
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
        borderColor: 'rgba(235, 235, 235, 1)',
        borderWidth: 1,
        backgroundColor: 'rgba(245, 245, 245, 1)'
    },
    TextAreaAround: {
        height: height * 0.5,
        marginTop: 10,
        padding: 15,
        flexDirection: 'column',
        borderRadius: 10,
        borderColor: 'rgba(235, 235, 235, 1)',
        borderWidth: 1,
        backgroundColor: 'rgba(245, 245, 245, 1)',
    },
    ItemTextTxt: {
        height: height * 0.5,
        textAlignVertical: 'top',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 5,
        fontSize: 16,
    },
    ImageUploadBox: {
        width: width,
        height: height * 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'rgba(238, 238, 238, 1)'
    },
    ImageUploadBtn: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageList: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    ImageListForm: {
        margin: 3,
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    DeleteIcon: {
        flex: 1,
        position: 'absolute',
        zIndex: 5,
        top: -1,
        left: 30,
    },
})

export default EditScreen;