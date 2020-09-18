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
import SEARCH_API from '../../dataSource/searchModel';
import DATA_SOURCE from '../../dataSource/dataModel';
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
const PrevSearch = ({ status, newData, callback }) => {
    console.log('PrevSearch newData', newData)
    const [state, dispatch] = useReducer(reducer, initialState);

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
        if (newData) {
            const UPDATE_PREV_SEARCH = async () => {
                console.log(newData);
                var SAVE_RESPONSE = await SEARCH_API.SAVE_PREV_SEARCH_LIST(text);
                if (SAVE_RESPONSE.flags == 0) {
                    var obj = new Object();
                    obj = text;
                    dispatch({ type: 'update', data: { keyword: obj } });
                }
            }
            UPDATE_PREV_SEARCH();
        }
    }, [newData])

    if (status) {
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
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
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
})

export default PrevSearch;