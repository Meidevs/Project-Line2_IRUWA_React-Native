import React, { useEffect, useState } from 'react';
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
    SafeAreaView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import { useScreens } from 'react-native-screens';

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
    const [isError, setIsError] = useState(false);
    console.log('adsType', adsType);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>업체 글쓰기</Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.RightHeader} onPress={() => SaveImages(images)}>
                    <Text style={styles.TitleHeaderTxtStyle}>완료</Text>
                </TouchableOpacity>
            )
        })
    }, [images]);

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
                aspect :[400, 400],
                allowsEditing: true,
                quality: 1,
            });
            
            if (!IMAGE_INFOs.cancelled) {
                setImage([
                    ...images,
                    {
                        id: 'images' + images.length,
                        uri: IMAGE_INFOs.uri
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

    const SaveImages = async (images) => {
        var formData = new FormData();
        formData.append('item_name', title);
        formData.append('item_content', content);
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
                <View style={styles.ImageUploadBox}>
                    <TouchableOpacity style={styles.ImageUploadBtn} onPress={() => IMAGE_PICKER()}>
                        <Icon name={'ios-camera'} size={30} />
                        <Text>{images.length}/10</Text>
                    </TouchableOpacity>
                    <View style={styles.ImageList}>
                        {
                            images.map((data, index) => {
                                return (
                                    <TouchableOpacity key={data.id} style={styles.ImageListForm} onPress={() => DELETE_IMAGE(index)}>
                                        <View style={styles.DeleteIcon}>
                                            <Icon name={'ios-close'} size={20} />
                                        </View>
                                        <Image source={{ uri: data.uri }} resizeMode='cover' style={styles.ImageListForm} />
                                    </TouchableOpacity>
                                )
                            })
                        }
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
                <View style={styles.SwitchBtnForm}>
                    <View style={styles.SwitchTitle}>
                        <Text style={styles.TitleTxt}>게시물 광고 타입을 선택해 주세요.</Text>
                    </View>
                    <View style={styles.SwitchBtnArea}>
                        <TouchableOpacity onPress={() => SelectAdsType(0)} style={styles.SwitchBtnContent}>
                            <View style={adsType == 0 ? styles.SwitchBtn : styles.NonSwitchBtn} />
                            <Text style={adsType == 0 ? styles.SwitchBtnTxt : styles.NonSwitchBtnTxt}>일반</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SelectAdsType(1)} style={styles.SwitchBtnContent}>
                            <View style={adsType == 1 ? styles.SwitchBtn : styles.NonSwitchBtn} />
                            <Text style={adsType == 1 ? styles.SwitchBtnTxt : styles.NonSwitchBtnTxt}>프리미엄</Text>
                        </TouchableOpacity>
                    </View>
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
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)'
    },
    ScrollView: {
    },
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
    ItemTitleBox: {
        width: width,
        height: height * 0.08,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)',
    },
    ItemTitleTxt: {
        fontSize: 20,
        width: width * 0.9,
        height: height * 0.06,
        backgroundColor: 'white'
    },
    ItemTextArea: {
        width: width,
        height: height * 0.7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ItemTextTxt: {
        padding: 10,
        width: width * 0.95,
        height: height * 0.65,
        backgroundColor: 'rgba(238, 238, 238, 1)',
        textAlignVertical: 'top',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 5,
        fontSize: 16
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
    SwitchBtnForm: {
        padding: 10,
    },
    SwitchTitle : {
        marginBottom : 10,
    },
    TitleTxt : {
        fontSize : 16,
        fontWeight : 'bold'
    },
    SwitchBtnArea: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    SwitchBtnContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SwitchBtn: {
        margin: 10,
        borderRadius: 10,
        width: 15,
        height: 15,
        borderWidth: 3,
        backgroundColor: 'red',
        borderColor: 'red'
    },
    NonSwitchBtn: {
        margin: 10,
        borderRadius: 10,
        width: 15,
        height: 15,
        borderWidth: 3,
        borderColor: 'black'
    },
    SwitchBtnTxt: {
        fontSize: 16,
        fontWeight: '800',
        color: 'red'
    },
    NonSwitchBtnTxt: {
        fontSize: 16,
        fontWeight: '800',
        color: 'black'
    }
})

export default AddScreen;