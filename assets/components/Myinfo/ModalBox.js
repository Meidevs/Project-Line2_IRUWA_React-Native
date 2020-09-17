import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    Modal,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

const ModalBox = ({ visible, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(visible)
    }, [visible]);

    const _handleDismiss = () => {
        callback(!modalVisible)
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
                <View style={styles.ContentArea}>
                    <TouchableOpacity style={styles.ContentForm}>
                        <View style={styles.IconArea}>
                            <Icon name={'edit'} size={28} color={'gray'} />
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
                    <TouchableOpacity style={styles.ContentForm}>
                        <View style={styles.IconArea}>
                            <Icon name={'delete'} size={28} color={'red'} />
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
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    Overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    ContentArea: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    ContentForm: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    IconArea: {
        padding: 15,
    },
    ExplaArea: {
        padding: 15,
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