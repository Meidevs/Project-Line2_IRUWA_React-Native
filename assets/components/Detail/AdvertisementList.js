import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    VirtualizedList
} from 'react-native';
const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    const items = data[index];
    if (data[index] != undefined) {
        return {
            items_seq: items.items_seq,
            item_name: items.item_name,
            cmp_seq: items.cmp_seq,
            user_seq: items.user_seq,
            uri: items.uri
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.ADSContent}
            key={data.items_seq}
            onPress={() => navigation.replace('Detail', {
                cmp_seq: data.cmp_seq,
                items_seq: data.items_seq,
                user_seq: data.user_seq
            })}
        >
            <View style={styles.ImageArea}>
                <Image source={{ uri: data.uri[0] }} style={styles.ItemsImages} />
            </View>
            <View style={styles.NameArea}>
                <Text>{data.item_name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const AdvertisementList = ({ data, list, navigation }) => {
    const [items, setItem] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        const SET_ADS_LIST = () => {
            list.map((item, index) => {
                item.user_seq = data.user_seq
            });
            setItem(list);
            setIsLoad(true);
        }
        SET_ADS_LIST();
    }, [list]);

    if (isLoad) {
        return (
            <View style={styles.ADSBox}>
                <VirtualizedList
                    data={items}
                    initialNumToRender={10}
                    renderItem={({ item }) => <Item data={item} navigation={navigation} />}
                    keyExtractor={(item, index) => JSON.stringify(index)}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            </View>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    ADSBox: {
        height: width,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ADSContent: {
        padding: 5,
        height: width * 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageArea: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    NameArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ItemsImages: {
        margin: 5,
        width: width * 0.30,
        height: width * 0.30,
        borderRadius: 5,
        resizeMode: 'cover'
    }
});

export default AdvertisementList;