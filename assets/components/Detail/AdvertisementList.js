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
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        const SET_ADS_LIST = () => {
            list.map((item, index) => {
                item.flags = 0;
                item.user_seq = data.user_seq;
            });
            setItem(list);
            setIsLoad(true);
        }
        SET_ADS_LIST();
    }, [list]);

    if (isLoaded && list.length > 0) {
        return (
            <View style={styles.ADSBox}>
                <View style={styles.TitleBox}>
                    <View style={styles.TitleBorder}>
                        <Text style={styles.ItemTitleTxtStyle}>{data.cmp_name}의 다른 광고</Text>
                    </View>
                </View>
                <View style={styles.ADSs}>
                    {
                        items.map((data, index) => {
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
                                        <Text style={styles.NameTxt}>{data.item_name}</Text>
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
    ADSs: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent : 'center'
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
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb',
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
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width : width * 0.3
    },
    NameTxt: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center'
    },
    ItemsImages: {
        margin: 5,
        width: width * 0.30,
        height: width * 0.30,
        borderRadius: 10,
        resizeMode: 'cover'
    }
});

export default AdvertisementList;