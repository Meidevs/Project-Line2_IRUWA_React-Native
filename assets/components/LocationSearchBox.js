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
const { width, height } = Dimensions.get('window');

const LocationSearchFunction = ({ visible, location, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [totalPage, setTotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeywords] = useState(null);
    const [address, setAddressList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const SEARCH_DETAIL_ADDRESS = useCallback(async () => {
        var DETAIL_SEARCH_RESPONSE = await ROADAPI.SEARCH_DETAIL_ADDRESS(currentPage, '합정동');
        if (DETAIL_SEARCH_RESPONSE.documents.length == 0) {
            var SEARCH_RESPONSE = await ROADAPI.SEARCH_ADDRESS('합정동');
            setAddressList(SEARCH_RESPONSE.documents);
            setTotalPage(Math.ceil(SEARCH_RESPONSE.meta.pageable_count / 10));
        } else {
            setAddressList(DETAIL_SEARCH_RESPONSE.documents);
            setTotalPage(Math.ceil(DETAIL_SEARCH_RESPONSE.meta.pageable_count / 10));
        }

        setIsLoaded(true)
    }, [currentPage]);

    useEffect(() => {
        SEARCH_DETAIL_ADDRESS()
    }, [SEARCH_DETAIL_ADDRESS]);

    useEffect(() => {
        setModalVisible(visible)
    }, [visible]);

    const onChangeVisible = (visibility) => {
        setModalVisible(visibility);
        callback(visibility)
    }
    const prevPage = async () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1)
        SEARCH_DETAIL_ADDRESS();
    }
    const nextPage = async () => {
        if (currentPage < totalPage)
            setCurrentPage(currentPage + 1)
        SEARCH_DETAIL_ADDRESS();
    }

    const setPageNumber = async (number) => {
        setCurrentPage(number);
        SEARCH_DETAIL_ADDRESS();
    }

    const componentJSX = () => {
        var numArray = new Array();
        for (var i = 1; i <= totalPage; i++) {
            numArray.push(i)
        }
        if (isLoaded && totalPage > 0) {
            return (
                <View style={styles.PaginationForm}>
                    <TouchableOpacity style={styles.PaginationItem} onPress={() => prevPage()}>
                        <Icon name={'ios-arrow-back'} size={24} />
                    </TouchableOpacity>
                    {
                        numArray.map((data, index) => {
                            return (
                                <TouchableOpacity style={styles.PaginationItem} onPress={() => setPageNumber(index + 1)}>
                                    <Text style={styles.PageNumbers}>{data}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity style={styles.PaginationItem} onPress={() => nextPage()}>
                        <Icon name={'ios-arrow-forward'} size={24} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.PaginationForm}>
                    <Text>검색 결과가 없습니다.</Text>
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
            <View style={styles.ModalHeader}>
                <View style={styles.HeaderContent}>
                    <TouchableOpacity style={styles.CloseBtn} onPress={() => onChangeVisible(!modalVisible)}>
                        <Icon name={'ios-close'} size={40} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ModalView}>
                <View style={styles.ComponentForm}>
                    <View style={styles.TitleBox}>
                        <Text style={styles.TitleText}>지역의 읍, 면, 동을</Text>
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
                        <TouchableOpacity style={styles.SearchInputBtn} onPress={() => SEARCH_DETAIL_ADDRESS()}>
                            <Icon name={'ios-search'} size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SafeAreaView style={styles.SafeAreaView}>
                <ScrollView>
                    {
                        address.map((data, index) => {
                            return (
                                <TouchableOpacity key={JSON.stringify(index)} style={styles.AddressList} onPress={() => SetAddress()}>
                                    <Text>{data.address_name}</Text>
                                    <Text>{data.road_address_name} {data.place_name == undefined ? null : (data.place_name)}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
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
        height : height * 0.15,
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
    },
    PaginationForm: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    PaginationItem: {
        padding: 5,
    },
    PageNumbers: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    AddressList: {
        padding: 20,
    }
})


export default LocationSearchFunction;