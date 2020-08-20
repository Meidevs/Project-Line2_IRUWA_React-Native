import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

async function GetFetchUrl() {
    // const DATA_SET = await DATA_SOURCE.GetCategoryList();
    var DATA_SET = [
        { id: 'A_1', uri: 'Icon', categoryid: 'C1', categoryname: '단란주점' },
        { id: 'A_2', uri: 'Icon', categoryid: 'C2', categoryname: '나이트' },
        { id: 'A_3', uri: 'Icon', categoryid: 'C3', categoryname: '노래방' },
        { id: 'A_4', uri: 'Icon', categoryid: 'C4', categoryname: '마사지' },
        { id: 'A_5', uri: 'Icon', categoryid: 'C5', categoryname: '유흥주점' },
    ]
    if (DATA_SET.length % 4 != 0) {
        var sur = DATA_SET.length % 4;
        for (var i = 0; i < 4 - sur; i++) {
            DATA_SET.push({ uri: null, categoryname: null });
        }
    }
    return DATA_SET;
}
function SearchScreen({ navigation }) {
    const [categories, setCategory] = useState([]);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.SearchBoxStyle}>
                    <Icon name={'ios-search'} size={24} />
                    <TextInput
                        style={styles.SeachInput}
                        placeholder={'인근 지역 검색'}
                        placeholderTextColor='#B4B4B4'
                    />
                </View>
            ),
        })
    })
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
                <View style={styles.CategoryBox}>
                    <View style={styles.CategoryTitle}>
                        <Text style={styles.CategoryTitleTxtStyle}>카테고리</Text>
                    </View>
                    <View style={styles.CategoryList}>
                        <Text style={styles.CategoryListTxtStyle}>카테고리 리스트</Text>
                        <View style={styles.CategoriesBox}>
                            {
                                categories.map((data, index) => {
                                    console.log(index + ': ' + data)
                                    if (index <= 7) {
                                        if (data.id == undefined) {
                                            console.log('b')
                                            return (
                                                <View style={styles.CategoryContent}>
                                                </View>
                                            )
                                        } else {
                                            return (
                                                <TouchableOpacity style={styles.CategoryContent}>
                                                    <View style={styles.IconArea}>
                                                        <Text>{data.uri}</Text>
                                                    </View>
                                                    <View style={styles.IconText}>
                                                        <Text>{data.categoryname}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                    }
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)',
    },
    ScrollView: {
    },
    CategoryBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    CategoryTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        borderBottomWidth: 2,
        borderColor: 'rgba(50, 50, 50, 1)',
        height: 50,
    },
    CategoryTitleTxtStyle: {
        fontSize: width * 0.05,
        fontWeight: 'bold'
    },
    CategoryList: {
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: 'rgba(206, 206, 206, 1)',
        padding: 10,
    },
    CategoryListTxtStyle: {
        fontSize: width * 0.04,
        fontWeight: '700'
    },
    CategoriesBox: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CategoryContent: {
        width: width * 0.2,
        height: width * 0.2,
        margin: 5,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    HeaderStyle: {
        flexDirection: 'column',
    },
    SearchBoxStyle: {
        borderRadius: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(248, 249, 251, 1)',
    },
    SeachInput: {
        paddingLeft: 10,
    },
    IconArea: {
        width: width * 0.1,
        height: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        margin: 5,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },
    IconText: {
    }
})

export default SearchScreen;