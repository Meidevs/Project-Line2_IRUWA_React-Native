import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    VirtualizedList
} from 'react-native';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import AUTHENTICATION from '../assets/dataSource/authModel';
import TimeGap from '../assets/components/TimeGap';

const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    const items = data[index];
    if (data[index] != undefined) {
        return {
            items_seq: items.items_seq,
            item_name: items.item_name,
            cmp_location: items.cmp_location,
            cmp_name: items.cmp_name,
            reg_date: items.reg_date,
            cmp_seq: items.cmp_seq,
            uri: items.uri,
            ads_type: items.ads_type,
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, user, navigation }) => {
    var time_gap = TimeGap(data.reg_date);
    return (
        <TouchableOpacity style={styles.ContentBox} onPress={() => navigation.navigate('Detail', {
            items_seq: data.items_seq,
            cmp_seq: data.cmp_seq,
            user_seq: user
        })}>
            <View style={styles.LeftArea}>
                <Image source={{ uri: data.uri[0] }} style={styles.ImageContent} />
            </View>
            <View style={styles.RightArea}>
                <Text style={styles.ItemName}>{data.item_name}</Text>
                <Text style={styles.CmpLocation}>{data.cmp_name}</Text>
                <Text style={styles.CmpLocation}>{data.cmp_location}</Text>
                <Text style={styles.Time_Gap}>{time_gap}</Text>
            </View>
            {
                data.ads_type == 1 ? (
                    <View style={styles.AdsType}>
                        <Image
                            source={require('../assets/images/category_ico_premium_green.png')}
                            style={{ width: 18, height: 18 }}
                        />
                    </View>
                ) : (
                        null
                    )
            }
        </TouchableOpacity>
    );
}

function CateListScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [user_seq, setUserSeq] = useState('');
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>프리미엄 광고</Text>
                </View>
            ),
            headerRight: () =>
                <View></View>
        })
    }, []);

    const GET_ITEMS_LIST = useCallback(async () => {
        const USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
        const GET_ITEMS = await DATA_SOURCE.GET_PREMIUM_SEARCH_PREMIUMS();
        setData(GET_ITEMS.data);
        setUserSeq(USER_INFOs.user_seq);
        setIsLoad(true);
    }, []);

    useEffect(() => {
        GET_ITEMS_LIST();
    }, [GET_ITEMS_LIST]);

    if (isLoaded) {
        return (
            <SafeAreaView>
                <VirtualizedList
                    data={data}
                    initialNumToRender={10}
                    renderItem={({ item }) => <Item data={item} user={user_seq} navigation={navigation} />}
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
    ContentBox: {
        marginTop: 1,
        margin: 20,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        elevation: 0.5,
    },
    LeftArea: {
        flex: 1,
        justifyContent: 'center'
    },
    RightArea: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    ItemName: {
        flex: 1,
        fontSize: 15,
        fontWeight: '800',
        color: '#000000'
    },
    CmpLocation: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        color: '#000000'
    },
    Time_Gap: {
        flex: 1,
        fontSize: 10,
        fontWeight: '600',
        color: '#a2a2a2',
        letterSpacing: -0.2,
    },
    AdsType: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
    LocationBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 15,
    },
    CurrentLocationTxt: {
        fontSize: 18,
        fontWeight: '800',
        marginRight: 10,
    },
    ImageContent: {
        resizeMode: 'contain',
        borderRadius: 100,
        width: 80,
        height: 80,
    }
})

export default CateListScreen;