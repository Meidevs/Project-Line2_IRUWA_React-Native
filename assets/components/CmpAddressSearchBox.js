import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    Modal,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ROADAPI from '../../assets/dataSource/roadAPI';
import AddressFilter from './AddressFilter';
const { width, height } = Dimensions.get('window');

const CmpAddrSearchBox = ({ visible, location, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [keyword, setKeywords] = useState(null);
    const [address, setAddressList] = useState([]);
    const [searchBtn, setSearchStart] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const SEARCH_DETAIL_ADDRESS = useCallback(async () => {
        if (AddressFilter(keyword) && keyword != null) {
            var DETAIL_SEARCH_RESPONSE = await ROADAPI.SEARCH_DETAIL_ADDRESS(keyword);
            setAddressList(DETAIL_SEARCH_RESPONSE.results.juso)
        }
        setIsLoaded(true)
        setSearchStart(false)
    }, [searchBtn]);

    useEffect(() => {
        SEARCH_DETAIL_ADDRESS()
    }, [SEARCH_DETAIL_ADDRESS]);

    useEffect(() => {
        setModalVisible(visible)
    }, [visible]);

    const onChangeVisible = (visibility) => {
        if (visibility == false) {
            setKeywords(null)
        }
        callback(false)
    }

    const SetAddress = async (cmp_location) => {
        var SEARCH_ADDRESS = await ROADAPI.SEARCH_ADDRESS(cmp_location);
        var locationString = SEARCH_ADDRESS.documents[0].address.region_1depth_name;
        locationString += ' ' + SEARCH_ADDRESS.documents[0].address.region_2depth_name;
        locationString += ' ' + SEARCH_ADDRESS.documents[0].address.region_3depth_h_name;
        var lon = SEARCH_ADDRESS.documents[0].address.y;
        var lat = SEARCH_ADDRESS.documents[0].address.x;
        location([cmp_location, locationString, lon, lat])
        callback(false)
    }

    const componentJSX = () => {
        return (
            address.map((data, index) => {
                return (
                    <TouchableOpacity key={JSON.stringify(index)} style={styles.AddressList} onPress={() => SetAddress(data.jibunAddr)}>
                        <Text>{data.zipNo}</Text>
                        <Text>{data.jibunAddr}</Text>
                        <Text>{data.roadAddr}</Text>
                    </TouchableOpacity>
                )
            })
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.ModalHeader}>
                <View style={styles.HeaderContent}>
                    <TouchableOpacity style={styles.CloseBtn} onPress={() => onChangeVisible(!modalVisible)}>
                        <Icon name={'ios-close'} size={40} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ModalView}>
                <View>
                    <View style={styles.TitleBox}>
                        <Text style={styles.TitleText}>업체 주소를</Text>
                        <Text style={styles.TitleText}>입력하세요</Text>
                    </View>
                    <View style={styles.SearchBox}>
                        <View style={styles.SearchInput}>
                            <TextInput
                                value={keyword}
                                placeholder={'예) 배민동'}
                                placeholderTextColor='#B4B4B4'
                                onChangeText={(text) => setKeywords(text)}
                            />
                        </View>
                        <TouchableOpacity style={styles.SearchInputBtn} onPress={() => setSearchStart(true)}>
                            <Icon name={'ios-search'} size={32} />
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
        </Modal>
    )
}

const styles = StyleSheet.create({
    ModalView: {
        width: width,
        height: height * 0.15,
        zIndex: 5,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        borderBottomWidth: 1,
        borderColor: 'rgba(180, 180, 180, 1)'
    },
    ModalHeader: {
        width: width,
        padding: 20,
        height: height * 0.06,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "white",
    },
    HeaderContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        paddingRight: 20,
        paddingLeft: 20,
        width: width,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    SearchInput: {
        width: width * 0.8,
        height: 50,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(200, 200, 200, 1)',
        backgroundColor: 'rgba(248, 249, 251, 1)',
    },
    SearchInputBtn: {
        width: width * 0.1,
        height: 50,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(200, 200, 200, 1)'
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
    SafeAreaView: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: width,
        height: '70%'
    },
    AddressList: {
        padding: 20,
    }
})


export default CmpAddrSearchBox;