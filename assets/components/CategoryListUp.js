import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

const CategoryListUp = ({ navigation }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const CATEGORIES = await DATA_SOURCE.GET_CATEGORIES();
            if (CATEGORIES.length % 4 != 0) {
                var sur = CATEGORIES.length % 4;
                for (var i = 0; i < 4 - sur; i++) {
                    CATEGORIES.push({ category_seq: null, category_name: null });
                }
            }
            setCategories(CATEGORIES);
        }
        fetchData();
    }, []);

    return (
        <View style={styles.CategoryList}>
            <Text style={styles.CategoryListTxtStyle}>카테고리 리스트</Text>
            <View style={styles.CategoriesBox}>
                {
                    categories.map((data, index) => {
                        if (index <= 7) {
                            if (data.category_seq == undefined) {
                                return (
                                    <View style={styles.CategoryContent} key={JSON.stringify(index+'a')}>
                                    </View>
                                )
                            } else {
                                return (
                                    <TouchableOpacity style={styles.CategoryContent} key={JSON.stringify(data.category_seq)}>
                                        <View style={styles.IconArea}>
                                            <Text>{data.category_seq}</Text>
                                        </View>
                                        <View style={styles.IconText}>
                                            <Text>{data.category_name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        }
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    IconArea: {
        width: width * 0.1,
        height: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        margin: 5,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },
})

export default CategoryListUp;
