import React, { useState, useEffect } from 'react'
import {
    View,
    Picker
} from 'react-native';
import DATA_SOURCE from '../../dataSource/dataModel';

const CategoryPicker = ({ callback }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const CATEGORIES = await DATA_SOURCE.GET_CATEGORIES();
            setCategories(CATEGORIES);
        }
        fetchData();
    }, []);

    const onChangeRefresh = (data) => {
        callback(data)
        setCategory(data)
    }
    return (
        <View>
            <Picker
                selectedValue={category}
                mode='dropdown'
                onValueChange={(itemValue) => onChangeRefresh(itemValue)
                }
            >
                {categories.map(data => (
                    <Picker.Item key={data.category_seq} label={data.category_name} value={data.category_seq} />
                ))}
            </Picker>
        </View >
    )
}



export default CategoryPicker;