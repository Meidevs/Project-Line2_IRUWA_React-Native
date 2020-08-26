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
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import ROADAPI from '../../assets/dataSource/roadAPI';
const { width, height } = Dimensions.get('window');

const LocationSearchFunction = ({ visible, location, callback }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [text, setText] = useState('1132-34');
    const [addrs, setAddress] = useState([]);

    useEffect(() => {
        setModalVisible(visible)
    }, [visible]);

    const onChangeVisible = (visibility) => {
        setModalVisible(visibility);
        callback(visibility)
    }

    const findAddress = async () => {
        let response = await fetch (`http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=100&keyword=1132-34&confmKey=U01TX0FVVEgyMDIwMDgyNzA0MTc0NzExMDExMTc=&resultType=json`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            }
        });
        let json = await response.json();
        console.log(json)
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
            <View>

            </View>
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