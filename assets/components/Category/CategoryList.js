import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Image,
    VirtualizedList,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DATA_SOURCE from '../../dataSource/dataModel';
const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    const items = data[index];
    return {
        category_seq: items.category_seq,
        category_name: items.category_name,
        sub_category: items.sub_category,
        uri: items.uri,
    }
}

const getItemCount = (data) => {
    return data.length;
}

const Item = ({ data, navigation }) => {
    return (
        <TouchableOpacity style={styles.CategoryBox} onPress={() => navigation.navigate('CateList', {
            category_name: data.category_name,
            category_seq: data.category_seq,
        })}>
            <View style={styles.IconArea}>
                <View style={styles.IconAround}>
                    <Image source={{ uri: data.uri }}
                        style={{ width: 27, height: 27 }}
                    />
                </View>
            </View>
            <View style={styles.ContentArea}>
                <View style={styles.LeftContent}>
                    <View style={styles.CategoryName}>
                        <Text style={styles.CategoryNameTxt}>{data.category_name}</Text>
                    </View>
                    <View style={styles.SubCategory}>
                        <Text style={styles.SubCategoryTxt}>{data.sub_category}</Text>
                    </View>
                </View>
                <View style={styles.RightContent}>
                    <Image
                        source={require('../../images/right_arrow_ico.png')}
                        style={{ width: 17, height: 17 }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const CategoryListUp = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let isCancelled = true;
        const GET_CATEGORIES = async () => {
            const CATEGORIES = await DATA_SOURCE.GET_CATEGORIES();
            if (isCancelled)
                setCategories(CATEGORIES);
        }
        GET_CATEGORIES();

        return () => isCancelled = false;
    }, [])

    return (
        <View style={styles.InnerContainer}>
            <VirtualizedList
                data={categories}
                initialNumToRender={categories.length}
                renderItem={({ item }) => <Item data={item} navigation={navigation} />}
                keyExtractor={item => item.category_seq.toString()}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    InnerContainer: {
        width : width,
    },
    CategoryBox: {
        paddingTop : 10,
        paddingBottom : 10,
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: 'rgba(235, 235, 235, 1)',
    },
    IconArea: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    IconAround: {
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#15bac1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContentArea: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    LeftContent: {
        flex: 9,
        flexDirection: 'column',
    },
    CategoryName: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    CategoryNameTxt: {
        fontSize: 15,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    SubCategory: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    SubCategoryTxt: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: -0.22,
        color : '#acacac'
    },
    RightContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})


export default CategoryListUp;