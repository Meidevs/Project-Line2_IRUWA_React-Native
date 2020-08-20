import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';
const { width, height } = Dimensions.get('window');

async function GetFetchUrl() {
    // const DATA_SET = await DATA_SOURCE.GetCategoryList();
    var DATA_SET = [
        { uri: 'Icon', categoryid: 'C1', categoryname: '단란주점' },
        { uri: 'Icon', categoryid: 'C2', categoryname: '나이트' },
        { uri: 'Icon', categoryid: 'C3', categoryname: '노래방' },
        { uri: 'Icon', categoryid: 'C4', categoryname: '마사지' },
        { uri: 'Icon', categoryid: 'C5', categoryname: '유흥주점' },
    ]
    return DATA_SET;
}

function CategoryScreen({ route, navigation }) {
    const [categories, setCategory] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>카테고리</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.RightHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Icon name="ios-search" size={28} color={'#000000'} style={{ padding: 10, }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Alarm')}>
                        <Icon name="ios-notifications-outline" size={32} color={'#000000'} style={{ padding: 10, }} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const CATEGORIES = await GetFetchUrl();
            setCategory(CATEGORIES);
        }
        fetchData()
    }, [])
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.AdsBox}>
                    <View style={styles.TitleContent}>
                        <Text style={styles.TitleTxtStyle}>프리미엄 서비스</Text>
                    </View>
                    <TouchableOpacity style={styles.CategoryBtn}>
                        <Text>프리미엄 광고 (이미지로 대체)</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.CategoryBox}>
                    <View style={styles.TitleContent}>
                        <Text style={styles.TitleTxtStyle}>유흥업체 카테고리</Text>
                    </View>
                    <View style={styles.CategoryContent}>
                        {
                            categories.map((data) => {
                                return (
                                    <TouchableOpacity key={data.categoryid} style={styles.CategoryBtn} onPress={() => navigation.navigate('CateList',{
                                        category_name : data.categoryname
                                    })}>
                                        <View style={styles.ImageContent}>
                                            <Text>{data.uri}</Text>
                                        </View>
                                        <View style={styles.TxtContent}>
                                            <Text>{data.categoryname}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },
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
    ScrollView: {
    },
    AdsBox: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderBottomWidth: 2,
        borderColor: 'rgba(238, 238, 238, 1)'
    },
    CategoryBox: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    TitleContent: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    TitleTxtStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    CategoryContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    CategoryBtn: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ImageContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    TxtContent: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})

export default CategoryScreen;