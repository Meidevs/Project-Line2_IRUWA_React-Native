import React, { useState, useEffect, useCallback } from 'react';
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
    const [addressList, setAddressList] = useState([]);
    const [pageCount, setPageCount] = useState([]);
    useEffect(() => {
        setModalVisible(visible)
    }, [visible])

    const SEARCH_DETAIL_ADDRESS = async (pageNum) => {
        var SEARCH_RESULT = await ROADAPI.SEARCH_DETAIL_ADDRESS(pageNum, '시흥대로 161가길 23');
        console.log(SEARCH_RESULT.meta)
        setAddressList(SEARCH_RESULT.documents);
        setPageCount(SEARCH_RESULT.meta.pageable_count)
    }

    const onChangeVisible = (visibility) => {
        setModalVisible(visibility);
        callback(visibility)
    }
    const componentJSX = () => {
        if (pageCount > 10) {
            return (
                <View style={styles.PaginationForm}>
                    <TouchableOpacity style={styles.PaginationItem} >
                        <Icon name={'ios-arrow-back'} size={28} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.PaginationItem} >
                        <Icon name={'ios-arrow-forward'} size={28} />
                    </TouchableOpacity>
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
                                placeholder={'예) 배민동'}
                                placeholderTextColor='#B4B4B4'
                            />
                        </View>
                        <TouchableOpacity style={styles.SearchInputBtn} onPress={() => SEARCH_DETAIL_ADDRESS(1)}>
                            <Icon name={'ios-search'} size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SafeAreaView>
                <ScrollView>
                    {
                        addressList.map((data, index) => {
                            return (
                                <TouchableOpacity key={JSON.stringify(index)}>
                                    <Text>{data.address_name}</Text>
                                    <Text>{data.road_address_name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                {
                    componentJSX()
                }
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ModalView: {
        width: width,
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
    PaginationForm: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
})


export default LocationSearchFunction;