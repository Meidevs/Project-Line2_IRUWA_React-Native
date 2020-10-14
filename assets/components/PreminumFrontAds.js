import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import DATA_SOURCE from '../dataSource/dataModel';

const { width, height } = Dimensions.get('window');

const PremiumFrontAds = ({ data, navigation }) => {
    const [items, setPremiumItems] = useState({
        pre_uri: null,
    });
    const [existence, preExistence] = useState(false);
    const [modalVisible, setModal] = useState(true);
    useEffect(() => {
        let isCancelled = true;
        const PREMIUM_ITEMS = async () => {
            var PREMIUM_LIST = await DATA_SOURCE.GET_PREMIUM_ITEMS(data);
            if (isCancelled) {
                var premiums = PREMIUM_LIST.data;
                if (premiums.length > 0) {
                    var rawArray = new Array();
                    premiums.findIndex((item) => {
                        if (item.pre_uri != null) {
                            rawArray.push(item)
                        }
                    });
                    if (rawArray.length > 0) {
                        var a = Math.floor(Math.random() * rawArray.length);
                        preExistence(true);
                        setPremiumItems(rawArray[a]);
                    }
                }
            }
        }
        PREMIUM_ITEMS();
        return () => isCancelled = false;
    }, [data]);
    if (existence) {
        return (
            <Modal
                visible={modalVisible}
                transparent={true}
            >
                <View style={styles.Container}>
                    <View style={styles.PremiumImage}>
                        <ImageBackground source={{ uri: items.pre_uri }}
                           style={styles.ImageBackgroundStyle}
                        >
                            <TouchableOpacity style={styles.MoveToBtn}>
                                <Text style={styles.GotoTxt}>상품으로 가기</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                        <View style={styles.CloseBtn}>
                            <TouchableOpacity onPress={() => setModal(!modalVisible)}>
                                <Text style={styles.CloseBtnTxt}>[닫기]</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    PremiumImage: {
        width: width * 0.8,
        height: height * 0.8,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    ImageBackgroundStyle : {
        flex : 1,
        justifyContent : 'flex-end',
        alignItems : 'center'
    },
    CloseBtn : {
        flexDirection : 'row',
        justifyContent : 'flex-end',
        alignItems : 'center'
    },
    MoveToBtn : {
        padding : 15,
        paddingRight : 40,
        paddingLeft : 40,
        margin : 10,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'rgba(21, 186, 193, 0.7)',
        borderRadius : 10,
        elevation : 1,
        shadowOffset : {
            height : 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    GotoTxt : {
        fontSize : 13,
        fontWeight : 'bold',
        color : '#ffffff'
    },
    CloseBtnTxt : {
        fontSize : 13,
        fontWeight : 'bold',
        color : '#000000'
    }
});

export default PremiumFrontAds;
