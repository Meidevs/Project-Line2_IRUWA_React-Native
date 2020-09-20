import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
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
        category_name: items.category_name
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
                    <Icon name={'hearto'} size={28} color={'rgba(255, 255, 255, 1)'} />
                </View>
            </View>
            <View style={styles.ContentArea}>
                <View>
                    <Text>{data.category_name}</Text>
                </View>
                <View>

                </View>
            </View>
        </TouchableOpacity>
    );
}

{/* <View style={styles.DownerContent}>
    <View style={styles.ImageArea}>
        <Image source={{ uri: data.uri[0] }}
            borderRadius={15}
            style={styles.Image}
        />
    </View>
    <View style={styles.ContentArea}>
        <View style={styles.ContentInfo}>
            <Text style={styles.ItemNameTxt}>{data.item_name}</Text>
        </View>
        <View style={styles.ContentInfo}>
            <Text>{content}</Text>
        </View>
        <View style={styles.ContentInfo}>
            <Text style={styles.UploadTimeTxt}>{timegap}</Text>
        </View>
    </View>
</View> */}


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
                renderItem={({ item }) => <Item data={item} navigation={navigation} />}
                keyExtractor={item => item.category_seq}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    CategoryBox: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: 'rgba(235, 235, 235, 1)',
    },
    IconArea: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconAround: {
        padding: 10,
        borderRadius: 30,
        backgroundColor: 'rgba(21, 186, 193, 1)',
    },
    ContentArea: {
        flex: 4,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
})


export default CategoryListUp;