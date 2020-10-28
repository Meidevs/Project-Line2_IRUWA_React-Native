import React, { useState, useEffect } from 'react'
import {
    Picker,
    Dimensions
} from 'react-native'
import DATA_SOURCE from '../../dataSource/dataModel';
const { width, height } = Dimensions.get('window');

const CategoryPicker = ({ callback }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const CATEGORIES = await DATA_SOURCE.GET_CATEGORIES();
            console.log('CATEGORIES', CATEGORIES)
            setCategories(CATEGORIES);
        }
        fetchData();
    }, []);

    const onChangeRefresh = (data) => {
        callback(data)
        setCategory(data)
    }
    return (
        <Picker
            style={{padding : 15, width : width * 0.6 }}
            selectedValue={category}
            mode="dropdown"
            onValueChange={(itemValue) => {
                onChangeRefresh(itemValue)
            }}
        >
            {categories.map(data => (
                <Picker.Item key={data.category_seq} label={data.category_name} value={data.category_seq} />
            ))}
        </Picker>
    )
}



export default CategoryPicker;