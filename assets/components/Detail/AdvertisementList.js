import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

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

    if (isLoad && list.length > 0) {
        return (
            <View style={styles.ADSBox}>
                <View style={styles.TitleBox}>
                    <View style={styles.TitleBorder}>
                        <Text style={styles.ItemTitleTxtStyle}>{data.cmp_name}의 다른 광고</Text>
                    </View>
                </View>
                <View style={styles.ADSs}>
                    {
                        items.map((data) => {
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
                            )
                        })
                    }
                </View>
            </View>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    ADSBox: {
        flexDirection: 'column',
    },
    ADs: {
        height: width,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleBox: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    ItemTitleTxtStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000'
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