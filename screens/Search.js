import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SEARCH_API from '../assets/dataSource/searchModel';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import PrevSearch from '../assets/components/Search/PrevSearch';
const { width, height } = Dimensions.get('window');



function SearchScreen({ navigation, route }) {
    const [showPrev, showPrevSearch] = useState(false);
    const [searchText, setText] = useState(null);
    const [prevItem, setPrevItem] = useState(null);
    console.log(searchText)
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View></View>
            ),
            headerTitle: () => (
                <View>
                    <Text>검색</Text>
                </View>
            ),
        })
    });

    const toggleSearchHistory = () => {
        showPrevSearch(!showPrev);
    }

    const Callback = (FromChild) => {

    }

    const SearchItem = async () => {
        try {
            if (searchText !== null) {
                setPrevItem(searchText)

                var ITEM_LIST = await DATA_SOURCE.GET_ITEMS_ON_KEYWORD(searchText);
            }
            setSearchText(null);
        } catch (err) {
            console.log(err);
        }
    }
    console.log('prevItem', prevItem)
    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.SearchForm}>
                <View style={styles.SearchBox}>
                    <TextInput
                        value={searchText}
                        placeholderTextColor={'rgba(140, 140, 140, 1)'}
                        placeholder={'키워드를 입력해주세요'}
                        style={styles.Input}
                        onChangeText={text => setText(text)}
                        onTouchStart={() => toggleSearchHistory()}
                    />
                    <TouchableOpacity onPress={() => SearchItem()}>
                        <Icon name={'search1'} size={28} color={'rgba(140, 140, 140, 1)'} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                onTouchStart={() => toggleSearchHistory()}
            >
                <PrevSearch status={showPrev} newData={prevItem} callback={Callback} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    SearchForm: {
        width: width,
        height: height * 0.1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchBox: {
        flex: 1,
        margin: 25,
        padding: 10,
        height: height * 0.06,
        backgroundColor: 'rgba(242, 242, 242, 1)',
        borderColor: 'rgba(230, 230, 230, 1)',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Input: {
        flex: 1,
        paddingLeft: 10,
    },
    ResultForm: {
        height: 1000,
    }
})

export default SearchScreen;