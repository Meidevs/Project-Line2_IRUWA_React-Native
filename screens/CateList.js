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
            reg_date: items.reg_date,
            cmp_seq: items.cmp_seq,
            uri: items.uri
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
                <Text>{data.item_name}</Text>
                <Text>{data.cmp_location}</Text>
                <Text>{time_gap}</Text>
            </View>
        </TouchableOpacity>
    );
}

function CateListScreen({ route, navigation }) {
    const category_name = route.params.category_name;
    const category_seq = route.params.category_seq;
    const [data, setData] = useState([]);
    const [user_seq, setUserSeq] = useState('');
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>근처 {category_name}</Text>
                </View>
            ),
        })
    }, [category_name]);

    const GET_ITEMS_LIST = useCallback(async () => {
        const USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
        const GET_ITEMS = await DATA_SOURCE.GET_ITEMS_ON_CATEGORY(category_seq);
        setData(GET_ITEMS.content);
        setUserSeq(USER_INFOs.user_seq);
        setIsLoad(true);
    }, [category_seq]);

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
    ContentBox: {
        height: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: 1,
        padding: 15,
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
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    HeaderTitleBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    HeaderTitleTxt: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    HeaderTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width,
        height: width * 0.15,
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
        width: 100,
        height: 100,
    }
})

export default CateListScreen;