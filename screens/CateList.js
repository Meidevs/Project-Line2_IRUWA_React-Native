import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    VirtualizedList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';
const { width, height } = Dimensions.get('window');

function CateListScreen({ route, navigation }) {
    const category_name = route.params.category_name;
    const [items, setItemList] = useState([]);
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
        const data = await DATA_SOURCE.GetItemList();
        var items = [
            { id: 'a_1', uri: 'ImageUri', title: 'Item Title 1', location: 'Location 1' },
            { id: 'a_2', uri: 'ImageUri', title: 'Item Title 2', location: 'Location 2' },
            { id: 'a_3', uri: 'ImageUri', title: 'Item Title 3', location: 'Location 3' },
            { id: 'a_4', uri: 'ImageUri', title: 'Item Title 4', location: 'Location 4' },
            { id: 'a_4', uri: 'ImageUri', title: 'Item Title 4', location: 'Location 4' },
            { id: 'a_4', uri: 'ImageUri', title: 'Item Title 4', location: 'Location 4' },
            { id: 'a_4', uri: 'ImageUri', title: 'Item Title 4', location: 'Location 4' },
            { id: 'a_4', uri: 'ImageUri', title: 'Item Title 4', location: 'Location 4' },
        ]
        if (items.length % 2 != 0) {
            items.push([]);
        }
        setItemList(items)
    }, []);

    useEffect(() => {
        GET_ITEMS_LIST();
    }, [GET_ITEMS_LIST])

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.OutsideBox}>
                    {
                        items.map((data) => {
                            return (
                                <TouchableOpacity style={styles.ContentBox} onPress={() => navigation.navigate('Detail', {
                                    item_code: data.id,
                                })}>
                                    <View style={styles.TopArea}>
                                        <Text>{data.uri}</Text>
                                    </View>
                                    <View style={styles.BottomArea}>
                                        <Text>{data.title}</Text>
                                        <Text>{data.location}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
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
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    OutsideBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingRight: 20,
        paddingLeft: 20,
    },
    ContentBox: {
        margin: 10,
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
    },
    TopArea: {
        flex: 2,
        padding: 10,
        justifyContent: 'center',
    },
    BottomArea: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CateListScreen;