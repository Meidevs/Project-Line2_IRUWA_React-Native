import React, { useState, useEffect } from 'react';
import {
    View,
    Modal,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Platform
} from 'react-native';
import Constants from "expo-constants";
import ROADAPI from '../../assets/dataSource/roadAPI';
import AddressFilter from './AddressFilter';
const { width, height } = Dimensions.get('window');

const CmpAddrSearchBox = ({ visible, location, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [keyword, setKeywords] = useState(null);
    const [address, setAddressList] = useState([]);
    const [isStart, setSearchStart] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const SEARCH_DETAIL_ADDRESS = async () => {
        setSearchStart(true)
        if (AddressFilter(keyword) && keyword != null) {
            var DETAIL_SEARCH_RESPONSE = await ROADAPI.SEARCH_DETAIL_ADDRESS(keyword);
            if (DETAIL_SEARCH_RESPONSE.results.juso != null) {
                setAddressList(DETAIL_SEARCH_RESPONSE.results.juso);
            } else {
                alert(DETAIL_SEARCH_RESPONSE.results.common.errorMessage);
            }
        }
        setIsLoaded(true)
        setSearchStart(false)
    };
    useEffect(() => {
        setModalVisible(visible)
    }, [visible]);

    const onChangeVisible = (visibility) => {
        if (visibility == false) {
            setKeywords(null);
        }
        callback(false);
        setIsLoaded(false);
        setAddressList([]);
    }

    const SetAddress = async (cmp_location) => {
        var SEARCH_ADDRESS = await ROADAPI.SEARCH_ADDRESS(cmp_location);
        var locationString = SEARCH_ADDRESS.documents[0].address.region_1depth_name;
        locationString += ' ' + SEARCH_ADDRESS.documents[0].address.region_2depth_name;
        locationString += ' ' + SEARCH_ADDRESS.documents[0].address.region_3depth_h_name;
        var lon = SEARCH_ADDRESS.documents[0].address.y;
        var lat = SEARCH_ADDRESS.documents[0].address.x;
        location([cmp_location, locationString, lon, lat])
        callback(false);
        setIsLoaded(false);
        setAddressList([]);
    }

    const componentJSX = () => {
        if (!isStart) {
            return (
                address.map((data, index) => {
                    if (index % 2 == 0) {
                        return (
                            <TouchableOpacity key={JSON.stringify(index)} style={styles.AddressList_a} onPress={() => SetAddress(data.jibunAddr)}>
                                <Text>{data.zipNo}</Text>
                                <Text>{data.jibunAddr}</Text>
                                <Text>{data.roadAddr}</Text>
                            </TouchableOpacity>
                        )
                    } else {
                        return (
                            <TouchableOpacity key={JSON.stringify(index)} style={styles.AddressList_b} onPress={() => SetAddress(data.jibunAddr)}>
                                <Text>{data.zipNo}</Text>
                                <Text>{data.jibunAddr}</Text>
                                <Text>{data.roadAddr}</Text>
                            </TouchableOpacity>
                        )
                    }
                })
            )
        } else {
            return (
                <View style={styles.Loading}>
                    <ActivityIndicator
                        animating={true} />
                </View>
            )
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}

        >
            <View style={styles.Container}>
                <View style={styles.ModalHeader}>
                    <View style={styles.HeaderContent}>
                        <TouchableOpacity style={styles.CloseBtn} onPress={() => onChangeVisible(!modalVisible)}>
                            <Image source={require('../images/close_button.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ModalView}>
                    <View style={styles.TitleBox}>
                        <Text style={styles.TitleText}>업체 주소를</Text>
                        <Text style={styles.TitleText}>입력하세요</Text>
                    </View>
                    <View style={styles.SearchBox}>
                        <View style={styles.SearchInput}>
                            <TextInput
                                value={keyword}
                                placeholder={'예) 도로명 또는 지번주소'}
                                placeholderTextColor='#B4B4B4'
                                clearTextOnFocus={true}
                                onChangeText={(text) => setKeywords(text)}
                                style={styles.SearchInputText}
                            />
                            <TouchableOpacity style={styles.SearchInputBtn} onPress={() => SEARCH_DETAIL_ADDRESS()}>
                                <Image source={require('../images/search_ico.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <SafeAreaView style={styles.SafeAreaView}>
                    <ScrollView>
                        {
                            componentJSX()
                        }
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: width,
        height: height,
        marginTop: Platform.OS == 'ios' ? Constants.statusBarHeight : null,
        backgroundColor: '#ffffff'
    },
    ModalHeader: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#ffffff",
    },
    HeaderContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ModalView: {
        width: width,
        zIndex: 5,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        borderBottomWidth: 1,
        borderColor: '#ebebeb'
    },
    CloseBtn: {
    },
    TitleBox: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingRight: 20,
        paddingLeft: 20,
    },
    TitleText: {
        fontSize: 24,
        fontWeight: '800'
    },
    SearchBox: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    SearchInput: {
        borderRadius: 5,
        marginRight: 5,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cecece',
        backgroundColor: '#f2f2f2',
    },
    SearchInputText: {
        flex: 8,
        fontSize : 15,
    },
    SearchInputBtn: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CurrentLocate: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 15,
        width: width,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    CLBtn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(200, 200, 200, 1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    AddressList_a: {
        padding: 20,
        borderBottomWidth: 0.8,
        borderColor: '#f2f2f2',
    },
    AddressList_b: {
        padding: 20,
        borderBottomWidth: 0.8,
        borderColor: '#f2f2f2',
        backgroundColor: '#fafafa'
    },
    Loading : {
        padding : 20,
    }
});


export default CmpAddrSearchBox;