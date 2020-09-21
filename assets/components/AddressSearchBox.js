import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    Modal,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Constants from "expo-constants";

import ROADAPI from '../../assets/dataSource/roadAPI';
import AddressFilter from './AddressFilter';
const { width, height } = Dimensions.get('window');

const AddrSearchBox = ({ data, visible, location, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddressList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        let isCancelled = true;
        const SEARCH_DETAIL_ADDRESS = async () => {

            if (AddressFilter(data) && data != null) {
                var DETAIL_SEARCH_RESPONSE = await ROADAPI.SEARCH_DETAIL_ADDRESS(data);
                if(isCancelled) { 
                    if (DETAIL_SEARCH_RESPONSE.results.juso != null) {
                        setAddressList(DETAIL_SEARCH_RESPONSE.results.juso);
                        setIsLoaded(true);
                    } else {
                        alert(DETAIL_SEARCH_RESPONSE.results.common.errorMessage);
                    }
                }
            }
        };
        SEARCH_DETAIL_ADDRESS();
        setModalVisible(visible)
        return () => isCancelled = false;
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
                if (index % 2 == 0) {
                    return (
                        <TouchableOpacity
                            key={JSON.stringify(index)}
                            style={styles.AddressList}
                            onPress={() => SetAddress(data.jibunAddr)}
                        >
                            <Text>{data.zipNo}</Text>
                            <Text>{data.jibunAddr}</Text>
                            <Text>{data.roadAddr}</Text>
                        </TouchableOpacity>
                    )
                } else {
                    return (
                        <TouchableOpacity
                            key={JSON.stringify(index)}
                            style={styles.AddressList_a}
                            onPress={() => SetAddress(data.jibunAddr)}
                        >
                            <Text>{data.zipNo}</Text>
                            <Text>{data.jibunAddr}</Text>
                            <Text>{data.roadAddr}</Text>
                        </TouchableOpacity>
                    )
                }
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
                        <Icon name={'close'} size={24} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                isLoaded == false ? (
                    <View style={styles.Loading}>
                        <ActivityIndicator
                            animating={true} />
                    </View>
                ) : (
                        <SafeAreaView style={styles.SafeAreaView}>
                            <ScrollView>
                                {
                                    componentJSX()
                                }
                            </ScrollView>
                        </SafeAreaView>
                    )
            }

        </Modal >
    )
}

const styles = StyleSheet.create({
    Loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    ModalHeader: {
        width: width,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    HeaderContent: {
        padding : 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    SafeAreaView: {
        width: width,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    AddressList: {
        padding: 20,
    },
    AddressList_a: {
        padding: 20,
        borderColor: 'rgba(230, 230, 230, 1)',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        backgroundColor: 'rgba(250, 250, 250, 1)'
    }
})


export default AddrSearchBox;