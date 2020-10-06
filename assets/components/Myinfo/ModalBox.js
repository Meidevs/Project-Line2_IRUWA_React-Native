import React, { useState, useEffect } from 'react';
import {
    View,
    Modal,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import DATA_SOURCE from '../../dataSource/dataModel';

const ModalBox = ({ data, visible, callback, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(visible)
    }, [visible]);

    const _handleDismiss = () => {
        callback(!modalVisible)
    }
    const goToEdit = () => {
        callback(!modalVisible)
        navigation.navigate('Edit', {
            items_seq: data.items_seq,
            item_name: data.item_name,
            item_content: data.item_content,
            uri: data.uri,
            ads_type: data.ads_type
        })
    }
    const DELETE_ITEM = async () => {
        callback(!modalVisible);
        await DATA_SOURCE.DELETE_ITEM(data.items_seq)
    }

    return (
        <Modal
            animated
            animationType="fade"
            visible={modalVisible}
            transparent
        >
            <View
                style={styles.Overlay}
                onTouchStart={() => _handleDismiss()}
            >
            </View>

            <View style={styles.ContentArea}>
                <TouchableOpacity style={styles.ContentForm} onPress={() => goToEdit()}>
                    <View style={styles.IconArea}>
                        <Image source={require('../../images/my_profile_ico1.png')} />
                    </View>
                    <View style={styles.ExplaArea}>
                        <Text style={styles.ExplaTitleTxt}>
                            수정
                            </Text>
                        <Text style={styles.ExplaSubTxt}>
                            게시물을 수정하려면 클릭해주세요
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ContentForm} onPress={() => DELETE_ITEM()}>
                    <View style={styles.IconArea}>
                        <Image source={require('../../images/delete_ico.png')} />
                    </View>
                    <View style={styles.ExplaArea}>
                        <Text style={styles.ExplaTitleTxt_delete}>
                            삭제
                            </Text>
                        <Text style={styles.ExplaSubTxt_delete}>
                            게시물을 삭제하시겠습니까?
                            </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    Overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'flex-end',
    },
    ContentArea: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    ContentForm: {
        padding : 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0.6,
        borderColor: 'rgba(235, 235, 235, 1)'
    },
    IconArea: {
        marginRight : 15,
    },
    ExplaArea: {
        
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ExplaTitleTxt: {
        fontSize: 18,
        fontWeight: '800',
        color: 'rgba(56, 76, 96, 1)'
    },
    ExplaSubTxt: {
        fontSize: 14,
        fontWeight: '800',
        color: 'rgba(200, 200, 200, 1)'
    },
    ExplaTitleTxt_delete: {
        fontSize: 18,
        fontWeight: '800',
        color: 'rgba(234, 0, 0, 1)'
    },
    ExplaSubTxt_delete: {
        fontSize: 14,
        fontWeight: '800',
        color: 'rgba(234, 0, 0, 1)'
    }
})


export default ModalBox;