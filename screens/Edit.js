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
import Icon from 'react-native-vector-icons/Ionicons';
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
    const [itemUri, setItemUri] = useState(uri);
    console.log(itemUri);

    useEffect(() => {
        const REQUEST_PERMISSIONS = async () => {
            await getImageRollAsync();
        }
        REQUEST_PERMISSIONS();
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
                        <Icon name={'ios-camera'} size={30} />
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
                                            <Icon name={'ios-close'} size={20} />
                                        </View>
                                        <Image source={{ uri: data }} resizeMode='cover' style={styles.ImageListForm} />
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