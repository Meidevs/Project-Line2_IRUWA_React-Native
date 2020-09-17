import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    VirtualizedList,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import DATA_SOURCE from '../../dataSource/dataModel';

const getItem = (data, index) => {
    const items = data[index];
    return {
        category_seq: items.category_seq,
        category_name: items.category_name
    }
}

const getItemCount = (data) => {
    return data.length;
}

const Item = ({ data, navigation }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CateList', {
            category_name : data.category_name,
            category_seq : data.category_seq,
        })}>
            <Text style={styles.title}>{data.category_name}</Text>
        </TouchableOpacity>
    );
}

const CategoryListUp = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        const GET_CATEGORIES = async () => {
            const CATEGORIES = await DATA_SOURCE.GET_CATEGORIES();
            // const CATEGORY_ICONS = await Directory.GET_CATEGORY_ICONS();
            setCategories(CATEGORIES);
        }
        GET_CATEGORIES()
    }, [])

    return (
        <View>
            <VirtualizedList
                data={categories}
                initialNumToRender={10}
                renderItem={({ item }) => <Item data={item} navigation={navigation}/>}
                keyExtractor={item => item.category_seq}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})


export default CategoryListUp;