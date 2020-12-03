import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import DATA_SOURCE from '../assets/dataSource/dataModel';
import TimeGap from '../assets/components/TimeGap';
import ModalBox from '../assets/components/Myinfo/ModalBox';
const { width, height } = Dimensions.get('window');

function ItemListScreen({ route, navigation }) {
    // ItemListScreen shows a list of items registered by the user;
    const user_seq = route.params.user_seq;
    const cmp_seq = route.params.cmp_seq;
    const [items, setItems] = useState([]);
    const [editInfo, setEdit] = useState({
        items_seq: null,
        items_name: null,
        items_content: null,
        uri: [],
        ads_type: null,
    });
    const [isModal, setIsModal] = useState(false);
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>등록 목록</Text>
                </View>
            ),
            headerRight: () => <View></View>
        })
    }, []);
    // The useFocusEffect function works when this user sees this screen;
    // The GET_MYLIST function sends cmp_seq to request a list of items registered by the user;
    useFocusEffect(
        React.useCallback(() => {
            const GET_MYLIST = async () => {
                var MYLIST = await DATA_SOURCE.GET_MY_ITEMS(cmp_seq);
                setItems(MYLIST.content);
                setIsLoad(true)
            }
            GET_MYLIST();
        }, [user_seq, isModal])
    );

    // The setStatus function receives item's information;
    const setStatus = (data) => {
        setEdit({
            items_seq: data.items_seq,
            item_name: data.item_name,
            item_content: data.item_content,
            uri: data.uri,
            ads_type: data.ads_type
        });
        setIsModal(true);
    }

    // The callback function is passed to childComponent (ModalBox) as a parameter and receives parameters from childComponent;
    // The variable sent from childComponent are true/false;
    const callback = (ChildFrom) => {
        setIsModal(ChildFrom)
    }

    if (isLoaded) {
        return (
            <SafeAreaView style={styles.Container}>
                <ScrollView
                    onTouchStart={() => setIsModal(false)}
                >
                    {
                        items.map((data, index) => {
                            var content;
                            if (data.item_content.length > 18) {
                                var tmp = JSON.parse(data.item_content).substring(0, 18);
                                content = tmp + '...'
                            } else {
                                content = JSON.parse(data.item_content);
                            }
                            var timegap = TimeGap(data.reg_date);
                            return (
                                <View
                                    style={styles.ContentBox}
                                    key={index.toString()}
                                >
                                    <View style={styles.UpperContent}>
                                        <View style={styles.ShowAdsType}>
                                            {
                                                data.ads_type == 1 ?
                                                    <Text style={styles.AdsTypeTxt}>프리미엄</Text> :
                                                    <Text style={styles.AdsTypeTxt}>일반</Text>
                                            }
                                        </View>
                                        <TouchableOpacity style={styles.UploadTime} onPress={() => setStatus(data)}>
                                            <Image source={require('../assets/images/more_button.png')}

                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.DownerContent}>
                                        <View style={styles.ImageArea}>
                                            <Image source={{ uri: data.uri[0] }}
                                                borderRadius={15}
                                                style={styles.Image}
                                            />
                                        </View>
                                        <View style={styles.ContentArea}>
                                            <View style={styles.ContentInfo}>
                                                <Text style={styles.ItemNameTxt}>{data.item_name}</Text>
                                            </View>
                                            <View style={styles.ContentInfo}>
                                                <Text>{content}</Text>
                                            </View>
                                            <View style={styles.ContentInfo}>
                                                <Text style={styles.UploadTimeTxt}>{timegap}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <ModalBox data={editInfo} visible={isModal} callback={callback} navigation={navigation} />
            </SafeAreaView>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    Container: {
        flex: 1,
    },
    ContentBox: {
        width: width,
        backgroundColor: '#ffffff',
        borderBottomWidth: 0.6,
        borderColor: '#f5f5f5'
    },
    UpperContent: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ShowAdsType: {
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 20,
    },
    UploadTime: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    AdsTypeTxt: {
        fontSize: 12,
        color: '#8c8c8c',
        fontWeight: 'bold'
    },
    UploadTimeTxt: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(190, 190, 190, 1)'
    },
    DownerContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ImageArea: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Image: {
        width: width * 0.23,
        height: width * 0.23,
    },
    ContentArea: {
        flex: 3,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    ContentInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ItemNameTxt: {
        fontSize: 18,
        fontWeight: '700',
    },
    ItemName: {
        padding: 15,
    },
    ItemContent: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    ItemUptime: {
        padding: 15,
    },
    PopUpContent: {
    }
})

export default ItemListScreen;