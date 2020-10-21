import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    VirtualizedList,
} from 'react-native';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import TimeGap from '../assets/components/TimeGap';
const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    const items = data[index];
    if (data[index] != undefined) {
        return {
            items_seq: items.items_seq,
            item_name: items.item_name,
            item_content: items.item_content,
            cmp_seq: items.cmp_seq,
            cmp_name: items.cmp_name,
            cmp_location: items.cmp_location,
            reg_date: items.reg_date,
            cnt: items.cnt,
            ads_type: items.ads_type,
            uri: items.uri
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, user, navigation, callback }) => {
    var time_gap = TimeGap(data.reg_date);

    const ReturnCallback = () => {
        callback(data.items_seq);
    }
    return (
        <View style={styles.ContentBox}>
            <View style={styles.UpperBox}>
                <View style={styles.ImageArea}>
                    <Image source={{ uri: data.uri[0] }}
                        borderRadius={15}
                        style={styles.Image}
                    />
                </View>
                <View style={styles.ContentArea}>
                    <View style={styles.ContentInfo} >
                        <Text style={styles.ItemNameTxt}>{data.item_name}</Text>
                        <Text style={styles.CmpTxt}>  {data.cmp_name} </Text>
                    </View>
                    <View style={styles.ContentInfo}>
                        <Text style={styles.ItemSubTxt}>{data.cmp_location}</Text>
                    </View>
                    <View style={styles.ContentInfo}>
                        <Text>{time_gap}</Text>
                    </View>
                    <View style={styles.Icon}>
                        <Image source={require('../assets/images/like_ico_default.png')}
                            resizeMode={'contain'}
                            style={{ width: 18, height: 18, marginRight: 10, }}
                        />
                        <Text>{data.cnt}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.DownerBox}>
                <TouchableOpacity
                    style={styles.Btn}
                    onPress={() => navigation.navigate('Detail', {
                        cmp_seq: data.cmp_seq,
                        items_seq: data.items_seq,
                        user_seq: user
                    })}>
                    <Text style={styles.BtnTxt}>광고로 이동</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.Border}>|</Text>
                </View>
                <TouchableOpacity style={styles.Btn} onPress={() => ReturnCallback()}>
                    <Text style={styles.BtnTxt}>찜 취소</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


function PickListScreen({ route, navigation }) {
    const user_seq = route.params.user_seq;
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>관심 목록</Text>
                </View>
            ),
            headerRight: () => (
                < View ></View>
            )
        })
    }, []);

    useEffect(() => {
        const GET_MYLIST = async () => {
            var MYLIST = await DATA_SOURCE.GET_MY_PICKS(user_seq);
            setItems(MYLIST.content);
            setIsLoad(true)
        }
        GET_MYLIST();
    }, [user_seq, isLoaded]);

    const DELETE_PICK = async (ChildFrom) => {
        await DATA_SOURCE.UPDATE_ITEM_PICK(ChildFrom);
        setIsLoad(false)
    }

    if (isLoaded) {
        return (
            <SafeAreaView style={styles.Container}>
                <VirtualizedList
                    data={items}
                    initialNumToRender={10}
                    renderItem={({ item }) => <Item data={item} user={user_seq} navigation={navigation} callback={DELETE_PICK} />}
                    keyExtractor={(item, index) => JSON.stringify(index)}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
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
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    UpperBox: {
        flex: 2,
        flexDirection: 'row',
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
    CmpTxt: {
        fontSize: 16,
        fontWeight: '700',
        color: 'rgba(140, 140, 140, 1)',
    },
    ItemSubTxt: {
        fontSize: 12,
        fontWeight: '600',
    },
    Icon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DownerBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(235, 235, 235, 1)',
        padding: 8,
    },
    Btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnTxt: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(0, 0, 0, 1)'
    },
    Border: {
        color: 'rgba(235, 235, 235, 1)',
        fontSize: 18
    }
})

export default PickListScreen;