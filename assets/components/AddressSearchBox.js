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

const AddrSearchBox = ({ data, visible, location, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddressList] = useState([]);

    useEffect(() => {
        const SEARCH_DETAIL_ADDRESS = async () => {
            
            if (AddressFilter(data) && data != null) {
                var DETAIL_SEARCH_RESPONSE = await ROADAPI.SEARCH_DETAIL_ADDRESS(data);
                if (DETAIL_SEARCH_RESPONSE.results.juso != null) {
                    setAddressList(DETAIL_SEARCH_RESPONSE.results.juso);
                } else {
                    alert(DETAIL_SEARCH_RESPONSE.results.common.errorMessage);
                }
            }
        };
        SEARCH_DETAIL_ADDRESS();
        setModalVisible(visible)
    }, [visible]);

    const onChangeVisible = (visibility) => {
        callback(visibility)
    }

    const SetAddress = async (cmp_location) => {
        var SEARCH_ADDRESS = await ROADAPI.SEARCH_ADDRESS(cmp_location);
        var locationString = SEARCH_ADDRESS.documents[0].address.region_1depth_name;
        locationString += ' ' + SEARCH_ADDRESS.documents[0].address.region_2depth_name;
        locationString += ' ' + SEARCH_ADDRESS.documents[0].address.region_3depth_h_name;
        location(locationString);
        callback(false);
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
    SafeAreaView: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: width,
        height: '70%'
    },
    AddressList: {
        padding: 20,
    }
})


export default AddrSearchBox;