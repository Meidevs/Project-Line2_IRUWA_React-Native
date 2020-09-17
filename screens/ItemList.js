import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView,
    VirtualizedList,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import TimeGap from '../assets/components/TimeGap';
import ModalBox from '../assets/components/Myinfo/ModalBox';
const { width, height } = Dimensions.get('window');

function InviteScreen({ route, navigation }) {
    const user_seq = route.params.user_seq;
    const cmp_seq = route.params.cmp_seq;
    const [items, setItems] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>등록 목록</Text>
                </View>
            ),
        })
    }, []);

    useEffect(() => {
        const GET_MYLIST = async () => {
            var MYLIST = await DATA_SOURCE.GET_MY_ITEMS(cmp_seq);
            setItems(MYLIST.content);
            setIsLoad(true)
        }
        GET_MYLIST();
    }, [user_seq]);

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
                                        <TouchableOpacity style={styles.UploadTime} onPress={() => setIsModal(true)}>
                                            <Icon name={'dots-three-vertical'} color={'gray'} size={18} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.DownerContent}>
                                        <View style={styles.ItemName}>
                                            <Text>{data.item_name}</Text>
                                        </View>
                                        <View style={styles.ItemContent}>
                                            <Text>{data.item_content}</Text>
                                        </View>
                                        <View style={styles.ItemUptime}>
                                            <Text style={styles.UploadTimeTxt}>{timegap}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <ModalBox visible={isModal} callback={callback} />
            </SafeAreaView>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    Container: {
        flex: 1,
    },
    ContentBox: {
        width: width,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderBottomWidth: 0.6,
        borderColor: 'rgba(245, 245, 245, 1)'
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
        backgroundColor: 'rgba(245, 245, 245, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 20,
    },
    AdsTypeTxt: {
        fontSize: 12,
        color: 'rgba(140, 140, 140, 1)',
        fontWeight: 'bold'
    },
    UploadTimeTxt: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(190, 190, 190, 1)'
    },
    DownerContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
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
    PopUpContent : {
    }
})

export default InviteScreen;