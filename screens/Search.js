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
import CategoryListUp from '../assets/components/CategoryListUp';
import SEARCH_API from '../assets/dataSource/searchModel';
import DATA_SOURCE from '../assets/dataSource/dataModel';
const { width, height } = Dimensions.get('window');

const initialState = {
    prevData: [

    ]
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return {
                prevData: [
                    ...state.prevData,
                    action.data
                ]
            }
        case 'read':
            return {
                prevData: action.data
            }
        case 'delete':
            return {
                prevData: [
                    ...state.prevData.filter(
                        item => item.keyword != action.data.keyword
                    )
                ]
            }
        case 'delete_all':
            return {
                prevData: [
                ]
            }
    }
}

function SearchScreen({ navigation, route }) {
    const [searchStatus, setSearchStatus] = useState(false);
    const [contentStatus, changeContentStatus] = useState(false);
    const [text, setSearchText] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    const toggleSearchHistory = () => {
        if (state.prevData.length != 0) {
            setSearchStatus(!searchStatus)
        }
    }
    const closeSearchHistory = useCallback(() => {
        if (state.prevData.length == 0) {
            setSearchStatus(false);
        }
    }, [state])

    useEffect(() => {
        closeSearchHistory();
    }, [closeSearchHistory]);

    const UPDATE_PREV_SEARCH = async () => {
        changeContentStatus(true)
        try {
            // if (text !== null) {
                // var SAVE_RESPONSE = await SEARCH_API.SAVE_PREV_SEARCH_LIST(text);
                // if (SAVE_RESPONSE.flags == 0) {
                //     var obj = new Object();
                //     obj = text;
                //     dispatch({ type: 'update', data: { keyword: obj } });
                // }

                var ITEM_LIST = await DATA_SOURCE.GET_ITEMS_ON_KEYWORD(text);
            // }
            setSearchText(null);
        } catch (err) {
            console.log(err);
        }
    }

    const DELETE_PREV_SEARCH = async (keyword) => {
        try {
            var DELETE_RESPONSE = await SEARCH_API.DELETE_PREV_SEARCH_LIST(keyword);
            if (DELETE_RESPONSE.flags == 0) {
                var obj = new Object();
                obj = keyword;
                dispatch({ type: 'delete', data: { keyword: obj } })
            }
            setSearchText(null);
        } catch (err) {
            console.log(err)
        }
    }
    const DELETE_ALL = async () => {
        try {
            var DELETE_ALL_RESPONSE = await SEARCH_API.DELETE_PREV_ALL();
            if (DELETE_ALL_RESPONSE.flags == 0) {
                dispatch({ type: 'delete_all' })
            }
            setSearchText(null);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const GET_PREV_SEARCH = async () => {
            try {
                var PREV_RESPONSE = await SEARCH_API.GET_PREV_SEARCH_LIST();
                dispatch({ type: 'read', data: PREV_RESPONSE })
            } catch (err) {
                console.log(err);
            }
        }
        GET_PREV_SEARCH();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.SearchBox}>
                    <View style={styles.SearchContent}>
                        <TextInput
                            style={styles.SeachInput}
                            value={text}
                            placeholder={'인근 지역 검색'}
                            placeholderTextColor='#B4B4B4'
                            pointerEvents='none'
                            onTouchStart={() => toggleSearchHistory()}
                            onChangeText={(text) => setSearchText(text)}
                        />
                    </View>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.SearchBtn} onPress={() => UPDATE_PREV_SEARCH()}>
                    <Icon name={'search1'} size={22} />
                </TouchableOpacity>
            )
        })
    });

    const prevSearchList = () => {
        if (searchStatus)
            return (
                <View style={styles.PrevSearch}>
                    <View style={styles.PrevContent}>
                        <Text>최근 검색</Text>
                        <TouchableOpacity onPress={() => DELETE_ALL()}>
                            <Text>전체 삭제</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        state.prevData.map((data, index) => {
                            return (
                                <View style={styles.PrevContentList} key={JSON.stringify(index)}>
                                    <View style={styles.PrevContentLeft}>
                                        <TouchableOpacity style={styles.PrevIconBack}>
                                            <Icon name={'tago'} size={24} />
                                        </TouchableOpacity>
                                        <Text>{data.keyword}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.PrevCancel} onPress={() => DELETE_PREV_SEARCH(data.keyword)}>
                                        <Icon name={'close'} size={18} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
            )
    }

    const componentChange = () => {
        if (!contentStatus) {
            return (
                <View style={styles.CategoryBox}>
                    <View style={styles.CategoryTitle}>
                        <Text style={styles.CategoryTitleTxtStyle}>카테고리</Text>
                    </View>
                    <CategoryListUp navigation={navigation} route={route} />
                </View>
            )
        } else {
            <View>
                <Text>hi</Text>
            </View>
        }
    }
    return (
        <SafeAreaView style={styles.Container}>
            {
                prevSearchList()
            }
            <ScrollView
                onTouchStart={() => {
                    toggleSearchHistory()
                }}
            >{

                }
                {
                    componentChange()
                }

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SearchBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    SearchContent: {
        flex: 1,
        borderRadius: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(248, 249, 251, 1)',
    },
    SeachInput: {
        paddingLeft: 10,
        flex: 1,
    },
    SearchBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 0.8,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 1)'
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)',
    },
    PrevSearch: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 5,
        width: width,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },

    PrevContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    PrevContentList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    PrevContentLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    PrevIconBack: {
        margin: 10,
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: 50,
        borderColor: 'rgba(80, 80, 80, 1)',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    PrevCancel: {
        margin: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
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

    HeaderStyle: {
        flexDirection: 'column',
    },
    IconText: {
    }
})

export default SearchScreen;